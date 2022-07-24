export const useFieldStateProps = {
  name: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
};

export default (val) => {
  const { props, uid } = getCurrentInstance();

  const name = computed(() => props.label || props.name);
  const valueKey = computed(() => props.name || uid);
  const value = ref(val);
  const initialValue = ref(val);

  const pending = ref(false);
  const validated = ref(false);

  const errors = ref([]);
  const error = computed(() => !pending.value && validated.value && !!errors.value.length);
  const errorMessage = computed(() => (error.value ? errors.value[0] : null));

  function setState(options = {}) {
    if ('initialValue' in options) {
      initialValue.value = options.initialValue;
    }

    if ('errors' in options) {
      errors.value = options.errors;
    }

    if ('pending' in options) {
      pending.value = options.pending;
    }

    if ('validated' in options) {
      validated.value = options.validated;
    }
  }

  return {
    uid,
    name,
    valueKey,
    value,
    initialValue,
    errors,
    pending,
    validated,
    error,
    errorMessage,
    setState,
  };
};
