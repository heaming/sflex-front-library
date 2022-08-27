import { createApp } from '~kw-lib';
import routes from '@/routes';
import components from '@/components';
import '@/css/app.scss';

import App from './App.vue';

createApp(App, {
  routes,
  components,
}).mount('#app');
