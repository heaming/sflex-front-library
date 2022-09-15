<template>
  <q-tab-panel
    class="kw-tab-panel"
    v-bind="styleClassAttrs"
    :name="name"
    :disable="disable"
  >
    <slot />
  </q-tab-panel>
</template>

<script>
import usePageSearch from '../../composables/private/usePageSearch';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTabPanel',
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: undefined,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    usePageSearch();

    return {
      ...useInheritAttrs(),
    };
  },
};
</script>
