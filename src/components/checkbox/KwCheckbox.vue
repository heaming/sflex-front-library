<template>
  <q-checkbox
    ref="checkRef"
    v-bind="styleClassAttrs"
    class="kw-checkbox spaced-sibling"
    :class="checkboxClass"
    :model-value="modelValue"
    :true-value="trueValue"
    :false-value="falseValue"
    :indeterminate-value="indeterminateValue"
    :toggle-order="toggleOrder"
    :toggle-indeterminate="toggleIndeterminate"
    :val="val"
    :label="label ?? val?.toString()"
    :left-label="leftLabel"
    :size="size"
    :dense="dense"
    :checked-icon="checkedIcon"
    :unchecked-icon="uncheckedIcon"
    :indeterminate-icon="indeterminateIcon"
    :disable="disable"
    :tabindex="tabindex"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-checkbox>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useSearchChild from '../../composables/private/useSearchChild';
import useDense, { useDenseProps } from '../../composables/private/useDense';
import useStretch, { useStretchProps } from '../../composables/private/useStretch';

export default {
  name: 'KwCheckbox',
  inheritAttrs: false,

  props: {
    ...useDenseProps,
    ...useStretchProps,

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
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { slots }) {
    const checkRef = ref();

    const { stretchClass } = useStretch();

    const checkboxClass = computed(() => ({
      'kw-checkbox--no-label': !(props.label || slots.default),
      ...stretchClass.value,
    }));

    return {
      ...useInheritAttrs(),
      ...useSearchChild(),
      dense: useDense(),
      checkRef,
      checkboxClass,
      toggle() {
        checkRef.value.toggle();
      },
    };
  },
};
</script>
