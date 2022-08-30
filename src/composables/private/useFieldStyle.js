import { FormTypeContextKey } from '../../consts/private/symbols';
import { FORM_TYPE } from './useFormType';

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
  const isSearchContext = inject(FormTypeContextKey, null) === FORM_TYPE.SEARCH;

  const design = computed(() => {
    if (props.underline) return { };
    if (props.borderless) return { borderless: true };
    return { outlined: true };
  });
  const dense = computed(() => ({ dense: isSearchContext || props.dense }));

  const fieldStyles = computed(() => ({
    ...design.value,
    ...dense.value,
  }));

  return fieldStyles;
};
