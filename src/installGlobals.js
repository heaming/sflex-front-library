import jQuery from 'jquery';
import JSZip from 'jszip';
import env from './consts/private/env';
import 'bootstrap-datepicker';
import { setI18n } from './utils/private/datepicker';

export default () => {
  const realGrid2Lic = env.VITE_REALGRID_LIC;

  Object.assign(window, {
    jQuery,
    $: jQuery,
    JSZip,
    realGrid2Lic,
  });

  setI18n();
};
