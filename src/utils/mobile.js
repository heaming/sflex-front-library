import { isFunction } from 'lodash-es';
import { alert } from '../plugins/dialog';
import { platform } from '../plugins/platform';

const NativePlugin = {
  Device: 'DevicePlugin',
  Photo: 'PhotoPlugin',
  Pref: 'PrefPlugin',
  Barcode: 'BarcodePlugin',
  Launcher: 'LauncherPlugin',
  Bluetooth: 'BluetoothPlugin',
  App: 'AppPlugin',
  KeyEvent: 'KeyEventPlugin',
  Status: 'StatusPlugin',
  Util: 'UtilPlugin',
  Call: 'CallPlugin',
  Android: 'Android',
};

function callEvent(resolve, reject) {
  return window.nativeEventBus.once(
    async (response) => {
      const {
        code, data, message,
      } = JSON.parse(response);

      if (code !== 200 && code !== 400) { // 400 : cancel
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

// 앱 버전 번호 얻기
export function getDeviceVersion() {
  return callMethod(NativePlugin.Device, 'getVersion');
}

// Notification Token 얻기
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
// 카메라 열기 (실제 웹에서 input type의 스크립트로 처리함)
export async function openCamera() {
  if (platform.is.ios || platform.is.iphone || platform.is.ipad || platform.is.safari) {
    const result = await callMethod(NativePlugin.Photo, 'openCamera');
    console.log('openCamera callMethod result', decodeURIComponent(result?.imageData));
    return decodeURIComponent(result?.imageData);
  }
  console.log('openCamera getImageData result', await getImageData());
  return await getImageData();
}

// 사진첩 열기 (실제 웹에서 input type의 스크립트로 처리함)
export async function openPhotoGallery() {
  if (platform.is.ios || platform.is.iphone || platform.is.ipad || platform.is.safari) {
    const result = await callMethod(NativePlugin.Photo, 'openPhotoGallery');
    console.log('openPhotoGallery callMethod result', decodeURIComponent(result?.imageData));
    return decodeURIComponent(result?.imageData);
  }
  console.log('openPhotoGallery getImageData result', await getImageData());
  return await getImageData();
}

/*
  Barcode
  */
// 카메라를 통해 QR 코드 읽기
export function openBarcodeReader() {
  return callMethod(NativePlugin.Barcode, 'openBarcodeReader');
}

/*
  Preference
  */
// 앱 저장소에 키값으로 값 저장
export function setPreference(key, value) {
  return callMethod(NativePlugin.Pref, 'setPreference', { key, value });
}

// 앱 저장소에서 키값으로 값 읽기
export function getPreference(key) {
  return callMethod(NativePlugin.Pref, 'getPreference', { key });
}

/*
  Launcher
 */
// 문자열이 표시된 SMS 열기
export function openSMS(address, body) {
  return callMethod(NativePlugin.Launcher, 'openSMS', { address, body });
}

// 전화번호가 표시된 전화걸기 표시 (Anroid는 바로 전화 가능)
export function openPhone(address) {
  return callMethod(NativePlugin.Launcher, 'openPhone', { address });
}

// 이동 경로 정보를 이용한 TMap 열기
export function openTMap(routeInfo) {
  return callMethod(NativePlugin.Launcher, 'openTMap', { routeInfo });
}

/*
  Bluetooth
 */
// ET-291(IOS, AND) 또는 ET-233 (AND) 블루투스 프린터기에 문자열 출력
export function openPrint(printString) {
  return callMethod(NativePlugin.Bluetooth, 'printing', { printMsg: printString });
}

// 블루투스 프린터 정보 초기화
export function initBluetoothPrinter() {
  return callMethod(NativePlugin.Bluetooth, 'initBluetoothPrinter');
}

/*
  App
  */
// 현재 Activity/ViewController를 종료시킨다.
// only Android
export function finish() {
  return callMethod(NativePlugin.App, 'finish');
}
// 이전 Activity/ViewController로 이동한다.
// only Android
export function moveTaskToBack() {
  return callMethod(NativePlugin.App, 'moveTaskToBack');
}
// 앱을 종료시킨다.
// only Android
export function closeApp() {
  return callMethod(NativePlugin.App, 'closeApp');
}

/*
  KeyEvent
  */
// 특정 key가 눌렸을때 콜백을 받을 수 있는 key 이벤트 등록
// only Android
export function addKeyEventListener() {
  return callMethod(NativePlugin.KeyEvent, 'addKeyEventListener');
}
// key 이벤트 해제
// only Android
export function removeKeyEventListener() {
  return callMethod(NativePlugin.KeyEvent, 'removeKeyEventListener');
}

/*
  Status
  */

// Activity/ViewController 상태 변경시 콜백을 받을 수 있는 상태 이벤트 등록
export function addStatusListener() {
  return callMethod(NativePlugin.Status, 'addStatusListener');
}
// 상태 이벤트 해제
export function removeStatusListener() {
  return callMethod(NativePlugin.Status, 'removeStatusListener');
}
/*
  Util
  */
// status : 0 - 연결안됨, 1 - wifi , 2 - mobile
export function getNetworkStatus() {
  return callMethod(NativePlugin.Util, 'getNetworkStatus');
}
// longitude : 경도값, latitude : 위도값
export function getGPS() {
  return callMethod(NativePlugin.Util, 'getGPS');
}

/*
  Call
 */
// callNumber : 전화번호, callType : 송/수신, callDuration : 통화시간,
// callStartTime : 통화발생시간
// only Android
export function getCallLog() {
  return callMethod(NativePlugin.Call, 'getCallLog', {});
}

/**
 * Wapple
 */
function closeAndroidApp() {
  if (NativePlugin.Android) {
    window.Android.close(false);
  }
}

function closeIOSApp() {
  window.open('', '_self').close();
}

// edu waffle 앱 종료
export function closeWaffleApp() {
  if (platform.is.android) {
    closeAndroidApp();
  } else if (platform.is.ios || platform.is.iphone || platform.is.ipad || platform.is.safari) {
    closeIOSApp();
  }
}
