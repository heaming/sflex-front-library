import { PageSearchContextKey } from '../../consts/private/symbols';

export default () => {
  const parentSearchCtx = inject(PageSearchContextKey, {});
  const registeredList = [];

  function register(searchCtx) {
    registeredList.push(searchCtx);
  }

  function unregister(searchCtx) {
    const index = registeredList.findIndex((v) => v.uid === searchCtx.uid);
    if (index > -1) registeredList.splice(index, 1);
  }

  function getRegisteredSearch(name) {
    return (
      name ? registeredList.find((v) => v.name.value === name) : registeredList[0]
    ) || parentSearchCtx.getRegisteredSearch?.(name);
  }

  provide(PageSearchContextKey, {
    register,
    unregister,
    getRegisteredSearch,
  });
};
