export const g = {};

export function defineGetters(app, props) {
  app.config.globalProperties.$g ||= g;

  Object.keys(props).forEach((key) => {
    if (g[key]) {
      throw new Error(`The global property '${key}' already exist.`);
    }

    Object.defineProperty(g, key, {
      get: () => props[key],
    });
  });
}
