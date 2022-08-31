import wrap from './wrap';
import installQuasar from './installQuasar';
import installPlugins from './installPlugins';
import registerGlobals from './registerGlobals';
import registerComponents from './registerComponents';
import { installI18n } from './i18n';
import { installStore } from './store';
import { installRouter } from './router';
import { defineRules } from './validate';

import { GlobalKey } from './consts/private/symbols';
import libConfig from './consts/private/libConfig';
import { g, defineGetters } from './utils/private/globalProperty';

function provideGlobal(app) {
  const q = app.config.globalProperties.$q;

  defineGetters(app, {
    q, libConfig,
  });

  app.provide(GlobalKey, g);
}

const normalizeOptions = (options = {}) => ({
  components: options.components || {},
  plugins: options.plugins || [],
  routes: options.routes || [],
  storeModules: options.storeModules || {},
});

export default (App, options) => {
  App = wrap(App);

  const app = createApp(App);
  const {
    plugins, routes, storeModules, components,
  } = normalizeOptions(options);

  installQuasar(app);
  installPlugins(app, plugins);
  registerGlobals();
  registerComponents(app, components);
  installI18n(app);
  installStore(app, storeModules);
  installRouter(app, routes);
  defineRules();
  provideGlobal(app);

  return app;
};
