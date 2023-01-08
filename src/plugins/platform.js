import { Platform } from 'quasar';
import env from '../consts/private/env';
import { defineGetters } from '../utils/private/globalProperty';

const pathname = window.location.pathname.replace(/\/$/, '');
const devicePlatformValues = ['desktop', 'mobile', 'tablet'];

export const platform = {
  is: {
    local: env.LOCAL === true,
    server: env.SERVER === true,
    test: env.TEST === true,
    popup: env.VITE_ENTRY_POPUP_PATHNAME === pathname,
    android: Platform.is.android === true,
    ios: Platform.is.ios === true,
    desktop: true,
    mobile: false,
    tablet: false,
  },
};

function replaceBodyClasses() {
  const classes = [];

  if (platform.is.popup) {
    classes.push('popup');
  }

  if (platform.is.tablet) {
    classes.push('mobile', 'tablet');
  } else if (platform.is.mobile) {
    classes.push('mobile');
  } else {
    classes.push('desktop');
  }

  const bodyClassList = document.body.classList;
  const quasarClasses = ['desktop', 'mobile'];

  bodyClassList.remove(...quasarClasses);
  bodyClassList.add(...classes);
}

export default {
  install(app, { devicePlatform }) {
    if (!devicePlatformValues.includes(devicePlatform)) {
      throw new Error(
        `Invalid device platform, device platform must be one of ${devicePlatformValues}`,
      );
    }

    Object.freeze(
      Object.assign(platform.is, {
        ...platform.is,
        desktop: devicePlatform === 'desktop',
        mobile: devicePlatform === 'mobile',
        tablet: devicePlatform === 'tablet',
      }),
    );

    replaceBodyClasses();
    defineGetters(app, { platform });
  },
};
