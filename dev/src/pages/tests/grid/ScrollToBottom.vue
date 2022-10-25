<template>
  <kw-page>
    <kw-grid
      :visible-rows="6"
      @init="initGrid"
    />
  </kw-page>
</template>

<script setup>

function initGrid(data, view) {
  const fields = [
    { fieldName: 'text' },
  ];

  const columns = [
    { fieldName: 'text' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.onScrollToBottom = () => {
    console.log('onScrollToBottom');
  };

  data.setRows(
    Array(8).fill().map((v, i) => ({ text: `test${i}` })),
  );
}

</script>
