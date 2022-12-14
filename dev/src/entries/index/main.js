import { createApp } from '~kw-lib';
import { overridePlatformBySearchParams } from '~dev/utils/platform';
import routes from '~dev/routes';
import components from '~dev/components';
import '~dev/css/app.scss';

import App from './App.vue';

overridePlatformBySearchParams();

createApp(App, {
  routes,
  components,
}).mount('#app');
