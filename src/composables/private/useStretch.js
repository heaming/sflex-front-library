export const useStretchProps = {
  grow: { type: Boolean, default: undefined },
  overflow: { type: Boolean, default: undefined },
  stretch: { type: Boolean, default: undefined },
};

export default () => {
  const { props } = getCurrentInstance();

  const stretchClasses = computed(() => ({
    grow: props.grow,
    'shrink-off': props.overflow,
    'self-stretch': props.stretch,
  }));

  return {
    stretchClasses,
  };
};
