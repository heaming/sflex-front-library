<template>
  <q-tab-panels
    ref="tabPanelsRef"
    class="kw-tab-panels"
    v-bind="styleClassAttrs"
    :model-value="modelValue"
    keep-alive
    :animated="false"
    @update:model-value="onUpdateModelValue"
  >
    <slot />
  </q-tab-panels>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTabPanels',
  inheritAttrs: false,

  props: {
    modelValue: {
      type: [Number, String],
      default: undefined,
    },
    onUpdateModelValue: {
      type: Function,
      default: undefined,
    },
  },

  setup() {
    const tabPanelsRef = ref();

    function next() {
      tabPanelsRef.value.next();
    }
    function previous() {
      tabPanelsRef.value.previous();
    }
    function goTo(panelName) {
      tabPanelsRef.value.goTo(panelName);
    }

    return {
      ...useInheritAttrs(),
      next,
      previous,
      goTo,
    };
  },
};
</script>
