<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Field
    </h2>
    <p class="kw-guide-description">
      Form
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="fieldProps"
        title="fieldProps"
      />
      <kw-separator />
      <div class="flex items-center bg-lime-1 w500 h500">
        <kw-field
          v-model="model"
          v-bind="bindingProps"
        >
          <template #default="scope">
            <kw-input
              :model-value="scope[bindingProps.fieldKey ?? 'modelValue']"
            />
          </template>
        </kw-field>
      </div>
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useFieldWrapProps } from '../../../../../src/composables/private/useFieldWrap';

const model = ref('test');

const fieldProps = {
  ...useFieldProps,
  ...useFieldWrapProps,
  fieldKey: { type: String, default: 'modelValue' },

  dense: {
    type: Boolean,
    default: undefined,
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
};

const bindingProps = ref({
  rules: 'required',
});
</script>
