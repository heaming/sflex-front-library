<template>
  <kw-page
    load-on-mounted
    @load="onLoad"
  >
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

const count = ref(5);

async function onLoad(index) {
  console.log(index);

  loadSpinner(true);

  await delay(500);
  count.value += 5;
  loadSpinner(false);
}

</script>
