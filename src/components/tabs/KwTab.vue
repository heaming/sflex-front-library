<template>
  <q-tab
    v-if="rendered"
    v-bind="styleClassAttrs"
    :class="tabClass"
    :content-class="computedContentClass"
    :name="name"
    :disable="disable"
    :tabindex="tabindex"
    :ripple="false"
    no-caps
    :text="label"
  >
    <template v-if="label">
      {{ label }}
      <kw-tooltip
        show-when-ellipsised
        :offset="[-20, 7]"
        anchor="bottom start"
        self="center start"
        class="tab_tooltip"
      >
        {{ label }}
      </kw-tooltip>
    </template>
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

    const rendered = ref(false);
    // kw-tab 관련, 퀘이사 콘솔오류 대처.
    // kw-page-header와의 시점 차이로 발생하는 듯 함
    setTimeout(() => { rendered.value = true; }, 0);

    return {
      ...useInheritAttrs(),
      tabClass,
      computedContentClass,
      rendered,
    };
  },
};
</script>
