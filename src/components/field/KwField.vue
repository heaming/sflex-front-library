<template>
  <kw-field-wrap
    ref="inputRef"
    v-bind="stretchProps"
    :label="label"
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

    modelValue: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },
    fieldKey: {
      type: String,
      default: 'modelValue',
    },
  },

  emits: [
    'update:modelValue',
    'focus',
  ],

  setup(props) {
    const fieldCtx = useField();
    const { value } = fieldCtx;

    const fieldBinding = ref({
      [props.fieldKey]: value,
      [`onUpdate:${props.fieldKey}`](e) { value.value = e; },
    });

    return {
      ...useStretch(),
      ...fieldCtx,
      fieldBinding,
    };
  },
};
</script>
