<template>
  <div
    class="kw-form-item"
    :style="{'max-width': itemWidth}"
  >
    <div
      v-if="!noLabel"
      class="kw-form-item__label kw-label-content"
      :class="labelClass"
      :style="{width: labelWidth}"
    >
      <slot name="label">
        <span class="kw-label-content__label">
          {{ label }}
        </span>
      </slot>

      <div
        v-if="hint"
        class="kw-label-content__hint"
      >
        <q-icon
          size="16px"
          name="info_16"
        >
          <kw-tooltip>
            <slot name="hint">
              {{ hint }}
            </slot>
          </kw-tooltip>
        </q-icon>
      </div>
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
  name: 'KwFormItem',

  props: {
    ...useFormItemProps,

    label: {
      type: String,
      default: undefined,
    },
  },

  setup() {
    useFormType(FORM_TYPE.FORM);

    return {
      ...useFormItem(),
    };
  },
};
</script>
