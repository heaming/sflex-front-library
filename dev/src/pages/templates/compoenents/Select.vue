<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      select
    </h2>
    <p class="kw-guide-description">
      select
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="selectProps"
        title="selectProps"
      />
      <kw-separator />
      <kw-select
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <div style="width: 700px;">
        <kw-select
          v-bind="bindingProps"
        />
      </div>
      <div style="width: 700px; display: flex;">
        <kw-select
          v-bind="bindingProps"
          :options="longOptions"
        />
        <q-select
          v-model="modelRef"
          :options="longOptions.map(o => o.codeName)"
        />
      </div>
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useFieldStyleProps } from '../../../../../src/composables/private/useFieldStyle';
import { useOptionsProps } from '../../../../../src/composables/private/useOptions';
import i18n from '../../../../../src/i18n';

const selectProps = {
  ...useFieldProps,
  ...useFieldStyleProps,
  ...useOptionsProps,

  modelValue: { type: [String, Number, Array, Object], default: undefined },

  // fall through props
  multiple: { type: Boolean, default: false },
  emitValue: { type: Boolean, default: true },
  useInput: { type: Boolean, default: false },
  fillInput: { type: Boolean, default: undefined },
  hideSelected: { type: Boolean, default: undefined },
  inputDebounce: { type: [Number, String], default: 100 },
  dropdownIcon: { type: String, default: 'arrow_down' },
  hideDropdownIcon: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  prefix: { type: String, default: undefined },
  suffix: { type: String, default: undefined },
  clearable: { type: Boolean, default: false },
  color: { type: String, default: undefined },
  bgColor: { type: String, default: undefined },
  autofocus: { type: Boolean, default: false },
  placeholder: { type: String, default: i18n.t('MSG_TXT_SEL', null, '선택') },
  tabindex: { type: [Number, String], default: undefined },
  onFilter: { type: Function, default: undefined },
};

const bindingProps = ref({
  options: [
    { codeId: 'a', codeName: 'a' },
    { codeId: 'b', codeName: 'b' },
    { codeId: 'c', codeName: 'c' },
    { codeId: 'd', codeName: 'd' },
  ],
});

const longOptions = Object.keys(Array(30).fill(undefined)).map((i) => ({ codeId: i, codeName: `The ${i} square is : ${String(i * i)}` }));

const modelRef = ref();

const defaultCode = `
      <kw-select
        v-bind="bindingProps"
      />`;
</script>
