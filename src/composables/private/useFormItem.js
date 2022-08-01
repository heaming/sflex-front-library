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
};

export default () => {
  const { props } = getCurrentInstance();
  const { cols, labelSize } = inject(FormItemContextKey);

  const itemClass = computed(() => (props.required ? 'essential' : null));
  const colWidth = computed(() => `${(100 / cols.value).toFixed(1) * props.colspan}%`);
  const labelWidth = computed(() => (typeof labelSize.value === 'number' ? `${labelSize.value}px` : labelSize.value));

  return {
    itemClass,
    colWidth,
    labelWidth,
  };
};
