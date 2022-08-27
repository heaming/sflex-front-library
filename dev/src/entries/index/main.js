import { createApp } from '~kw-lib';
import routes from '~dev/routes';
import components from '~dev/components';
import '~dev/css/app.scss';

import App from './App.vue';

createApp(App, {
  routes,
  components,
}).mount('#app');
