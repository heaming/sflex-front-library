<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      toggle
    </h2>
    <p class="kw-guide-description">
      toggle
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="toggleProps"
        title="toggleProps"
      />
      <kw-separator />
      <kw-toggle
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <div class="flex items-center bg-lime-1 w500 h500">
        <kw-toggle
          v-model="model"
          v-bind="bindingProps"
        />
      </div>
      <kw-toggle
        v-model="model"
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useDenseProps } from '../../../../../src/composables/private/useDense';
import { useStretchProps } from '../../../../../src/composables/private/useStretch';

const toggleProps = {
  ...useDenseProps,
  ...useStretchProps,

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
    default: true,
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

const model = ref('Y');

const defaultCode = `
      <kw-toggle
        v-bind="bindingProps"
      />`;
</script>
