import { waitUntilSetLayout, calcViewHeight } from '../../../utils/private/gridShared';

export const useResizeProps = {
  visibleRows: {
    type: [Number, String],
    default: 0,
  },
  pageSize: {
    type: [Number, String],
    default: null,
  },
  totalCount: {
    type: [Number, String],
    default: null,
  },
};

export default () => {
  const vm = getCurrentInstance();
  const { props } = vm;

  const resizedHeight = ref(null);

  const visibleRows = computed(() => {
    if (props.visibleRows) {
      return parseInt(props.visibleRows, 10) || 0;
    }
    if (!!props.pageSize && !!props.totalCount) {
      return Math.max(10, Math.min(props.pageSize, props.totalCount));
    }
    return 0;
  });

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
