import { stopAndPrevent } from '../../utils/private/event';
import { addFocusout, removeFocusout } from '../../utils/private/focusout';

export const usePanelProps = {
  name: {
    type: [Number, String],
    default: undefined,
  },
  disable: {
    type: Boolean,
    default: false,
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const containerRef = ref();

  function onFocusChange(evt) {
    if (evt.target !== containerRef.value
      && containerRef.value.contains(evt.target)) {
      stopAndPrevent(evt);
      containerRef.value.focus();
    }
  }

  watch(() => props.disable, (val) => {
    if (val) {
      addFocusout(onFocusChange);
    } else {
      removeFocusout(onFocusChange);
    }
  });

  onBeforeUnmount(() => {
    if (props.disable) {
      removeFocusout(onFocusChange);
    }
  });

  return {
    containerRef,
  };
};
