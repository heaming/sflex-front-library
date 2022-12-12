<template>
  <kw-field-wrap
    ref="inputRef"
    v-bind="{...styleClassAttrs, ...stretchProps}"
    :label="label"
    :error="invalid"
    :error-message="invalidMessage"
    @focus="$emit('focus')"
  >
    <q-btn-toggle
      v-model="value"
      :class="toggleClass"
      :style="toggleStyle"
      :options="styledOptions"
      toggle-color="not-use"
      toggle-text-color="not-use"
      color="not-use"
      text-color="not-use"
      :dense="buttonStyleProps.dense"
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
import useBtnStyle, { useBtnStyleProps } from '../../composables/private/useBtnStyle';
import useStretch from '../../composables/private/useStretch';

export default {
  name: 'KwBtnToggle',
  inheritAttrs: false,

  props: {
    // customize props
    ...useFieldProps,
    ...useOptionsProps,
    ...useBtnStyleProps,

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
    clearable: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'focus'],

  setup(props) {
    const { normalizedOptions } = useOptions();
    const { buttonClass, buttonStyles, buttonStyleProps } = useBtnStyle({
      color: 'bg-white',
      textColor: 'black3',
      borderColor: 'line-stroke',
      outlined: true,
      dense: true,
    });

    const toggleButtonClass = computed(() => {
      const classes = {
        ...buttonClass.value,
      };
      if (props.toggleColor) { classes[`kw-btn--toggle-color-${props.toggleColor}`] = true; }
      if (props.toggleTextColor) { classes[`kw-btn--toggle-text-color-${props.toggleTextColor}`] = true; }
      if (props.toggleBorderColor) { classes[`kw-btn--toggle-border-color-${props.toggleBorderColor}`] = true; }
      return classes;
    });

    const { stretchClass, stretchProps } = useStretch();

    const toggleClass = computed(() => {
      const classes = {
        'kw-btn-toggle': true,
        ...stretchClass.value,
      };
      if (props.gap) { classes['kw-btn-toggle--spaced'] = true; }
      return classes;
    });

    const toggleStyle = computed(() => {
      let styles = '';
      styles += props.gap ? `gap: ${props.gap}; ` : '';
      return styles;
    });

    const assignOptionStyle = (v) => ({
      ...v,
      class: toggleButtonClass.value,
      style: buttonStyles.value,
    });
    const styledOptions = computed(() => normalizedOptions.value.map(assignOptionStyle));

    return {
      ...useInheritAttrs(),
      ...useField(),
      stretchProps,
      styledOptions,
      buttonStyleProps,
      toggleClass,
      toggleStyle,
    };
  },
};
</script>
