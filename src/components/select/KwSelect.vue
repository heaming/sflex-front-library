<!-- eslint-disable vue/no-v-html -->
<template>
  <q-select
    ref="inputRef"
    :model-value="value"
    v-bind="fieldStyles"
    class="kw-field kw-select"
    popup-content-class="kw-select-options-menu"
    :label="undefined"
    :error="invalid"
    :error-message="invalidMessage"
    :options="filteredOptions"
    :option-value="optionValue"
    :option-label="optionLabel"
    :multiple="multiple"
    :emit-value="emitValue"
    :map-options="emitValue"
    :use-input="useInput"
    :input-debounce="100"
    dropdown-icon="arrow_down_16"
    no-error-icon
    @update:model-value="onUpdateValue"
    @filter="filter"
    @blur="onBlur"
  >
    <!-- no-option (override slots) -->
    <template
      v-if="useInput || $slots['no-option']"
      #no-option="slotProps"
    >
      <slot
        v-if="$slots['no-option']"
        name="no-option"
        v-bind="slotProps"
      />
      <q-item v-else>
        <q-item-section class="text-italic text-grey">
          {{ $t('MSG_TXT_NO_RESULT', null, '검색된 항목이 없습니다.') }}
        </q-item-section>
      </q-item>
    </template>

    <!-- selected-item (override slots) -->
    <template
      v-if="$slots['selected-item']"
      #selected-item="slotProps"
    >
      <slot
        name="selected-item"
        v-bind="slotProps"
      />
    </template>

    <!--before-options -->
    <template
      v-if="multiple"
      #before-options
    >
      <q-item
        clickable
        @click="toggleAll"
      >
        <q-item-section side>
          <kw-checkbox
            class="kw-checkbox"
            :model-value="selectedAll"
            :true-value="true"
            :false-value="false"
            dense
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

    <!-- options -->
    <template #option="{ itemProps, opt, selected, toggleOption }">
      <q-item
        :active="selected"
        v-bind="itemProps"
      >
        <q-item-section
          v-if="multiple"
          side
        >
          <kw-checkbox
            class="kw-checkbox"
            :model-value="selected"
            dense
            :true-value="true"
            :false-value="false"
            @update:model-value="toggleOption(opt)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ opt[optionLabel] }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator v-if="opt[optionSeparator]" />
    </template>
  </q-select>
</template>

<script>
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';

export default {
  name: 'KwSelect',

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,
    ...useOptionsProps,

    modelValue: {
      type: [String, Number, Array, Object],
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

    const optionsCtx = useOptions({
      valueRef: value,
      emitValue: props.emitValue,
      value: props.optionValue,
      label: props.optionLabel,
      separator: props.optionSeparator,
    });
    const { normalizedOptions } = optionsCtx;
    const filteredOptions = ref([...normalizedOptions.value]);

    watch(normalizedOptions, (val) => {
      filteredOptions.value = val;
    }, { deep: true });

    function defaultFilter(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        filteredOptions.value = normalizedOptions.value
          .filter((v) => !val || v[props.optionLabel].toLowerCase().indexOf(needle) > -1);
      });
    }

    const filter = computed(() => props.onFilter || defaultFilter);

    function onBlur() {
      filter.value('', (cb) => cb());
    }

    const fieldStyles = useFieldStyle();

    return {
      ...fieldCtx,
      fieldStyles,
      onUpdateValue,
      ...optionsCtx,
      filteredOptions,
      filter,
      onBlur,
    };
  },
};
</script>
