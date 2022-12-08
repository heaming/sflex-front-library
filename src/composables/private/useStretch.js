export const useStretchProps = {
  grow: { type: Boolean, default: undefined },
  shrink: { type: Boolean, default: undefined },
  notFlexible: { type: Boolean, default: undefined },
  stretch: { type: Boolean, default: undefined },
};

export default () => {
  const { props } = getCurrentInstance();

  const stretchClass = computed(() => ({
    grow: props.grow,
    shrink: props.shrink,
    'shrink-off': props.notFlexible,
    'grow-off': props.notFlexible,
    'self-stretch': props.stretch,
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
