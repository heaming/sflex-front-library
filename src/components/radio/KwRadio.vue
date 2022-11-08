<template>
  <q-radio
    v-bind="styleClassAttrs"
    class="kw-radio spaced-sibling"
    :class="{'kw-radio--no-label': !(label || $slots.default)}"
    :model-value="modelValue"
    :val="val"
    :label="label ?? val?.toString()"
    :left-label="leftLabel"
    :size="size"
    :dense="isSearchContext || dense"
    :checked-icon="checkedIcon"
    :unchecked-icon="uncheckedIcon"
    :disable="disable"
    :tabindex="tabindex"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-radio>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useSearchChild from '../../composables/private/useSearchChild';
import useDense, { useDenseProps } from '../../composables/private/useDense';

export default {
  name: 'KwRadio',
  inheritAttrs: false,

  props: {
    ...useDenseProps,

    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
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

  setup() {
    const radioRef = ref();

    return {
      ...useInheritAttrs(),
      ...useSearchChild(),
      dense: useDense(),
      radioRef,
      set() {
        radioRef.value.set();
      },
    };
  },
};
</script>
