import { klona as deepCopy } from 'klona/full';
import isEqual from 'fast-deep-equal/es6';
import useFieldState, { useFieldStateProps } from './useFieldState';
import { FormContextKey } from '../../consts/private/symbols';
import _validate from '../../validate';
import processWait from '../../utils/private/processWait';

export const useFieldProps = {
  ...useFieldStateProps,

  rules: {
    type: [String, Function, Object],
    default: undefined,
  },
  customMessages: {
    type: Object,
    default: undefined,
  },
  validateOnMount: {
    type: Boolean,
    default: false,
  },
  validateOnValueUpdate: {
    type: Boolean,
    default: true,
  },
  ignoreOnModified: {
    type: Boolean,
    default: false,
  },
  ignoreOnReset: {
    type: Boolean,
    default: false,
  },
};

const normalizeOptions = (options = {}) => ({
  bindValueRef: options.bindValueRef,
  bindValueKey: options.bindValueKey || 'modelValue',
  onUpdateValue: options.onUpdateValue,
});

export default (options) => {
  const {
    bindValueRef,
    bindValueKey,
    onUpdateValue,
  } = normalizeOptions(options);

  const { props, emit, proxy } = getCurrentInstance();

  const inputRef = ref();
  const bindValue = isRef(bindValueRef) ? bindValueRef : toRef(props, bindValueKey);

  const rules = toRef(props, 'rules');
  const customMessages = toRef(props, 'customMessages');

  const {
    values,
    registerField,
    unregisterField,
  } = inject(FormContextKey, {});

  const fieldState = useFieldState(
    deepCopy(bindValue.value) ?? '',
  );

  const {
    name,
    value,
    initialValue,
    pending,
    validated,
    setState,
  } = fieldState;

  async function setPending() {
    setState({ pending: true });
    await processWait();
  }

  async function resetValidation() {
    await setPending();

    setState({
      errors: [],
      pending: false,
      validated: false,
    });
  }

  async function validate() {
    const result = await _validate(value.value, rules.value, {
      name: name.value,
      values,
      customMessages: customMessages.value,
    });

    setState({
      errors: result.errors || [],
      validated: true,
    });

    return result.valid;
  }

  watch(rules, async () => {
    if (validated.value) {
      await validate();
    }
  }, { deep: true });

  watch(bindValue, (val) => {
    if (!isEqual(val, value.value)) {
      value.value = deepCopy(val) ?? '';
    }
  }, { deep: true });

  watch(value, (val) => {
    if (!isEqual(val, bindValue.value)) {
      if (onUpdateValue) {
        onUpdateValue(deepCopy(val));
      } else {
        emit(`update:${bindValueKey}`, deepCopy(val));
      }
    }
  }, { deep: true });

  let unwatchValueForValidate;
  function watchValueForValidate() {
    unwatchValueForValidate = watch(value, () => {
      if (props.validateOnValueUpdate) {
        validate();
      }
    }, { deep: true });
  }

  watchValueForValidate();

  async function init() {
    await setPending();

    setState({
      initialValue: deepCopy(value.value),
      errors: [],
      pending: false,
      validated: false,
    });
  }

  async function reset() {
    await setPending();
    unwatchValueForValidate?.();

    if (!props.ignoreOnReset) {
      value.value = deepCopy(initialValue.value);
      await nextTick();
    }

    setState({
      errors: [],
      pending: false,
      validated: false,
    });

    watchValueForValidate();
  }

  function isModified() {
    if (props.ignoreOnModified || pending.value) {
      return false;
    }

    return !isEqual(value.value, initialValue.value);
  }

  function focus() {
    if (proxy.focus === focus) {
      inputRef.value?.focus?.();
    } else {
      proxy.focus?.();
    }
  }

  function blur() {
    if (proxy.blur === blur) {
      inputRef.value?.blur?.();
    } else {
      proxy.blur?.();
    }
  }

  onMounted(() => {
    if (props.validateOnMount) {
      validate();
    }
  });

  const fieldCtx = {
    ...fieldState,
    inputRef,
    init,
    reset,
    resetValidation,
    validate,
    isModified,
    focus,
    blur,
  };

  registerField?.(fieldCtx);

  onBeforeUnmount(() => {
    unregisterField?.(fieldCtx);
  });

  return fieldCtx;
};
