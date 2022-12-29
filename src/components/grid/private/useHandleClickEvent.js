import { addClickOutside, removeClickOutside } from '../../../utils/private/clickOutside';
import { addEvt, removeEvt, stopAndPrevent } from '../../../utils/private/event';
import { getOutsideEditorElements } from '../../../utils/private/gridShared';

export default (containerRef) => {
  const { proxy } = getCurrentInstance();

  function isClickedOutsideEditor(view, target) {
    const els = getOutsideEditorElements(view);
    return els.some((e) => e.contains(target));
  }

  onMounted(() => {
    const clickOutsideProps = {
      innerRefs: [containerRef],
      onClickOutside(evt) {
        const view = proxy.getView();
        const shouldCommit = view?.isEditing() && !isClickedOutsideEditor(view, evt.target);

        if (shouldCommit) view.commit();
      },
    };

    const handleMousedown = (evt) => {
      const shouldPrevent = evt.button === 2 // right click
        || evt.target === containerRef.value.querySelector('.rg-body');

      if (shouldPrevent) stopAndPrevent(evt);
    };

    addClickOutside(clickOutsideProps);
    addEvt(containerRef, 'mousedown', handleMousedown, true);

    onBeforeUnmount(() => {
      removeClickOutside(clickOutsideProps);
      removeEvt(containerRef, 'mousedown', handleMousedown, true);
    });
  });
};
