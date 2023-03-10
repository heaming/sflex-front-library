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

function callEvent(resolve, reject) {
  return window.nativeEventBus.once(
    async (response) => {
      const {
        code, data, message,
      } = JSON.parse(response);

      if (code !== 200) {
        await alert(message);
        reject(new Error(message));
      } else {
        resolve(data);
      }
    },
  );
}

async function callMethod(pluginName, methodId, data) {
  return new Promise((resolve, reject) => {
    const plugin = window[pluginName];

    if (!isFunction(plugin?.callMethod)) {
      throw new Error(
        `failed to invoke ${pluginName}.${methodId}, ${pluginName} is not injected.`,
      );
    }

    const eventId = callEvent(resolve, reject);

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

export async function getImageData() {
  /* eslint-disable-next-line */
  return await PhotoPlugin?.getImageData();
}

/*
  Photo
  */
export async function openCamera() {
  await callMethod(NativePlugin.Photo, 'openCamera');
  return getImageData();
}

export async function openPhotoGallery() {
  await callMethod(NativePlugin.Photo, 'openPhotoGallery');
  return getImageData();
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
