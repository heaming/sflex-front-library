export const useStretchProps = {
  grow: { type: Boolean, default: undefined },
  shrink: { type: Boolean, default: undefined },
  overflow: { type: Boolean, default: undefined },
  stretch: { type: Boolean, default: undefined },
};

export default () => {
  const { props } = getCurrentInstance();

  const stretchClass = computed(() => ({
    grow: props.grow,
    shrink: props.shrink,
    'shrink-off': props.overflow,
    'self-stretch': props.stretch,
  }));

  return {
    stretchClass,
  };
};
