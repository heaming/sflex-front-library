/* eslint-disable import/no-named-as-default */
import cookies from './plugins/cookies';
import dialog from './plugins/dialog';
import http from './plugins/http';
import loading from './plugins/loading';
import modal from './plugins/modal';
import sanitize from './plugins/sanitize';
import storage from './plugins/storage';

const autoInstalledPlugins = [
  cookies,
  dialog,
  http,
  loading,
  modal,
  sanitize,
  storage,
];

export default (app, plugins) => {
  plugins = [
    ...autoInstalledPlugins,
    ...plugins,
  ];

  plugins.forEach((plugin) => {
    if (!plugin.__installed) {
      plugin.__installed = true;
      app.use(plugin);
    }
  });
};
