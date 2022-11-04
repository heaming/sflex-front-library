import { addClickOutside, removeClickOutside } from '../../../utils/private/clickOutside';

export default () => {
  const vm = getCurrentInstance();

  onMounted(() => {
    const clickOutsideProps = {
      innerRefs: [vm.proxy.containerRef],
      onClickOutside() {
        // TODO: fix
        // const view = vm.proxy.getView?.();
        // if (view?.isEditing()) view.commit();
      },
    };

    addClickOutside(clickOutsideProps);

    onBeforeUnmount(() => {
      removeClickOutside(clickOutsideProps);
    });
  });
};
