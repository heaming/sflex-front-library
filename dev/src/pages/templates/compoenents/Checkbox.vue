<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Checkbox
    </h2>
    <p class="kw-guide-description">
      Checkbox
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="checkboxProps"
        title="checkboxProps"
      />
      <kw-separator />
      <kw-checkbox
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-checkbox
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useDenseProps } from '../../../../../src/composables/private/useDense';

const checkboxProps = {
  ...useDenseProps,

  modelValue: {
    type: [String, Number, Boolean, Array],
    default: undefined,
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: 'Y',
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: 'N',
  },
  indeterminateValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  toggleOrder: {
    type: String,
    default: undefined,
  },
  toggleIndeterminate: {
    type: Boolean,
    default: false,
  },
  val: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
  leftLabel: {
    type: Boolean,
    default: undefined,
  },
  size: {
    type: String,
    default: undefined,
  },
  checkedIcon: {
    type: String,
    default: undefined,
  },
  uncheckedIcon: {
    type: String,
    default: undefined,
  },
  indeterminateIcon: {
    type: String,
    default: undefined,
  },
  disable: {
    type: Boolean,
    default: undefined,
  },
  tabindex: {
    type: [String, Number],
    default: undefined,
  },
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-checkbox
        v-bind="bindingProps"
      />`;
</script>
