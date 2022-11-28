<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Editor
    </h2>
    <p class="kw-guide-description">
      Editor - sunEditor wrapping
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="editorProps"
        title="editorProps"
      />
      <kw-separator />
      <kw-editor
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-editor
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';

const editorProps = {
  ...useFieldProps,

  modelValue: {
    type: String,
    default: '',
  },
  disable: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  fixedHeight: {
    type: String,
    default: undefined,
  },
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-editor
        v-bind="bindingProps"
      />`;
</script>
