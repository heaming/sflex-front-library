export const useFileHeaderProps = {
  useHeader: { type: Boolean, default: false },
  scrollHorizontal: { type: Boolean, default: false },
  fileNameWidth: { type: String, default: undefined },
  asideWidth: { type: String, default: undefined },
};

export const useFileHeaderEmits = ['scroll:file', 'scroll:header'];

export default () => {
  const { props, emit, vnode } = getCurrentInstance();

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
    const componentRootEl = vnode.el;
    if (!componentRootEl) {
      return undefined;
    }
    let left = 0;
    if (componentRootEl.querySelector('.q-field__before')) {
      left += componentRootEl.querySelector('.q-field__before').getBoundingClientRect().width;
    }
    if (componentRootEl.querySelector('.q-field__prepend')) {
      left += componentRootEl.querySelector('.q-field__prepend').getBoundingClientRect().width;
    }
    let right = 0;
    if (componentRootEl.querySelector('.q-field__append')) {
      right += componentRootEl.querySelector('.q-field__append').getBoundingClientRect().width;
    }
    if (componentRootEl.querySelector('.q-field__after')) {
      right += componentRootEl.querySelector('.q-field__after').getBoundingClientRect().width;
    }
    // const width = fileScrollAreaRef.value && fileScrollAreaRef.value.$el.getBoundingClientRect().width;
    // width: width ?? `${width}px`,
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
      return 'margin-bottom: 10px; ';
    }
    return undefined;
  });

  onUpdated(() => {
    headerScrollAreaStyle.value = getHeaderScrollAreaStyle();
  });

  onMounted(() => {
    headerScrollAreaStyle.value = getHeaderScrollAreaStyle();
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
    fileScrollAreaContentsStyle,
  };
};
