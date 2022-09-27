import { validate as _validate } from 'vee-validate';
import { isArray, isFunction, isString, isObject, keys } from 'lodash-es';

const ruleSeparator = '|';
const ruleParamSeparator = ':';

function convertRulesToArray(rules) {
  if (isArray(rules)) { return rules; }
  if (isFunction(rules)) { return [rules]; }
  if (isString(rules)) { return rules.split(ruleSeparator); }
  if (isObject(rules)) { return keys(rules).map((k) => ({ [k]: rules[k] })); }
  return [];
}

function getRuleName(rule) {
  if (isString(rule)) { return rule.split(ruleParamSeparator)[0]; }
  if (isObject(rule)) { return keys(rule)[0]; }
  return null;
}

async function validate(value, rule, options) {
  if (isFunction(rule)) {
    const result = await rule(value, options);

    if (isString(result)) {
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
