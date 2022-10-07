<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="kw-scroll-area"
  >
    <div
      class="kw-scroll-area__wrapper"
      :style="scrollAreaStyle"
    >
      <q-scroll-area
        class="fit"
        :thumb-style="thumbStyle"
        :horizontal-thumb-style="horizontalThumbStyle"
        :vertical-thumb-style="verticalThumbStyle"
        :bar-style="barStyle"
        :vertical-bar-style="verticalBarStyle"
        :horizontal-bar-style="horizontalBarStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
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

    <!--    </div>  -->
    <!--      <div class="kw-scroll-area__container">-->
    <!--        -->
    <!--      </div>-->
  </div>
</template>

<script>
export default {
  name: 'KwScrollArea',

  props: {
    // customize props
    height: { type: String, default: undefined },
    minHeight: { type: String, default: '10px' },
    maxHeight: { type: String, default: undefined },
    width: { type: String, default: undefined },
    minWidth: { type: String, default: '10px' },
    maxWidth: { type: String, default: undefined },

    // fall through props
    thumbStyle: { type: Object, default: undefined },
    verticalThumbStyle: { type: Object, default: undefined },
    horizontalThumbStyle: { type: Object, default: undefined },
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

  emits: ['scroll'],

  setup(props) {
    const scrollAreaStyle = computed(() => {
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

    return {
      scrollAreaStyle,
    };
  },
};
</script>
