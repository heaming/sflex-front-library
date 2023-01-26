import { PageUniqueIdContextKey } from '../../../consts/private/symbols';
import { localStorage } from '../../../plugins/storage';

export default () => {
  const {
    createUniqueId,
    registerUniqueId,
    unregisterUniqueId,
  } = inject(PageUniqueIdContextKey, {});

  const vm = getCurrentInstance();
  const storageKey = createUniqueId(vm.props.name || vm.uid); // use name props in useObserverChildProps
  const storageLayoutsKey = `${storageKey}__layouts`;

  registerUniqueId(storageKey);

  onBeforeUnmount(() => {
    unregisterUniqueId(storageKey);
  });

  function getSavedLayouts() {
    return localStorage.getItem(storageLayoutsKey);
  }

  function recursiveGetLayouts(view, layouts) {
    layouts ||= view.saveColumnLayout();

    return layouts.map((e) => {
      const layout = { ...e };

      if (layout.column) {
        const { visible } = view.columnByName(layout.column);
        layout.visible = visible;
      } else if (layout.items) {
        layout.items = recursiveGetLayouts(view, e.items);
      }

      return layout;
    });
  }

  function saveLayouts() {
    const view = vm.proxy.getView?.();

    if (view) {
      const layouts = recursiveGetLayouts(view);
      localStorage.set(storageLayoutsKey, layouts);
    }
  }

  return {
    getSavedLayouts,
    saveLayouts,
  };
};
