export const useStretchProps = {
  grow: { type: Boolean, default: undefined },
  stretch: { type: Boolean, default: undefined },
};

export default () => {
  const { props } = getCurrentInstance();

  const stretchClasses = computed(() => ({
    grow: props.grow,
    'self-stretch': props.stretch,
  }));

  return {
    stretchClasses,
  };
};
