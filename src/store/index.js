import { warn } from 'vue';
import { createStore } from 'vuex';
import { defineGetters } from '../utils/private/globalProperty';
import env from '../consts/private/env';

function loadStoreModules() {
  const imported = import.meta.globEager('./modules/*.js');
  const keys = Object.keys(imported);

  return keys.reduce((modules, key) => {
    const matched = key.match(/\/(\w+)\.js$/);

    if (!matched) {
      warn(`Invalid module file, could not parse "${key}"`);
      return;
    }

    const name = matched.pop();
    modules[name] = imported[key].default;

    return modules;
  }, {});
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
