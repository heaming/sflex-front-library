<template>
  <div
    class="result-area"
  >
    <h3>single File Component</h3>
    <kw-form :cols="0">
      <kw-form-row>
        <kw-form-item :label="'single quasar'">
          <q-file
            ref="singleFileRef"
            v-model="singleFile"
            label="Single File Component"
            :max-file-size="singleMaxFileSize"
            @rejected="singleRejectedTest"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item :label="'multi quasar'">
          <q-file
            ref="singleFileRef"
            v-model="multiFiles"
            multiple
            append
            label="Multi File Component"
            :max-file-size="multiMaxFileSize"
            :max-files="multiMaxFiles"
            @rejected="multiRejectedTest"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item :label="'single'">
          <kw-file
            ref="singleFileRef"
            v-model="multiFiles"
            rules="required"
            label="Single File Component"
            :max-file-size="singleMaxFileSize"
            :instance-update="true"
            @rejected="singleRejectedTest"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item :label="'maxFileSize'">
          <kw-input
            v-model="singleMaxFileSizeString"
            label="maxFileSize"
          />
        </kw-form-item>
        <kw-form-item :label="'life cycle'">
          <kw-btn
            label="add dummy"
            @click="singleDummy"
          />
          <kw-btn
            label="reset"
            @click="singleResetTest"
          />
          <kw-btn
            label="isModified"
            @click="singleIsModifiedTest"
          />
          <kw-btn
            label="FileInfo"
            @click="singleOpenFileInfo"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item :label="'multi'">
          <kw-file
            ref="MultiFileRef"
            v-model="multiFiles"
            rules="required"
            multiple
            label="Multi File Component"
            :max-file-size="multiMaxFileSize"
            :max-files="multiMaxFiles"
            :instance-update="true"
            @rejected="multiRejectedTest"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item :label="'maxFileSize'">
          <kw-input
            v-model="multiMaxFileSizeString"
            label="maxFileSize"
          />
        </kw-form-item>
        <kw-form-item :label="'MaxFiles'">
          <kw-input
            v-model="multiMaxFiles"
            type="number"
            label="maxFiles"
          />
        </kw-form-item>
        <kw-form-item :label="'life cycle'">
          <kw-btn
            label="add dummy"
            @click="multiAddDummy"
          />
          <kw-btn
            label="reset"
            @click="multiResetTest"
          />
          <kw-btn
            label="isModified"
            @click="multiIsModifiedTest"
          />
          <kw-btn
            label="FileInfo"
            @click="multiOpenFileInfo"
          />
        </kw-form-item>
      </kw-form-row>
    </kw-form>

    <div class="w1000">
      <!-- file-comp html -->
      <div class="file-comp">
        <div class="file-comp__header">
          <span>Total</span>
          <b>5</b>
          <span>(0 / 0)</span>
        </div>
        <kw-scroll-area
          visible
          max-height="152px"
        >
          <ul class="file-comp__contents">
            <li
              v-for="i in 7"
              :key="i"
              class="file-comp__file-item"
            >
              <div
                class="file-comp__text-area"
              >
                <q-icon
                  name="excel"
                />
                <!-- name: (기본)'file' / (확장자별)'imgpreview''pdf'-->
                <div class="file-comp__file-txt">
                  <p>
                    파일이름파일이름파일이름파일이름파일이름파일이름파일이름파일이름
                  </p>
                  <span>.xlsx</span>
                </div>
                <span class="file-comp__file-size">(530KB)</span>
              </div>
              <div class="file-comp__button-area">
                <q-btn
                  padding="none"
                  icon="viewer"
                  fab
                  unelevated
                  :ripple="false"
                />
                <q-btn
                  padding="none"
                  icon="file_download"
                  fab
                  unelevated
                  :ripple="false"
                />
              </div>
            </li>
          </ul>
        </kw-scroll-area>
      </div>
      <!-- //file-comp html -->
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { alert } from '../../../../src/plugins/dialog';

// multi file test
const multiFileRef = ref(null);
const multiGroupId = ref('');
const multiDocId = ref('');
const multiMaxFileSizeString = ref('10*1024*1024');
// eslint-disable-next-line no-new-func
const multiMaxFileSize = computed(() => new Function(`return ${multiMaxFileSizeString.value}`)());
const multiMaxFiles = ref(3);
const singleFile = ref(null);
const multiFiles = ref([]);

const dummy = {
  name: 'dummy.pdf',
  size: 152131,
  type: undefined,
  targetPath: 'storage',
  serverFileName: '/test/file/is/shit/dummy.pdf',
  fileUid: 'hello?hello?save-me-goat.',
  myFileYn: 'N',
};

