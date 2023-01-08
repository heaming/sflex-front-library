import { isFunction } from 'lodash-es';
import { platform } from '../plugins/platform';

const NativePlugin = {
  Device: 'DevicePlugin',
  Photo: 'PhotoPlugin',
  Barcode: 'BarcodePlugin',
  Pref: 'PrefPlugin',
  Launcher: 'LauncherPlugin',
  Bluetooth: 'BluetoothPlugin',
};

function callMethod(pluginName, methodId, eventId, data) {
  const plugin = window[pluginName];

  if (!isFunction(plugin?.callMethod)) {
    throw new Error(`failed to invoke ${pluginName}.${methodId}, ${pluginName} is not injected.`);
  }

  plugin.callMethod(
    JSON.stringify({
      MethodID: methodId,
      Callback: eventId,
      Data: data,
    }),
  );
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
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    callMethod(NativePlugin.Device, 'getVersion', eventId);
  });
}

export function getDeviceToken() {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    callMethod(NativePlugin.Device, 'getDeviceToken', eventId);
  });
}

/*
  Photo
  */
export function openCamera() {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    callMethod(NativePlugin.Photo, 'openCamera', eventId);
  });
}

export function openPhotoGallery() {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    callMethod(NativePlugin.Photo, 'openPhotoGallery', eventId);
  });
}

/*
  Barcode
  */
export function openBarcodeReader() {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    callMethod(NativePlugin.Barcode, 'openBarcodeReader', eventId);
  });
}

/*
  Preference
  */
export function setPreference(key, value) {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    const data = { key, value };
    callMethod(NativePlugin.Pref, 'setPreference', eventId, data);
  });
}

export function getPreference(key) {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    const data = { key };
    callMethod(NativePlugin.Pref, 'getPreference', eventId, data);
  });
}

/*
  Launcher
 */
export function openPhone(address) {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    const data = { address };
    callMethod(NativePlugin.Launcher, 'openPhone', eventId, data);
  });
}

export function openSMS(address, body) {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    const data = { address, body };
    callMethod(NativePlugin.Launcher, 'openSMS', eventId, data);
  });
}

export function openTMap(routeInfo) {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    const data = { routeInfo };
    callMethod(NativePlugin.Launcher, 'openTMap', eventId, data);
  });
}

/*
  Bluetooth
 */
export function openPrint(printType, printString) {
  return new Promise((resolve) => {
    const eventId = window.nativeEventBus.once(resolve);
    const data = { printType, printString };
    callMethod(NativePlugin.Bluetooth, 'printing', eventId, data);
  });
}
