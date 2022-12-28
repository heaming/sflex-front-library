import useDense, { useDenseProps } from './useDense';
import { useStretchProps } from './useStretch';

export const useFieldWrapProps = {
  ...useDenseProps,
  ...useStretchProps,

  label: { type: String, default: undefined },
  required: { type: Boolean, default: undefined },
  controlClass: { type: [Object, Array, String], default: undefined },
  autoHeight: { type: Boolean, default: undefined },
  hideBottomSpace: { type: Boolean, default: undefined },
};

export default (defaults = {}) => {
  const { props } = getCurrentInstance();

  const computedDense = useDense(defaults);

  const fieldWrapProps = computed(() => ({
    grow: props.grow ?? defaults.grow,
    shrink: props.shrink ?? defaults.shrink,
    notFlexible: props.notFlexible ?? defaults.notFlexible,
    stretch: props.stretch ?? defaults.stretch,
    dense: computedDense.value,
    label: props.label ?? defaults.label,
    required: props.required ?? defaults.required,
    controlClass: props.controlClass ?? defaults.controlClass,
    autoHeight: props.autoHeight ?? defaults.autoHeight,
    hideBottomSpace: props.hideBottomSpace ?? defaults.hideBottomSpace,
  }));

  return {
    fieldWrapProps,
  };
};
