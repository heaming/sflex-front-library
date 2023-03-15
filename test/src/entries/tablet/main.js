import { createApp } from '~kw-lib';
import routes from '~test/routes';
import '~test/css/app.scss';

import App from './App.vue';

createApp(App, {
  devicePlatform: 'tablet',
  routes,
}).mount('#app');
