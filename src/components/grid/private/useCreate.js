import { warn } from 'vue';
import defaultConfig from './defaultConfig';
import override from './override';
import { registerCustomRenderers } from './customRenderer';
import { syncHeadCheckIfAble, unregisterEventAll } from '../../../utils/private/gridShared';
import { init, reset, validate, isModified } from '../../../utils/grid';
import useObserverChild, { useObserverChildProps } from '../../../composables/private/useObserverChild';
import useHandleClickEvent from './useHandleClickEvent';
import useResize, { useResizeProps } from './useResize';
import useStorage from './usePersonalize';

export const useCreateProps = {
  ...useResizeProps,
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
  const { onInit } = vm.props;

  const containerRef = ref();
  const contextMenuRef = ref();

  let data = null;
  let view = null;

  onMounted(async () => {
    try {
      view = new ViewClass(containerRef.value);
    } catch (e) {
      warn(`KwGrid/KwTreeGrid: invalid realgrid license (${window.realGrid2Lic})`);
      return;
    }

    const isCreateData = vm.props.createViewOnly !== true;

    if (isCreateData) {
      data = new DataClass(false);
      view.setDataSource(data);

      defaultConfig(data);
      override(data, vm);
    }

    defaultConfig(view);
    registerCustomRenderers(view);
    override(view, vm);
    syncHeadCheckIfAble(view);
    contextMenuRef.value?.setView(view);

    await onInit?.(data, view);

    // after initialized
    view.__originalLayouts__ = view.saveColumnLayout();
    vm.proxy.applySavedLayouts?.();
  });

  onBeforeUnmount(() => {
    unregisterEventAll(view);

    data.clearRows();
    view.destroy();
    data.destroy();

    view = null;
    data = null;
  });

  const observerChildCtx = {
    init: () => init(view),
    reset: () => reset(view),
    validate: (shouldFocus) => validate(view, true, shouldFocus),
    isModified: () => isModified(view),
  };

  useObserverChild(observerChildCtx);
  useHandleClickEvent(containerRef);

  const getView = () => view;
  const getData = () => view?.getDataSource();

  return {
    ...useResize(),
    ...useStorage(),
    containerRef,
    contextMenuRef,
    getView,
    getData,
  };
};
