<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      tooltip
    </h2>
    <p class="kw-guide-description">
      tooltip
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="tooltipProps"
        title="tooltipProps"
      />
      <kw-separator />
      <div class="bg-deep-orange w100 h40">
        target elm
        <kw-tooltip
          v-bind="bindingProps"
        >
          kw-tooltip content
        </kw-tooltip>
      </div>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <div class="bg-deep-orange w100 h40">
        target elm
        <kw-tooltip
          v-bind="bindingProps"
        >
          kw-tooltip content
        </kw-tooltip>
      </div>
    </guide-section>
  </kw-page>
</template>

<script setup>
const tooltipProps = {
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  maxHeight: {
    type: String,
    default: undefined,
  },
  maxWidth: {
    type: String,
    default: undefined,
  },
  anchor: {
    type: String,
    default: undefined,
  },
  self: {
    type: String,
    default: undefined,
  },
  offset: {
    type: Array,
    default: undefined,
  },
  showWhenEllipsised: {
    type: Boolean,
    default: false,
  },
};

const bindingProps = ref(null);

const defaultCode = `
      <div class="bg-deep-orange w100 h40">
        target elm
        <kw-tooltip
          v-bind="bindingProps"
        >
          kw-tooltip content
        </kw-tooltip>
      </div>`;
</script>
