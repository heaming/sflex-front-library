<template>
  <q-field
    ref="inputRef"
    class="kw-option-group"
    v-bind="styleClassAttrs"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    no-error-icon
  >
    <template #control>
      <q-option-group
        v-model="value"
        v-bind="inheritedAttrs"
        :class="typeClass"
        :type="type"
        :options="normalizedOptions"
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
