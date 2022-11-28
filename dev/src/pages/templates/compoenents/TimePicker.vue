<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      timePicker
    </h2>
    <p class="kw-guide-description">
      timePicker
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="timePickerProps"
        title="timePickerProps"
      />
      <kw-separator />
      <kw-timePicker
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-time-picker
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useFieldStyleProps } from '../../../../../src/composables/private/useFieldStyle';

const timePickerProps = {
  ...useFieldProps,
  ...useFieldStyleProps,

  modelValue: {
    type: String,
    default: undefined,
  },
  unmaskedValue: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '시간 입력',
  },
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-time-picker
        v-bind="bindingProps"
      />`;
</script>
