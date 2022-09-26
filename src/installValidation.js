import { warn } from 'vue';
import { defineRule } from 'vee-validate';
import { snakeCase } from 'lodash-es';
import i18n from './i18n';

export default () => {
  const imported = import.meta.globEager('./validate/rules/*.js');
  const keys = Object.keys(imported);

  keys.forEach((key) => {
    const matched = key.match(/\/(\w+)\.js$/);

    if (!matched) {
      warn(`Invalid rule file, could not parse "${key}"`);
      return;
    }

    const ruleName = snakeCase(matched[1]);
    const { validator, message } = imported[key].default;

    defineRule(
      ruleName,
      (...args) => validator(...args) || i18n.t(message, [args[2].field, ...args[1]]),
    );
  });
};
