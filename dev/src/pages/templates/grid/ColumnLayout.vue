<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Column Layout
    </h2>
    <q-card>
      <kw-action-bar>
        <kw-btn
          v-for="i of 4"
          :key="i"
          class="mr5"
          :label="`Layout ${i}`"
          @click="setLayout(i)"
        />
      </kw-action-bar>
      <kw-grid
        ref="grdRef"
        :visible-rows="3"
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

const grdRef = ref();

function setLayout(type) {
  const view = grdRef.value.getView();

  if (type === 1) {
    view.setColumnLayout([
      'col13',
      { header: 'Group1', direction: 'vertical', items: ['col12'] },
      { header: false, visible: false, direction: 'vertical', items: ['col1', 'col2'] },
      { header: false, direction: 'vertical', items: ['col6', 'col7'] },
      { header: false, direction: 'vertical', width: 200, items: [{ header: false, direction: 'horizontal', items: ['col3', 'col4'] }, 'col5'] },
      { header: false, direction: 'vertical', width: 200, items: ['col8', { header: false, direction: 'horizontal', items: ['col9', 'col10'] }] },
    ]);
  } else if (type === 2) {
    view.setColumnLayout([
      { header: 'Group1', direction: 'vertical', items: ['col1'] },
      'col2',
      { header: 'Group2', direction: 'vertical', items: ['col3'] },
      'col4', 'col5',
    ]);
  } else if (type === 3) {
    view.setColumnLayout([
      { header: false, direction: 'vertical', items: [{ column: 'col1', cellSpan: 2 }, 20, 'col2'] },
      { header: false, direction: 'vertical', items: ['col3', { column: 'col4', cellSpan: 2 }, 20] },
      { header: false, direction: 'vertical', items: ['col5', 'col6', 'col7'] },
      'col8',
    ]);
  } else if (type === 4) {
    view.setColumnLayout([
      {
        header: {
          text: 'Group1',
          visible: true,
        },
        hideChildHeaders: true,
        direction: 'vertical',
        items: ['col1', 'col2'],
      },
      {
        header: false,
        direction: 'vertical',
        items: ['col3', 'col4'],
      },
      {
        header: 'Group2',
        direction: 'horizontal',
        items: ['col5', 'col6'],
      },
      'col7',
      'col8',
    ]);
  }
}

function initGrd(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  const columns = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  data.setRows([{
    col1: 'col1',
    col2: 'col2',
    col3: 'col3',
    col4: 'col4',
    col5: 'col5',
    col6: 'col6',
    col7: 'col7',
    col8: 'col8',
    col9: 'col9',
    col10: 'col10',
    col11: 'col11',
    col12: 'col12',
    col13: 'col13' }, {
    col1: '2-col1',
    col2: '2-col2',
    col3: '2-col3',
    col4: '2-col4',
    col5: '2-col5',
    col6: '2-col6',
    col7: '2-col7',
    col8: '2-col8',
    col9: '2-col9',
    col10: '2-col10',
    col11: '2-col11',
    col12: '2-col12',
    col13: '2-col13',
  }, {
    col1: '3-col1',
    col2: '3-col2',
    col3: '3-col3',
    col4: '3-col4',
    col5: '3-col5',
    col6: '3-col6',
    col7: '3-col7',
    col8: '3-col8',
    col9: '3-col9',
    col10: '3-col10',
    col11: '3-col11',
    col12: '3-col12',
    col13: '3-col13',
  }]);

  setLayout(1);
}

const sampleCode = `
function setLayout(type) {
  const view = grdRef.value.getView();

  if (type === 1) {
    view.setColumnLayout([
      'col13',
      { header: 'Group1', direction: 'vertical', items: ['col12'] },
      { header: false, visible: false, direction: 'vertical', items: ['col1', 'col2'] },
      { header: false, direction: 'vertical', items: ['col6', 'col7'] },
      { header: false, direction: 'vertical', width: 200, items: [{ header: false, direction: 'horizontal', items: ['col3', 'col4'] }, 'col5'] },
      { header: false, direction: 'vertical', width: 200, items: ['col8', { header: false, direction: 'horizontal', items: ['col9', 'col10'] }] },
    ]);
  } else if (type === 2) {
    view.setColumnLayout([
      { header: 'Group1', direction: 'vertical', items: ['col1'] },
      'col2',
      { header: 'Group2', direction: 'vertical', items: ['col3'] },
      'col4', 'col5',
    ]);
  } else if (type === 3) {
    view.setColumnLayout([
      { header: false, direction: 'vertical', items: [{ column: 'col1', cellSpan: 2 }, 20, 'col2'] },
      { header: false, direction: 'vertical', items: ['col3', { column: 'col4', cellSpan: 2 }, 20] },
      { header: false, direction: 'vertical', items: ['col5', 'col6', 'col7'] },
      'col8',
    ]);
  } else if (type === 4) {
    view.setColumnLayout([
      {
        header: {
          text: 'Group1',
          visible: true,
        },
        hideChildHeaders: true,
        direction: 'vertical',
        items: ['col1', 'col2'],
      },
      {
        header: false,
        direction: 'vertical',
        items: ['col3', 'col4'],
      },
      {
        header: 'Group2',
        direction: 'horizontal',
        items: ['col5', 'col6'],
      },
      'col7',
      'col8',
    ]);
  }
}

function initGrd(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  const columns = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  data.setRows([{
    col1: 'col1',
    col2: 'col2',
    col3: 'col3',
    col4: 'col4',
    col5: 'col5',
    col6: 'col6',
    col7: 'col7',
    col8: 'col8',
    col9: 'col9',
    col10: 'col10',
    col11: 'col11',
    col12: 'col12',
    col13: 'col13' }, {
    col1: '2-col1',
    col2: '2-col2',
    col3: '2-col3',
    col4: '2-col4',
    col5: '2-col5',
    col6: '2-col6',
    col7: '2-col7',
    col8: '2-col8',
    col9: '2-col9',
    col10: '2-col10',
    col11: '2-col11',
    col12: '2-col12',
    col13: '2-col13',
  }, {
    col1: '3-col1',
    col2: '3-col2',
    col3: '3-col3',
    col4: '3-col4',
    col5: '3-col5',
    col6: '3-col6',
    col7: '3-col7',
    col8: '3-col8',
    col9: '3-col9',
    col10: '3-col10',
    col11: '3-col11',
    col12: '3-col12',
    col13: '3-col13',
  }]);

  setLayout(1);
}
`;
</script>
