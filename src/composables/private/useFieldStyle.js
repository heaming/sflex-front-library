import useSearchChild from './useSearchChild';

export const useFieldStyleProps = {
  dense: {
    type: Boolean,
    default: false,
  },
  underline: {
    type: Boolean,
    default: false,
  },
  borderless: {
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

  const design = computed(() => {
    if (props.underline) return { };
    if (props.borderless) return { borderless: true };
    return { outlined: true };
  });

  const { isSearchContext } = useSearchChild();
  const fieldStyles = computed(() => ({
    ...design.value,
    dense: isSearchContext || props.dense,
  }));

  return fieldStyles;
};
