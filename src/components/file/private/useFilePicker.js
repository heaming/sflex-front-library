export const useFilePickerProps = {
  pickFileWhenClick: { type: Boolean, default: undefined },
  pickBtn: { type: [Boolean, String], default: undefined },
};

export default (ref, ables) => {
  const { props } = getCurrentInstance();
  const { t } = useI18n();

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
    if (!ables?.value.add) { return; }
    ref.value?.getNativeElement().click();
  };

  const showPickBtn = computed(() => {
    if (!ables.value.add) { return false; }
    if (props.pickBtn === undefined) {
      return !props.pickFileWhenClick;
    }
    return props.pickBtn;
  });

  const pickBtnLabel = computed(() => {
    if (!showPickBtn.value) {
      return '';
    }
    if (typeof props.pickBtn === 'string') {
      return props.pickBtn;
    }
    return t('FIXME', undefined, '파일선택');
  });

  return {
    preventIfClick,
    pickFiles,
    showPickBtn,
    pickBtnLabel,
  };
};
