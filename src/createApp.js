import wrapApp from './wrapApp';
import installQuasar from './installQuasar';
import installGlobals from './installGlobals';
import installComponents from './installComponents';
import installDirectives from './installDirectives';
import installPlugins from './installPlugins';
import installValidation from './installValidation';
import { installI18n } from './i18n';
import { installRouter } from './router';
import { installStore } from './store';
import { GlobalKey } from './consts/private/symbols';
import { g, defineGetters } from './utils/private/globalProperty';

const normalizeOptions = (options = {}) => ({
  devicePlatform: options.devicePlatform || 'desktop',
  components: options.components || {},
  plugins: options.plugins || [],
  routes: options.routes || [],
  storeModules: options.storeModules || {},
});

function provideAppGlobal(app) {
  const q = app.config.globalProperties.$q;
  defineGetters(app, { q });
  app.provide(GlobalKey, g);
}

export default (App, options) => {
  options = normalizeOptions(options);

  const wrappedApp = wrapApp(App);
  const app = createApp(wrappedApp);

  installQuasar(app);
  installGlobals();
  installComponents(app, options);
  installDirectives(app);
  installPlugins(app, options);
  installValidation();
  installI18n(app);
  installRouter(app, options);
  installStore(app, options);
  provideAppGlobal(app);

  return app;
};
