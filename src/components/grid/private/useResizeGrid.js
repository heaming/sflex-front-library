import { waitUntilSetLayout, calcViewHeight } from '../../../utils/private/gridShared';

export const useResizeGridProps = {
  visibleRows: {
    type: Number,
    default: 0,
  },
};

export default () => {
  const vm = getCurrentInstance();

  const resizedHeight = ref(null);
  const visibleRows = toRef(vm.props, 'visibleRows');

  async function onResize() {
    const view = vm.proxy.getView?.();

    if (view) {
      await waitUntilSetLayout(view);
      resizedHeight.value = visibleRows.value > 0
        ? `${calcViewHeight(view, visibleRows.value)}px` : null;
    }
  }

  watch(visibleRows, onResize);

  return {
    resizedHeight,
    onResize,
  };
};
