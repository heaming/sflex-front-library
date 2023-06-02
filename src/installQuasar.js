import { warn } from 'vue';
import { Quasar } from 'quasar';
import langKo from 'quasar/lang/ko-KR';
import langEn from 'quasar/lang/en-US';
import consts from './consts';

function loadIcons() {
  const imported = import.meta.globEager('./assets/icons/*.svg');
  const keys = Object.keys(imported);

  // console.log(keys);

  return keys.reduce((icons, key) => {
    const matched = key.match(/\/([-\w]+)\.svg$/);

    if (!matched) {
      warn(`Invalid icon file, could not parse "${key}"`);
      return;
    }

    const name = matched.pop();
    icons[name] = imported[key].default;

    return icons;
  }, {});
}

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

  const icons = loadIcons();

  // override icon mapping
  const { $q } = app.config.globalProperties;
  // const defaultViewBox = '0 0 24 24';

  $q.iconMapFn = (s) => {
    const [def] = s.split('|');
    // const [def, viewBox = defaultViewBox] = s.split('|');
    const icon = icons[def] ? `img:${icons[def]}` : 'none';
    // const icon = icons[def] ? `svguse:${icons[def]}#${def}|${viewBox}` : 'none';
    return { icon };
  };
};
