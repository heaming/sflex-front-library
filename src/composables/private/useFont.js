export const useFontProps = {
  font: { type: String, default: undefined },

  titleFont: { type: Boolean, default: false },
  subtitleFont: { type: Boolean, default: false },
  bodyFont: { type: Boolean, default: false },
  denseFont: { type: Boolean, default: false },
  captionFont: { type: Boolean, default: false },

  // color props
  lineHeight: { type: String, default: undefined },
  fontSize: { type: String, default: undefined },
  fontWeight: { type: String, default: undefined },
  letterSpacing: { type: String, default: undefined },
};

export default (useImportant, defaults = {}) => {
  const { props } = getCurrentInstance();

  const computedProps = computed(() => ({
    font: props.font ?? defaults.font,
    titleFont: props.titleFont ?? defaults.titleFont,
    subtitleFont: props.subtitleFont ?? defaults.subtitleFont,
    bodyFont: props.bodyFont ?? defaults.bodyFont,
    denseFont: props.denseFont ?? defaults.denseFont,
    captionFont: props.captionFont ?? defaults.captionFont,
    lineHeight: props.lineHeight ?? defaults.lineHeight,
    fontSize: props.fontSize ?? defaults.fontSize,
    fontWeight: props.fontWeight ?? defaults.fontWeight,
    letterSpacing: props.letterSpacing ?? defaults.letterSpacing,
  }));

  const computedFont = computed(() => {
    if (computedProps.value.titleFont === true) return 'title';
    if (computedProps.value.subtitleFont === true) return 'subtitle';
    if (computedProps.value.bodyFont === true) return 'body';
    if (computedProps.value.denseFont === true) return 'dense';
    if (computedProps.value.captionFont === true) return 'caption';
    if (computedProps.value.font) return props.font;
    return 'body';
  });

  const fontClass = computed(() => {
    const classes = {};
    if (computedFont.value && useImportant) { classes[`kw-font-${computedFont.value}`] = true; }
    if (computedFont.value && !useImportant) { classes[`text-${computedFont.value}`] = true; }
    return classes;
  });

  const fontStyle = computed(() => {
    const styles = {};
    if (computedProps.value.lineHeight) { styles['line-height'] = useImportant ? `${props.lineHeight} !important` : props.lineHeight; }
    if (computedProps.value.fontSize) { styles['font-size'] = useImportant ? `${props.fontSize} !important` : props.fontSize; }
    if (computedProps.value.fontWeight) { styles['font-weight'] = useImportant ? `${props.fontWeight} !important` : props.fontWeight; }
    if (computedProps.value.letterSpacing) { styles['letter-spacing'] = useImportant ? `${props.letterSpacing} !important` : props.letterSpacing; }
    return styles;
  });

  return {
    fontClass,
    fontStyle,
  };
};
