<template>
  <q-select
    ref="inputRef"
    :model-value="value"
    class="kw-select"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    :options="filteredOptions"
    :emit-value="emitValue"
    :map-options="emitValue"
    :use-input="useInput"
    :input-debounce="100"
    no-error-icon
    @update:model-value="onUpdateValue"
    @filter="filter"
    @blur="onBlur"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          {{ $t('MSG_TXT_NO_RESULT', null, '검색된 항목이 없습니다.') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';

export default {
  name: 'KwSelect',

  props: {
    ...useFieldProps,
    ...useOptionsProps,

    modelValue: {
      type: [String, Number, Array],
      default: undefined,
    },
    emitValue: {
      type: Boolean,
      default: true,
    },
    useInput: {
      type: Boolean,
      default: true,
    },
    onFilter: {
      type: Function,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    const fieldCtx = useField();
    const { value } = fieldCtx;

    function onUpdateValue(val) {
      value.value = val ?? '';
    }

    const { normalizedOptions } = useOptions();
    const filteredOptions = ref([...normalizedOptions.value]);

    watch(normalizedOptions, (val) => {
      filteredOptions.value = val;
    }, { deep: true });

    function defaultFilter(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        filteredOptions.value = normalizedOptions.value
          .filter((v) => !val || v.label.toLowerCase().indexOf(needle) > -1);
      });
    }

    const filter = computed(() => props.onFilter || defaultFilter);

    function onBlur() {
      filter.value('', (cb) => cb());
    }

    return {
      ...fieldCtx,
      onUpdateValue,
      filteredOptions,
      filter,
      onBlur,
    };
  },
};
</script>
