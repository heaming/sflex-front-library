<template>
  <q-tab
    v-bind="styleClassAttrs"
    :class="tabClass"
    :content-class="computedContentClass"
    :name="name"
    :label="label"
    :disable="disable"
    :tabindex="tabindex"
    :ripple="false"
    no-caps
    :text="label"
  >
    <slot />
  </q-tab>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useDense from '../../composables/private/useDense';

export default {
  name: 'KwTab',
  inheritAttrs: false,

  props: {
    name: {
      type: [Number, String],
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: [Number, String],
      default: undefined,
    },
    contentClass: {
      type: String,
      default: undefined,
    },
    activeLine: {
      type: String,
      default: undefined,
    },
  },

  setup(props) {
    const computedDense = useDense();
    const tabClass = computed(() => ({
      'kw-tab': true,
      'kw-tab--dense': computedDense.value,
    }));

    // notify quasar only accept string.
    const computedContentClass = computed(() => {
      let classes = 'kw-tab__content';
      if (props.contentClass) {
        classes += ` ${props.contentClass}`;
      }
      return classes;
    });

    return {
      ...useInheritAttrs(),
      tabClass,
      computedContentClass,
    };
  },
};
</script>
