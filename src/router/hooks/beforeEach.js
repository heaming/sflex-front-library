import { isEmpty, pick } from 'lodash-es';

export const INITIAL_LOCATION = {};

export default (to, from, next) => {
  if (isEmpty(INITIAL_LOCATION)) {
    Object.assign(
      INITIAL_LOCATION,
      pick(to, ['path', 'query']),
    );
    next('/');
  } else {
    to.meta.redirectedFrom = undefined;
    to.meta.logging = false;
    next();
  }
};
