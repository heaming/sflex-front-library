import { isEmpty } from 'lodash-es';

export const useFilePickerEmits = ['update:deleted-file-uid'];

export const useFilePickerProps = {
  pickFileWhenClick: { type: Boolean, default: undefined },
  pickBtn: { type: [Boolean, String], default: undefined },
};

export default (ref, ables) => {
  const { emit, props } = getCurrentInstance();
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
    if (props.fileUidMode && ref.value.modelValue.length > 0) {
      const { attachFile } = ref.value.modelValue[0];
      // attachFile 이 있다는것은 실제 서버에 저장된 파일이라는것을 의미한다.
      if (attachFile) {
        emit('update:deletedFileUid', attachFile.fileUid);
      }
    }
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
    return isEmpty(ref?.value?.modelValue) ? t('MSG_BTN_SCH_FILE', '파일찾기') : t('MSG_BTN_MOD_FILE', '파일수정');
  });

  return {
    preventIfClick,
    pickFiles,
    showPickBtn,
    pickBtnLabel,
  };
};
