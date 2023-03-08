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
        :props="optionGroupProps"
        title="optionGroupProps"
      />
      <kw-separator />
      <q-option-group
        :model-value="model"
        :options="options"
        inline
      />
      <div class="w1200 h300 bg-green flex">
        <q-option-group
          :model-value="model"
          :options="options"
        />
      </div>
      <div class="w1200 h300 bg-green flex">
        <kw-option-group
          v-model="model"
          v-bind="bindingProps"
        />
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <div class="w300 h300 bg-green flex">
        <kw-optionGroup
          v-model="model"
          v-bind="bindingProps"
        />
      </div>
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useOptionsProps } from '../../../../../src/composables/private/useOptions';
import { useDenseProps } from '../../../../../src/composables/private/useDense';

const optionGroupProps = {
  ...useFieldProps,
  ...useOptionsProps,
  ...useDenseProps,
  type: {
    type: String,
    default: 'radio',
  },
  disable: {
    type: Boolean,
    default: false,
  },
  leftLabel: {
    type: Boolean,
    default: undefined,
  },
  vertical: {
    type: Boolean,
    default: undefined,
  },
};

const model = ref('test test test');
const options = ['test test test', 'somewhere over the rainbow', 'how can i handle it!'].map((s) => ({ label: s, value: s, disable: s === 'somewhere over the rainbow' }));
const bindingProps = ref({
  optionValue: 'value',
  optionLabel: 'label',
  options,
});

const defaultCode = `
      <kw-optionGroup
        v-bind="bindingProps"
      />`;
</script>
