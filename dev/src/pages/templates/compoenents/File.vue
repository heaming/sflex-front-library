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
      <kw-item-label font="subtitle">
        class and style
      </kw-item-label>
      <kw-list class="row gap-md">
        <kw-item>
          <kw-item-section side>
            class
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingProps.class" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            style
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.style" />
          </kw-item-section>
        </kw-item>
      </kw-list>
      <kw-separator />
      <kw-item-label font="subtitle">
        slots
      </kw-item-label>
      <kw-list class="row gap-md">
        <kw-item>
          <kw-item-section side>
            default
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.default" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            prepend
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.prepend" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            before
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.before" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            before
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.after" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            hint
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.hint" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            counter
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.counter" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            loading
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.loading" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            file
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.file" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            selected
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots.selected" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            append-header
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots['append-header']" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            append-file
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots['append-file']" />
          </kw-item-section>
        </kw-item>
        <kw-item>
          <kw-item-section side>
            header-action
          </kw-item-section>
          <kw-item-section>
            <kw-input v-model="bindingSlots['header-action']" />
          </kw-item-section>
        </kw-item>
      </kw-list>
      <kw-separator />
      <kw-file
        v-model="file"
        v-bind="bindingProps"
      >
        <template
          v-if="bindingSlots.default"
        >
          {{ bindingSlots.default }}
        </template>
        <template
          v-if="bindingSlots.prepend"
          #prepend
        >
          {{ bindingSlots.prepend }}
        </template>
        <template
          v-if="bindingSlots.append"
          #append
        >
          {{ bindingSlots.append }}
        </template>
        <template
          v-if="bindingSlots.before"
          #before
        >
          {{ bindingSlots.before }}
        </template>
        <template
          v-if="bindingSlots.after"
          #after
        >
          {{ bindingSlots.after }}
        </template>
        <template
          v-if="bindingSlots.hint"
          #hint
        >
          {{ bindingSlots.hint }}
        </template>
        <template
          v-if="bindingSlots.counter"
          #counter
        >
          {{ bindingSlots.counter }}
        </template>
        <template
          v-if="bindingSlots.file"
          #file
        >
          {{ bindingSlots.file }}
        </template>
        <template
          v-if="bindingSlots['append-header']"
          #append-header
        >
          {{ bindingSlots['append-header'] }}
        </template>
        <template
          v-if="bindingSlots['append-file']"
          #append-file
        >
          {{ bindingSlots['append-file'] }}
        </template>
        <template
          v-if="bindingSlots.loading"
          #loading
        >
          {{ bindingSlots.loading }}
        </template>
        <template
          v-if="bindingSlots['header-action']"
          #header-action
        >
          {{ bindingSlots['header-action'] }}
        </template>
      </kw-file>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <kw-file
        use-header
        multiple
        selectable
        downloadable
        download-btn
        :max-total-size="100000000"
      />
    </guide-section>
  </kw-page>
</template>

<script setup>
import { useFieldProps } from '../../../../../src/composables/private/useField';
import { useFieldStyleProps } from '../../../../../src/composables/private/useFieldStyle';
import { useFilePickerProps } from '../../../../../src/components/file/private/useFilePicker';
import { useFileSelectProps } from '../../../../../src/components/file/private/useFileSelect';
import { useFileCounterProps } from '../../../../../src/components/file/private/useFileCounter';
import { useFileDownloadProps } from '../../../../../src/components/file/private/useFileDownload';
import { useFileHeaderProps } from '../../../../../src/components/file/private/useFileHeader';

const fileProps = {
  reversible: { type: Boolean, default: true },
  revertIcon: { type: String, default: 'clear' },
  removable: { type: Boolean, default: undefined },
  removeIcon: { type: String, default: 'clear' },
  undeletePossible: { type: Boolean, default: undefined },
  undeleteIcon: { type: String, default: 'clear' },
  retryPossible: { type: Boolean, default: true },
  retryIcon: { type: String, default: 'retry' },
  instanceUpdate: { type: [Boolean, String], default: false },
  updatable: { type: Boolean, default: true },
  updateIcon: { type: String, default: 'upload_off' },
  rejectMessage: { type: [Function, String], default: undefined },
  placeholder: { type: [Function, String], default: undefined },
  placeholderClass: { type: [Array, String, Object], default: undefined },
  hidePlaceholder: { type: Boolean, default: undefined },

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
  hideHint: { type: Boolean, default: undefined },
  color: { type: String, default: undefined },
  bgColor: { type: String, default: undefined },
  loading: { type: Boolean, default: undefined },
  // Whether using default counter of q-file.
  counter: { type: Boolean, default: undefined },
  clearable: { type: Boolean, default: undefined },
  clearIcon: { type: String, default: 'delete_16' },
  disable: { type: Boolean, default: undefined },
  readonly: { type: Boolean, default: undefined },
  multiple: { type: Boolean, default: undefined },
  accept: { type: String, default: undefined },
  capture: { type: String, default: undefined },
  maxFileSize: { type: [Number, String], default: undefined },
  maxTotalSize: { type: [Number, String], default: undefined },
  maxFiles: { type: [Number, String], default: undefined },
  filter: { type: Function, default: undefined },
  append: { type: Boolean, default: undefined },
  displayValue: { type: [Number, String], default: undefined },
  tabindex: { type: [Number, String], default: undefined },
  counterLabel: { type: Function, default: undefined },
  inputClass: { type: [Array, String, Object], default: undefined },
  inputStyle: { type: [Array, String, Object], default: undefined },
};

const file = ref([]);

const bindingProps = ref({
  maxTotalSize: 100000000,
  // useHeader: true,
  // selectable: true,
  // multiple: true,
  // removable: false,
  // removeBtn: false,
  // removeAllBtn: false,
  // undeletePossible: false,
  // undeleteBtn: false,
  // undeleteAllBtn: false,
  // downloadable: true,
  // downloadBtn: true,
  // downloadAllBtn: true,
});
const bindingSlots = ref({});

const defaultCode = `
      <kw-file
        v-bind="bindingProps"
      />`;
</script>
