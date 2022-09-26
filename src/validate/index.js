import { validate as _validate } from 'vee-validate';

const ruleSeparator = '|';
const ruleParamSeparator = ':';

function convertRulesToArray(rules = []) {
  if (Array.isArray(rules)) { return rules; }
  if (typeof rules === 'function') { return [rules]; }
  if (typeof rules === 'string') { return rules.split(ruleSeparator); }
  if (typeof rules === 'object') { return Object.keys(rules).map((k) => ({ [k]: rules[k] })); }
}

function getRuleName(rule) {
  if (typeof rule === 'string') { return rule.split(ruleParamSeparator)[0]; }
  if (typeof rule === 'object') { return Object.keys(rule)[0]; }
}

async function validate(value, rule, options) {
  if (typeof rule === 'function') {
    const result = await rule(value, options);

    if (typeof result === 'string') {
      return {
        valid: false,
        errors: [result],
      };
    }

    return {
      valid: !!result,
      errors: ['Field is invalid'],
    };
  }

  return _validate(value, rule, options);
}

export default async (value, rules, options) => {
  options = {
    name: undefined,
    values: undefined,
    customMessages: undefined,
    bails: true,
    ...options,
  };

  const errors = [];
  const ruleList = convertRulesToArray(rules);
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of ruleList) {
    // eslint-disable-next-line no-await-in-loop
    const result = await validate(value, rule, options);

    if (result.valid === false) {
      const ruleName = getRuleName(rule);
      const customMessages = options.customMessages?.[ruleName];

      errors.push(
        customMessages || result.errors[0],
      );

      if (options.bails === true) break;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
