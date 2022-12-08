<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Radio
    </h2>
    <p class="kw-guide-description">
      Radio
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="radioProps"
        title="radioProps"
      />
      <kw-separator />
      <div class="flex items-center bg-lime-1 w500 h500">
        <kw-radio
          v-model="model"
          val="1"
          label="1"
        />
        <kw-radio
          v-model="model"
          val="2"
          label="2"
        />
        <kw-radio
          v-model="model"
          val="3"
          label="3"
        />
        <kw-radio
          v-model="model"
          val="4"
          label="4"
        />
      </div>
      {{ model }}
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-radio
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useDenseProps } from '../../../../../src/composables/private/useDense';
import { useStretchProps } from '../../../../../src/composables/private/useStretch';

const radioProps = {
  ...useDenseProps,
  ...useStretchProps,

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
  disable: {
    type: Boolean,
    default: undefined,
  },
  tabindex: {
    type: [String, Number],
    default: undefined,
  },
};

const bindingProps = ref({
  val: 'Y',
});

const model = ref();

const defaultCode = `
      <kw-radio
        v-bind="bindingProps"
      />`;
</script>
