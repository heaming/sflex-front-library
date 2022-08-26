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
  hintMessage: {
    type: String,
    default: undefined,
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const { cols, labelSize } = inject(FormItemContextKey);

  const itemClass = computed(() => (props.required ? 'essential' : null));
  const itemWidth = computed(() => `${(100 / cols.value).toFixed(1) * props.colspan}%`);
  const labelWidth = computed(() => `${labelSize.value}px`);

  return {
    itemClass,
    itemWidth,
    labelWidth,
  };
};
