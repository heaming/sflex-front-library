<template>
  <kw-page>
    <div class="result-area">
      <kw-virtual-scroll
        style="max-height: 300px;"
        :items="heavyList"
        separator
        @load="onLoad"
      >
        <template #default="{ item, index }">
          <q-item
            :key="index"
            dense
          >
            <q-item-section>
              <q-item-label>
                #{{ index }} - {{ item.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </kw-virtual-scroll>
    </div>
  </kw-page>
</template>

<script setup>
import { loadSpinner } from '~kw-lib';

const maxSize = 100;
const heavyList = ref([]);

const addData = () => {
  for (let i = 0, j = heavyList.value.length; i < maxSize; i += 1, j += 1) {
    heavyList.value.push({
      label: `Option ${j}`,
    });
  }
};

const onLoad = (index) => {
  console.log(index);

  loadSpinner(true);

  setTimeout(() => {
    addData();
    loadSpinner(false);
  }, 1000);
};
</script>
