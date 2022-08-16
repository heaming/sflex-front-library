<template>
  <q-field
    ref="inputRef"
    class="kw-field"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    no-error-icon
    @focus="$emit('focus')"
  >
    <template #control>
      <slot :field="fieldBinding" />
    </template>
  </q-field>
</template>

<script>
import useField, { useFieldProps } from '../../composables/private/useField';

export default {
  name: 'KwField',
  inheritAttrs: false,

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

  emits: ['update:modelValue', 'focus'],

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
