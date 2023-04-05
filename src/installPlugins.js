/* eslint-disable import/no-named-as-default */
import drag from 'v-drag';
import cookies from './plugins/cookies';
import dialog from './plugins/dialog';
import http from './plugins/http';
import loading from './plugins/loading';
import modal from './plugins/modal';
import notify from './plugins/notify';
import platform from './plugins/platform';
import sanitize from './plugins/sanitize';
import storage from './plugins/storage';

const autoInstalledPlugins = [
  cookies,
  dialog,
  http,
  loading,
  modal,
  notify,
  platform,
  sanitize,
  storage,
  drag,
];

export default (app, options) => {
  const plugins = [
    ...autoInstalledPlugins,
    ...options.plugins,
  ];

  plugins.forEach((plugin) => {
    if (!plugin.__installed) {
      plugin.__installed = true;
      app.use(plugin, options);
    }
  });
};
