<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Tree Grid
    </h2>
    <q-card>
      <kw-action-bar />
      <kw-tree-grid
        ref="grdRef"
        :visible-rows="10"
        @init="initGrd"
      />

      <guide-code-view
        :code-value="sampleCode"
        lang="js"
      />
    </q-card>
  </kw-page>
</template>

<script setup>

function initGrd(data, view) {
  const fields = [
    { fieldName: 'text' },
  ];

  const columns = [
    {
      fieldName: 'text',
      header: 'text',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  data.setRows(
    [
      { text: 'A' },
      { text: 'A.01' },
      { text: 'A.01.01' },
      { text: 'A.01.01.01' },
      { text: 'A.01.02' },
      { text: 'A.02' },
      { text: 'A.02.01' },
      { text: 'A.02.02' },
      { text: 'B' },
      { text: 'B.01' },
      { text: 'B.01.01' },
      { text: 'B.01.01.01' },
      { text: 'B.01.02' },
      { text: 'B.02' },
      { text: 'B.02.01' },
      { text: 'B.02.02' },
    ],
    'text',
  );

  view.expandAll();
}

const sampleCode = `
function initGrd(data, view) {
  const fields = [
    { fieldName: 'text', dataType: 'text' },
  ];

  const columns = [
    {
      fieldName: 'text',
      header: 'text',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  data.setRows([
    { text: 'A' },
    { text: 'A.01' },
    { text: 'A.01.01' },
    { text: 'A.01.02' },
    { text: 'A.02' },
    { text: 'A.02.01' },
    { text: 'A.02.02' },
    { text: 'B' },
    { text: 'B.01' },
    { text: 'B.01.01' },
    { text: 'B.01.02' },
    { text: 'B.02' },
    { text: 'B.02.01' },
    { text: 'B.02.02' },
  ], 'text');

  view.expandAll();
}
`;

</script>
