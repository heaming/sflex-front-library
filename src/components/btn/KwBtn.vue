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
    @click="onClick"
  >
    <slot />
  </q-btn>
</template>

<script>
import usePermissions from '../../composables/private/usePermissions';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useButtonStyle, { useButtonStyleProps } from '../../composables/private/useButtonStyle';

export default {
  name: 'KwBtn',
  inheritAttrs: false,
  props: {
    ...useButtonStyleProps,

    type: { type: String, default: 'button' },
    label: { type: [Number, String], default: undefined },
    icon: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    loading: { type: Boolean, default: null },
    disable: { type: Boolean, default: false },

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

  setup() {
    const btnRef = ref();

    function click(evt) {
      btnRef.value.click(evt);
    }

    const { styleClassAttrs } = useInheritAttrs();

    return {
      ...usePermissions(),
      ...useButtonStyle(),
      styleClassAttrs,
      btnRef,
      click,
    };
  },
};
</script>
