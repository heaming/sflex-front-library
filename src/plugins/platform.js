import env from '../consts/private/env';
import { defineGetters } from '../utils/private/globalProperty';

function replaceBodyClasses() {
  const classes = [];

  if (env.TABLET === true) {
    classes.push('mobile', 'tablet');
  } else if (env.MOBILE === true) {
    classes.push('mobile');
  } else {
    classes.push('desktop');
  }

  const bodyClassList = document.body.classList;
  const quasarClasses = ['desktop', 'mobile'];

  bodyClassList.remove(...quasarClasses);
  bodyClassList.add(...classes);
}

export const platform = {};

export default {
  install(app) {
    Object.assign(platform, {
      is: {
        local: env.LOCAL === true,
        server: env.SERVER === true,
        test: env.TEST === true,
        mobile: env.MOBILE === true,
        tablet: env.TABLET === true,
      },
    });

    replaceBodyClasses();
    defineGetters(app, { platform });
  },
};
