export const useBtnStyleProps = {
  // we will not use quasar btn props, since design break em based styling.
  dense: { type: Boolean, default: undefined },
  padding: { type: String, default: undefined },
  minWidth: { type: String, default: undefined },

  // design on quasar unelevated style.
  filled: { type: Boolean, default: false },
  underline: { type: Boolean, default: false },
  borderless: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },

  // color props
  color: { type: String, default: undefined }, // this one should be solid color.
  textColor: { type: String, default: undefined }, // this one should be solid color.
  borderColor: { type: String, default: undefined }, // this one should be solid color.
  // glossy: { type: Boolean, default: false }, // about background tweak. we will not use.

  // presets for color and design
  preset: { type: String, default: '' },
  primary: { type: Boolean, default: false },
  negative: { type: Boolean, default: false },
  secondary: { type: Boolean, default: false },
  gridAction: { type: Boolean, default: false },
};

const availablePresets = {
  primary: {
    color: 'primary',
    textColor: 'bg-white',
    borderColor: undefined,
    filled: true,
  },
  negative: {
    color: 'black3',
    textColor: 'bg-white',
    borderColor: undefined,
    filled: true,
  },
  gridAction: {
    color: 'bg-box',
    textColor: 'black2',
    borderColor: 'line-line',
    outlined: true,
    dense: true,
  },
  secondary: {
    color: 'bg-white',
    textColor: 'normal-text',
    borderColor: 'black-btn-line',
    outlined: true,
  },
};

const designDefaultColors = {
  filled: {
    color: 'bg-white',
    textColor: 'normal-text',
  },
  outlined: {
    color: 'bg-white',
    textColor: 'normal-text',
    borderColor: 'black-btn-line',
  },
};

export default (defaultPreset) => {
  const { props, slots } = getCurrentInstance();

  const stylePreset = computed(() => {
    let preset = availablePresets[props.preset] ?? defaultPreset ?? {};
    if (props.primary === true) { preset = availablePresets.primary; }
    if (props.negative === true) { preset = availablePresets.negative; }
    if (props.secondary === true) { preset = availablePresets.secondary; }
    if (props.gridAction === true) { preset = availablePresets.gridAction; }
    return preset;
  });

  const design = computed(() => {
    if (props.borderless === true) return 'borderless'; // no border, no hover, active, background : transparent
    if (props.underline === true) return 'underline'; // no hover, active, border bottom = textColor
    if (props.filled === true) return 'filled'; // no border
    if (props.outlined === true) return 'outlined'; // border = textColor
    if (stylePreset.value.borderless === true) return 'borderless'; // preset
    if (stylePreset.value.underline === true) return 'underline'; // preset
    if (stylePreset.value.filled === true) return 'filled'; // preset
    if (stylePreset.value.outlined === true) return 'outlined'; // preset
    return 'outlined'; // no border
  });

  const buttonColor = computed(() => props.color
    || stylePreset.value.color
    || designDefaultColors[design.value]?.color);
  const buttonTextColor = computed(() => props.textColor
    || stylePreset.value.textColor
    || designDefaultColors[design.value]?.textColor);
  const buttonBorderColor = computed(() => props.borderColor
    || stylePreset.value.borderColor
    || designDefaultColors[design.value]?.borderColor);

  const buttonClasses = computed(() => {
    let classes = '';

    if (design.value) {
      classes += `kw-btn--${design.value} `;
    }

    if (buttonColor.value) {
      classes += `kw-btn--color-${buttonColor.value} `;
    }

    if (buttonTextColor.value) {
      classes += `kw-btn--text-color-${buttonTextColor.value} `;
    }

    if (buttonBorderColor.value) {
      classes += `kw-btn--border-color-${buttonBorderColor.value} `;
    }

    if ((props.icon || props.iconRight) && !props.label && !slots.default) {
      classes += 'kw-btn--icon-only ';
    }

    return classes;
  });

  const buttonStyles = computed(() => {
    let styles = '';
    styles += props.padding ? `padding-left: ${props.padding}; padding-right: ${props.padding} ` : '';
    styles += props.minWidth ? `min-width: ${props.minWidth}; ` : '';
    return styles;
  });

  const buttonDense = computed(() => props.dense ?? stylePreset.value.dense);

  return {
    buttonClasses,
    buttonStyles,
    buttonDense,
  };
};
