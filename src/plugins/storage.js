import { LocalStorage as localStorage, SessionStorage as sessionStorage } from 'quasar';
import { defineGetters } from '../utils/private/globalProperty';

export {
  localStorage, sessionStorage,
};

export default {
  install(app) {
    defineGetters(app, {
      localStorage, sessionStorage,
    });
  },
};
