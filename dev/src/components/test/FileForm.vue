<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <q-file
          v-model="quasarValue"
          :label="'label'"
          outlined
        />
      </kw-form-item>
    </kw-form-row>
    <!-- props -->
    <kw-form-row>
      <kw-form-item label="props handler">
        <kw-toggle
          v-model="pickFileWhenClick"
          :true-value="true"
          :false-value="false"
          label="pickFileWhenClick"
        />
        <kw-toggle
          v-model="instanceUpdate"
          :true-value="true"
          :false-value="false"
          label="instanceUpdate"
        />
        <kw-toggle
          v-model="removable"
          :true-value="true"
          :false-value="false"
          label="removable"
        />
        <kw-toggle
          v-model="downloadable"
          :true-value="true"
          :false-value="false"
          label="downloadable"
        />
        <kw-toggle
          v-model="retryPossible"
          :true-value="true"
          :false-value="false"
          label="retryPossible"
        />
        <kw-toggle
          v-model="append"
          :true-value="true"
          :false-value="false"
          label="append"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- constraint props -->
    <kw-form-row>
      <kw-form-item label="max-file-size">
        <kw-input
          v-model="maxFileSize"
          type="number"
        />
      </kw-form-item>
      <kw-form-item label="max-total-size">
        <kw-input
          v-model="maxTotalSize"
          type="number"
        />
      </kw-form-item>
      <kw-form-item label="max-files">
        <kw-input
          v-model="maxFiles"
          type="number"
        />
      </kw-form-item>
      <kw-form-item label="accept">
        <kw-input
          v-model="accept"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- life cycle -->
    <kw-form-row>
      <kw-form-item label="life cycle handler">
        <kw-btn
          class="mr8"
          primary
          :label="'init'"
          @click="initFile"
        />
        <kw-btn
          class="mr8"
          primary
          :label="'reset'"
          @click="resetFile"
        />
        <kw-btn
          class="mr8"
          primary
          :label="'setDummy'"
          @click="setDummy"
        />
        <kw-btn
          class="mr8"
          primary
          :label="'addDummy'"
          @click="addDummy"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-file
          :ref="addRefs"
          v-model="defaultValue"
          name="default"
          :label="'default'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :max-total-size="maxTotalSize ?? undefined"
          :max-file-size="maxFileSize ?? undefined"
          :max-files="maxFiles ?? undefined"
          :accept="accept ?? undefined"
          :append="append"
        />
      </kw-form-item>
      <kw-form-item label="multiple">
        <kw-file
          :ref="addRefs"
          v-model="multipleValue"
          name="multiple"
          multiple
          :label="'multiple'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :max-total-size="maxTotalSize ?? undefined"
          :max-file-size="maxFileSize ?? undefined"
          :max-files="maxFiles ?? undefined"
          :accept="accept ?? undefined"
          :append="append"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- rules -->
    <kw-form-row>
      <kw-form-item label="ruled">
        <kw-file
          :ref="addRefs"
          v-model="ruledValue"
          name="ruled"
          lable="ruled"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :rules="'required'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="ruledMultiple">
        <kw-file
          :ref="addRefs"
          v-model="ruledMultipleValue"
          name="ruledMultiple"
          lable="ruledMultiple"
          multiple
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :rules="'required'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <!-- disable readonly -->
    <kw-form-row>
      <kw-form-item label="disable">
        <kw-file
          :ref="addRefs"
          v-model="disableValue"
          name="disable"
          lable="disable"
          disable
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
        />
      </kw-form-item>
      <kw-form-item label="readonly">
        <kw-file
          :ref="addRefs"
          v-model="readonlyValue"
          name="disable"
          lable="disable"
          readonly
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
        />
      </kw-form-item>
      <kw-form-item label="disableMultiple">
        <kw-file
          :ref="addRefs"
          v-model="disableMultipleValue"
          name="disableMultiple"
          lable="disableMultiple"
          multiple
          disable
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- counter -->
    <kw-form-row>
      <kw-form-item label="counterLabel">
        <kw-file
          :ref="addRefs"
          v-model="counterLabelValue"
          name="counterLabel"
          multiple
          counter
          :counter-label="(ctx) =>
            `totalSize: ${ctx.totalSize}, filesNumber: ${ctx.filesNumber}, maxFiles: ${ctx.maxFiles}`"
          :label="'counterLabel'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :max-total-size="100000"
          :max-file-size="10000"
          :max-files="100"
          selectable
        />
      </kw-form-item>
      <kw-form-item label="selectable">
        <kw-file
          :ref="addRefs"
          v-model="selectableValue"
          name="selectable"
          multiple
          :label="'multiple'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :max-total-size="maxTotalSize ?? undefined"
          :max-file-size="maxFileSize ?? undefined"
          :max-files="maxFiles ?? undefined"
          selectable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- download hook -->
    <kw-form-row>
      <kw-form-item label="download">
        <kw-file
          :ref="addRefs"
          v-model="downloadValue"
          name="download"
          multiple
          :label="'download'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="true"
          :retry-possible="retryPossible"
          @before-download="onBeforeDownload"
          @downloaded="onDownloaded"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- rejected -->

    <!-- wrapped -->
    <kw-form-row>
      <kw-form-item label="wrapped component">
        <kw-file-wrap
          ref="wrappedRef"
          v-model="wrappedValue"
          :max-total-size="maxTotalSize ?? undefined"
          :max-file-size="maxFileSize ?? undefined"
          :max-files="maxFiles ?? undefined"
        />
      </kw-form-item>
      <kw-form-item label="life cycle">
        <kw-btn
          class="mr8"
          primary
          :label="'init'"
          @click="initWrappedFile"
        />
        <kw-btn
          class="mr8"
          primary
          :label="'reset'"
          @click="resetWrappedFile"
        />
        <kw-btn
          class="mr8"
          primary
          :label="'addDummy'"
          @click="addDummyWrappedFile"
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { alert, confirm } from '~kw-lib';
import { KwFile } from '../../../../src/components';

