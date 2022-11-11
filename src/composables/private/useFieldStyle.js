import { platform } from '../../plugins/platform';
import useDense, { useDenseProps } from './useDense';

export const useFieldStyleProps = {
  ...useDenseProps,
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
  const { props } = getCurrentInstance();

  const computedDense = useDense();

  return computed(() => {
    const fieldProps = {
      hideBottomSpace: true,
      dense: computedDense.value,
    };
    if (!platform.is.mobile) {
      fieldProps.outlined = true;
      fieldProps.hideBottomSpace = false;
    }
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
};
