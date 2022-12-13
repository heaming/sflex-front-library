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
        :thumb-style="computedThumbStyle"
        :horizontal-thumb-style="computedHorizontalThumbStyle"
        :vertical-thumb-style="computedVerticalThumbStyle"
        :bar-style="computedBarStyle"
        :vertical-bar-style="computedBarStyle"
        :horizontal-bar-style="computedHorizontalBarStyle"
        :content-style="computedContentStyle"
        :content-active-style="computedContentActiveStyle"
        :delay="delay"
        :visible="visible"
        :tabindex="tabindex"
        @scroll="$emit('scroll', $event)"
      >
        <template v-if="$slots.default">
          <slot />
        </template>

        <q-resize-observer
          debounce="100"
          @resize="onResizeContent"
        />
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { platform } from '../../plugins/platform';

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
    scrollAreaStyle: { type: [Object, Array, String], default: undefined },

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
  },

  emits: ['scroll', 'resize:content'],

  setup(props, { emit }) {
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

    const contentObserverStyle = ref({
      width: undefined,
      height: undefined,
    });

    const scrollAreaSizingStyle = computed(() => {
      const { width, height } = contentObserverStyle.value;
      return {
        width: props.scrollAreaWidth ?? (width ? `${width}px` : width),
        height: props.scrollAreaHeight ?? (height ? `${height}px` : height),
      };
    });

    const normalizeStyleProps = (pr) => {
      console.log('pr', pr);
      if (!pr) { return []; }
      if (typeof pr === 'string') {
        return pr
          .split(';')
          .map((rule) => rule.trim())
          .filter((rule) => rule.length);
      }
      if (Array.isArray(pr)) {
        const flatter = (acc, cur) => acc.concat(...normalizeStyleProps(cur));
        return pr.reduce(flatter, []);
      }
      return Object.entries(pr).map(([key, value]) => {
        if (typeof key !== 'string' && value) {
          return normalizeStyleProps(key);
        }
        return `${key}: ${value}`;
      }).flat();
    };

    const computedContentStyle = computed(() => {
      const styles = props.contentStyle ? [props.contentStyle] : [];
      if (scrollAreaSizingStyle.value) { styles.push(scrollAreaSizingStyle.value); }
      if (props.scrollAreaStyle) { styles.push(...normalizeStyleProps(props.scrollAreaStyle)); }
      return styles;
    });

    const computedContentActiveStyle = computed(() => {
      const styles = props.contentActiveStyle ? [props.contentActiveStyle] : [];
      if (scrollAreaSizingStyle.value) { styles.push(scrollAreaSizingStyle.value); }
      if (props.scrollAreaStyle) { styles.push(...normalizeStyleProps(props.scrollAreaStyle)); }
      return styles;
    });

    const computedBarStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        // fixme
      }
      return normalizeStyleProps([props.barStyle, style]);
    });

    const computedVerticalBarStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.width = '6px'; // $kw-scrollbar-width
      }
      return [props.verticalBarStyle, style];
    });

    const computedHorizontalBarStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.height = '6px'; // $kw-scrollbar-height
      }
      return normalizeStyleProps([props.horizontalBarStyle, style]);
    });

    const computedThumbStyle = computed(() => {
      const style = {};
      style.backgroundClip = 'content-box';
      style.opacity = 1;

      if (platform.is.desktop) {
        style.backgroundColor = '#ccc'; // $kw-scrollThumb-track-background-color
      }
      if (platform.is.mobile) {
        style.border = '2px solid transparent';
        style.backgroundColor = '#ccc'; // $kw-scrollThumb-track-background-color-mobile
      }
      return {
        ...style,
        ...props.thumbStyle,
      };
    });

    const computedVerticalThumbStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.width = '6px'; // $kw-scrollbar-width
        style.borderRadius = '3px';
      }
      if (platform.is.mobile) {
        style.width = '6px'; // $kw-scrollbar-width
        style.borderRadius = '3px';
      }
      return {
        ...style,
        ...props.verticalThumbStyle,
      };
    });

    const computedHorizontalThumbStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.height = '6px'; // $kw-scrollbar-width
      }
      if (platform.is.mobile) {
        style.height = '6px'; // $kw-scrollbar-width
        style.borderRadius = '3px';
      }
      return {
        ...style,
        ...props.horizontalThumbStyle,
      };
    });

    const onResizeContent = (resizeInfo) => {
      contentObserverStyle.value = resizeInfo;
      emit('resize:content', resizeInfo);
    };

    const getScrollTarget = () => quasarRef.value?.getScrollTarget();
    const getScroll = () => quasarRef.value?.getScroll();
    const getScrollPosition = () => quasarRef.value?.getScrollPosition();
    const getScrollPercentage = () => quasarRef.value?.getScrollPercentage();
    const setScrollPosition = (
      axis,
      offset,
      duration,
    ) => quasarRef.value?.setScrollPosition(
      axis,
      offset,
      duration,
    );
    const setScrollPercentage = (
      axis,
      offset,
      duration,
    ) => quasarRef.value?.setScrollPercentage(
      axis,
      offset,
      duration,
    );

    const triggerObserver = () => {
      contentObserverStyle.value = {
        width: undefined,
        height: undefined,
      };
    };

    onUpdated(() => {
      triggerObserver();
    });

    return {
      ...useInheritAttrs(),
      quasarRef,
      scrollAreaWrapperStyle,
      computedContentStyle,
      computedContentActiveStyle,
      computedBarStyle,
      computedVerticalBarStyle,
      computedHorizontalBarStyle,
      computedThumbStyle,
      computedVerticalThumbStyle,
      computedHorizontalThumbStyle,
      getScrollTarget,
      getScroll,
      getScrollPosition,
      getScrollPercentage,
      setScrollPosition,
      setScrollPercentage,
      onResizeContent,
    };
  },
};
</script>
