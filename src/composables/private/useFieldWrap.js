import useDense, { useDenseProps } from './useDense';
import { useStretchProps } from './useStretch';

export const useFieldWrapProps = {
  ...useDenseProps,
  ...useStretchProps,

  label: { type: String, default: undefined },
  hint: { type: String, default: undefined },
  required: { type: Boolean, default: undefined },
  controlClass: { type: [Object, Array, String], default: undefined },
  autoHeight: { type: Boolean, default: undefined },
  hideBottomSpace: { type: Boolean, default: undefined },
  stack: { type: Boolean, default: undefined },
};

export default (defaults = {}) => {
  const { props } = getCurrentInstance();

  const computedDense = useDense(defaults);

  const showingHint = ref(false);
  function toggleHint() {
    showingHint.value = !showingHint.value;
  }

  const fieldWrapProps = computed(() => ({
    grow: props.grow ?? defaults.grow,
    shrink: props.shrink ?? defaults.shrink,
    notFlexible: props.notFlexible ?? defaults.notFlexible,
    stretch: props.stretch ?? defaults.stretch,
    dense: computedDense.value,
    label: props.label ?? defaults.label,
    hint: props.hint ?? defaults.hint,
    required: props.required ?? defaults.required,
    controlClass: props.controlClass ?? defaults.controlClass,
    autoHeight: props.autoHeight ?? defaults.autoHeight,
    hideBottomSpace: props.hideBottomSpace ?? defaults.hideBottomSpace,
    stack: props.stack ?? defaults.stack,
  }));

  return {
    fieldWrapProps,
    showingHint,
    toggleHint,
  };
};
