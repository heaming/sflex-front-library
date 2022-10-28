export const useFileHeaderProps = {
  useHeader: { type: Boolean, default: false },
  scrollHorizontal: { type: Boolean, default: undefined },
  fileNameWidth: { type: String, default: undefined },
  asideWidth: { type: String, default: undefined },
};

export const useFileHeaderEmits = ['scroll:file', 'scroll:header'];

export default () => {
  const { props, emit, proxy } = getCurrentInstance();

  let ignoreSource;

  const fileScrollAreaRef = ref();
  const headerScrollAreaRef = ref();

  // eslint-disable-next-line no-unused-vars
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

    areaRef.value.setScrollPosition('horizontal', horizontalPosition);
  }

  const fileItemNameStyles = computed(() => {
    let styles = '';
    styles += props.fileNameWidth ? `min-width: ${props.fileNameWidth}; ` : '';
    return styles;
  });

  const fileItemAsideStyles = computed(() => {
    let styles = '';
    styles += props.asideWidth ? `min-width: ${props.asideWidth}; ` : '';
    return styles;
  });

  const onScrollFile = computed(() => (info) => {
    emit('scroll:file', info);
    if (props.useHeader && props.scrollHorizontal) {
      scroll('file', info.horizontalPosition);
    }
  });

  const onScrollHeader = computed(() => (props.useHeader ? (info) => {
    emit('scroll:header', info);
    if (props.scrollHorizontal) {
      scroll('header', info.horizontalPosition);
    }
  } : undefined));

  const useHeaderFileClass = computed(() => ({
    'kw-file--use-header': props.useHeader,
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
    if (!props.scrollHorizontal) {
      return 'width: 100%; ';
    }
    if (props.useHeader) {
      return 'padding-bottom: 10px; ';
    }
    return undefined;
  });

  onUpdated(() => {
    headerScrollAreaStyle.value = getHeaderScrollAreaStyle();
    placeholderStyle.value = getPlaceholderStyle();
  });

  onMounted(() => {
    headerScrollAreaStyle.value = getHeaderScrollAreaStyle();
    placeholderStyle.value = getPlaceholderStyle();
  });

  return {
    useHeaderFileClass,
    fileScrollAreaRef,
    headerScrollAreaRef,
    fileItemNameStyles,
    fileItemAsideStyles,
    onScrollFile,
    onScrollHeader,
    headerScrollAreaStyle,
    placeholderStyle,
    fileScrollAreaContentsStyle,
  };
};
