<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Chip
    </h2>
    <p class="kw-guide-description">
      Chip
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="chipProps"
        title="chipProps"
      />
      <kw-separator />
      <kw-chip
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-chip
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
const chipProps = {
  label: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: undefined,
  },
  iconRight: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
  textColor: {
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
  onClick: {
    type: Function,
    default: undefined,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-chip
        v-bind="bindingProps"
      />`;
</script>
