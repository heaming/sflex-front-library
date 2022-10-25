<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- quasar -->
    <kw-form-row
      v-if="true"
    >
      <kw-form-item label="quasar">
        <q-file
          v-model="quasarValue"
          :label="'label'"
          outlined
        />
      </kw-form-item>
    </kw-form-row>
    <!-- style props -->
    <kw-form-row>
      <kw-form-item label="style props">
        <kw-toggle
          v-model="borderless"
          :true-value="true"
          :false-value="false"
          label="borderless"
        />
        <kw-toggle
          v-model="underline"
          :true-value="true"
          :false-value="false"
          label="underline"
        />
        <kw-toggle
          v-model="dense"
          :true-value="true"
          :false-value="false"
          label="dense"
        />
      </kw-form-item>
      <kw-form-item label="pick file & select">
        <kw-toggle
          v-model="pickFileWhenClick"
          :true-value="true"
          :false-value="false"
          label="pickFileWhenClick"
        />
        <kw-toggle
          v-model="pickFileBtn"
          :true-value="true"
          :false-value="false"
          :indeterminate-value="undefined"
          label="pickFileBtn"
        />
        <kw-toggle
          v-model="multiple"
          :true-value="true"
          :false-value="false"
          label="multiple"
        />
        <kw-toggle
          v-model="selectable"
          :disable="!multiple"
          :true-value="true"
          :false-value="false"
          label="selectable (multiple only)"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- header props -->
    <kw-form-row :cols="4">
      <kw-form-item
        :colspan="2"
        label="use header"
      >
        <kw-toggle
          v-model="useHeader"
          :true-value="true"
          :false-value="false"
          label="useHeader"
        />
        <kw-toggle
          v-model="scrollHorizontal"
          :true-value="true"
          :false-value="false"
          label="scrollHorizontal"
        />
        <kw-toggle
          v-model="useAppendFileSlot"
          :true-value="true"
          :false-value="false"
          label="useAppendFileSlot"
        />
        <kw-toggle
          v-model="slotOverflow"
          :true-value="true"
          :false-value="false"
          label="slotOverflow"
        />
      </kw-form-item>
      <kw-form-item label="fileNameWidth">
        <kw-input
          v-model="fileNameWidth"
          label="fileNameWidth"
        />
      </kw-form-item>
      <kw-form-item label="asideWidth">
        <kw-input
          v-model="asideWidth"
          label="asideWidth"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- state props -->
    <kw-form-row>
      <kw-form-item label="model & state">
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
    <!-- placeholder props -->
    <kw-form-row>
      <kw-form-item label="placeholder">
        <kw-input
          v-model="placeholder"
        />
      </kw-form-item>
      <kw-form-item label="placeholderStyle">
        <kw-input
          v-model="placeholderStyle"
        />
      </kw-form-item>
      <kw-form-item label="placeholderClass">
        <kw-input
          v-model="placeholderClass"
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
        <kw-btn
          class="mr8"
          primary
          :label="'addNewField'"
          @click="addNewField"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item
        label="default"
      >
        <kw-file
          :ref="addRefs"
          v-model="defaultValue"
          name="default"
          :label="'default'"
          :pick-file-when-click="pickFileWhenClick"
          :pick-file-btn="pickFileBtn"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :max-total-size="maxTotalSize ?? undefined"
          :max-file-size="maxFileSize ?? undefined"
          :max-files="maxFiles ?? undefined"
          :accept="accept ?? undefined"
          :append="append"
          :use-header="useHeader"
          :borderless="borderless"
          :underline="underline"
          :dense="dense"
          :selectable="selectable"
          :scroll-horizontal="scrollHorizontal"
          :file-name-width="fileNameWidth"
          :aside-width="asideWidth"
          :placeholder="placeholder || undefined"
          :placeholder-style="placeholderStyle"
          :placeholder-class="placeholderClass"
        >
          <template
            v-if="useAppendFileSlot"
            #append-header
          >
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              fileUid
            </div>
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              myFileYn
            </div>
          </template>
          <template
            v-if="useAppendFileSlot"
            #append-file="{file}"
          >
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              <kw-input
                v-model="file.fileUid"
                dense
              />
            </div>
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              <kw-select
                v-model="file.myFileYn"
                dense
                :options="[{value: 'Y', label: 'Y'}, {value: 'N', label: 'N'}]"
              />
            </div>
          </template>
        </kw-file>
      </kw-form-item>
      <kw-form-item
        label="multiple"
      >
        <kw-file
          :ref="addRefs"
          v-model="multipleValue"
          name="multiple"
          :label="'multiple'"
          :pick-file-when-click="pickFileWhenClick"
          :pick-file-btn="pickFileBtn"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
          :max-total-size="maxTotalSize ?? undefined"
          :max-file-size="maxFileSize ?? undefined"
          :max-files="maxFiles ?? undefined"
          :accept="accept ?? undefined"
          :append="append"
          :use-header="useHeader"
          :borderless="borderless"
          :underline="underline"
          :dense="dense"
          :selectable="selectable"
          :scroll-horizontal="scrollHorizontal"
          :file-name-width="fileNameWidth"
          :aside-width="asideWidth"
          :placeholder="placeholder || undefined"
          :placeholder-style="placeholderStyle"
          :placeholder-class="placeholderClass"
          :multiple="multiple"
        >
          <template
            v-if="useAppendFileSlot"
            #append-header
          >
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              fileUid
            </div>
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              myFileYn
            </div>
          </template>
          <template
            v-if="useAppendFileSlot"
            #append-file="{file}"
          >
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              <kw-input
                v-model="file.fileUid"
                dense
              />
            </div>
            <div
              class="text-center"
              :class="slotOverflow ? 'w500' : 'w100'"
            >
              <kw-select
                v-model="file.newField"
                dense
                :options="[{value: 'Y', label: 'Y'}, {value: 'N', label: 'N'}]"
              />
            </div>
          </template>
        </kw-file>
      </kw-form-item>
    </kw-form-row>
    <!-- rules -->
    <kw-form-row
      v-if="false"
    >
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
    <kw-form-row
      v-if="false"
    >
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
    <kw-form-row
      v-if="false"
    >
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
    <kw-form-row
      v-if="false"
    >
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

    <!-- additional slots : append-file -->
    <kw-form-row
      v-if="false"
    >
      <kw-form-item label="use header">
        <kw-file
          :ref="addRefs"
          v-model="appendFileValue"
          name="useHeader"
          :label="'download'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="true"
          :retry-possible="retryPossible"
          :max-total-size="maxTotalSize ?? undefined"
          :max-file-size="maxFileSize ?? undefined"
          :max-files="maxFiles ?? undefined"
          :accept="accept ?? undefined"
          :append="append"
          :file-name-width="'100px'"
          :aside-width="'100px'"
          scroll-horizontal
          use-header
          selectable
        >
          <template #append-header>
            <div class="w500 text-center">
              test
            </div>
            <div class="w500 text-center">
              test
            </div>
            <div class="w500 text-center">
              test
            </div>
          </template>
          <template #append-file="{file}">
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
          </template>
        </kw-file>
      </kw-form-item>
    </kw-form-row>
    <!-- additional slots : append-file -->
    <kw-form-row
      v-if="false"
    >
      <kw-form-item label="slot:append-file">
        <kw-file
          :ref="addRefs"
          v-model="appendFileValue"
          name="slotAppend"
          multiple
          :label="'download'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="true"
          :retry-possible="retryPossible"
          :file-name-width="'100px'"
          :aside-width="'100px'"
          scroll-horizontal
          use-header
          selectable
        >
          <template #append-header>
            <div class="w500 text-center">
              test
            </div>
            <div class="w500 text-center">
              test
            </div>
            <div class="w500 text-center">
              test
            </div>
          </template>
          <template #append-file="{file}">
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
          </template>
        </kw-file>
      </kw-form-item>
    </kw-form-row>
    <!-- additional slots : append-file -->
    <kw-form-row
      v-if="false"
    >
      <kw-form-item label="slot:append-file">
        <kw-file
          :ref="addRefs"
          v-model="appendFileValue"
          name="slotAppend"
          multiple
          :label="'download'"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="true"
          :retry-possible="retryPossible"
          :file-name-width="'100px'"
          :aside-width="'100px'"
          scroll-horizontal
          use-header
          selectable
        >
          <template #append>
            append
          </template>
          <template #prepend>
            prepend
          </template>
          <template #before>
            before
          </template>
          <template #after>
            after
          </template>
          <template #append-header>
            <div class="w500 text-center">
              test
            </div>
            <div class="w500 text-center">
              test
            </div>
            <div class="w500 text-center">
              test
            </div>
          </template>
          <template #append-file="{file}">
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
            <div class="w500 text-center">
              {{ file.myFileYn }}
            </div>
          </template>
        </kw-file>
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { alert, confirm } from '~kw-lib';
import { KwFile } from '../../../../src/components';

