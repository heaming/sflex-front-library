import { createI18n } from 'vue-i18n';
import { reduce, words } from 'lodash-es';
import consts from '../consts';
import { defineGetters } from '../utils/private/globalProperty';

function loadLocaleMessages() {
  return reduce(
    Object.entries(import.meta.globEager('./locales/*.js')),
    (a, [key, module]) => { a[words(key)[1].toLowerCase()] = module.default; return a; },
    {},
  );
}

const i18n = createI18n({
  messages: loadLocaleMessages(),
  locale: consts.LOCALE_KO,
  fallbackLocale: consts.LOCALE_EN,
  globalInjection: true,
  fallbackWarn: false,
  missingWarn: false,
});

export function installI18n(app) {
  defineGetters(app, { i18n: i18n.global });
  app.use(i18n);
}

export default i18n.global;
