<!-- eslint-disable vue/no-v-html -->
<template>
  <q-select
    ref="inputRef"
    :model-value="value"
    v-bind="{...styleClassAttrs, ...fieldStyles}"
    class="kw-field kw-select"
    popup-content-class="kw-select-options-menu"
    :label="undefined"
    :error="invalid"
    :options="normalizedOptions"
    :option-value="optionValue"
    :option-label="optionLabel"
    :multiple="multiple"
    :emit-value="emitValue"
    :map-options="emitValue"
    :use-input="useInput"
    :hide-selected="useInput"
    :input-debounce="inputDebounce"
    :disable="disable"
    :readonly="readonly"
    :prefix="prefix"
    :suffix="suffix"
    :color="color"
    :bg-color="bgColor"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :tabindex="tabindex"
    :clearable="clearable"
    no-error-icon
    dropdown-icon="arrow_down_16"
    clear-icon="none"
    @focus="onFocus"
    @blur="onBlur"
    @clear="onClear"
    @keydown="onKeydown"
    @filter="onFilter"
    @update:model-value="onUpdateValue"
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

    <!-- selected (override slots) -->
    <template
      v-if="placeholder && !isOptionSelected()"
      #selected
    >
      <span
        key="placeholder"
        class="kw-select__placeholder"
      >{{ placeholder }}</span>
    </template>

    <!--before-options -->
    <template
      v-if="multiple && !useInput"
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

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      <div>
        {{ invalidMessage }}
        <kw-tooltip
          anchor="center middle"
          show-when-ellipsised
        >
          {{ invalidMessage }}
        </kw-tooltip>
      </div>
    </template>
  </q-select>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';

export default {
  name: 'KwSelect',
  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,
    ...useOptionsProps,

    modelValue: { type: [String, Number, Array, Object], default: undefined },

    // fall through props
    multiple: { type: Boolean, default: false },
    emitValue: { type: Boolean, default: true },
    useInput: { type: Boolean, default: false },
    inputDebounce: { type: [Number, String], default: 100 },
    disable: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    prefix: { type: String, default: undefined },
    suffix: { type: String, default: undefined },
    clearable: { type: Boolean, default: false },
    color: { type: String, default: undefined },
    bgColor: { type: String, default: undefined },
    autofocus: { type: Boolean, default: false },
    placeholder: { type: String, default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    onFocus: { type: Function, default: undefined },
    onBlur: { type: Function, default: undefined },
    onClear: { type: Function, default: undefined },
    onKeydown: { type: Function, default: undefined },
    onFilter: { type: Function, default: undefined },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props) {
    const fieldStyles = useFieldStyle();
    const fieldCtx = useField();
    const { value } = fieldCtx;

    const optionsCtx = useOptions({
      valueRef: value,
      emitValue: props.emitValue,
      value: props.optionValue,
      label: props.optionLabel,
      separator: props.optionSeparator,
    });
    const { normalizedOptions } = optionsCtx;

    function onUpdateValue(val) {
      if (props.multiple) {
        value.value = val ?? [];
      } else {
        value.value = val ?? '';
      }
    }

    function getOptionIndex(val) {
      return normalizedOptions.value.findIndex((v) => v[props.optionValue] === val);
    }

    function getOption(val) {
      const index = getOptionIndex(val);
      if (index > -1) return normalizedOptions.value[index];
    }

    function isOptionSelected() {
      if (Array.isArray(value.value)) {
        return value.value.length > 0;
      }

      return getOptionIndex(props.emitValue
        ? value.value : value.value?.[props.optionValue]) > -1;
    }

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      ...optionsCtx,
      fieldStyles,
      onUpdateValue,
      getOptionIndex,
      getOption,
      isOptionSelected,
    };
  },
};
</script>
