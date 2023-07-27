<template>
  <q-btn
    ref="btnRef"
    v-bind="{...styleClassAttrs, ...buttonStyleProps}"
    :class="buttonClass"
    class="shrink-off"
    :style="buttonStyles"
    no-caps
    unelevated
    rectangle
    :ripple="false"
    :type="type"
    :label="label"
    :icon="icon"
    :icon-right="iconRight"
    :tabindex="tabindex"
    :align="align"
    :stack="stack"
    :disable="disable || isDestroyed"
    :no-wrap="noWrap"
    :to="to"
    :replace="replace"
    :href="href"
    :target="target"
    :loading="loading"
    :percentage="percentage"
    :dark-percentage="darkPercentage"
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
    to: { type: String, default: undefined },
    replace: { type: Boolean, default: undefined },
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },

    // about innerClasses
    align: { type: String, default: 'center' },
    stack: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    percentage: { type: Number, default: undefined },
    darkPercentage: { type: Boolean, default: false },

    // events
    onClick: { type: Function, default: undefined },
  },

  setup() {
    const btnRef = ref();
    const hasPermession = ref(true);

    function click(evt) {
      btnRef.value.click(evt);
    }

    const { styleClassAttrs } = useInheritAttrs();

    return {
      ...usePermissions(),
      ...useBtnStyle(),
      styleClassAttrs,
      hasPermession,
      btnRef,
      click,
    };
  },
};
</script>
