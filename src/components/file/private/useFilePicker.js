export const useFilePickerProps = {
  pickFileWhenClick: { type: Boolean, default: false },
  pickFileBtn: { type: Boolean, default: undefined },
};

export default (ref) => {
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
    ref.value?.getNativeElement().click();
  };

  const showDefaultFilePickBtn = computed(() => (props.pickFileBtn === undefined && !props.pickFileWhenClick)
    || props.pickFileBtn === true);

  return {
    preventIfClick,
    pickFiles,
    showDefaultFilePickBtn,
  };
};
