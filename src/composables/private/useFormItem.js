import { debounce } from 'lodash-es';
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
    default: undefined,
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
  const showLabel = computed(() => {
    if (props.noLabel !== undefined) {
      return !props.noLabel;
    }
    return labelSize.value && labelSize.value > 0;
  });
  const labelClass = computed(() => (props.required ? 'kw-form-item__label--required' : null));
  const labelStyle = computed(() => ({ width: `${labelSize.value}px` }));
  const fieldClass = computed(() => [alignContent.value && `kw-form-item__field--align-${alignContent.value}`]);
  const fieldStyle = computed(() => ({ width: `calc(100% - ${labelSize.value}px)` }));

  const showingHint = ref(false);
  async function doToggle() {
    showingHint.value = !showingHint.value;
  }

  const toggleHint = debounce(() => {
    doToggle();
  }, 0);

  return {
    itemClass,
    showLabel,
    labelClass,
    labelStyle,
    fieldClass,
    fieldStyle,
    toggleHint,
    showingHint,
  };
};
