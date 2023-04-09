<template>
  <div
    class="kw-scroll-area"
    v-bind="styleClassAttrs"
  >
    <div
      class="kw-scroll-area__offset"
      :style="computedOffsetStyle"
    >
      <q-scroll-area
        ref="quasarRef"
        class="kw-scroll-area__client"
        :class="clientClass"
        :style="clientStyle"
        :thumb-style="computedThumbStyle"
        :vertical-thumb-style="computedVerticalThumbStyle"
        :horizontal-thumb-style="computedHorizontalThumbStyle"
        :bar-style="computedBarStyle"
        :vertical-bar-style="computedVerticalBarStyle"
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
      </q-scroll-area>
    </div>
    <q-resize-observer
      :debounce="100"
      @resize="onResizeContent"
    />
  </div>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { platform } from '../../plugins/platform';
import { castStylePropToObject } from '../../utils/style';

export default {
  name: 'KwScrollArea',
  inheritAttrs: false,

  props: {
    // customize props
    // about offset size
    height: { type: String, default: undefined },
    minHeight: { type: String, default: '10px' },
    maxHeight: { type: String, default: undefined },
    width: { type: String, default: undefined },
    minWidth: { type: String, default: '10px' },
    maxWidth: { type: String, default: undefined },
    offsetStyle: { type: [Array, String, Object], default: undefined },

    clientClass: { type: [String, Array, Object], default: undefined },
    clientStyle: { type: [Array, String, Object], default: undefined },
    // about scroll area size
    /* if you kill vertical scroll use this with value 100% */
    scrollHeight: { type: String, default: undefined },
    /* if you kill horizontal scroll use this with value 100% */
    scrollWidth: { type: String, default: undefined },
    scrollStyle: { type: [Array, String, Object], default: undefined },

    // fall through props
    thumbStyle: { type: [Array, String, Object], default: undefined },
    verticalThumbStyle: { type: [Array, String, Object], default: undefined },
    horizontalThumbStyle: { type: [Array, String, Object], default: undefined },
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

    const computedOffsetStyle = computed(() => {
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
      return castStylePropToObject(styles, props.offsetStyle);
    });

    const observedClientBoxSize = ref({
      width: undefined,
      height: undefined,
    });

    const computedScrollWidth = computed(() => {
      if (props.scrollWidth) {
        return {
          width: `${props.scrollWidth}`,
          minWidth: 'unset !important',
        };
      }
      return {
        minWidth: observedClientBoxSize.value?.width && `${observedClientBoxSize.value.width}px`,
      };
    });

    const computedScrollHeight = computed(() => {
      if (props.scrollHeight) {
        return {
          height: `${props.scrollHeight}`,
          minHeight: 'unset !important',
        };
      }
      return {
        minHeight: observedClientBoxSize.value?.height && `${observedClientBoxSize.value.height}px`,
      };
    });

    const computedContentStyle = computed(() => {
      const styles = {
        ...computedScrollWidth.value,
        ...computedScrollHeight.value,
      };
      return castStylePropToObject(props.contentStyle, props.scrollStyle, styles);
    });

    const computedContentActiveStyle = computed(() => {
      const styles = {
        ...computedScrollWidth.value,
        ...computedScrollHeight.value,
      };
      return castStylePropToObject(props.contentActiveStyle, props.scrollStyle, styles);
    });

    const computedBarStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        // fixme
      }
      return castStylePropToObject(style, props.barStyle);
    });

    const computedVerticalBarStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.width = '6px'; // $kw-scrollbar-width
      }
      if (platform.is.tablet) {
        style.width = '6px'; // $kw-scrollbar-width
      }
      return castStylePropToObject(style, props.verticalBarStyle);
    });

    const computedHorizontalBarStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.height = '6px'; // $kw-scrollbar-height
      }
      if (platform.is.tablet) {
        style.height = '6px'; // $kw-scrollbar-height
      }
      return castStylePropToObject(style, props.horizontalBarStyle);
    });

    const computedThumbStyle = computed(() => {
      const style = {};
      style.backgroundClip = 'content-box';
      style.opacity = 1;

      if (platform.is.desktop) {
        style.backgroundColor = '#ccc'; // $kw-scrollbar-track-background-color
      }
      if (platform.is.tablet) {
        style.backgroundColor = '#ccc'; // $kw-scrollThumb-track-background-color
      }
      if (platform.is.mobile) {
        style.border = '2px solid transparent';
        style.backgroundColor = '#ccc'; // $kw-scrollbar-track-background-color-mobile
      }
      return castStylePropToObject(style, props.thumbStyle);
    });

    const computedVerticalThumbStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.width = '6px'; // $kw-scrollbar-width
        style.borderRadius = '0';
        style.marginRight = '4px';
        style.borderTop = '5px solid transparent';
        style.borderBottom = '5px solid transparent';
      }
      if (platform.is.tablet) {
        style.width = '6px'; // $kw-scrollbar-width
        style.borderRadius = '0';
        style.marginRight = '4px';
        style.borderTop = '5px solid transparent';
        style.borderBottom = '5px solid transparent';
      }
      if (platform.is.mobile) {
        style.width = '6px'; // $kw-scrollbar-width
        style.borderRadius = '0';
        style.marginRight = '4px';
      }
      return castStylePropToObject(style, props.verticalThumbStyle);
    });

    const computedHorizontalThumbStyle = computed(() => {
      const style = {};
      if (platform.is.desktop) {
        style.height = '6px'; // $kw-scrollbar-width
        style.marginBottom = '4px';
      }
      if (platform.is.tablet) {
        style.height = '6px'; // $kw-scrollbar-width
        style.marginBottom = '4px';
      }
      if (platform.is.mobile) {
        style.height = '6px'; // $kw-scrollbar-width
        style.borderRadius = '0';
      }
      return castStylePropToObject(style, props.horizontalThumbStyle);
    });

    const onResizeContent = (resizeInfo) => {
      console.log('resizeInfo', resizeInfo.width, resizeInfo.height);
      observedClientBoxSize.value = resizeInfo;
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

    return {
      ...useInheritAttrs(),
      quasarRef,
      computedOffsetStyle,
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
