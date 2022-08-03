<template>
  <div
    class="kw-form-item"
    :class="itemClass"
    :style="{ 'max-width': colWidth }"
  >
    <div class="row">
      <span
        v-if="!noLabel"
        class="kw-form-title"
        :style="{ width: labelWidth }"
      >
        <slot name="label">{{ label }}
        </slot>
      </span>

      <slot />
    </div>
  </div>
</template>

<script>
import useFormType, { FORM_TYPE } from '../../composables/private/useFormType';
import useFormItem, { useFormItemProps } from '../../composables/private/useFormItem';

export default {
  name: 'KwSearchItem',

  props: {
    ...useFormItemProps,

    label: {
      type: String,
      default: undefined,
    },
    noLabel: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    useFormType(FORM_TYPE.SEARCH);

    return {
      ...useFormItem(),
    };
  },
};
</script>
