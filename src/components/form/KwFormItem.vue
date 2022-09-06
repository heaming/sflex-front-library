<template>
  <div
    class="kw-form-item"
    :class="colspan > 1 && `kw-form-item--colspan-${colspan}`"
  >
    <div
      v-if="!noLabel"
      class="kw-form-item__label"
      :class="labelClass"
      :style="{width: labelWidth}"
    >
      <div class="kw-label-content">
        <slot name="label">
          <span class="kw-label-content__label">
            {{ label }}
          </span>
        </slot>
        <span
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
        </span>
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
