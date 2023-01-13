import { consts, http, createApp } from '~kw-lib';
import routes from '~test/routes';
import '~test/css/app.scss';

import App from './App.vue';

Object.assign(consts, { HTTP_ORIGIN: 'https://d-wpm.kyowon.co.kr' });
http.defaults.baseURL = 'https://d-wpm.kyowon.co.kr/api/v1';

createApp(App, {
  devicePlatform: 'mobile',
  routes,
}).mount('#app');
