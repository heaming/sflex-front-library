<template>
  <q-toggle
    ref="toggleRef"
    v-bind="styleClassAttrs"
    :class="toggleClass"
    :model-value="modelValue"
    :true-value="computedTrueValue"
    :false-value="computedFalseValue"
    :indeterminate-value="computedIndeterminateValue"
    :toggle-order="toggleOrder"
    :toggle-indeterminate="toggleIndeterminate"
    :val="val"
    :label="label"
    :left-label="leftLabel"
    :size="size"
    :dense="isSearchContext || dense"
    :checked-icon="checkedIcon"
    :unchecked-icon="uncheckedIcon"
    :indeterminate-icon="indeterminateIcon"
    :disable="disable"
    :tabindex="tabindex"
    :icon="icon"
    :icon-color="iconColor"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-toggle>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useSearchChild from '../../composables/private/useSearchChild';
import useDense, { useDenseProps } from '../../composables/private/useDense';
import useStretch, { useStretchProps } from '../../composables/private/useStretch';

const DEFAULT_VALUE = {
  TRUE: 'Y',
  FALSE: 'N',
  INDETERMINATE: undefined,
};

export default {
  name: 'KwToggle',
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
      default: undefined,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: undefined,
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
    multiline: {
      type: Boolean,
      default: undefined,
    },
    removeSpacedSibling: {
      type: Boolean,
      default: undefined,
    },
    booleanValue: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconColor: {
      type: String,
      default: undefined,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { slots }) {
    const toggleRef = ref();

    const { stretchClass } = useStretch();

    const toggleClass = computed(() => ({
      'kw-toggle': true,
      'kw-toggle--no-label': !(props.label || slots.default),
      'kw-toggle--multiline': props.multiline,
      'spaced-sibling': !(props.removeSpacedSibling),
      ...stretchClass.value,
    }));

    const computedTrueValue = computed(() => {
      if (props.trueValue !== undefined) { return props.trueValue; }
      if (props.booleanValue) { return true; }
      return DEFAULT_VALUE.TRUE;
    });

    const computedFalseValue = computed(() => {
      if (props.falseValue !== undefined) { return props.falseValue; }
      if (props.booleanValue) { return false; }
      return DEFAULT_VALUE.FALSE;
    });

    const computedIndeterminateValue = computed(() => {
      if (props.indeterminateValue !== undefined) { return props.indeterminateValue; }
      if (props.booleanValue) { return undefined; }
      return DEFAULT_VALUE.INDETERMINATE;
    });

    return {
      ...useInheritAttrs(),
      ...useSearchChild(),
      dense: useDense(),
      toggleRef,
      toggle() {
        toggleRef.value.toggle();
      },
      toggleClass,
      computedTrueValue,
      computedFalseValue,
      computedIndeterminateValue,
    };
  },
};
</script>
