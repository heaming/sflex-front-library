<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Form
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
        :props="formProps"
        title="formProps"
      />
      <guide-props
        v-model="bindingProps1"
        :props="formRowProps"
        title="formRowProps"
      />
      <guide-props
        v-model="bindingProps2"
        :props="formItemProps"
        title="formItemProps"
      />
      <kw-separator />
      <kw-form
        v-bind="bindingProps"
      >
        <kw-form-row v-bind="bindingProps1">
          <kw-form-item
            v-for="n in 6"
            :key="`item-${n}`"
            v-bind="bindingProps2"
          >
            {{ `item-${n}` }}
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-form
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFormProps } from '../../../../../src/composables/private/useForm';
import { useFormLayoutProps } from '../../../../../src/composables/private/useFormLayout';
import { useFormRowProps } from '../../../../../src/composables/private/useFormRow';
import { useFormItemProps } from '../../../../../src/composables/private/useFormItem';

const formProps = {
  ...useFormProps,
  ...useFormLayoutProps,

  dense: {
    type: Boolean,
    default: undefined,
  },
  autoHeight: {
    type: Boolean,
    default: false,
  },
};
const formRowProps = {
  ...useFormRowProps,
};

const formItemProps = {
  ...useFormItemProps,

  label: {
    type: String,
    default: undefined,
  },
};

const bindingProps = ref(null);
const bindingProps1 = ref(null);
const bindingProps2 = ref(null);

const defaultCode = `
      <kw-form
        v-bind="bindingProps"
      />`;
</script>
