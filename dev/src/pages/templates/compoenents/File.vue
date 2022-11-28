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
        :props="fileProps"
        title="fileProps"
      />
      <kw-separator />
      <kw-file
        v-bind="bindingProps"
      />
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-file
        v-bind="bindingProps"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import i18n from '../../../../../src/i18n';
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useFieldStyleProps } from '../../../../../src/composables/private/useFieldStyle';
import { useFilePickerProps } from '../../../../../src/components/file/private/useFilePicker';
import { useFileSelectProps } from '../../../../../src/components/file/private/useFileSelect';
import { useFileCounterProps } from '../../../../../src/components/file/private/useFileCounter';
import { useFileDownloadProps } from '../../../../../src/components/file/private/useFileDownload';
import { useFileHeaderProps } from '../../../../../src/components/file/private/useFileHeader';

const fileProps = {
  removable: { type: Boolean, default: true },
  removeIcon: { type: String, default: 'clear' },
  retryPossible: { type: Boolean, default: true },
  retryIcon: { type: String, default: 'retry' },
  instanceUpdate: { type: [Boolean, String], default: false },
  updatable: { type: Boolean, default: true },
  updateIcon: { type: String, default: 'upload_off' },
  rejectMessage: { type: [Function, String], default: undefined },
  placeholder: { type: [Function, String], default: i18n.t('MSG_TXT_SEL_FILE', null, '파일 선택') },
  placeholderClass: { type: [Array, String, Object], default: undefined },

  ...useFieldProps,
  ...useFieldStyleProps,
  ...useFilePickerProps,
  ...useFileSelectProps,
  ...useFileCounterProps,
  ...useFileDownloadProps,
  ...useFileHeaderProps,

  // fall through props
  prefix: { type: String, default: undefined },
  suffix: { type: String, default: undefined },
  hint: { type: String, default: undefined },
  hideHint: { type: Boolean, default: false },
  color: { type: String, default: undefined },
  bgColor: { type: String, default: undefined },
  loading: { type: Boolean, default: false },
  // Whether using default counter of q-file.
  counter: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: 'delete_16' },
  disable: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  accept: { type: String, default: undefined },
  capture: { type: String, default: undefined },
  maxFileSize: { type: [Number, String], default: undefined },
  maxTotalSize: { type: [Number, String], default: undefined },
  maxFiles: { type: [Number, String], default: undefined },
  filter: { type: Function, default: undefined },
  modelValue: { type: [Object, Array], default: undefined },
  append: { type: Boolean, default: true },
  displayValue: { type: [Number, String], default: undefined },
  tabindex: { type: [Number, String], default: undefined },
  counterLabel: { type: Function, default: undefined },
  inputClass: { type: [Array, String, Object], default: undefined },
  inputStyle: { type: [Array, String, Object], default: undefined },
};

const bindingProps = ref(null);

const defaultCode = `
      <kw-file
        v-bind="bindingProps"
      />`;
</script>
