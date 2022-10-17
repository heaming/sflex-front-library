<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <q-file
          v-model="arrayValue"
          :label="'label'"
          outlined
        />
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-file
          ref="fileRef"
          v-model="objValue"
          :label="'default'"
          :max-total-size="40"
        />
      </kw-form-item>
      <kw-form-item label="life cycle">
        <kw-btn
          :label="'init'"
          @click="initFile"
        />
        <kw-btn
          :label="'reset'"
          @click="resetFile"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- multiple -->
    <kw-form-row>
      <kw-form-item label="multiple">
        <kw-file
          ref="fileRef2"
          v-model="arrayValue"
          multiple
          :label="'multiple'"
          :max-total-size="40"
        />
      </kw-form-item>
      <kw-form-item label="life cycle">
        <kw-btn
          :label="'init'"
          @click="initFile2"
        />
        <kw-btn
          :label="'reset'"
          @click="resetFile2"
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
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="applied single">
        <kw-file
          ref="fileRef"
          v-model="objValue"
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
        />
      </kw-form-item>
      <kw-form-item label="applied multiple">
        <kw-file
          ref="fileRef"
          v-model="arrayValue2"
          multiple
          :pick-file-when-click="pickFileWhenClick"
          :instance-update="instanceUpdate"
          :removable="removable"
          :downloadable="downloadable"
          :retry-possible="retryPossible"
        />
      </kw-form-item>
    </kw-form-row>

    <!-- dummy -->
    <kw-form-row>
      <kw-form-item label="dummy multiple">
        <kw-file
          ref="dummyRef"
          v-model="dummyValue"
          multiple
          :label="'dummy multiple'"
        />
      </kw-form-item>
      <kw-form-item label="life cycle">
        <kw-btn
          :label="'init'"
          @click="initDummyRef"
        />
        <kw-btn
          :label="'reset'"
          @click="resetDummyRef"
        />
        <kw-btn
          :label="'addDummy'"
          @click="setDummy"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="dummy multiple">
        <kw-file
          ref="dummyRef2"
          v-model="dummyArrayValue"
          multiple
          :label="'dummy multiple'"
        />
      </kw-form-item>
      <kw-form-item label="life cycle">
        <kw-btn
          :label="'init'"
          @click="initDummyRef2"
        />
        <kw-btn
          :label="'reset'"
          @click="resetDummyRef2"
        />
        <kw-btn
          :label="'addDummy'"
          @click="addDummy"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- rules -->
    <!-- select -->
    <!-- counter -->
    <!-- download hook -->
    <!-- rejected -->

    <!-- wrapped -->
    <kw-form-row>
      <kw-form-item label="wrapped component">
        <kw-file-wrap
          ref="wrappedRef"
          v-model="arrayValue"
          :max-total-size="4000"
        />
      </kw-form-item>
      <kw-form-item label="life cycle">
        <kw-btn
          :label="'init'"
          @click="initWrappedFile"
        />
        <kw-btn
          :label="'reset'"
          @click="resetWrappedFile"
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwFile } from '../../../../src/components';

const arrayValue = ref([]);
const arrayValue2 = ref([]);
const objValue = ref({});
const fileRef = ref();
const fileRef2 = ref();
const dummyRef = ref();
const dummyRef2 = ref();
const wrappedRef = ref();
const instanceUpdate = ref(true);
const removable = ref(true);
const downloadable = ref(false);
const retryPossible = ref(true);
const pickFileWhenClick = ref(false);
const dummyValue = ref({});
const dummyArrayValue = ref([]);

// const checkedAll = computed({
//   get: () => true,
//   set: (val) => {
//     console.log(val);
//   },
// });

function resetFile() {
  fileRef.value.reset();
}

function initFile() {
  fileRef.value.init();
}

function resetFile2() {
  fileRef2.value.reset();
}

function initFile2() {
  fileRef2.value.init();
}

function resetWrappedFile() {
  wrappedRef.value.fileRef.reset();
}

function initWrappedFile() {
  wrappedRef.value.fileRef.init();
}

function addDummy() {
  const seed = Math.ceil(Math.random() * 10000);
  dummyArrayValue.value.push({
    name: `fileName${seed}.bmp`,
    size: seed,
    type: undefined,
    targetPath: 'storage',
    serverFileName: `/esgeswg/seg/fileName_${seed}.bmp`,
    fileUid: `fileUid_${seed}`,
    myFileYn: 'Y',
  });
}

function resetDummyRef() {
  dummyRef.value.reset();
}

function initDummyRef() {
  dummyRef.value.init();
}

function setDummy() {
  const seed = Math.ceil(Math.random() * 10000);
  dummyValue.value = {
    name: `fileName${seed}.bmp`,
    size: seed,
    type: undefined,
    targetPath: 'storage',
    serverFileName: `/esgeswg/seg/fileName_${seed}.bmp`,
    fileUid: `fileUid_${seed}`,
    myFileYn: 'Y',
  };
}

function resetDummyRef2() {
  dummyRef2.value.reset();
}

function initDummyRef2() {
  dummyRef2.value.init();
}

</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #fff;
  }
}
</style>
