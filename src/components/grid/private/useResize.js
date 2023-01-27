import { waitUntilSetLayout, calcViewHeight } from '../../../utils/private/gridShared';

export const useResizeProps = {
  visibleRows: {
    type: [Number, String],
    default: 0,
  },
};

export default () => {
  const vm = getCurrentInstance();
  const { props } = vm;

  const resizedHeight = ref(null);
  const visibleRows = computed(() => parseInt(props.visibleRows, 10) || 0);

  async function onResize() {
    const view = vm.proxy.getView?.();

    if (view) {
      await waitUntilSetLayout(view);

      if (visibleRows.value > 0) {
        resizedHeight.value = `${calcViewHeight(view, visibleRows.value)}px`;
      } else {
        resizedHeight.value = null;
      }
    }
  }

  watch(visibleRows, onResize);

  return {
    resizedHeight,
    onResize,
  };
};
