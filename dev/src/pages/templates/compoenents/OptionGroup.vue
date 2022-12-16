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
      <div class="flex w700">
        <kw-optionGroup
          v-model="model"
          v-bind="bindingProps"
          class="shrink"
        />
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <div class="flex w300">
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
};

const model = ref(1);
const bindingProps = ref({
  options: ['test test test', 'somewhere over the rainbow', 'how can i handle it!'],
});

const defaultCode = `
      <kw-optionGroup
        v-bind="bindingProps"
      />`;
</script>
