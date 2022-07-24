import { Cookies as cookies } from 'quasar';
import { defineGetters } from '../utils/private/globalProperty';

export { cookies };

export default {
  install(app) {
    defineGetters(app, { cookies });
  },
};
