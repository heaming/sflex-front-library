<template>
  <kw-field-wrap
    ref="inputRef"
    :error="invalid"
    :error-message="invalidMessage"
    @focus="$emit('focus')"
  >
    <slot
      :field="fieldBinding"
      :invalid="invalid"
    />
  </kw-field-wrap>
</template>

<script>
import useField, { useFieldProps } from '../../composables/private/useField';

export default {
  name: 'KwField',

  props: {
    ...useFieldProps,

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
      ...fieldCtx,
      fieldBinding,
    };
  },
};
</script>
