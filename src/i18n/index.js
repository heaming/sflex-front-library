import { warn } from 'vue';
import { createI18n } from 'vue-i18n';
import consts from '../consts';
import { defineGetters } from '../utils/private/globalProperty';

function loadLocaleMessages() {
  const imported = import.meta.globEager('./locales/*.js');
  const keys = Object.keys(imported);

  return keys.reduce((messages, key) => {
    const matched = key.match(/\/(\w+)\.js$/);

    if (!matched) {
      warn(`Invalid locale file, could not parse "${key}"`);
      return;
    }

    const locale = matched.pop();
    messages[locale] = imported[key].default;

    return messages;
  }, {});
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
