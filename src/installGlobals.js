import jQuery from 'jquery';
import JSZip from 'jszip';
import env from './consts/private/env';
import 'bootstrap-datepicker';
import { setI18n } from './utils/private/datepicker';
import { createNativeEventBus } from './nativeEventBus';

export default () => {
  const realGrid2Lic = env.VITE_REALGRID_LIC;
  const nativeEventBus = createNativeEventBus();

  Object.assign(window, {
    jQuery,
    $: jQuery,
    JSZip,
    realGrid2Lic,
    nativeEventBus,
  });

  setI18n();
};
