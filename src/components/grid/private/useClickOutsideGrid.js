import { addClickOutside, removeClickOutside } from '../../../utils/private/clickOutside';
import { getOutsideEditorElements } from '../../../utils/private/gridShared';

export default () => {
  const vm = getCurrentInstance();

  function isClickedOutsideEditor(view, target) {
    const els = getOutsideEditorElements(view);
    return els.some((e) => e.contains(target));
  }

  onMounted(() => {
    const clickOutsideProps = {
      innerRefs: [vm.proxy.containerRef],
      onClickOutside(evt) {
        const view = vm.proxy.getView?.();
        const shouldCommit = view?.isEditing() && !isClickedOutsideEditor(view, evt.target);

        if (shouldCommit) view.commit();
      },
    };

    addClickOutside(clickOutsideProps);

    onBeforeUnmount(() => {
      removeClickOutside(clickOutsideProps);
    });
  });
};
