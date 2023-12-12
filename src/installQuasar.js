import { warn } from 'vue';
import { Quasar } from 'quasar';
import langKo from 'quasar/lang/ko-KR';
import langEn from 'quasar/lang/en-US';
import consts from './consts';
import env from './consts/private/env';

function loadIcons() {
  const imported = import.meta.globEager('./assets/icons/*.svg');
  const keys = Object.keys(imported);

  // console.log(keys);

  return keys.reduce((icons, key) => {
    const matched = key.match(/\/([-\w]+)\.svg$/);
    warn(`test "${key}"`);
    warn(imported[key].default);
    if (!matched) {
      warn(`Invalid icon file, could not parse "${key}"`);
      return;
    }

    const name = matched.pop();
    if (env.LOCAL) { // chrome 버전업되면서 브라우저보안으로 data:image 가 막혀서 상대경로로 불러준다.
      // sflex-front-library 용
      if (String(imported[key].default).indexOf('@fs') > -1) {
        icons[name] = imported[key].default;
      } else { // 다른 노드모듈로 불러오는 프로젝트 용
        icons[name] = `/node_modules/kw-lib/src/assets/icons/${name}.svg`;
      }
    } else {
      icons[name] = `/assets/${name}.svg`;
    }

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
  const defaultViewBox = '0 0 24 24';
  $q.iconMapFn = (s) => {
    // const [def] = s.split('|');
    const [def, viewBox = defaultViewBox] = s.split('|');
    // const icon = icons[def] ? `img:${icons[def]}` : 'none';
    // console.log(icon);
    const icon = icons[def] ? `svguse:${icons[def]}#${def}|${viewBox}` : 'none';
    return { icon };
  };
};
