<template>
  <div
    class="kw-form-item"
    :class="itemClass"
  >
    <div
      v-if="showLabel"
      class="kw-form-item__label"
      :class="labelClass"
      :style="labelStyle"
    >
      <div class="kw-label-content">
        <slot name="label">
          <span class="kw-label-content__label">
            {{ label }}
          </span>
        </slot>
        <span
          v-if="hint || $slots.hint"
          class="kw-label-content__hint"
        >
          <q-icon
            size="16px"
            name="info"
          >
            <kw-tooltip :offset="[0, 3]">
              <!-- eslint-disable vue/no-v-html -->
              <slot
                name="hint"
              >
                <div v-html="sanitize(hint)" />
              </slot>
              <!-- eslint-enable vue/no-v-html -->
            </kw-tooltip>
          </q-icon>
        </span>
      </div>
    </div>
    <div
      class="kw-form-item__field"
      :class="fieldClass"
      :style="fieldStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import useFormType, { FORM_TYPE } from '../../composables/private/useFormType';
import useFormItem, { useFormItemProps } from '../../composables/private/useFormItem';
import { sanitize } from '../../plugins/sanitize';

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
      sanitize,
    };
  },
};
</script>
