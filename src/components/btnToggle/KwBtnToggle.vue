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
      :disable="disable"
      :stack="stack"
      :no-wrap="noWrap"
      :stretch="stretch"
      :clearable="clearable"
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
    // customize props
    ...useFieldProps,
    ...useOptionsProps,
    ...useButtonStyleProps,

    toggleColor: { type: String, default: 'bg-white' },
    toggleTextColor: { type: String, default: 'primary' },
    toggleBorderColor: { type: String, default: 'primary' },

    gap: { type: String, default: '4px' },

    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },

    // fall through props
    disable: { type: Boolean, default: false },
    stack: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'focus'],

  setup(props) {
    const { normalizedOptions } = useOptions();
    const { buttonClasses, buttonStyles, buttonDense } = useButtonStyle({
      color: 'bg-white',
      textColor: 'black3',
      borderColor: 'line-stroke',
      outlined: true,
      dense: true,
    });

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
