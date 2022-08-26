<template>
  <div
    class="kw-form-item"
    :class="itemClass"
    :style="{'max-width': itemWidth}"
  >
    <div
      v-if="!noLabel"
      class="kw-form-item__label"
      :style="{width: labelWidth}"
    >
      <slot name="label">
        <span>{{ label }}</span>
      </slot>

      <span
        v-if="hintMessage"
        class="kw-form-item__hint"
      >
        <kw-tooltip>
          <slot name="hint">{{ hintMessage }}</slot>
        </kw-tooltip>
      </span>
    </div>
    <div class="kw-form-item__field">
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
  },

  setup() {
    useFormType(FORM_TYPE.SEARCH);

    return {
      ...useFormItem(),
    };
  },
};
</script>
