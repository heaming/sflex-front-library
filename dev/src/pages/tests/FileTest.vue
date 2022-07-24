<template>
  <div
    class="file-test"
  >
    <q-card class="test-item">
      <q-card-section class="test-item__title text-h6">
        Multi File Component
      </q-card-section>
      <q-card-section class="test-item__contents">
        <kw-file
          ref="multiFileRef"
          rules="required"
          name="Multi File Component"
          label="Multi File Component"
          outlined
          filled
          multiple
          :attach-group-id="multiGroupId"
          :attach-document-id="multiDocId"
          :max-file-size="multiMaxFileSize"
          :max-files="multiMaxFiles"
          :instance-update="true"
          @rejected="multiRejectedTest"
        />
      </q-card-section>
      <q-card-actions
        class="test-item__actions"
      >
        <q-form>
          <q-input
            v-model="multiMaxFileSizeString"
            label="maxFileSize"
          />
          <q-input
            v-model="multiMaxFiles"
            type="number"
            label="maxFiles"
          />
          <q-btn
            dense
            @click="multiChangeDocIdTest"
          >
            DocID
          </q-btn>
          <q-btn
            dense
            @click="multiResetTest"
          >
            reset
          </q-btn>
          <q-btn
            dense
            @click="multiIsModifiedTest"
          >
            isModified
          </q-btn>
          <q-btn
            dense
            @click="multiOpenFileInfo"
          >
            FileInfo
          </q-btn>
        </q-form>
      </q-card-actions>
    </q-card>

    <q-card class="test-item">
      <q-card-section class="test-item__title text-h6">
        Single File Component
      </q-card-section>
      <q-card-section class="test-item__contents">
        <kw-file
          ref="singleFileRef"
          rules="required"
          name="name test"
          label="label test"
          filled
          :attach-group-id="singleGroupId"
          :attach-document-id="singleDocId"
          :max-file-size="singleMaxFileSize"
          @rejected="singleRejectedTest"
        />
      </q-card-section>
      <q-card-actions
        class="test-item__actions"
      >
        <q-form>
          <q-input
            v-model="singleMaxFileSizeString"
            label="maxFileSize"
          />
          <q-btn
            dense
            @click="singleChangeDocIdTest"
          >
            DocID
          </q-btn>
          <q-btn
            dense
            @click="singleResetTest"
          >
            reset
          </q-btn>
          <q-btn
            dense
            @click="singleIsModifiedTest"
          >
            isModified
          </q-btn>
          <q-btn
            dense
            @click="singleOpenFileInfo"
          >
            FileInfo
          </q-btn>
        </q-form>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { alert } from '../../../../src/plugins/dialog';

// multi file test
const multiFileRef = ref(null);
const multiGroupId = ref('');
const multiDocId = ref('');
const multiMaxFileSizeString = ref('10*1024*1024');
// eslint-disable-next-line no-new-func
const multiMaxFileSize = computed(() => new Function(`return ${multiMaxFileSizeString.value}`)());
const multiMaxFiles = ref(3);

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
