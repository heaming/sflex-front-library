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

export default (useImportant) => {
  const { props } = getCurrentInstance();

  const computedFont = computed(() => {
    if (props.titleFont === true) return 'title';
    if (props.subtitleFont === true) return 'subtitle';
    if (props.bodyFont === true) return 'body';
    if (props.denseFont === true) return 'dense';
    if (props.captionFont === true) return 'caption';
    if (props.font) return props.font;
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
    if (props.lineHeight) { styles['line-height'] = useImportant ? `${props.lineHeight} !important` : props.lineHeight; }
    if (props.fontSize) { styles['font-size'] = useImportant ? `${props.fontSize} !important` : props.fontSize; }
    if (props.fontWeight) { styles['font-weight'] = useImportant ? `${props.fontWeight} !important` : props.fontWeight; }
    if (props.letterSpacing) { styles['letter-spacing'] = useImportant ? `${props.letterSpacing} !important` : props.letterSpacing; }
    return styles;
  });

  return {
    fontClass,
    fontStyle,
  };
};
