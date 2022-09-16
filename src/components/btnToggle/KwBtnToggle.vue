<template>
  <kw-field-wrap
    ref="inputRef"
    v-bind="styleClassAttrs"
    :error="invalid"
    :error-message="invalidMessage"
    @focus="$emit('focus')"
  >
    <q-btn-toggle
      v-model="value"
      v-bind="inheritedAttrs"
      :class="toggleClass"
      :style="toggleStyle"
      :options="options"
      toggle-color="not-use"
      toggle-text-color="not-use"
      color="not-use"
      text-color="not-use"
      :dense="buttonDense"
      no-caps
      unelevated
      rectangle
      :ripple="false"
    />
  </kw-field-wrap>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';
import useButtonStyle, { useButtonStyleProps } from '../../composables/private/useButtonStyle';

export default {
  name: 'KwBtnToggle',

  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useOptionsProps,
    ...useButtonStyleProps,

    toggleColor: { type: String, default: undefined },
    toggleTextColor: { type: String, default: undefined },
    toggleBorderColor: { type: String, default: undefined },

    gap: { type: String, default: undefined },

    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
  },

  emits: ['update:modelValue', 'focus'],

  setup(props) {
    const { normalizedOptions } = useOptions();
    const { buttonClasses, buttonStyles, buttonDense } = useButtonStyle();

    const toggleButtonClasses = computed(() => {
      let classes = 'kw-btn ';
      classes += buttonClasses.value || '';
      if (props.toggleColor) {
        classes += `kw-btn--toggle-color-${props.toggleColor} `;
      }
      if (props.toggleTextColor) {
        classes += `kw-btn--toggle-text-color-${props.toggleTextColor} `;
      }
      if (props.toggleBorderColor) {
        classes += `kw-btn--toggle-border-color-${props.toggleBorderColor} `;
      }
      return classes;
    });

    const toggleClass = computed(() => {
      let classes = 'kw-btn-toggle ';
      if (props.gap) { classes += 'kw-btn-toggle--spaced '; }
      return classes;
    });

    const toggleStyle = computed(() => {
      let styles = '';
      styles += props.gap ? `gap: ${props.gap}; ` : '';
      return styles;
    });

    return {
      options: normalizedOptions.value.map((i) => ({ ...i,
        class: toggleButtonClasses.value,
        style: buttonStyles.value })),
      buttonDense,
      toggleClass,
      toggleStyle,
      ...useInheritAttrs(),
      ...useField(),
    };
  },
};
</script>
