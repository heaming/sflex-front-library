import { defineRule } from 'vee-validate';
import { mapKeys, snakeCase } from 'lodash-es';
import i18n from '../i18n';

export function defineRules() {
  mapKeys(
    import.meta.globEager('./rules/*.js'),
    (module, key) => {
      const matched = key.match(/\/(\w+)\.js$/);
      const { validator, message } = module.default;

      defineRule(
        snakeCase(matched[1]),
        (...args) => validator(...args) || i18n.t(message, [args[2].field, ...args[1]]),
      );
    },
  );
}
