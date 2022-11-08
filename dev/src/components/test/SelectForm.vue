<template>
  <kw-form
    ref="formRef"
    :cols="3"
  >
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="QUASAR">
        <q-select
          v-model="selectModel"
          :options="optionsModel"
          option-label="codeName"
          option-value="codeId"
          label="기본"
        />
      </kw-form-item>
      <kw-form-item label="QUASAR borderless">
        <q-select
          v-model="selectModel"
          :options="optionsModel"
          option-label="codeName"
          option-value="codeId"
          borderless
          label="기본"
        />
      </kw-form-item>
      <kw-form-item label="QUASAR outlined">
        <q-select
          v-model="selectModel"
          :options="optionsModel"
          option-label="codeName"
          option-value="codeId"
          dense
          outlined
          use-input
          label="기본"
        />  <!-- ... 안해놨네...? -->
      </kw-form-item>
    </kw-form-row>
    <!-- 기본 -->
    <kw-form-row>
      <kw-form-item label="기본">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
        />
      </kw-form-item>
      <kw-form-item label="멀티플">
        <kw-select
          v-model="arrayModel"
          :options="testOptionsModel"
          multiple
        />
      </kw-form-item>
      <kw-form-item label="use-input">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
        />
      </kw-form-item>
    </kw-form-row>
    <!-- readonly -->
    <kw-form-row>
      <kw-form-item label="readonly">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          readonly
        />
      </kw-form-item>
      <kw-form-item label="멀티플 readonly">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          multiple
          readonly
        />
      </kw-form-item>
      <kw-form-item label="use-input readonly">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          readonly
        />
      </kw-form-item>
    </kw-form-row>
    <!-- disable -->
    <kw-form-row>
      <kw-form-item label="disable">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          disable
        />
      </kw-form-item>
      <kw-form-item label="멀티플 disable">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          multiple
          disable
        />
      </kw-form-item>
      <kw-form-item label="use-input disable">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- error -->
    <kw-form-row>
      <kw-form-item label="error">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="멀티플 error">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          multiple
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="use-input error">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <!-- error and disable -->
    <kw-form-row>
      <kw-form-item label="error & disable">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="multiple & error & disable">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          multiple
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="use-input error disable">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <!-- style : underline -->
    <kw-form-row>
      <kw-form-item label="underline">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          underline
        />
      </kw-form-item>
      <kw-form-item label="멀티플 underline">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          multiple
          underline
        />
      </kw-form-item>
      <kw-form-item label="use-input underline">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          underline
        />
      </kw-form-item>
    </kw-form-row>
    <!-- style : borderless -->
    <kw-form-row>
      <kw-form-item label="borderless">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          borderless
        />
      </kw-form-item>
      <kw-form-item label="멀티플 borderless">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          multiple
          borderless
        />
      </kw-form-item>
      <kw-form-item label="use-input borderless">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          borderless
        />
      </kw-form-item>
    </kw-form-row>

    <!-- dense -->
    <!-- 기본 -->
    <kw-form-row>
      <kw-form-item label="dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          dense
        />
      </kw-form-item>
      <kw-form-item label="멀티플 dense">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          dense
          multiple
        />
      </kw-form-item>
      <kw-form-item label="use-input dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <!-- readonly -->
    <kw-form-row>
      <kw-form-item label="readonly dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          dense
          readonly
        />
      </kw-form-item>
      <kw-form-item label="멀티플 readonly dense">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          dense
          multiple
          readonly
        />
      </kw-form-item>
      <kw-form-item label="use-input readonly dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          dense
          readonly
        />
      </kw-form-item>
    </kw-form-row>
    <!-- disable -->
    <kw-form-row>
      <kw-form-item label="disable dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          dense
          disable
        />
      </kw-form-item>
      <kw-form-item label="멀티플 disable dense">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          dense
          multiple
          disable
        />
      </kw-form-item>
      <kw-form-item label="use-input disable dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          dense
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- error -->
    <kw-form-row>
      <kw-form-item label="error dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          dense
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="멀티플 error dense">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          dense
          multiple
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="use-input error dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          dense
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <!-- error and disable -->
    <kw-form-row>
      <kw-form-item label="error disable dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          dense
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="multiple error disable dense">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          dense
          multiple
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
      <kw-form-item label="use-input error disable dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          dense
          disable
          :rules="() => 'error'"
          validate-on-mount
        />
      </kw-form-item>
    </kw-form-row>
    <!-- style : underline -->
    <kw-form-row>
      <kw-form-item label="underline dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          dense
          underline
        />
      </kw-form-item>
      <kw-form-item label="멀티플 underline dense">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          dense
          multiple
          underline
        />
      </kw-form-item>
      <kw-form-item label="use-input underline dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          dense
          underline
        />
      </kw-form-item>
    </kw-form-row>
    <!-- style : borderless -->
    <kw-form-row>
      <kw-form-item label="borderless dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          dense
          borderless
        />
      </kw-form-item>
      <kw-form-item label="멀티플 borderless dense">
        <kw-select
          v-model="arrayModel"
          :options="optionsModel"
          dense
          multiple
          borderless
        />
      </kw-form-item>
      <kw-form-item label="use-input borderless dense">
        <kw-select
          v-model="selectModel"
          :options="optionsModel"
          use-input
          dense
          borderless
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwSelect } from '../../../../src/components';
/* eslint-disable no-unused-vars */
const formRef = ref();
const selectModel = ref('A');
const optionsModel = [
  { codeId: 'A', codeName: 'A' },
  { codeId: 'B', codeName: 'B' },
  { codeId: 'C', codeName: 'C' },
  { codeId: 'D', codeName: 'D' },
  { codeId: 'E', codeName: 'E' },
  { codeId: 'F', codeName: 'F' },
  { codeId: 'G', codeName: 'G' },
  { codeId: 'H', codeName: 'H' },
  { codeId: 'I', codeName: 'I' },
];

const testOptionsModel = [
  { codeId: 'A', codeName: 'AAAAAA' },
  { codeId: 'B', codeName: 'BBBBBB' },
  { codeId: 'C', codeName: 'CCCCCC' },
  { codeId: 'D', codeName: 'DDDDDD' },
  { codeId: 'E', codeName: 'EEEEEE' },
  { codeId: 'F', codeName: 'FFFFFF' },
  { codeId: 'Z', codeName: 'E982374932847329487239487239487133957691285798gyhu987' },
];
const longOptionsModel = Array.from({ length: 100 }).map((notUse, index) => {
  const str = String.fromCharCode(index + 92);
  return { codeId: str, codeName: Array.from({ length: index }).fill(str).join('') };
});
const arrayModel = ref(['A', 'B']);

</script>

<style scoped>

</style>
