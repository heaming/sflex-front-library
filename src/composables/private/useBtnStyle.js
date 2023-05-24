import useDense, { useDenseProps } from './useDense';
import useStretch, { useStretchProps } from './useStretch';

export const useBtnStyleProps = {
  ...useDenseProps,
  ...useStretchProps,

  // we will not use quasar btn props, since design break em based styling.
  padding: { type: String, default: undefined },
  minWidth: { type: String, default: undefined },

  // design on quasar unelevated style.
  filled: { type: Boolean, default: false },
  underline: { type: Boolean, default: false },
  borderless: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  rounded: { type: [Boolean, String], default: false },

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
    color: 'bg-white',
    textColor: 'black2',
    borderColor: 'line-stroke',
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

export default (defaults = {}) => {
  const { props, slots } = getCurrentInstance();

  const computedProps = computed(() => ({
    preset: props.preset ?? defaults.preset,
    primary: props.primary ?? defaults.primary,
    negative: props.negative ?? defaults.negative,
    secondary: props.secondary ?? defaults.secondary,
    gridAction: props.gridAction ?? defaults.gridAction,
    color: props.color ?? defaults.color,
    textColor: props.textColor ?? defaults.textColor,
    borderColor: props.borderColor ?? defaults.borderColor,
    filled: props.filled ?? defaults.filled,
    underline: props.underline ?? defaults.underline,
    borderless: props.borderless ?? defaults.borderless,
    outlined: props.outlined ?? defaults.outlined,
    round: props.round ?? defaults.round,
    rounded: props.rounded ?? defaults.rounded,
    padding: props.padding ?? defaults.padding,
    minWidth: props.minWidth ?? defaults.minWidth,
  }));

  const stylePreset = computed(() => {
    let preset = availablePresets[computedProps.value.preset] ?? {};
    if (computedProps.value.primary === true) { preset = availablePresets.primary; }
    if (computedProps.value.negative === true) { preset = availablePresets.negative; }
    if (computedProps.value.secondary === true) { preset = availablePresets.secondary; }
    if (computedProps.value.gridAction === true) { preset = availablePresets.gridAction; }
    return preset;
  });

  const design = computed(() => {
    if (computedProps.value.borderless === true) return 'borderless'; // no border, no hover, active, background : transparent
    if (computedProps.value.underline === true) return 'underline'; // no hover, active, border bottom = textColor
    if (computedProps.value.filled === true) return 'filled'; // no border
    if (computedProps.value.outlined === true) return 'outlined'; // border = textColor
    if (stylePreset.value.borderless === true) return 'borderless'; // preset
    if (stylePreset.value.underline === true) return 'underline'; // preset
    if (stylePreset.value.filled === true) return 'filled'; // preset
    if (stylePreset.value.outlined === true) return 'outlined'; // preset
    return 'outlined'; // no border
  });

  const buttonColor = computed(() => computedProps.value.color
    || stylePreset.value.color
    || designDefaultColors[design.value]?.color);
  const buttonTextColor = computed(() => computedProps.value.textColor
    || stylePreset.value.textColor
    || designDefaultColors[design.value]?.textColor);
  const buttonBorderColor = computed(() => computedProps.value.borderColor
    || stylePreset.value.borderColor
    || designDefaultColors[design.value]?.borderColor);

  const { stretchClass } = useStretch(defaults);

  const iconOnly = computed(() => (props.icon || props.iconRight) && !props.label && !slots.default);

  const borderStyle = computed(() => {
    if (design.value === 'borderless' || design.value === 'underline') { return; }
    if (computedProps.value.round === true) return 'round';
    if (computedProps.value.rounded === true) return 'rounded';
    if (stylePreset.value.round === true) return 'round';
    if (stylePreset.value.rounded === true) return 'rounded';
    return 'square';
  });

  const buttonClass = computed(() => {
    const classes = {
      ...stretchClass.value,
      'kw-btn': true,
    };
    if (design.value) { classes[`kw-btn--${design.value}`] = true; }
    if (buttonColor.value) { classes[`kw-btn--color-${buttonColor.value}`] = true; }
    if (buttonTextColor.value) { classes[`kw-btn--text-color-${buttonTextColor.value}`] = true; }
    if (buttonBorderColor.value) { classes[`kw-btn--border-color-${buttonBorderColor.value}`] = true; }
    if (iconOnly.value) { classes['kw-btn--icon-only'] = true; }
    if (borderStyle.value) { classes[`kw-btn--${borderStyle.value}`] = true; }
    return classes;
  });

  const buttonStyles = computed(() => {
    const styles = {};
    if (computedProps.value.padding) {
      styles['padding-left'] = computedProps.value.padding;
      styles['padding-right'] = computedProps.value.padding;
    }
    if (computedProps.value.minWidth) { styles['min-width'] = computedProps.value.minWidth; }
    if (computedProps.value.rounded && typeof computedProps.value.rounded === 'string') {
      styles['border-radius'] = computedProps.value.rounded;
    }
    return styles;
  });

  const computedDense = useDense(defaults);
  const buttonStyleProps = computed(() => ({
    dense: computedDense.value ?? stylePreset.value.dense ?? defaults.dense,
  }));

  return {
    buttonClass,
    buttonStyles,
    buttonStyleProps,
  };
};
