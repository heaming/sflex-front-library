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
          v-if="hint"
          class="kw-label-content__hint"
        >
          <q-icon
            size="16px"
            name="info"
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
import { platform } from '../../plugins/platform';

export default {
  name: 'KwSearchItem',

  props: {
    ...useFormItemProps,

    label: {
      type: String,
      default: undefined,
    },
  },

  setup(props) {
    useFormType(FORM_TYPE.SEARCH);

    const formItemCtx = useFormItem();

    if (platform.is.mobile && props.noLabel === undefined) {
      formItemCtx.showLabel = false;
    }

    return {
      ...formItemCtx,
    };
  },
};
</script>
