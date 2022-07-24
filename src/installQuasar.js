import { Quasar } from 'quasar';
import langKo from 'quasar/lang/ko-KR';
import langEn from 'quasar/lang/en-US';
import consts from './consts';

const locales = {
  [consts.LOCALE_KO]: langKo,
  [consts.LOCALE_EN]: langEn,
};

export default (app) => {
  app.use(Quasar, {
    lang: langKo,
    plugins: {},
  });

  Object.defineProperty(Quasar, 'locale', {
    set(locale) {
      Quasar.lang.set(
        locales[locale] || langKo,
      );
    },
  });
};
