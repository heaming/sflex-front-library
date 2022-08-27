import { createApp } from '~kw-lib';
import routes from '../../routes';
import '../../css/app.scss';

import App from './App.vue';

createApp(App, {
  routes,
}).mount('#app');
