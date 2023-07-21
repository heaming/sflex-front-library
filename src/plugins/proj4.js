import proj4 from 'proj4';
import { defineGetters } from '../utils/private/globalProperty';

export { proj4 };

export default {
  install(app) {
    defineGetters(app, { proj4 });
  },
};
