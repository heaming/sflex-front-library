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
    :stack="stack"
    :stretch="stretch"
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
import useBtnStyle, { useBtnStyleProps } from '../../composables/private/useBtnStyle';

export default {
  name: 'KwBtn',
  inheritAttrs: false,
  props: {
    // customize props
    ...useBtnStyleProps,

    // fall through props
    type: { type: String, default: 'button' },
    label: { type: [Number, String], default: undefined },
    icon: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    disable: { type: Boolean, default: false },

    // about innerClasses
    align: { type: String, default: 'center' },
    stack: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },

    // events
    onClick: { type: Function, default: undefined },
  },

  setup() {
    const btnRef = ref();

    function click(evt) {
      btnRef.value.click(evt);
    }

    const { styleClassAttrs } = useInheritAttrs();

    return {
      ...usePermissions(),
      ...useBtnStyle(),
      styleClassAttrs,
      btnRef,
      click,
    };
  },
};
</script>
