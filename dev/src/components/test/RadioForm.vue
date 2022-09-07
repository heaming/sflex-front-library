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
        <q-radio
          v-for="(item, i) of ['A', 'B', 'C', 'D']"
          :key="i"
          v-model="stringModel"
          :label="item"
          :val="item"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-radio
          v-for="(item, i) of ['A', 'B', 'C', 'D']"
          :key="i"
          v-model="stringModel"
          :label="item"
          :val="item"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- disable -->
    <kw-form-row>
      <kw-form-item label="disable">
        <kw-radio
          v-for="(item, i) of ['A', 'B', 'C', 'D']"
          :key="i"
          v-model="stringModel"
          :label="item"
          :val="item"
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- readonly -->
    <kw-form-row>
      <kw-form-item label="readonly">
        <kw-radio
          v-for="(item, i) of ['A', 'B', 'C', 'D']"
          :key="i"
          v-model="stringModel"
          :label="item"
          :val="item"
          readonly
        />
      </kw-form-item>
    </kw-form-row>
    <!-- dense -->
    <kw-form-row>
      <kw-form-item label="dense">
        <kw-radio
          v-for="(item, i) of ['A', 'B', 'C', 'D']"
          :key="i"
          v-model="stringModel"
          :label="item"
          :val="item"
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <!-- icon -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-radio
          v-for="(item, i) of ['A', 'B', 'C', 'D']"
          :key="i"
          v-model="stringModel"
          :label="item"
          :val="item"
          checked-icon="checkbox"
          unchecked-icon="emptybox"
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue';
import { KwRadio } from '../../../../src/components';

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
  > div {
    background-color: #eee;
  }
}
</style>
