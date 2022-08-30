export const useFieldStyleProps = {
  underline: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },

  // register props to ignore inheritAttrs
  filled: {
    type: Boolean,
    default: undefined,
  },
  outlined: {
    type: Boolean,
    default: undefined,
  },
  standout: {
    type: Boolean,
    default: undefined,
  },
};

export default () => {
  const { props } = getCurrentInstance();

  const styleType = computed(() => {
    if (props.underline) return { };
    if (props.borderless) return { borderless: true };
    return { outlined: true };
  });

  return {
    styleType,
  };
};
