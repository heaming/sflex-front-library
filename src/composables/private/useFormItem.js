import { FormItemContextKey } from '../../consts/private/symbols';

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
  const { cols, labelSize } = inject(FormItemContextKey);

  const itemWidth = computed(() => `${(100 / cols.value).toFixed(1) * props.colspan}%`);
  const labelClass = computed(() => (props.required ? 'kw-form-item__label--required' : null));
  const labelWidth = computed(() => `${labelSize.value}px`);

  return {
    itemWidth,
    labelClass,
    labelWidth,
  };
};
