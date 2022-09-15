<template>
  <q-btn
    v-if="!isDestroyed"
    ref="btnRef"
    v-bind="styleClassAttrs"
    class="kw-btn"
    :class="buttonClasses"
    :style="buttonStyles"
    no-caps
    unelevated
    rectangle
    :ripple="false"
    :type="type"
    :label="label"
    :icon="icon"
    :icon-right="iconRight"
    :dense="buttonDense"
    :tabindex="tabindex"
    :align="align"
    :stretch="stretch"
    :loading="loading"
    :disable="disable"
    :no-wrap="noWrap"
    @click="$emit('click', $event)"
  >
    <slot />
  </q-btn>
</template>

<script>
import usePermissions from '../../composables/private/usePermissions';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

const availablePresets = {
  primary: {
    color: 'primary',
    textColor: 'bg-white',
    borderColor: undefined,
  },
  negative: {
    color: 'black3',
    textColor: 'bg-white',
    borderColor: undefined,
  },
  gridAction: {
    color: 'bg-box',
    textColor: 'black2',
    borderColor: 'line-line',
    outlined: true,
    dense: true,
  },
  secondary: {
    color: 'bg-white',
    textColor: 'normal-text',
    borderColor: 'black-btn-line',
    outlined: true,
  },
};

export default {
  name: 'KwBtn',
  inheritAttrs: false,
  props: {
    type: { type: String, default: 'button' },
    label: { type: [Number, String], default: undefined },
    icon: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    loading: { type: Boolean, default: null },
    disable: { type: Boolean, default: false },

    // presets for sizing.
    // we will not use quasar btn props, since design break em based styling.
    dense: { type: Boolean, default: undefined },
    padding: { type: String, default: undefined },

    // design on quasar unelevated style.
    underline: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    outlined: { type: [Boolean, String], default: false },

    // color props
    color: { type: String, default: undefined }, // this one should be solid color.
    textColor: { type: String, default: undefined }, // this one should be solid color.
    borderColor: { type: String, default: undefined }, // this one should be solid color.
    // glossy: { type: Boolean, default: false }, // about background tweak. we will not use.

    // presets for color and design
    preset: { type: String, default: 'secondary' },
    primary: { type: Boolean, default: false },
    negative: { type: Boolean, default: false },
    secondary: { type: Boolean, default: false },
    gridAction: { type: Boolean, default: false },

    // about innerClasses
    align: { type: String, default: 'center' },
    stack: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },
    // about router
    to: { type: [String, Object], default: undefined },
    replace: { type: Boolean, default: undefined },
    exact: { type: Boolean, default: undefined },
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },
    onClick: { type: Function, default: undefined },
  },

  emits: [
    'click',
  ],

  setup(props) {
    const btnRef = ref();

    function click(evt) {
      btnRef.value.click(evt);
    }

    const stylePreset = computed(() => {
      let preset = availablePresets[props.preset] ?? {};
      if (props.primary === true) { preset = availablePresets.primary; }
      if (props.negative === true) { preset = availablePresets.negative; }
      if (props.secondary === true) { preset = availablePresets.secondary; }
      if (props.gridAction === true) { preset = availablePresets.gridAction; }
      return preset;
    });

    const designClasses = computed(() => {
      if (props.borderless === true) return 'kw-btn--borderless '; // no border, no hover, active, background : transparent
      if (props.underline === true) return 'kw-btn--underline '; // no hover, active, border bottom = textColor
      if (props.outlined === true) return 'kw-btn--outlined '; // border = textColor
      if (stylePreset.value.borderless === true) return 'kw-btn--borderless '; // preset
      if (stylePreset.value.underline === true) return 'kw-btn--underline '; // preset
      if (stylePreset.value.outlined === true) return 'kw-btn--outlined '; // preset
      return 'kw-btn--filled '; // no border
    });

    const colorClasses = computed(() => {
      let ccs = '';

      if (props.color || stylePreset.value.color) {
        ccs += `kw-btn--color-${props.color || stylePreset.value.color} `;
      }
      if (props.textColor || stylePreset.value.textColor) {
        ccs += `kw-btn--text-color-${props.textColor || stylePreset.value.textColor} `;
      }
      if (props.borderColor || stylePreset.value.borderColor) {
        ccs += `kw-btn--border-color-${props.borderColor || stylePreset.value.borderColor} `;
      } else if (typeof props.outlined === 'string') {
        ccs += `kw-btn--border-color-${props.outlined} `;
      }
      return ccs;
    });

    const buttonClasses = computed(() => {
      let classes = '';

      if (designClasses.value) {
        classes += designClasses.value;
      }

      if (colorClasses.value) {
        classes += colorClasses.value;
      }

      return classes;
    });

    const { styleClassAttrs } = useInheritAttrs();

    const buttonStyles = computed(() => {
      let styles = '';
      styles += props.padding ? `padding-left: ${props.padding}; padding-right: ${props.padding} ` : '';
      return styles;
    });

    const buttonDense = computed(() => props.dense ?? stylePreset.value.dense);

    return {
      ...usePermissions(),
      styleClassAttrs,
      buttonClasses,
      buttonStyles,
      buttonDense,
      btnRef,
      click,
    };
  },
};
</script>
