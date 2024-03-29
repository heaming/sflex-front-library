<template>
  <q-field
    ref="inputRef"
    :class="optionGroupClass"
    v-bind="{...styleClassAttrs, ...fieldStyleProps}"
    :label="$g.platform.is.mobile ? label : undefined"
    :dense="isSearchContext || dense"
    :error="invalid"
    no-error-icon
    borderless
  >
    <template #control>
      <q-option-group
        :model-value="value ?? ''"
        :class="`kw-option-group__control`"
        :options="normalizedOptions"
        :type="type"
        :dense="isSearchContext || dense"
        :disable="disable"
        :left-label="itemLeftLabel"
        inline
        @update:model-value="value = $event"
      />
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      {{ invalidMessage }}
      <kw-tooltip
        anchor="center middle"
        :offset="[0, 3]"
        show-when-ellipsised
      >
        {{ invalidMessage }}
      </kw-tooltip>
    </template>
  </q-field>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useSearchChild from '../../composables/private/useSearchChild';
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';

export default {
  name: 'KwOptionGroup',
  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,
    ...useOptionsProps,

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
    vertical: {
      type: Boolean,
      default: undefined,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props) {
    const { fieldClass, fieldStyleProps } = useFieldStyle({ borderless: true });

    const optionGroupClass = computed(() => ({
      ...fieldClass.value,
      'kw-option-group': true,
      [`kw-option-group--${props.type}`]: true,
      'kw-option-group--vertical': props.vertical,
    }));

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
      fieldStyleProps,
      optionGroupClass,
      itemLeftLabel,
    };
  },
};
</script>
