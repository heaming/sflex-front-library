import { platform } from '../../plugins/platform';
import useDense, { useDenseProps } from './useDense';
import useStretch, { useStretchProps } from './useStretch';

export const useFieldStyleProps = {
  ...useDenseProps,
  ...useStretchProps,

  hideBottomSpace: {
    type: Boolean,
    default: undefined,
  },
  underline: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
};

export default (defaults = {}) => {
  const { props, attrs } = getCurrentInstance();

  const computedDense = useDense(defaults);

  const { stretchClass } = useStretch(defaults);

  const required = computed(() => {
    if (props.required || attrs.required) {
      return true;
    }
    if (props.rules) {
      if (typeof props.rules === 'string') {
        return props.rules.includes('required');
      }
      if (Array.isArray(props.rules)) {
        return props.rules.includes('required');
      }
      if (typeof props.rules === 'object') {
        return !!props.rules.required;
      }
    }
  });

  const fieldClass = computed(() => ({
    'kw-field': true,
    'kw-field--required': required.value,
    ...stretchClass.value,
  }));

  const fieldDesign = computed(() => {
    if (props.underline === true) { return 'underline'; }
    if (props.borderless === true) { return 'borderless'; }
    if (props.outlined === true) { return 'outlined'; }
    if (defaults.underline === true) { return 'underline'; }
    if (defaults.borderless === true) { return 'borderless'; }
    if (defaults.outlined === true) { return 'outlined'; }
    return platform.is.mobile ? 'underline' : 'outlined';
  });

  const fieldStyleProps = computed(() => {
    const fieldProps = {
      dense: computedDense.value,
      hideBottomSpace: props.hideBottomSpace ?? defaults.hideBottomSpace ?? platform.is.mobile,
    };
    if (fieldDesign.value === 'underline') {
      fieldProps.outlined = false;
      fieldProps.borderless = false;
    }
    if (fieldDesign.value === 'borderless') {
      fieldProps.outlined = false;
      fieldProps.borderless = true;
    }
    if (fieldDesign.value === 'outlined') {
      fieldProps.outlined = true;
      fieldProps.borderless = false;
    }
    return fieldProps;
  });

  return {
    fieldStyleProps,
    fieldClass,
  };
};
