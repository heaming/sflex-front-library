<template>
  <kw-field-wrap
    ref="inputRef"
    v-bind="fieldWrapProps"
    :required="computedRequired"
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
import useFieldWrap, { useFieldWrapProps } from '../../composables/private/useFieldWrap';

export default {
  name: 'KwField',

  props: {
    ...useFieldProps,
    ...useFieldWrapProps,
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    fieldKey: { type: String, default: 'modelValue' },
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

    const { fieldWrapProps } = useFieldWrap({ autoHeight: true });

    const computedRequired = computed(() => {
      if (fieldWrapProps.value.required) {
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
      ...fieldCtx,
      fieldBinding,
      fieldWrapProps,
      computedRequired,
    };
  },
};
</script>
