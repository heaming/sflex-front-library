<template>
  <q-select
    ref="inputRef"
    :model-value="value"
    class="kw-select"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    :options="filteredOptions"
    :multiple="multiple"
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
    <template
      v-if="multiple"
      #before-options
    >
      <q-item
        clickable
        @click="toggleAll"
      >
        <q-item-section side>
          <q-checkbox
            :model-value="selectedAll"
            @update:model-value="toggleAll"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ $t('MSG_TXT_ALL', null, '전체') }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>
    <template #option="{ itemProps, opt, selected, toggleOption }">
      <q-item
        :active="selected"
        v-bind="itemProps"
      >
        <q-item-section
          v-if="multiple"
          side
        >
          <q-checkbox
            :model-value="selected"
            @update:model-value="toggleOption(opt)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ opt.label }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator v-if="opt.seperator" />
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
    multiple: {
      type: Boolean,
      default: false,
    },
    emitValue: {
      type: Boolean,
      default: true,
    },
    useInput: {
      type: Boolean,
      default: false,
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

    const optionsCtx = useOptions(value, props.emitValue);
    const { normalizedOptions } = optionsCtx;
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
      ...optionsCtx,
      filteredOptions,
      filter,
      onBlur,
    };
  },
};
</script>
