<template>
  <q-item
    v-bind="styleClassAttrs"
    :class="itemClass"
    :style="itemStyle"
    :tag="tag"
    :active="active"
    :clickable="clickable"
    :dense="dense"
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

export default {
  name: 'KwItem',
  inheritAttrs: false,
  props: {
    // customize props
    padding: { type: [Boolean, String], default: false },

    // fall through props
    tag: { type: String, default: 'div' },
    active: { type: Boolean, default: undefined },
    clickable: { type: Boolean, default: undefined },
    dense: { type: Boolean, default: undefined },
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
    activeClass: { type: String, default: 'q-router-link--active' },
    exactActiveClass: { type: String, default: 'q-router-link--exact-active' },
    disable: { type: Boolean, default: undefined },
  },
  emits: [
    'click',
  ],
  setup(props) {
    const { styleClassAttrs } = useInheritAttrs();

    const itemClass = computed(() => {
      const classes = {
        'kw-item': true,
      };
      if (props.padding === true) { classes['kw-item--padding'] = true; }
      return classes;
    });

    const itemStyle = computed(() => {
      const styles = {};
      if (typeof props.padding === 'string') { styles.padding = props.padding; }
      return styles;
    });

    return {
      styleClassAttrs,
      itemStyle,
      itemClass,
    };
  },
};
</script>
