import env from '../consts/private/env';
import { defineGetters } from '../utils/private/globalProperty';

const { pathname } = window.location;

export const platform = {
  is: {
    local: env.LOCAL === true,
    server: env.SERVER === true,
    test: env.TEST === true,
    desktop: env.DESKTOP === true,
    mobile: env.MOBILE === true,
    tablet: env.TABLET === true,
    popup: env.VITE_ENTRY_POPUP_PATHNAME === pathname,
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
  install(app) {
    Object.freeze(platform.is);
    replaceBodyClasses();
    defineGetters(app, { platform });
  },
};
