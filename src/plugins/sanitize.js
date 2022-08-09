import DOMPurify from 'dompurify';
import { defineGetters } from '../utils/private/globalProperty';

export const { sanitize } = DOMPurify;

export default {
  install(app) {
    defineGetters(app, { sanitize });
  },
};
