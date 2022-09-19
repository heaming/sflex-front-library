import { FormLayoutContextKey } from '../../consts/private/symbols';

const supportedFieldAlign = ['right', 'center'];

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
    validate: (val) => !supportedFieldAlign.find(val),
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const { labelSize } = inject(FormLayoutContextKey);

  const labelClass = computed(() => (props.required ? 'kw-form-item__label--required' : null));
  const labelWidth = computed(() => `${labelSize.value}px`);
  const fieldClass = computed(() => {
    if (props.alignContent) return `kw-form-item__field--align-${props.alignContent} `;
    return '';
  });

  return {
    labelClass,
    labelWidth,
    fieldClass,
  };
};
