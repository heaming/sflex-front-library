import { createStore } from 'vuex';
import { reduce, words } from 'lodash-es';
import { defineGetters } from '../utils/private/globalProperty';
import env from '../consts/private/env';

function loadStoreModules() {
  return reduce(
    Object.entries(import.meta.globEager('./modules/*.js')),
    (a, [key, module]) => { a[words(key)[1]] = module.default; return a; },
    {},
  );
}

const store = createStore({
  modules: loadStoreModules(),
  strict: env.DEV,
});

export function installStore(app, modules) {
  defineGetters(app, { store });

  Object.keys(modules).forEach((key) => {
    store.registerModule(key, modules[key]);
  });

  app.use(store);
}

export default store;
