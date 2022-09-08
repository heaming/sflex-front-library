<template>
  <q-field
    ref="inputRef"
    class="kw-option-group kw-field"
    v-bind="styleClassAttrs"
    :label="$q.platform.is.desktop ? undefined : label"
    :error="invalid"
    :error-message="invalidMessage"
    no-error-icon
    borderless
    :dense="dense"
  >
    <template #control>
      <q-option-group
        v-model="value"
        v-bind="inheritedAttrs"
        :class="typeClass"
        :type="type"
        :options="normalizedOptions"
        inline
        :dense="dense"
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
    dense: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    const typeClass = computed(() => `kw-${props.type}`);

    return {
      ...useInheritAttrs(),
      ...useField(),
      ...useOptions(),
      typeClass,
    };
  },
};
</script>
