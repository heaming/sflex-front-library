import { FormLayoutContextKey } from '../../consts/private/symbols';
import { FIELD_ALIGNS } from './useFormLayout';

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
  alignContent: {
    type: String,
    default: undefined,
    validate: (v) => FIELD_ALIGNS.includes(v),
  },
};

export default () => {
  const { props } = getCurrentInstance();

  const injected = inject(FormLayoutContextKey, null);
  const labelSize = computed(() => injected?.labelSize.value);
  const alignContent = computed(() => props.alignContent ?? injected?.alignContent.value);

  const itemClass = computed(() => props.colspan > 1 && `kw-form-item--colspan-${props.colspan}`);
  const labelClass = computed(() => (props.required ? 'kw-form-item__label--required' : null));
  const labelWidth = computed(() => `${labelSize.value}px`);
  const fieldClass = computed(() => [alignContent.value && `kw-form-item__field--align-${alignContent.value}`]);
  const fieldWidth = computed(() => `calc(100% - ${labelSize.value}px)`);

  return {
    itemClass,
    labelClass,
    labelWidth,
    fieldClass,
    fieldWidth,
  };
};
