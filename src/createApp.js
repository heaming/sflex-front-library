import wrapApp from './wrapApp';
import installQuasar from './installQuasar';
import installGlobals from './installGlobals';
import installComponents from './installComponents';
import installDirectives from './installDirectives';
import installPlugins from './installPlugins';
import { installI18n } from './i18n';
import { installRouter } from './router';
import { installStore } from './store';
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
  const wrappedApp = wrapApp(App);
  const app = createApp(wrappedApp);
  const {
    components,
    plugins,
    storeModules,
    routes,
  } = normalizeOptions(options);

  installQuasar(app);
  installGlobals();
  installComponents(app, components);
  installDirectives(app);
  installPlugins(app, plugins);
  installI18n(app);
  installRouter(app, routes);
  installStore(app, storeModules);
  defineRules();
  provideGlobal(app);

  return app;
};
