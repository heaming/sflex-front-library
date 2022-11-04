import { platform, createApp } from '~kw-lib';
import routes from '~dev/routes';
import components from '~dev/components';
import '~dev/css/app.scss';

import App from '../index/App.vue';

Object.assign(platform.is, {
  ...platform.is,
  desktop: false,
  mobile: false,
  tablet: true,
});

createApp(App, {
  routes,
  components,
}).mount('#app');
