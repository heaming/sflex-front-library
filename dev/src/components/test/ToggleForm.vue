<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- quasar -->
    <kw-form-row
      :cols="0"
    >
      <kw-form-item label="QUASAR">
        <q-toggle
          v-model="boolModel"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-toggle
          v-model="ynModel"
        />
        <kw-toggle
          v-model="ynModel"
        >
          가구 내 학습지 모두 보기
        </kw-toggle>
        <kw-toggle
          v-model="ynModel"
          label="가구 내 학습지 모두 보기"
          right-label
        />
      </kw-form-item>
    </kw-form-row>
    <!-- disable -->
    <kw-form-row>
      <kw-form-item label="disable">
        <kw-toggle
          v-model="ynModel"
          disable
        />
        <kw-toggle
          v-model="ynModel"
          disable
        >
          가구 내 학습지 모두 보기
        </kw-toggle>

        <kw-toggle
          v-model="ynModel"
          label="가구 내 학습지 모두 보기"
          disable
          right-label
        />
      </kw-form-item>
    </kw-form-row>
    <!-- readonly -->
    <kw-form-row>
      <kw-form-item label="dense">
        <kw-toggle
          v-model="ynModel"
          dense
        />
        <kw-toggle
          v-model="ynModel"
          dense
        >
          가구 내 학습지 모두 보기
        </kw-toggle>
        <kw-toggle
          v-model="ynModel"
          label="가구 내 학습지 모두 보기"
          dense
          right-label
        />
      </kw-form-item>
    </kw-form-row>
    <!-- icon -->
    <kw-form-row>
      <kw-form-item label="icon">
        <q-toggle
          v-model="boolModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
        />
        <kw-toggle
          v-model="ynModel"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off_16"
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue';

const indeterminateModel = ref(undefined);
const trueModel = ref(true);
const falseModel = ref(false);
const boolModel = ref(true);
const boolLabel = computed(() => String(boolModel.value));
const yModel = ref('Y');
const nModel = ref('N');
const ynModel = ref('Y');
const stringModel = ref('A');

</script>

<style scoped lang="scss">
.kw-form-item__field {
  > * {
    background-color: greenyellow;
  }
}
</style>