const refsArray = ref({});
const addRefs = (vm) => {
  if (!vm?.name) { return; }
  refsArray.value[vm.name] = vm;
};

// props state
const instanceUpdate = ref(false);
const removable = ref(true);
const downloadable = ref(false);
const retryPossible = ref(true);
const pickFileWhenClick = ref(false);
const maxFileSize = ref();
const maxTotalSize = ref(100000);
const maxFiles = ref();
const accept = ref(null);
const append = ref(true);
const selectable = ref(true);
const useHeader = ref(false);
const scrollHorizontal = ref(false);
const useAppendFileSlot = ref(false);
const slotOverflow = ref(false);
const fileNameWidth = ref('');
const asideWidth = ref('');
const borderless = ref(false);
const underline = ref(false);
const dense = ref(false);
const pickFileBtn = ref();

const placeholder = ref('');
const placeholderStyle = ref();
const placeholderClass = ref();

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
const appendFileValue = ref([
  {
    name: 'fileName.bmp',
    size: 5000,
    type: undefined,
    targetPath: 'storage',
    serverFileName: '/esgeswg/seg/fileName_.bmp',
    fileUid: 'fileUid',
    myFileYn: 'Y',
  },
]);
const multiple = ref(true);

function addNewField() {
  if (multipleValue.value.length > 0) {
    multipleValue.value[0].newField = 'Y';
  }
}

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
</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #fff;
  }
}
</style>
