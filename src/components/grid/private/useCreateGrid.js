import { warn } from 'vue';
import defaultConfig from './defaultConfig';
import override from './override';
import useClickOutsideGrid from './useClickOutsideGrid';
import useResizeGrid, { useResizeGridProps } from './useResizeGrid';
import { syncHeadCheckIfAble, unregisterEventAll } from '../../../utils/private/gridShared';
import { init, reset, validate, isModified } from '../../../utils/grid';
import useObserverChild, { useObserverChildProps } from '../../../composables/private/useObserverChild';

export const useCreateGridProps = {
  ...useResizeGridProps,
  ...useObserverChildProps,

  onInit: {
    type: Function,
    default: undefined,
  },
  createViewOnly: {
    type: Boolean,
    default: false,
  },
};

export default (DataClass, ViewClass) => {
  const vm = getCurrentInstance();
  const onInit = toRaw(vm.props.onInit);

  const isCreateData = vm.props.createViewOnly !== true;
  const containerRef = ref();

  let data = null;
  let view = null;

  onMounted(() => {
    try {
      view = new ViewClass(containerRef.value);
    } catch (e) {
      warn(`KwGrid/KwTreeGrid: invalid realgrid license (${window.realGrid2Lic})`);
      return;
    }

    if (isCreateData) {
      data = new DataClass(false);
      view.setDataSource(data);

      defaultConfig(data);
      override(data, vm);
    }

    defaultConfig(view);
    override(view, vm);
    syncHeadCheckIfAble(view);

    onInit?.(data, view);
  });

  onBeforeUnmount(() => {
    unregisterEventAll(view);

    data.clearRows();
    view.destroy();
    data.destroy();

    view = null;
    data = null;
  });

  function getView() {
    return view;
  }

  function getData() {
    return view?.getDataSource();
  }

  const observerChildctx = {
    init: () => init(view),
    reset: () => reset(view),
    validate: (shouldFocus) => validate(view, true, shouldFocus),
    isModified: () => isModified(view),
  };

  useObserverChild(observerChildctx);
  useClickOutsideGrid();

  return {
    ...useResizeGrid(),
    containerRef,
    getView,
    getData,
  };
};
