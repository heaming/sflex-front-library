import {
  isArray, isFunction, isString, isObject, isBoolean, isNil, toPairs,
} from 'lodash-es';

const rulesSeparator = '|';
const ruleParamSeparator = ':';
const paramsSeparator = ',';

export function normalizeRules(rules) {
  if (isString(rules)) {
    return rules.split(rulesSeparator);
  }

  if (isArray(rules)) {
    return rules;
  }

  if (isFunction(rules)) {
    return [rules];
  }

  if (isObject(rules)) {
    return toPairs(rules).map(([k, v]) => ({ [k]: v }));
  }

  return [];
}

function normalizeParams(params) {
  if (isBoolean(params) || isNil(params)) {
    return [];
  }

  if (isString(params)) {
    return params.split(paramsSeparator);
  }

  if (Array.isArray(params)) {
    return params;
  }

  return [params];
}

export function normalizeRule(rule) {
  if (isString(rule)) {
    const [name, params] = rule.split(ruleParamSeparator);
    return [rule, name, normalizeParams(params)];
  }

  if (isFunction(rule)) {
    return [rule, undefined, []];
  }

  if (isObject(rule)) {
    const [name, params] = toPairs(rule)[0] || [];
    return [rule, name, normalizeParams(params)];
  }

  return [rule, undefined, []];
}
