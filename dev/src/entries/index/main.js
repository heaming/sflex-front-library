import { createApp } from '~kw-lib';
import routes from '~dev/routes';
import components from '~dev/components';
import { getDevicePlatformBySearchParams } from '~dev/utils/platform';
import '~dev/css/app.scss';
import '../../../../src/css/grid.scss';

import App from './App.vue';

createApp(App, {
  devicePlatform: getDevicePlatformBySearchParams(),
  routes,
  components,
}).mount('#app');
