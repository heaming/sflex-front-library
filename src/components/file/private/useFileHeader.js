export const useFileHeaderProps = {
  useHeader: { type: Boolean, default: undefined },
  scrollHorizontal: { type: Boolean, default: undefined },
  nameWidth: { type: String, default: undefined },
  appendWidth: { type: String, default: undefined },
  asideWidth: { type: String, default: undefined },
  updateBtn: { type: [Boolean, String], default: undefined },
  updateAllBtn: { type: [Boolean, String], default: undefined },
  revertBtn: { type: [Boolean, String], default: undefined },
  revertAllBtn: { type: [Boolean, String], default: undefined },
  removeBtn: { type: [Boolean, String], default: undefined },
  removeAllBtn: { type: [Boolean, String], default: undefined },
  undeleteBtn: { type: [Boolean, String], default: undefined },
  undeleteAllBtn: { type: [Boolean, String], default: undefined },
  downloadBtn: { type: [Boolean, String], default: true },
  downloadAllBtn: { type: [Boolean, String], default: undefined },
  rows: { type: Number, default: 5 },
};

export const useFileHeaderEmits = ['scroll:file', 'scroll:header'];

export default (uploadCtx, ables, defaults = {}) => {
  const { props, emit, proxy } = getCurrentInstance();
  const { t } = useI18n();

  const computedProps = computed(() => ({
    useHeader: props.useHeader ?? defaults.useHeader ?? props.multiple ?? false,
    scrollHorizontal: props.scrollHorizontal ?? defaults.scrollHorizontal,
    nameWidth: props.nameWidth ?? defaults.nameWidth,
    appendWidth: props.appendWidth ?? defaults.appendWidth,
    asideWidth: props.asideWidth ?? defaults.asideWidth,
    updateBtn: props.updateBtn ?? defaults.updateBtn,
    updateAllBtn: props.updateAllBtn ?? defaults.updateAllBtn,
    revertBtn: props.revertBtn ?? defaults.revertBtn,
    revertAllBtn: props.revertAllBtn ?? defaults.revertAllBtn,
    removeBtn: props.removeBtn ?? defaults.removeBtn,
    removeAllBtn: props.removeAllBtn ?? defaults.removeAllBtn,
    undeleteBtn: props.undeleteBtn ?? defaults.undeleteBtn,
    undeleteAllBtn: props.undeleteAllBtn ?? defaults.undeleteAllBtn,
    downloadBtn: props.downloadBtn ?? defaults.downloadBtn,
    downloadAllBtn: props.downloadAllBtn ?? defaults.downloadAllBtn,
  }));

  const computedUseHeader = computed(() => computedProps.value.useHeader);

  let ignoreSource;

  const fileScrollAreaRef = ref();
  const headerScrollAreaRef = ref();

  function scroll(source, horizontalPosition) {
    if (ignoreSource === source) {
      ignoreSource = null;
      return;
    }

    ignoreSource = source === 'file'
      ? 'header'
      : 'file';

    const areaRef = source === 'file'
      ? headerScrollAreaRef
      : fileScrollAreaRef;

    areaRef.value?.setScrollPosition('horizontal', horizontalPosition);
  }

  const fileItemNameStyles = ref('');
  const fileItemAppendStyles = ref('');
  const fileItemAsideStyles = ref('');

  const getFileItemMainWidth = () => {
    const componentRootEl = proxy.$el;
    if (!componentRootEl) { return; }

    let width = computedProps.value.nameWidth;

    if (width) { return width; }

    const mainEls = componentRootEl.querySelectorAll('.kw-file-item__main');
    let maxWidth = 0;
    mainEls.forEach((node) => {
      if (node.getBoundingClientRect()?.width > maxWidth) {
        maxWidth = node.getBoundingClientRect().width;
      }
    });
    if (maxWidth > 0) {
      width = `${maxWidth}px`;
    }
    return width;
  };

  const getFileItemAppendWidth = () => {
    const componentRootEl = proxy.$el;
    if (!componentRootEl) { return; }
    const appendEls = componentRootEl.querySelectorAll('.kw-file-item__append');
    let width = computedProps.value.appendWidth;
    if (width) { return width; }
    let maxWidth = 0;
    appendEls.forEach((node) => {
      if (node.getBoundingClientRect()?.width > maxWidth) {
        maxWidth = node.getBoundingClientRect().width;
      }
    });
    if (maxWidth > 0) {
      width = `${maxWidth}px`;
    }
    return width;
  };

  const getFileItemAsideWidth = () => {
    const componentRootEl = proxy.$el;
    if (!componentRootEl) { return; }
    let width = computedProps.value.asideWidth;
    if (width) { return width; }
    const asideEls = componentRootEl.querySelectorAll('.kw-file-item__aside');
    let maxWidth = 0;
    asideEls.forEach((node) => {
      if (node.getBoundingClientRect()?.width > maxWidth) {
        maxWidth = node.getBoundingClientRect().width;
      }
    });
    if (maxWidth > 0) {
      width = `${maxWidth}px`;
    }
    return width;
  };

  const updateFileItemLayout = () => {
    if (!computedProps.value.scrollHorizontal) { return; }

    const mainWidth = getFileItemMainWidth();
    if (mainWidth) {
      fileItemNameStyles.value = `width: ${mainWidth}; `;
    }

    const appendWidth = getFileItemAppendWidth();
    if (appendWidth) {
      fileItemAppendStyles.value = `width: ${appendWidth}; `;
    }

    const asideWidth = getFileItemAsideWidth();
    if (asideWidth) {
      fileItemAsideStyles.value = `width: ${asideWidth}; `;
    }
  };

  const onScrollFile = computed(() => (info) => {
    emit('scroll:file', info);
    if (computedProps.value.useHeader && computedProps.value.scrollHorizontal) {
      scroll('file', info.horizontalPosition);
    }
  });

  const onScrollHeader = computed(() => (computedProps.value.useHeader ? (info) => {
    emit('scroll:header', info);
    if (computedProps.value.scrollHorizontal) {
      scroll('header', info.horizontalPosition);
    }
  } : undefined));

  const useHeaderFileClass = computed(() => ({
    'kw-file--use-header': computedProps.value.useHeader,
  }));

  const getHeaderScrollAreaStyle = () => {
    const componentRootEl = proxy.$el;
    if (!componentRootEl) {
      return undefined;
    }
    let left = 0;
    const beforeSlotEl = componentRootEl.querySelector('.kw-file.q-file.q-field>.q-field__before');
    if (beforeSlotEl) {
      left += beforeSlotEl.getBoundingClientRect().width;
    }
    const prefixSlotEl = componentRootEl.querySelector('.kw-file.q-file.q-field>.q-field__inner>.q-field__control>.q-field__control-container>.q-field__prefix');
    if (prefixSlotEl) {
      left += prefixSlotEl.getBoundingClientRect().width;
    }
    let right = 0;
    const suffixSlotEl = componentRootEl.querySelector('.kw-file.q-file.q-field>.q-field__inner>.q-field__control>.q-field__control-container>.q-field__suffix');
    if (suffixSlotEl) {
      right += suffixSlotEl.getBoundingClientRect().width;
    }
    const afterSlotEl = componentRootEl.querySelector('.kw-file.q-file.q-field>.q-field__after');
    if (afterSlotEl) {
      right += afterSlotEl.getBoundingClientRect().width;
    }
    // const width = fileScrollAreaRef.value && fileScrollAreaRef.value.$el.getBoundingClientRect().width;
    // width: width ?? `${width}px`,
    return {
      left: `${left}px`,
      right: `${right}px`,
    };
  };

  const placeholderStyle = ref({});

  const getPlaceholderStyle = () => {
    const componentRootEl = proxy.$el;
    if (!componentRootEl) {
      return undefined;
    }
    let left = 0;
    const prefixSlotEl = componentRootEl.querySelector('.kw-file.q-file.q-field>.q-field__inner>.q-field__control>.q-field__control-container>.q-field__prefix');
    if (prefixSlotEl) {
      left += prefixSlotEl.getBoundingClientRect().width;
    }
    let right = 0;
    const suffixSlotEl = componentRootEl.querySelector('.kw-file.q-file.q-field>.q-field__inner>.q-field__control>.q-field__control-container>.q-field__suffix');
    if (suffixSlotEl) {
      right += suffixSlotEl.getBoundingClientRect().width;
    }
    return {
      left: `${left}px`,
      right: `${right}px`,
    };
  };

  const headerScrollAreaStyle = ref({});

  const fileScrollAreaContentsStyle = computed(() => {
    if (!computedProps.value.scrollHorizontal) {
      return 'width: 100%; ';
    }
    if (computedProps.value.useHeader) {
      return 'padding-bottom: 10px; ';
    }
    return undefined;
  });

  // header actions
  const showUpdateBtn = computed(() => (ables.value.manualUpdate
    && !!computedProps.value.updateBtn));
  const updateBtnLabel = computed(() => {
    if (!showUpdateBtn.value) {
      return '';
    }
    if (typeof computedProps.value.updateBtn === 'string') {
      return computedProps.value.updateBtn;
    }
    return t('FIXME', null, '동기화');
  });
  const showUpdateAllBtn = computed(() => (ables.value.manualUpdate
    && !!computedProps.value.updateAllBtn));
  const updateAllBtnLabel = computed(() => {
    if (!showUpdateAllBtn.value) {
      return '';
    }
    if (typeof computedProps.value.updateAllBtn === 'string') {
      return computedProps.value.updateAllBtn;
    }
    return t('FIXME', null, '전체동기화');
  });
  const showRevertBtn = computed(() => (ables.value.revert
    && !!computedProps.value.revertBtn));
  const revertBtnLabel = computed(() => {
    if (!showRevertBtn.value) {
      return '';
    }
    if (typeof computedProps.value.revertBtn === 'string') {
      return computedProps.value.revertBtn;
    }
    return t('FIXME', null, '실행취소');
  });
  const showRevertAllBtn = computed(() => (ables.value.revert
    && !!computedProps.value.revertAllBtn));
  const revertAllBtnLabel = computed(() => {
    if (!showRevertAllBtn.value) {
      return '';
    }
    if (typeof computedProps.value.revertAllBtn === 'string') {
      return computedProps.value.revertAllBtn;
    }
    return t('FIXME', null, '전체실행취소');
  });
  const showRemoveBtn = computed(() => (ables.value.remove
    && !!computedProps.value.removeBtn));
  const removeBtnLabel = computed(() => {
    if (!showRemoveBtn.value) {
      return '';
    }
    if (typeof computedProps.value.removeBtn === 'string') {
      return computedProps.value.removeBtn;
    }
    return t('MSG_BTN_RMV', null, '삭제');
  });
  const showRemoveAllBtn = computed(() => (ables.value.remove
    && !!computedProps.value.removeAllBtn));
  const removeAllBtnLabel = computed(() => {
    if (!showRemoveAllBtn.value) {
      return '';
    }
    if (typeof computedProps.value.removeAllBtn === 'string') {
      return computedProps.value.removeAllBtn;
    }
    return t('FIXME', null, '전체삭제');
  });
  const showUndeleteBtn = computed(() => (ables.value.undelete
    && !!computedProps.value.undeleteBtn));
  const undeleteBtnLabel = computed(() => {
    if (!showUndeleteBtn.value) {
      return '';
    }
    if (typeof computedProps.value.undeleteBtn === 'string') {
      return computedProps.value.undeleteBtn;
    }
    return t('FIXME', null, '삭제취소');
  });
  const showUndeleteAllBtn = computed(() => (ables.value.undelete
    && !!computedProps.value.undeleteAllBtn));
  const undeleteAllBtnLabel = computed(() => {
    if (!showUndeleteAllBtn.value) {
      return '';
    }
    if (typeof computedProps.value.undeleteAllBtn === 'string') {
      return computedProps.value.undeleteAllBtn;
    }
    return t('FIXME', null, '전체삭제취소');
  });
  const showDownloadBtn = computed(() => (ables.value.download
    && !!computedProps.value.downloadBtn));
  const downloadBtnLabel = computed(() => {
    if (!showDownloadBtn.value) {
      return '';
    }
    if (typeof computedProps.value.downloadBtn === 'string') {
      return computedProps.value.downloadBtn;
    }
    return t('FIXME', null, '다운로드');
  });
  const showDownloadAllBtn = computed(() => (ables.value.download
    && !!computedProps.value.downloadAllBtn));
  const downloadAllBtnLabel = computed(() => {
    if (!showDownloadAllBtn.value) {
      return '';
    }
    if (typeof computedProps.value.downloadAllBtn === 'string') {
      return computedProps.value.downloadAllBtn;
    }
    return t('FIXME', null, '전체다운로드');
  });
  // computedUseHeader.value ? $-kw-file-item-height-use-header : $kw-field-height
  const fileItemHeight = computed(() => (computedUseHeader.value ? 36 : 40));
  const fileContainerMinHeight = computed(() => `${1 * fileItemHeight.value}px`);
  const fileContainerMaxHeight = computed(() => (props.rows ? `${props.rows * fileItemHeight.value}px` : undefined));

  onUpdated(() => {
    headerScrollAreaStyle.value = getHeaderScrollAreaStyle();
    placeholderStyle.value = getPlaceholderStyle();
    updateFileItemLayout();
  });

  onMounted(() => {
    headerScrollAreaStyle.value = getHeaderScrollAreaStyle();
    placeholderStyle.value = getPlaceholderStyle();
    updateFileItemLayout();
  });

  return {
    computedUseHeader,
    useHeaderFileClass,
    fileScrollAreaRef,
    headerScrollAreaRef,
    fileItemNameStyles,
    fileItemAppendStyles,
    fileItemAsideStyles,
    onScrollFile,
    onScrollHeader,
    headerScrollAreaStyle,
    placeholderStyle,
    fileScrollAreaContentsStyle,
    showUpdateBtn,
    updateBtnLabel,
    showUpdateAllBtn,
    updateAllBtnLabel,
    showRevertBtn,
    revertBtnLabel,
    showRevertAllBtn,
    revertAllBtnLabel,
    showRemoveBtn,
    removeBtnLabel,
    showRemoveAllBtn,
    removeAllBtnLabel,
    showUndeleteBtn,
    undeleteBtnLabel,
    showUndeleteAllBtn,
    undeleteAllBtnLabel,
    showDownloadBtn,
    downloadBtnLabel,
    showDownloadAllBtn,
    downloadAllBtnLabel,
    fileContainerMinHeight,
    fileContainerMaxHeight,
  };
};
