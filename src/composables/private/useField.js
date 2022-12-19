import { klona as deepCopy } from 'klona/full';
import isEqual from 'fast-deep-equal/es6';
import { debounce } from 'lodash-es';
import useFieldState, { useFieldStateProps } from './useFieldState';
import { FormContextKey } from '../../consts/private/symbols';
import _validate from '../../validate';
import { timeout } from '../../utils/private/tick';

export const useFieldProps = {
  ...useFieldStateProps,

  rules: {
    type: [String, Array, Function, Object],
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
  onChange: {
    type: Function,
    default: undefined,
  },
};

export default (options = {}) => {
  const { props, emit, proxy } = getCurrentInstance();
  const {
    bindValueRef,
    bindValueKey = 'modelValue',
    onUpdateValue = (val) => emit(`update:${bindValueKey}`, val),
    onChangeValue = (val) => props.onChange?.(val),
  } = options;

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
    deepCopy(bindValue.value),
  );

  const {
    name,
    value,
    initialValue,
    pending,
    validated,
    setState,
  } = fieldState;

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

  const debounceValidate = debounce(validate, 0);

  watch(rules, () => {
    if (validated.value) {
      debounceValidate();
    }
  }, { deep: true });

  watch(bindValue, (val) => {
    if (!isEqual(val, value.value)) {
      value.value = deepCopy(val);
    }
  }, { deep: true });

  watch(value, (val) => {
    if (!isEqual(val, bindValue.value)) {
      val = deepCopy(val);
      onUpdateValue(val);
    }

    if (!pending.value) {
      onChangeValue(val);
    }
  }, { deep: true });

  let unwatchValueForValidate;
  function watchValueForValidate() {
    unwatchValueForValidate = watch(value, () => {
      if (props.validateOnValueUpdate) {
        debounceValidate();
      }
    }, { deep: true });
  }

  watchValueForValidate();

  async function setPending() {
    setState({ pending: true });
    await timeout();
    debounceValidate.cancel();
  }

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

    value.value = deepCopy(initialValue.value);
    await nextTick();

    setState({
      errors: [],
      pending: false,
      validated: false,
    });

    watchValueForValidate();
  }

  async function resetValidation() {
    await setPending();

    setState({
      errors: [],
      pending: false,
      validated: false,
    });
  }

  function isModified() {
    if (pending.value) {
      return false;
    }

    return !isEqual(
      value.value ?? '',
      initialValue.value ?? '',
    );
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

  const el = computed(() => proxy.$el);
  const fieldCtx = {
    el,
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
