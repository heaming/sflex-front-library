<template>
  <kw-field-wrap
    ref="inputRef"
    v-bind="stretchProps"
    :label="label"
    :required="required"
    :control-class="controlClass"
    :auto-height="autoHeight"
    :hide-bottom-space="hideBottomSpace"
    :error="invalid"
    :error-message="invalidMessage"
    @focus="$emit('focus')"
  >
    <slot
      :field="fieldBinding"
      :invalid="invalid"
    />

    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label" />
    </template>
  </kw-field-wrap>
</template>

<script>
import useField, { useFieldProps } from '../../composables/private/useField';
import useStretch, { useStretchProps } from '../../composables/private/useStretch';

export default {
  name: 'KwField',

  props: {
    ...useFieldProps,
    ...useStretchProps,

    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    fieldKey: { type: String, default: 'modelValue' },
    controlClass: { type: [Object, Array, String], default: undefined },
    autoHeight: { type: Boolean, default: true },
    hideBottomSpace: { type: Boolean, default: undefined },
  },

  emits: [
    'update:modelValue',
    'focus',
  ],

  setup(props, { attrs }) {
    const fieldCtx = useField();
    const { value } = fieldCtx;

    const fieldBinding = ref({
      [props.fieldKey]: value,
      [`onUpdate:${props.fieldKey}`](e) { value.value = e; },
    });

    const required = computed(() => {
      if (attrs.required) {
        return true;
      }
      if (props.rules) {
        if (typeof props.rules === 'string') {
          return props.rules.includes('required');
        }
        if (Array.isArray(props.rules)) {
          return props.rules.includes('required');
        }
        if (typeof props.rules === 'object') {
          return !!props.rules.required;
        }
      }
    });

    return {
      ...useStretch(),
      ...fieldCtx,
      fieldBinding,
      required,
    };
  },
};
</script>
