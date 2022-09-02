<template>
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
  <q-expansion-item
    label="CheckBox"
    default-opened
  >
    <div class="result-area">
      <q-checkbox
        v-model="booleanModel"
        size="22px"
      />
      <q-checkbox
        v-model="booleanModel"
        size="44px"
        dense
      />
      <q-checkbox
        v-model="booleanModel"
        size="18px"
      />
      <q-checkbox
        v-model="booleanModel"
        size="26px"
        dense
      />
    </div>
  </q-expansion-item>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { InputForm, SelectForm } from '../../components/test';

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
