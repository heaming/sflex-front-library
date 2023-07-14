import { warn } from 'vue';
import { pick } from 'lodash-es';
import defaultConfig from './defaultConfig';
import override from './override';
import { registerCustomRenderers } from './customRenderer';
import { syncHeadCheckIfAble, unregisterEventAll, objectValueCallback } from '../../../utils/private/gridShared';
import { init, reset, validate, isModified } from '../../../utils/grid';
import useObserverChild, { useObserverChildProps } from '../../../composables/private/useObserverChild';
import useHandleClickEvent from './useHandleClickEvent';
import useResize, { useResizeProps } from './useResize';
import usePersonalize from './usePersonalize';

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
  const { onInit, name } = vm.props;

  const containerRef = ref();
  const contextMenuRef = ref();

  let data = null;
  let view = null;

  function hideRowIndicator() {
    const findHead = window.$('.rg-head thead tr th:nth-child(2)');
    if (findHead.length <= 0) {
      setTimeout(() => {
        hideRowIndicator();
      }, 20);
    } else {
      window.$('.rg-head thead tr th:nth-child(2)').css('display', 'none');
      window.$('.rg-head tbody tr td.rg-rowindicator-head').css('display', 'none');
    }
  }

  async function createGrid() {
    try {
      data?.clearRows();
      view?.destroy();
      data?.destroy();
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

    view.__gridName__ = name;
    view.__originalColumnInfos__ = view.getColumns().map((e) => pick(e, ['name', 'visible']));
    data.valuesCallback = objectValueCallback;
    vm.proxy.applySavedLayouts?.();
    setTimeout(() => {
      view.__originalLayouts__ = view.saveColumnLayout();
      if (view.rowIndicator.keepInvisible) {
        hideRowIndicator();
      }
    });
    /* eslint-disable no-use-before-define */
    registerGridInitFunction(view);
    /* eslint-enable no-use-before-define */
  }

  function registerGridInitFunction(gridView) {
    gridView.__initFunction__ = createGrid;
  }

  onMounted(async () => {
    await createGrid();
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
    ...usePersonalize(),
    containerRef,
    contextMenuRef,
    getView,
    getData,
  };
};
