<template>
  <q-btn
    v-if="!isDestroyed"
    ref="btnRef"
    v-bind="styleClassAttrs"
    class="kw-btn"
    :class="classes"
    no-caps
    unelevated
    rectangle
    :ripple="false"
    :type="type"
    :label="label"
    :icon="icon"
    :icon-right="iconRight"
    :dense="dense"
    :tabindex="tabindex"
    :align="align"
    :stretch="stretch"
    :loading="loading"
    :disable="disable"
    :no-wrap="noWrap"
    @click="onClick"
  >
    <slot />
  </q-btn>
</template>

<script>
import usePermissions from '../../composables/private/usePermissions';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

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

    // padding: { type: String, default: undefined },
    // size: { type: String, default: undefined },
    // fab: { type: Boolean, default: false },
    // fabMini: { type: Boolean, default: false },

    // presets for sizing.
    // we will not use quasar btn props, since design break em based styling.
    dense: { type: Boolean, default: false },
    popup: { type: Boolean, default: false },

    // outline: { type: Boolean, default: false },
    // flat: { type: Boolean, default: false },
    // push: { type: Boolean, default: false },
    // unelevated: { type: Boolean, default: true },
    // design on quasar unelevated style.
    underline: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    outlined: { type: [Boolean, String], default: false },

    // about border-radius.
    // rectangle: { type: Boolean, default: true },
    // rounded: { type: Boolean, default: false },
    // round: { type: Boolean, default: false },

    // color props
    color: { type: String, default: undefined }, // this one should be solid color.
    textColor: { type: String, default: undefined }, // this one should be solid color.
    borderColor: { type: String, default: undefined }, // this one should be solid color.
    // glossy: { type: Boolean, default: false }, // about background tweak. we will not use.

    // presets for color and design
    primary: { type: Boolean, default: false },
    negative: { type: Boolean, default: false },
    secondary: { type: Boolean, default: true },

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

  setup(props) {
    const btnRef = ref();

    function click(evt) {
      btnRef.value.click(evt);
    }

    const presets = computed(() => {
      let pr = {};
      if (props.primary === true) {
        pr = {
          color: 'primary',
          textColor: 'bg-white',
          borderColor: undefined,
        };
      } else if (props.negative === true) {
        pr = {
          color: 'black3',
          textColor: 'bg-white',
          borderColor: undefined,
        };
      } else if (props.secondary === true) {
        pr = {
          color: 'bg-white',
          textColor: 'normal-text',
          borderColor: 'black-btn-line',
          outlined: true,
        };
      }
      return pr;
    });

    const sizeClasses = computed(() => {
      if (props.popup === true) return 'kw-btn--popup ';
      return ''; // no border
    });

    const designClasses = computed(() => {
      if (props.borderless === true) return 'kw-btn--borderless '; // no border, no hover, active, background : transparent
      if (props.underline === true) return 'kw-btn--underline '; // no hover, active, border bottom = textColor
      if (props.outlined === true) return 'kw-btn--outlined '; // border = textColor
      if (presets.value.borderless === true) return 'kw-btn--borderless '; // preset
      if (presets.value.underline === true) return 'kw-btn--underline '; // preset
      if (presets.value.outlined === true) return 'kw-btn--outlined '; // preset
      return 'kw-btn--filled '; // no border
    });

    const colorClasses = computed(() => {
      let ccs = '';

      if (props.color || presets.value.color) {
        ccs += `kw-btn--color-${props.color || presets.value.color} `;
      }
      if (props.textColor || presets.value.textColor) {
        ccs += `kw-btn--text-color-${props.textColor || presets.value.textColor} `;
      }
      if (props.borderColor || presets.value.borderColor) {
        ccs += `kw-btn--border-color-${props.borderColor || presets.value.borderColor} `;
      } else if (typeof props.outlined === 'string') {
        ccs += `kw-btn--border-color-${props.outlined} `;
      }
      return ccs;
    });

    const classes = computed(() => {
      let dcs = '';

      if (sizeClasses.value) {
        dcs += sizeClasses.value;
      }

      if (designClasses.value) {
        dcs += designClasses.value;
      }

      if (colorClasses.value) {
        dcs += colorClasses.value;
      }

      return dcs;
    });

    const { styleClassAttrs } = useInheritAttrs();

    return {
      ...usePermissions(),
      styleClassAttrs,
      classes,
      btnRef,
      click,
    };
  },
};
</script>
