<template>
  <kw-page>
    <kw-search @search="onSearch" />
    <div class="result-area">
      <kw-grid
        ref="grdRef"
        :visible-rows="9"
        @init="initGrid"
      />
    </div>
  </kw-page>
</template>

<script setup>
import { delay, loadSpinner } from '~kw-lib';

const grdRef = ref();

async function fetchData(startIndex = 0) {
  loadSpinner(true);
  await delay(200);
  loadSpinner(false);
  return Array.from({ length: 10 }, (v, i) => ({ text: `test${startIndex + i}` }));
}

async function onSearch() {
  const data = grdRef.value.getData();

  data.setRows(
    await fetchData(),
  );
}

function initGrid(data, view) {
  const fields = [
    { fieldName: 'text' },
  ];

  const columns = [
    { fieldName: 'text' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.onScrollToBottom = async () => {
    data.addRows(
      await fetchData(data.getRowCount()),
    );
  };
}

</script>
