import { platform, createApp } from '~kw-lib';
import routes from '~test/routes';
import '~test/css/app.scss';

import App from './App.vue';

Object.assign(platform.is, {
  ...platform.is,
  mobile: true,
  tablet: false,
  desktop: false,
});

createApp(App, {
  routes,
}).mount('#app');
