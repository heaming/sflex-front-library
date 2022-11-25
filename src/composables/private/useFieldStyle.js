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

export default () => {
  const { props, attrs } = getCurrentInstance();

  const computedDense = useDense();

  const { stretchClass } = useStretch();

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
    'kw-field--required': required.value,
    ...stretchClass.value,
  }));

  const fieldStyleProps = computed(() => {
    const fieldProps = {
      dense: computedDense.value,
      hideBottomSpace: props.hideBottomSpace ?? platform.is.mobile,
      outlined: !platform.is.mobile,
    };
    if (props.underline === true) {
      fieldProps.outlined = false;
      fieldProps.borderless = false;
    }
    if (props.borderless === true) {
      fieldProps.outlined = false;
      fieldProps.borderless = true;
    }
    if (props.outlined === true) {
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
