<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Grouping
    </h2>
    <q-card>
      <kw-action-bar />
      <kw-grid
        :visible-rows="14"
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
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
  ];

  function valueCallback(g, column, groupFooterIndex, group) {
    const children = group.children
      .map((v) => (v.type === 'group' ? v.children : v)).flat()
      .filter((v) => v.type === 'row');

    return children.reduce((a, v) => a + (g.getValue(v.index, column.name) === 'Y' ? 1 : 0), 0);
  }
  const columns = [
    { fieldName: 'col1', width: '200', styleName: 'text-center', groupFooter: { styleName: 'text-center text-blue' } },
    { fieldName: 'col2', width: '200', styleName: 'text-center' },
    { fieldName: 'col3', width: '60', styleName: 'text-center', groupFooter: { styleName: 'text-center text-red', valueCallback } },
  ];

  const layouts = [{ column: 'col1', groupFooterSpans: [2] }, 'col2', 'col3'];
  const groupFields = ['col1', 'col2'];

  data.setFields(fields);
  view.setColumns(columns);
  view.setColumnLayout(layouts);
  view.groupBy(groupFields);
  view.rowIndicator.visible = true;
  // eslint-disable-next-line no-template-curly-in-string
  view.rowGroup.footerStatement = '${groupValue} (Total: ${rowCount})';

  data.setRows([
    { col1: 'A', col2: 'A-1', col3: 'Y' },
    { col1: 'A', col2: 'A-1', col3: 'N' },
    { col1: 'A', col2: 'A-2', col3: 'Y' },
    { col1: 'A', col2: 'A-2', col3: 'Y' },
    { col1: 'B', col2: 'B-1', col3: 'N' },
    { col1: 'B', col2: 'B-1', col3: 'N' },
    { col1: 'B', col2: 'B-2', col3: 'Y' },
    { col1: 'B', col2: 'B-2', col3: 'N' },
  ]);
}

const sampleCode = `
function initGrd(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
  ];

  function valueCallback(g, column, groupFooterIndex, group) {
    const children = group.children
      .map((v) => (v.type === 'group' ? v.children : v)).flat()
      .filter((v) => v.type === 'row');

    return children.reduce((a, v) => a + (g.getValue(v.index, column.name) === 'Y' ? 1 : 0), 0);
  }
  const columns = [
    { fieldName: 'col1', width: '500', styleName: 'text-center', groupFooter: { styleName: 'text-center' } },
    { fieldName: 'col2', width: '500', styleName: 'text-center' },
    { fieldName: 'col3', width: '60', styleName: 'text-center', groupFooter: { styleName: 'text-center', valueCallback } },
  ];

  const layouts = [{ column: 'col1', groupFooterSpans: [2] }, 'col2', 'col3'];
  const groupFields = ['col1', 'col2'];

  data.setFields(fields);
  view.setColumns(columns);
  view.setColumnLayout(layouts);
  view.groupBy(groupFields);
  view.rowIndicator.visible = true;
  // eslint-disable-next-line no-template-curly-in-string
  view.rowGroup.footerStatement = '\${groupValue} (Total: \${rowCount})';

  data.setRows([
    { col1: 'A', col2: 'A-1', col3: 'Y' },
    { col1: 'A', col2: 'A-1', col3: 'N' },
    { col1: 'A', col2: 'A-2', col3: 'Y' },
    { col1: 'A', col2: 'A-2', col3: 'Y' },
    { col1: 'B', col2: 'B-1', col3: 'N' },
    { col1: 'B', col2: 'B-1', col3: 'N' },
    { col1: 'B', col2: 'B-2', col3: 'Y' },
    { col1: 'B', col2: 'B-2', col3: 'N' },
  ]);
`;
</script>
