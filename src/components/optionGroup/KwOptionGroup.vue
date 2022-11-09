<template>
  <q-field
    ref="inputRef"
    class="kw-option-group kw-field"
    v-bind="styleClassAttrs"
    :label="undefined"
    :dense="isSearchContext || dense"
    :error="invalid"
    no-error-icon
    borderless
  >
    <template #control>
      <q-option-group
        v-model="value"
        :class="`kw-${type}`"
        :options="normalizedOptions"
        :type="type"
        :dense="isSearchContext || dense"
        :disable="disable"
        :left-label="itemLeftLabel"
        inline
      />
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      <div>
        {{ invalidMessage }}
        <kw-tooltip
          anchor="center middle"
          show-when-ellipsised
        >
          {{ invalidMessage }}
        </kw-tooltip>
      </div>
    </template>
  </q-field>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useSearchChild from '../../composables/private/useSearchChild';
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';
import useDense, { useDenseProps } from '../../composables/private/useDense';

export default {
  name: 'KwOptionGroup',
  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useOptionsProps,
    ...useDenseProps,

    modelValue: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },
    type: {
      type: String,
      default: 'radio',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    leftLabel: {
      type: Boolean,
      default: undefined,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props) {
    const itemLeftLabel = computed(() => {
      if (typeof props.leftLabel === 'boolean') {
        return props.leftLabel;
      }
      return props.type === 'toggle';
    });

    return {
      ...useInheritAttrs(),
      ...useSearchChild(),
      ...useField(),
      ...useOptions(),
      dense: useDense(),
      itemLeftLabel,
    };
  },
};
</script>
