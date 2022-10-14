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
          pick-file-when-click
          counter
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

    <!-- wrapped -->
    <kw-form-row>
      <kw-form-item label="wrapped">
        <div
          class="file-attacher"
        >
          <kw-action-top>
            <template #left>
              <span>{{ $t('MSG_TXT_COM_TOT', null, '총') }}</span>
              <span class="accent pl4">{{ totalCount }}</span>
              <kw-btn
                label="파일찾기"
                class="ml4"
                dense
                @click="fileRef2?.pickFiles()"
              />
              <kw-btn
                label="삭제"
                class="ml4"
                dense
                @click="fileRef2?.removeSelected()"
              />
            </template>
            <span>{{ fileRef2?.computedCounter }}</span>
          </kw-action-top>
          <div
            class="file-attacher__container"
          >
            <div
              class="file-attacher__container-header"
            >
              <kw-checkbox
                :model-value="fileRef2?.selectAll"
                style="padding: 9px 16px;"
                :true-value="true"
                :false-value="false"
                dense
                @update:model-value="(val) => {fileRef2.selectAll = val}"
              />
              <div class="text-center">
                파일명
              </div>
              <div class="text-center w92">
                파일 크기
              </div>
            </div>
            <kw-file
              ref="fileRef2"
              v-model="arrayValue"
              class="file-attacher__file-comp"
              borderless
              multiple
              :label="'default'"
              :max-total-size="40"
            />
          </div>
        </div>
      </kw-form-item>
      <kw-form-item label="wrapped component">
        <kw-file-wrapper
          v-model="arrayValue"
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwFile } from '../../../../src/components';

const arrayValue = ref([]);
const objValue = ref({});
const fileRef = ref();
const fileRef2 = ref();
const totalCount = computed(() => arrayValue.value.length);

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

</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #fff;
  }
}
</style>
