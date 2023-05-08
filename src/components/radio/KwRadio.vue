<template>
  <q-radio
    ref="radioRef"
    v-bind="styleClassAttrs"
    :class="radioClass"
    :model-value="modelValue"
    :val="val"
    :label="label"
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
import useStretch, { useStretchProps } from '../../composables/private/useStretch';

export default {
  name: 'KwRadio',
  inheritAttrs: false,

  props: {
    ...useDenseProps,
    ...useStretchProps,

    modelValue: {
      type: [String, Number, Boolean, Object],
      default: undefined,
    },
    val: {
      type: [String, Number, Boolean, Object],
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
    multiline: {
      type: Boolean,
      default: undefined,
    },
    removeSpacedSibling: {
      type: Boolean,
      default: undefined,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props, { slots, expose }) {
    const radioRef = ref();

    const { stretchClass } = useStretch();

    const defaultIsTooltip = computed(() => slots.default?.()[0]?.type?.name === 'KwTooltip');
    const radioClass = computed(() => ({
      'kw-radio': true,
      'kw-radio--no-label': !(props.label || (slots.default && !defaultIsTooltip.value)),
      'kw-radio--multiline': props.multiline,
      'spaced-sibling': !(props.removeSpacedSibling),
      ...stretchClass.value,
    }));

    function set() {
      radioRef.value?.set();
    }

    expose({ set });

    return {
      ...useInheritAttrs(),
      ...useSearchChild(),
      dense: useDense(),
      radioRef,
      set,
      radioClass,
    };
  },
};
</script>
