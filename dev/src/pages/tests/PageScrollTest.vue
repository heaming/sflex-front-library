<template>
  <kw-page
    ref="pageRef"
    load-on-mounted
    @load="onLoad"
  >
    <button @click="resetLoad">
      reset
    </button>
    <button @click="stopLoad">
      stop
    </button>
    <div class="result-area">
      <div class="bg-grey">
        <div
          v-for="n of count"
          :key="n"
          class="flex items-center h40 px20"
          style="border-bottom: 1px solid #000;"
        >
          {{ n }}
        </div>
      </div>
    </div>
  </kw-page>
</template>

<script setup>
import { loadSpinner, delay } from '~kw-lib';

const count = ref(10);
const pageRef = ref();

async function resetLoad() {
  count.value = 5;
  await pageRef.value.startLoad();
}
async function stopLoad() {
  await pageRef.value.stopLoad();
}
async function onLoad(pageIdx) {
  console.log(pageIdx);

  loadSpinner(true);

  await delay(500);
  count.value += 10;
  loadSpinner(false);
  if (count.value === 50) {
    await pageRef.value.stopLoad();
  }
}

</script>
