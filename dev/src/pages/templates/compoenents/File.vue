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
        v-model="bindingProps1"
        :props="fileProps"
        title="fileProps"
      />
      <guide-props
        v-model="bindingProps2"
        :props="useFieldProps"
        title="useFieldProps"
      />
      <guide-props
        v-model="bindingProps3"
        :props="useFieldStyleProps"
        title="useFieldStyleProps"
      />
      <guide-props
        v-model="bindingProps4"
        :props="useFilePickerProps"
        title="useFilePickerProps"
      />
      <guide-props
        v-model="bindingProps5"
        :props="useFileSelectProps"
        title="useFileSelectProps"
      />
      <guide-props
        v-model="bindingProps6"
        :props="useFileCounterProps"
        title="useFileCounterProps"
      />
      <guide-props
        v-model="bindingProps7"
        :props="useFileDownloadProps"
        title="useFileDownloadProps"
      />
      <guide-props
        v-model="bindingProps8"
        :props="useFileHeaderProps"
        title="useFileHeaderProps"
      />
      <guide-props
        v-model="bindingProps9"
        :props="quasarProps"
        title="quasarProps"
      />
      <kw-expansion-item
        class="guide-props"
        header-class="guide-props__title"
        padding-target="header"
        padding="10px 0"
      >
        <template #header>
          <kw-item-section>
            <kw-item-label font="subtitle">
              class and style
            </kw-item-label>
          </kw-item-section>
        </template>
        <kw-list class="guide-props__props-container">
          <kw-item class="guide-prop">
            <kw-item-section class="guide-prop__label">
              <kw-item-label class="guide-prop__key">
                class
              </kw-item-label>
              <kw-item-label class="guide-prop__type">
                VueClassProps
              </kw-item-label>
            </kw-item-section>
            <kw-item-section class="guide-prop__value">
              <kw-input v-model="bindingProps.class" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section class="guide-prop__label">
              <kw-item-label class="guide-prop__key">
                style
              </kw-item-label>
              <kw-item-label class="guide-prop__type">
                VueStyleProps
              </kw-item-label>
            </kw-item-section>
            <kw-item-section class="guide-prop__value">
              <kw-input v-model="bindingProps.style" />
            </kw-item-section>
          </kw-item>
        </kw-list>
      </kw-expansion-item>
      <kw-expansion-item
        class="guide-props"
        header-class="guide-props__title"
        padding-target="header"
        padding="10px 0"
      >
        <template #header>
          <kw-item-section>
            <kw-item-label font="subtitle">
              slots
            </kw-item-label>
          </kw-item-section>
        </template>
        <kw-list class="guide-props__props-container">
          <kw-item class="guide-prop">
            <kw-item-section side>
              default
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.default" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              prepend
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.prepend" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              before
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.before" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              before
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.after" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              hint
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.hint" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              counter
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.counter" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              loading
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.loading" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              file
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.file" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              selected
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots.selected" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              append-header
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots['append-header']" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              append-file
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots['append-file']" />
            </kw-item-section>
          </kw-item>
          <kw-item class="guide-prop">
            <kw-item-section side>
              header-action
            </kw-item-section>
            <kw-item-section>
              <kw-input v-model="bindingSlots['header-action']" />
            </kw-item-section>
          </kw-item>
        </kw-list>
      </kw-expansion-item>

      <kw-separator />

      <kw-file
        v-model="file"
        :class="$g.platform.is.mobile ? 'w320' : ''"
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
      description="default"
      :guide-code="defaultCode"
    >
      <kw-file
        v-model="dummyFiles"
        multiple
        downloadable
        :max-total-size="100000000"
        :upload="testUpload"
        :download="testDownload"
      />
      <kw-btn
        label="add"
        @click="addFile"
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
import { downloadBlob } from '../../../../../src/utils/file';

const fileProps = {
  reversible: { type: Boolean, default: true },
  revertIcon: { type: String, default: 'clear' },
  removable: { type: Boolean, default: undefined },
  removeIcon: { type: String, default: 'clear' },
  undeletePossible: { type: Boolean, default: undefined },
  undeleteIcon: { type: String, default: 'clear' },
  retryPossible: { type: Boolean, default: true },
  retryIcon: { type: String, default: 'redo' },
  instanceUpdate: { type: [Boolean, String], default: false },
  updatable: { type: Boolean, default: true },
  updateIcon: { type: String, default: 'upload_off' },
  rejectMessage: { type: [Function, String], default: undefined },
  placeholder: { type: [Function, String], default: undefined },
  placeholderClass: { type: [Array, String, Object], default: undefined },
  dndHint: { type: String, default: undefined },
  upload: { type: Function, default: undefined },
  download: { type: Function, default: undefined },
};

const quasarProps = {
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

const testUpload = (f) => new Promise((resolve) => {
  setTimeout(() => {
    const response = {
      hello: 'is a test response',
      serverFileName: f.name,
    };
    resolve(response);
  }, 5000);
});

const testDownload = (f) => new Promise((resolve) => {
  setTimeout(() => {
    if (f.nativeFile) {
      downloadBlob(f.nativeFile, f.name);
    } else {
      downloadBlob(new Blob([]), 'is-dummy');
    }
    resolve(true);
  }, 1000);
});

const bindingProps1 = ref({
  download: testDownload,
  upload: testUpload,
});
const bindingProps2 = ref({
  label: 'label',
});
const bindingProps3 = ref(null);
const bindingProps4 = ref(null);
const bindingProps5 = ref(null);
const bindingProps6 = ref(null);
const bindingProps7 = ref(null);
const bindingProps8 = ref({
  collapsible: true,
});
const bindingProps9 = ref({
  multiple: true,
  maxTotalSize: 10000000000,
  accept: '.txt',
});
const bindingProps = computed(() => ({
  ...bindingProps1.value,
  ...bindingProps2.value,
  ...bindingProps3.value,
  ...bindingProps4.value,
  ...bindingProps5.value,
  ...bindingProps6.value,
  ...bindingProps7.value,
  ...bindingProps8.value,
  ...bindingProps9.value,
}));
const bindingSlots = ref({});

const dummyFiles = ref([]);

const dummyFile = {
  serverFile: {
    targetPath: 'targetPath',
    serverFileName: 'serverFileName',
    fileUid: 'fileUid',
  },
  name: 'dummy',
  size: Number.parseInt('21352', 10) || 0,
  type: undefined,
};

const addFile = () => {
  dummyFiles.value = [dummyFile];
};

const defaultCode = `
      <kw-file
        v-bind="bindingProps"
      />`;
</script>
