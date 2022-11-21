export const useFilePickerProps = {
  pickFileWhenClick: { type: Boolean, default: undefined },
  pickFileBtn: { type: Boolean, default: undefined },
};

export default (ref, editable) => {
  const { props } = getCurrentInstance();

  function preventIfClick(e) {
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    if (!props.pickFileWhenClick) {
      e.preventDefault();
    }
  }

  // reference methods
  const pickFiles = () => {
    if (!unref(editable)) { return; }
    ref.value?.getNativeElement().click();
  };

  const showDefaultFilePickBtn = computed(() => {
    if (props.pickFileBtn === undefined) {
      return !props.pickFileWhenClick;
    }
    return props.pickFileBtn;
  });

  return {
    preventIfClick,
    pickFiles,
    showDefaultFilePickBtn,
  };
};
