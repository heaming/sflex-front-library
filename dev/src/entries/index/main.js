import { createApp } from '~lib';
import routes from '@/routes';
import * as components from '@/components';
import '@/css/app.scss';

import App from './App.vue';

createApp(App, {
  routes,
  components,
}).mount('#app');
