<template>
  <q-item
    v-bind="styleClassAttrs"
    :class="itemClass"
    :style="itemStyle"
    :tag="tag"
    :active="active"
    :clickable="clickable"
    :inset-level="insetLevel"
    :tabindex="tabindex"
    :focused="focused"
    :manual-focus="manualFocus"
    :dark="dark"
    :to="to"
    :replace="replace"
    :exact="exact"
    :href="href"
    :target="target"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :disable="disable"
    @click="$emit('click', $event)"
  >
    <slot />
  </q-item>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useItemStyle, { useItemStyleProps } from '../../composables/private/useItemStyle';

export default {
  name: 'KwItem',
  inheritAttrs: false,
  props: {
    // customize props
    ...useItemStyleProps,

    // fall through props
    tag: { type: String, default: 'div' },
    active: { type: Boolean, default: undefined },
    clickable: { type: Boolean, default: undefined },
    insetLevel: { type: Number, default: undefined },
    tabindex: { type: [String, Number], default: undefined },
    focused: { type: Boolean, default: undefined },
    manualFocus: { type: Boolean, default: undefined },
    dark: { type: Boolean, default: undefined },
    to: { type: String, default: undefined },
    replace: { type: Boolean, default: undefined },
    exact: { type: Boolean, default: undefined },
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },
    activeClass: { type: String, default: 'kw-item--active' },
    exactActiveClass: { type: String, default: 'kw-item--exact-active' },
    disable: { type: Boolean, default: undefined },
  },
  emits: [
    'click',
  ],
  setup() {
    const { styleClassAttrs } = useInheritAttrs();

    return {
      ...useItemStyle({
        blockInheritDense: true,
        blockInheritPadding: true,
      }),
      styleClassAttrs,
    };
  },
};
</script>
