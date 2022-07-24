import consts from '../consts';
import { defineGetters } from '../utils/private/globalProperty';

export { consts };

export default {
  install(app) {
    defineGetters(app, { consts });
  },
};
