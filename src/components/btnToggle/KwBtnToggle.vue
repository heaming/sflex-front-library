<template>
  <q-field
    ref="inputRef"
    class="kw-btn-toggle"
    v-bind="styleClassAttrs"
    :label="undefined"
    :error="invalid"
    :error-message="invalidMessage"
    no-error-icon
    borderless
  >
    <template #control>
      <q-btn-toggle
        v-model="value"
        v-bind="inheritedAttrs"
        class="kw-btn"
        :options="normalizedOptions"
      />
    </template>
  </q-field>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';

export default {
  name: 'KwBtnToggle',

  props: {
    ...useFieldProps,
    ...useOptionsProps,

    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup() {
    return {
      ...useInheritAttrs(),
      ...useField(),
      ...useOptions(),
    };
  },
};
</script>
