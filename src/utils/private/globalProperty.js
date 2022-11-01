import env from '../../consts/private/env';

export const g = {
  version: env.VERSION,
  timestamp: env.TIMESTAMP,
};

export function defineGetters(app, props) {
  app.config.globalProperties.$g ||= g;

  Object.keys(props).forEach((key) => {
    if (g[key] !== undefined) {
      throw new Error(`The global property '${key}' already exist.`);
    }

    Object.defineProperty(g, key, {
      get: () => props[key],
    });
  });
}
