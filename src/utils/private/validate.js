import { validate } from 'vee-validate';

const ruleSeparator = '|';
const ruleParamSeparator = ':';

export function normalizeRules(rules) {
  const type = rules ? typeof rules : null;

  switch (type) {
    case 'function':
      return [[rules]];
    case 'string':
      return rules.split(ruleSeparator)
        .map((v) => [v, ...v.split(ruleParamSeparator)]);
    case 'object':
      return Object.keys(rules)
        .filter((v) => (rules[v] ?? false) !== false)
        .map((v) => [{ [v]: rules[v] }, v]);
  }

  return [];
}

export async function validateValue(value, rulesArray, name, values, customMessages) {
  for (let i = 0; i < rulesArray.length; i += 1) {
    const [rules, id] = rulesArray[i];
    // eslint-disable-next-line no-await-in-loop
    const result = await validate(value, rules, { name, values });

    if (!result.valid) {
      return {
        valid: false,
        errors: [customMessages?.[id] || result.errors[0]],
      };
    }
  }

  return { valid: true };
}
