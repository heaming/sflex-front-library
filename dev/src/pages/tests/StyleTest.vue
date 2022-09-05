<template>
  <!-- input -->
  <q-expansion-item
    label="Input"
  >
    <div class="result-area">
      <input-form />
    </div>
  </q-expansion-item>
  <!-- select -->
  <q-expansion-item
    label="Select"
  >
    <div class="result-area">
      <select-form />
    </div>
  </q-expansion-item>
  <!-- checkbox -->
  <q-expansion-item
    label="CheckBox"
  >
    <div class="result-area">
      <check-box-form />
    </div>
  </q-expansion-item>
  <!-- button -->
  <q-expansion-item
    label="Button"
    default-opened
  >
    <div class="result-area">
      <button-form />
    </div>
  </q-expansion-item>
  <!-- search -->
  <q-expansion-item
    label="CheckBox"
  >
    <div class="result-area">
      <kw-search :cols="0">
        <kw-search-row>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
        </kw-search-row>
        <kw-search-row>
          <kw-search-item :label="'test test test test test test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
        </kw-search-row>
        <kw-search-row>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
        </kw-search-row>
      </kw-search>

      <kw-search class="kw-search--onerow">
        <kw-search-row>
          <kw-search-item :label="'test test test test test test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
        </kw-search-row>
      </kw-search>
    </div>
  </q-expansion-item>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { InputForm, SelectForm, CheckBoxForm, ButtonForm } from '../../components/test';

const formRef = ref();
const hoverRefs = [];
const arrayModel = ref([]);

function setHoverRefs(el) { hoverRefs.push(el); }
const stringModel = ref('test');
const booleanModel = ref('test');
const numberModel = ref(0);
const selectModel = ref('A');
function simulateActive(el) {
  const evt = new MouseEvent('mouseover', { bubbles: true });

  const cancelled = !el.dispatchEvent(evt);

  if (cancelled) {
    console.log('cancelled');
  } else {
    console.log('not cancelled');
  }
}
const optionsModel = [
  { codeId: 'A', codeName: 'A' },
  { codeId: 'B', codeName: 'B' },
  { codeId: 'C', codeName: 'C' },
  { codeId: 'D', codeName: 'D' },
  { codeId: 'E', codeName: 'E' },
];
const longOptions = Array.from({ length: 100 }).map((notUse, index) => {
  const str = String.fromCharCode(index + 92);
  return { codeId: str, codeName: str };
});

onMounted(() => {
  hoverRefs.forEach((el) => {
    window.test = el.$el;
    console.log(window.getComputedStyle(el.$el, ':hover'));
  });
});
</script>

<style scoped>

</style>
