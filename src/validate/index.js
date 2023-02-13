/* eslint-disable no-restricted-syntax, no-await-in-loop */
import { validate as _validate } from 'vee-validate';
import { isFunction, isString } from 'lodash-es';
import { normalizeRules, normalizeRule } from './helper';
import i18n from '../i18n';

async function validate(value, rule, options) {
  if (isFunction(rule)) {
    const result = await rule(value, options);

    if (isString(result)) {
      return {
        valid: false,
        errors: [result],
      };
    }

    const { name, params, customMessages } = options;

    const defaultMessage = customMessages[rule.name] ? customMessages[rule.name] : i18n.t('MSG_VAL_INVALID', [name, ...params]);

    return {
      valid: !!result,
      errors: [defaultMessage],
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
  const normalizedRules = normalizeRules(rules);

  for (const rule of normalizedRules) {
    const [, ruleName, params] = normalizeRule(rule);
    const result = await validate(value, rule, { ...options, params });

    if (result.valid === false) {
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
