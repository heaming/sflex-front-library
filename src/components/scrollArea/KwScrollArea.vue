<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="kw-scroll-area"
    v-bind="styleClassAttrs"
  >
    <div
      class="kw-scroll-area__wrapper"
      :style="scrollAreaWrapperStyle"
    >
      <q-scroll-area
        ref="quasarRef"
        class="fit"
        :thumb-style="thumbStyle"
        :horizontal-thumb-style="horizontalThumbStyle"
        :vertical-thumb-style="verticalThumbStyle"
        :bar-style="barStyle"
        :vertical-bar-style="verticalBarStyle"
        :horizontal-bar-style="horizontalBarStyle"
        :content-style="computedContentStyle"
        :content-active-style="computedContentActiveStyle"
        :delay="delay"
        :visible="visible"
        :tabindex="tabindex"
        @scroll="onScroll"
      >
        <template v-if="$slots.default">
          <slot />
        </template>
      </q-scroll-area>
    </div>

    <!--    </div>  -->
    <!--      <div class="kw-scroll-area__container">-->
    <!--        -->
    <!--      </div>-->
  </div>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwScrollArea',
  inheritAttrs: false,

  props: {
    // customize props
    // about client size
    height: { type: String, default: undefined },
    minHeight: { type: String, default: '10px' },
    maxHeight: { type: String, default: undefined },
    width: { type: String, default: undefined },
    minWidth: { type: String, default: '10px' },
    maxWidth: { type: String, default: undefined },
    // about scroll area size
    // if you kill vertical scroll use this with value 100%
    scrollAreaHeight: { type: String, default: undefined },
    // if you kill horizontal scroll use this with value 100%
    scrollAreaWidth: { type: String, default: undefined },
    scrollAreaStyle: { type: String, default: undefined },

    // fall through props
    thumbStyle: { type: Object, default: undefined },
    verticalThumbStyle: { type: Object, default: undefined },
    horizontalThumbStyle: { type: Object, default: undefined }, // { borderBottomWidth: '4px', height: '14px' }
    barStyle: { type: [Array, String, Object], default: undefined },
    verticalBarStyle: { type: [Array, String, Object], default: undefined },
    horizontalBarStyle: { type: [Array, String, Object], default: undefined },
    contentStyle: { type: [Array, String, Object], default: undefined },
    contentActiveStyle: { type: [Array, String, Object], default: undefined },
    delay: { type: [String, Number], default: 1000 },
    visible: { type: Boolean, default: null },
    tabindex: { type: [String, Number], default: undefined },
    onScroll: { type: Function, default: undefined },
  },

  setup(props) {
    const quasarRef = ref();

    const scrollAreaWrapperStyle = computed(() => {
      let styles = '';
      if (props.height) {
        styles += props.height ? `height: ${props.height}; ` : '';
      } else {
        styles += props.minHeight ? `min-height: ${props.minHeight}; ` : '';
        styles += props.maxHeight ? `max-height: ${props.maxHeight}; ` : '';
      }
      if (props.width) {
        styles += props.width ? `width: ${props.width}; ` : '';
      } else {
        styles += props.minWidth ? `min-width: ${props.minWidth}; ` : '';
        styles += props.maxWidth ? `max-width: ${props.maxWidth}; ` : '';
      }
      return styles;
    });

    const computedContentStyle = computed(() => {
      const styles = props.contentStyle ? [props.contentStyle] : [];
      if (props.scrollAreaWidth) { styles.push(`width: ${props.scrollAreaWidth};`); }
      if (props.scrollAreaHeight) { styles.push(`height: ${props.scrollAreaHeight}; `); }
      if (props.scrollAreaStyle) { styles.push(props.scrollAreaStyle); }
      return styles;
    });

    const computedContentActiveStyle = computed(() => {
      const styles = props.contentActiveStyle ? [props.contentActiveStyle] : [];
      if (props.scrollAreaWidth) { styles.push(`width: ${props.scrollAreaWidth};`); }
      if (props.scrollAreaHeight) { styles.push(`height: ${props.scrollAreaHeight}; `); }
      if (props.scrollAreaStyle) { styles.push(props.scrollAreaStyle); }
      return styles;
    });

    function getScrollTarget(...args) { quasarRef.value?.getScrollTarget(...args); }
    function getScroll(...args) { quasarRef.value?.getScroll(...args); }
    function getScrollPosition(...args) { quasarRef.value?.getScrollPosition(...args); }
    function getScrollPercentage(...args) { quasarRef.value?.getScrollPercentage(...args); }
    function setScrollPosition(...args) { quasarRef.value?.setScrollPosition(...args); }
    function setScrollPercentage(...args) { quasarRef.value?.setScrollPercentage(...args); }

    return {
      ...useInheritAttrs(),
      quasarRef,
      scrollAreaWrapperStyle,
      computedContentStyle,
      computedContentActiveStyle,
      getScrollTarget,
      getScroll,
      getScrollPosition,
      getScrollPercentage,
      setScrollPosition,
      setScrollPercentage,
    };
  },
};
</script>