const generateDummyFile = (name) => ({
  ...dummy,
  name: name || `dummy${(Math.random() * 100).toFixed(0)}`,
});

function singleDummy() {
  singleFile.value = generateDummyFile();
}

function multiAddDummy() {
  multiFiles.value.push(generateDummyFile());
}

function multiRejectedTest(rejectedMessage) {
  console.log(rejectedMessage);
}

function multiResetTest() {
  multiFileRef.value.reset();
}

function multiIsModifiedTest() {
  console.log(multiFileRef.value.isModified());
}

function multiChangeDocIdTest() {
  if (multiGroupId.value === 'ATG_CMM_MAIL_COMMON') {
    multiGroupId.value = 'ttt';
  } else {
    multiGroupId.value = 'ATG_CMM_MAIL_COMMON';
  }

  if (multiDocId.value === 'ATG-597E24DD-7966-49FF-BF8A-E88C79923BDF') {
    multiDocId.value = 'ttt';
  } else {
    multiDocId.value = 'ATG-597E24DD-7966-49FF-BF8A-E88C79923BDF';
  }
}

function multiOpenFileInfo() {
  alert(JSON.stringify(multiFileRef.value.getAttachFiles()));
}

const singleFileRef = ref(null);
const singleGroupId = ref('');
const singleDocId = ref('');
const singleMaxFileSizeString = ref('10*1024*1024');
// eslint-disable-next-line no-new-func
const singleMaxFileSize = computed(() => new Function(`return ${multiMaxFileSizeString.value}`)());

function singleRejectedTest(rejectedMessage) {
  console.log(rejectedMessage);
}

function singleResetTest() {
  singleFileRef.value.reset();
}

function singleIsModifiedTest() {
  console.log(singleFileRef.value.isModified());
}

function singleChangeDocIdTest() {
  if (singleGroupId.value === 'ATG_CMM_MAIL_COMMON') {
    singleGroupId.value = 'ttt';
  } else {
    singleGroupId.value = 'ATG_CMM_MAIL_COMMON';
  }

  if (singleDocId.value === 'ATG-597E24DD-7966-49FF-BF8A-E88C79923BDF') {
    singleDocId.value = 'ttt';
  } else {
    singleDocId.value = 'ATG-597E24DD-7966-49FF-BF8A-E88C79923BDF';
  }
}

function singleOpenFileInfo() {
  alert(JSON.stringify(singleFileRef.value.getAttachFiles()));
}

</script>

<style scoped lang="scss">
.file-test {
  display: flex;
  flex-flow: row wrap;

  .test-item {
    width: 300px;
    margin: 20px;
    display: flex;
    flex-flow: column;

    &__title {
      height: 50px;
    }

    &__contents {
      overflow: auto;
    }

    &__actions {
      background-color: #eee;
      margin-top: auto;
      width: 100%;
    }
  }
}
</style>

<!-- file-comp style -->
<style lang="scss">
.file-comp {
  width: 100%;
  font-family: "Noto Sans KR", sans-serif !important;
  border: 1px solid #ccc;
  background-color: #fff;

  .kw-scroll-area__client .q-scrollarea__content {
    min-width: unset !important;
  }

  &__header {
    padding: 0 16px;
    display: flex;
    align-items: center;
    height: 36px;
    border-bottom: 1px solid #ccc;
    background-color: #f8f8f8;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #777;

    b {
      margin: 0 2px;
      font-weight: 700;
      color: #222;
    }
  }

  &__contents {
    position: relative;
    padding: 8px 0;
  }

  &__file-item {
    padding: 4px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row nowrap;
    column-gap: 20px;
    min-width: 0;
    width: 100%;
    max-width: 100%;
  }

  &__text-area {
    flex: 1 1 100px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: #777;
    min-width: 0;

    .q-icon {
      flex-shrink: 0;
      display: inline-flex;
    }
  }

  &__file-txt {
    flex-shrink: 1;
    margin-left: 8px;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    min-width: 0;

    p {
      flex: 1 1 50px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    span {
      flex: 0 0 auto;
    }
  }

  &__file-size {
    margin-left: 4px;
    flex-shrink: 0;
  }

  &__button-area {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    column-gap: 8px;

    .q-btn {
      width: 16px;
      height: 16px;

      .q-icon {
        font-size: 16px;
      }

      &:hover {
        .q-focus-helper {
          background: #fff !important;
          opacity: 0 !important;
        }
      }
    }
  }
}
</style>
<!--// file-comp style -->
