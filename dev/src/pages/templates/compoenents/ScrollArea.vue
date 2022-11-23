<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      scrollArea
    </h2>
    <p class="kw-guide-description">
      scrollArea
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="scrollAreaProps"
        title="scrollAreaProps"
      />
      <kw-separator />
      <kw-scroll-area
        v-bind="bindingProps"
      >
        <div
          class="w500 h500"
          style="background: linear-gradient(#f69d3c, #3f87a6);"
        />
      </kw-scroll-area>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-scroll-area
        v-bind="bindingProps"
      >
        <div
          class="w500 h500"
          style="background: linear-gradient(#f69d3c, #3f87a6);"
        />
      </kw-scroll-area>
    </guide-section>
  </kw-page>
</template>

<script setup>
const scrollAreaProps = {
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
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-scroll-area
        v-bind="bindingProps"
      >
        <div
          class="w500 h500"
          style="background: linear-gradient(#f69d3c, #3f87a6);"
        />
      </kw-scroll-area>`;
</script>
