<template>
  <q-radio
    v-bind="styleClassAttrs"
    class="kw-radio spaced-sibling"
    :class="{'kw-radio--no-label': !(label || $slots.default)}"
    :model-value="modelValue"
    :val="val"
    :label="label ?? val"
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
import { FormTypeContextKey } from '../../consts/private/symbols';
import { FORM_TYPE } from '../../composables/private/useFormType';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwRadio',
  inheritAttrs: false,

  props: {
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
    dense: {
      type: Boolean,
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
    const isSearchContext = inject(FormTypeContextKey, null) === FORM_TYPE.SEARCH;
    const radioRef = ref();

    return {
      ...useInheritAttrs(),
      isSearchContext,
      radioRef,
      set() {
        radioRef.value.set();
      },
    };
  },
};
</script>
