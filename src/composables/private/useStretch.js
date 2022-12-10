export const useStretchProps = {
  grow: { type: Boolean, default: undefined },
  shrink: { type: Boolean, default: undefined },
  notFlexible: { type: Boolean, default: undefined },
  stretch: { type: Boolean, default: undefined },
};

export default (defaults = {}) => {
  const { props } = getCurrentInstance();

  const stretchClass = computed(() => ({
    grow: props.grow ?? defaults.grow,
    shrink: props.shrink ?? defaults.shrink,
    'shrink-off': props.notFlexible ?? defaults.notFlexible,
    'grow-off': props.notFlexible ?? defaults.notFlexible,
    'self-stretch': props.stretch ?? defaults.stretch,
  }));
  const stretchProps = computed(() => ({
    grow: props.grow,
    shrink: props.shrink,
    notFlexible: props.notFlexible,
    stretch: props.stretch,
  }));

  return {
    stretchClass,
    stretchProps,
  };
};
