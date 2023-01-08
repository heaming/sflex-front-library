import { isFunction } from 'lodash-es';
import { alert } from '../plugins/dialog';
import { platform } from '../plugins/platform';

const NativePlugin = {
  Device: 'DevicePlugin',
  Photo: 'PhotoPlugin',
  Barcode: 'BarcodePlugin',
  Pref: 'PrefPlugin',
  Launcher: 'LauncherPlugin',
  Bluetooth: 'BluetoothPlugin',
  Util: 'UtilPlugin',
};

function callEvent(resolve) {
  return window.nativeEventBus.once(async (response) => {
    const {
      code, data, message,
    } = JSON.parse(response);

    if (code === 200) {
      resolve({
        result: true,
        payload: data,
      });
    } else {
      await alert(message);

      resolve({
        result: false,
        payload: undefined,
      });
    }
  });
}

function callMethod(pluginName, methodId, data) {
  return new Promise((resolve) => {
    const plugin = window[pluginName];

    if (!isFunction(plugin?.callMethod)) {
      throw new Error(`failed to invoke ${pluginName}.${methodId}, ${pluginName} is not injected.`);
    }

    const eventId = callEvent(resolve);

    plugin.callMethod(
      JSON.stringify({
        MethodID: methodId,
        Callback: eventId,
        Data: data,
      }),
    );
  });
}

/*
  Device
  */
export function getOsTypeCode() {
  if (platform.is.android) return 'A';
  if (platform.is.ios) return 'I';
  return null;
}

export function getDeviceTypeCode() {
  if (platform.is.mobile) return 'M';
  if (platform.is.tablet) return 'T';
  return null;
}

export function getDeviceVersion() {
  return callMethod(NativePlugin.Device, 'getVersion');
}

export function getDeviceToken() {
  return callMethod(NativePlugin.Device, 'getDeviceToken');
}

export function getDeviceId() {
  return callMethod(NativePlugin.Device, 'getDeviceId');
}

/*
  Photo
  */
export function openCamera() {
  return callMethod(NativePlugin.Photo, 'openCamera');
}

export function openPhotoGallery() {
  return callMethod(NativePlugin.Photo, 'openPhotoGallery');
}

/*
  Barcode
  */
export function openBarcodeReader() {
  return callMethod(NativePlugin.Barcode, 'openBarcodeReader');
}

/*
  Preference
  */
export function setPreference(key, value) {
  return callMethod(NativePlugin.Pref, 'setPreference', { key, value });
}

export function getPreference(key) {
  return callMethod(NativePlugin.Pref, 'getPreference', { key });
}

/*
  Launcher
 */
export function openPhone(address) {
  return callMethod(NativePlugin.Launcher, 'openPhone', { address });
}

export function openSMS(address, body) {
  return callMethod(NativePlugin.Launcher, 'openSMS', { address, body });
}

export function openTMap(routeInfo) {
  return callMethod(NativePlugin.Launcher, 'openTMap', { routeInfo });
}

/*
  Bluetooth
 */
export function openPrint(printType, printString) {
  return callMethod(NativePlugin.Bluetooth, 'printing', { printType, printString });
}

/*
  Util
  */
export function getNetworkStatus() {
  return callMethod(NativePlugin.Util, 'getNetworkStatus');
}
