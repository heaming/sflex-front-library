<template>
  <q-item-section
    v-bind="styleClassAttrs"
    :class="itemSectionClass"
    :avatar="avatar"
    :thumbnail="thumbnail"
    :side="side"
    :top="top"
    :no-wrap="noWrap"
  >
    <slot />
  </q-item-section>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwItemSection',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    avatar: { type: Boolean, default: undefined },
    thumbnail: { type: Boolean, default: undefined },
    side: { type: Boolean, default: undefined },
    top: { type: Boolean, default: undefined },
    center: { type: Boolean, default: undefined },
    bottom: { type: Boolean, default: undefined },
    noWrap: { type: Boolean, default: undefined },
  },
  setup(props) {
    const { styleClassAttrs } = useInheritAttrs();

    const alignClass = computed(() => {
      const classes = {};
      if (props.bottom) { classes['kw-item__section--bottom'] = true; return classes; }
      if (props.center) { classes['kw-item__section--center'] = true; return classes; }
      if (props.top) { classes['kw-item__section--top'] = true; return classes; }
      return classes;
    });

    const itemSectionClass = computed(() => ({
      'kw-item__section': true,
      ...alignClass.value,
    }));

    return {
      styleClassAttrs,
      itemSectionClass,
    };
  },
};
</script>