const refsArray = ref({});
const addRefs = (vm) => {
  refsArray.value[vm.name] = vm;
};

// props state
const instanceUpdate = ref(false);
const removable = ref(true);
const downloadable = ref(false);
const retryPossible = ref(true);
const pickFileWhenClick = ref(false);
const maxFileSize = ref();
const maxTotalSize = ref();
const maxFiles = ref();
const accept = ref(null);
const append = ref(true);

// wrapped
const wrappedRef = ref();
const wrappedValue = ref([]);

const quasarValue = ref(null);
const defaultValue = ref(null);
const multipleValue = ref([]);
const ruledValue = ref(null);
const ruledMultipleValue = ref([]);
const disableValue = ref(null);
const readonlyValue = ref(null);
const disableMultipleValue = ref([]);
const selectableValue = ref([]);
const counterLabelValue = ref([]);
const downloadValue = ref([]);

async function onDownloaded(file) {
  return alert(`${file.name} downloaded!`);
}

async function onBeforeDownload(file) {
  return confirm(`BeforeDownload: ${file.name}`);
}

function resetFile() {
  Object.keys(refsArray.value).forEach((key) => {
    const vm = refsArray.value[key];
    vm.reset();
  });
}

function initFile() {
  Object.keys(refsArray.value).forEach((key) => {
    const vm = refsArray.value[key];
    vm.init();
  });
}

function addDummy() {
  const seed = Math.ceil(Math.random() * 10000);
  multipleValue.value.push({
    name: `fileName${seed}.bmp`,
    size: seed,
    type: undefined,
    targetPath: 'storage',
    serverFileName: `/esgeswg/seg/fileName_${seed}.bmp`,
    fileUid: `fileUid_${seed}`,
    myFileYn: 'Y',
  });
}

function setDummy() {
  const seed = Math.ceil(Math.random() * 10000);
  defaultValue.value = {
    name: `fileName${seed}.bmp`,
    size: seed,
    type: undefined,
    targetPath: 'storage',
    serverFileName: `/esgeswg/seg/fileName_${seed}.bmp`,
    fileUid: `fileUid_${seed}`,
    myFileYn: 'Y',
  };
}

function resetWrappedFile() {
  wrappedRef.value.fileRef.reset();
}

function initWrappedFile() {
  wrappedRef.value.fileRef.init();
}

function addDummyWrappedFile() {
  const seed = Math.ceil(Math.random() * 10000);
  wrappedValue.value.push({
    name: `fileName${seed}.bmp`,
    size: seed,
    type: undefined,
    targetPath: 'storage',
    serverFileName: `/esgeswg/seg/fileName_${seed}.bmp`,
    fileUid: `fileUid_${seed}`,
    myFileYn: 'Y',
  });
}

</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #fff;
  }
}
</style>
