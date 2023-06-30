import { isEmpty, pick } from 'lodash-es';
import { PageUniqueIdContextKey } from '../../../consts/private/symbols';
import { localStorage } from '../../../plugins/storage';

export default () => {
  const {
    createUniqueId,
    registerUniqueId,
    unregisterUniqueId,
  } = inject(PageUniqueIdContextKey, {});

  const vm = getCurrentInstance();
  const { name } = vm.props;

  if (isEmpty(name)) {
    return;
  }

  const storageKey = createUniqueId(name); // use name props in useObserverChildProps
  const storageLayoutsKey = `${storageKey}__layouts`;

  registerUniqueId(storageKey);

  onBeforeUnmount(() => {
    unregisterUniqueId(storageKey);
  });

  function applySavedLayouts() {
    const view = vm.proxy.getView?.();

    if (view) {
      view.beginUpdate();
      view.__ignoreOnColumnPropertyChanged__ = true;

      try {
        const { layouts, columns, fixedOptions } = localStorage.getItem(storageLayoutsKey);

        if (layouts) {
          view.setColumnLayout(layouts);
          view.setFixedOptions(fixedOptions);

          columns.forEach((e) => {
            view.setColumnProperty(e.name, 'visible', e.visible === true);
          });
        }
      } catch (e) {
      // ignore
      }

      view.endUpdate();
      setTimeout(() => {
        view.__ignoreOnColumnPropertyChanged__ = false;
      });
    }
  }

  function saveLayouts() {
    const view = vm.proxy.getView?.();

    if (view) {
      const layouts = view.saveColumnLayout();
      const columns = view.getColumns().map((e) => pick(e, ['name', 'visible']));
      localStorage.set(storageLayoutsKey, { layouts, columns });
    }
  }

  return {
    applySavedLayouts,
    saveLayouts,
  };
};
