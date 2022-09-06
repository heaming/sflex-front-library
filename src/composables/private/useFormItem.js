import { FormLayoutContextKey } from '../../consts/private/symbols';

export const useFormItemProps = {
  required: {
    type: Boolean,
    default: false,
  },
  colspan: {
    type: Number,
    default: 1,
  },
  noLabel: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: undefined,
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const { labelSize } = inject(FormLayoutContextKey);

  const labelClass = computed(() => (props.required ? 'kw-form-item__label--required' : null));
  const labelWidth = computed(() => `${labelSize.value}px`);

  return {
    labelClass,
    labelWidth,
  };
};
