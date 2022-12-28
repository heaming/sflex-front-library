<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Checkbox
    </h2>
    <p class="kw-guide-description">
      Checkbox
    </p>
    <guide-section
      title="playground"
      description="playground"
    >
      <guide-props
        v-model="bindingProps"
        :props="inputProps"
        title="inputProps"
      />
      <kw-separator />
      <kw-input
        v-bind="bindingProps"
        required
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-input
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useFieldStyleProps } from '../../../../../src/composables/private/useFieldStyle';

const inputProps = {
  ...useFieldProps,
  ...useFieldStyleProps,

  modelValue: { type: [String, Number], default: undefined },

  // fall through props
  type: { type: String, default: 'text' },
  debounce: { type: [Number, String], default: undefined },
  disable: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  autogrow: { type: Boolean, default: false },
  rows: { type: [Number, String], default: undefined },
  mask: { type: String, default: undefined },
  fillMask: { type: [Boolean, String], default: undefined },
  reverseFillMask: { type: Boolean, default: false },
  unmaskedValue: { type: Boolean, default: true },
  prefix: { type: String, default: undefined },
  suffix: { type: String, default: undefined },
  clearable: { type: Boolean, default: false },
  color: { type: String, default: undefined },
  bgColor: { type: String, default: undefined },
  autofocus: { type: Boolean, default: false },
  placeholder: { type: String, default: () => '입력' },
  tabindex: { type: [Number, String], default: undefined },
  min: { type: [Number, String], default: undefined },
  max: { type: [Number, String], default: undefined },
  step: { type: [Number, String], default: undefined },
  onFocus: { type: Function, default: undefined },
  onBlur: { type: Function, default: undefined },
  onClear: { type: Function, default: undefined },
  onKeydown: { type: Function, default: undefined },
  align: { type: String, default: undefined },
  inputClass: { type: [Array, String, Object], default: undefined },
  inputStyle: { type: [Array, String, Object], default: undefined },

  // customize props
  icon: { type: String, default: undefined },
  disableIcon: { type: Boolean, default: false },
  maxlength: { type: [Number, String], default: 0 },
  counter: { type: Boolean, default: false },
  upperCase: { type: Boolean, default: false },
  lowerCase: { type: Boolean, default: false },
  regex: { type: [String, Object], default: undefined },
  spinner: { type: Boolean, default: undefined },
  onClickIcon: { type: Function, default: undefined },

  // when use mask props, keydown event not fired.
  // so use this to block form submit
  preventSubmit: { type: Boolean, default: false },
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-input
        v-bind="bindingProps"
      />`;
</script>
