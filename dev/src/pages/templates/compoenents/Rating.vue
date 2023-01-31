<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Rating
    </h2>
    <p class="kw-guide-description">
      Rating
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps1"
        :props="ratingProps"
        title="ratingProps"
      />
      <guide-props
        v-model="bindingProps2"
        :props="fieldProps"
        title="fieldProps"
      />
      <kw-separator />
      <kw-rating
        ref="testRef"
        v-model="model"
        v-bind="bindingProps"
        :rules="functionalRule"
        :tooltip="['bad', 'so so', 'good', 'brilliant', 'no way']"
      />
      <kw-btn
        lable="test"
        @click="test"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';

const ratingProps = {
  size: { type: String, required: undefined },
  max: { type: [String, Number], default: 5 },
  icon: { type: [String, Array], default: 'bookmark_off' },
  iconHalf: { type: [String, Array], default: undefined },
  iconSelected: { type: [String, Array], default: 'bookmark_on' },
  color: { type: [String, Array], default: undefined },
  colorHalf: { type: [String, Array], default: undefined },
  colorSelected: { type: [String, Array], default: undefined },
  noReset: { type: Boolean, default: undefined },
  noDimming: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  disable: { type: Boolean, default: undefined },
};

const fieldProps = useFieldProps;

const model = ref(3);

const bindingProps1 = ref({
  label: 'label',
  icon: 'bookmark_off',
});
const bindingProps2 = ref();
const bindingProps = computed(() => ({
  ...bindingProps1.value,
  ...bindingProps2.value,
}));

const testRef = ref();

const test = () => {
  testRef.value.validate();
};

const functionalRule = (value) => value > 1;
</script>
