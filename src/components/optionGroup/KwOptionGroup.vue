<template>
  <q-field
    ref="inputRef"
    class="kw-option-group kw-field"
    v-bind="styleClassAttrs"
    :label="$q.platform.is.desktop ? undefined : label"
    :dense="dense"
    :error="invalid"
    :error-message="invalidMessage"
    no-error-icon
    borderless
  >
    <template #control>
      <q-option-group
        v-model="value"
        :class="`kw-${type}`"
        :options="normalizedOptions"
        :type="type"
        :left-label="type === 'toggle' ? leftLabel !== false : leftLabel"
        :dense="dense"
        inline
      />
    </template>
  </q-field>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';

export default {
  name: 'KwOptionGroup',
  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useOptionsProps,

    modelValue: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },
    type: {
      type: String,
      default: 'radio',
    },
    leftLabel: {
      type: Boolean,
      default: undefined,
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup() {
    return {
      ...useInheritAttrs(),
      ...useField(),
      ...useOptions(),
    };
  },
};
</script>
