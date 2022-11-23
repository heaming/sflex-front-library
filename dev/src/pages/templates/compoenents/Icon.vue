<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Icon
    </h2>
    <p class="kw-guide-description">
      Icon
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="iconProps"
        title="iconProps"
      />
      <kw-separator />
      <kw-icon
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-icon
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
const iconProps = {
  name: {
    type: String,
    default: undefined,
  },
  size: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: [Number, String],
    default: undefined,
  },
  tooltipAnchor: {
    type: String,
    default: undefined,
  },
  tooltipSelf: {
    type: String,
    default: undefined,
  },
  tooltipOffset: {
    type: Array,
    default: undefined,
  },
  onClick: {
    type: Function,
    default: undefined,
  },
};

const bindingProps = ref({
  name: 'bookmark_on',
});

const defaultCode = `
      <kw-icon
        v-bind="bindingProps"
      />`;
</script>
