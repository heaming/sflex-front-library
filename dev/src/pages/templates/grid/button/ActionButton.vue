<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Button
    </h2>
    <q-card>
      <kw-action-bar />
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
// eslint-disable-next-line no-unused-vars
import { alert } from '~lib';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    {
      fieldName: 'btn01',
    },
    {
      fieldName: 'btn02',
    },
  ];

  const columns = [
    {
      fieldName: 'btn01',
      header: 'Default',
      button: 'action',
    },
    {
      fieldName: 'btn02',
      header: 'Custom (Icon)',
      styleName: 'rg-button-icon--x',
      button: 'action',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  view.onCellButtonClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\t'));
  };

  data.setRows([
    {},
    {},
    {},
  ]);
}

const sampleCode = `
  const fields = [
    {
      fieldName: 'btn01',
    },
    {
      fieldName: 'btn02',
    },
  ];

  const columns = [
    {
      fieldName: 'btn01',
      header: 'Default',
      button: 'action',
    },
    {
      fieldName: 'btn02',
      header: 'Custom (Icon)',
      styleName: 'rg-button-icon--x',
      button: 'action',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  view.onCellButtonClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\\t'));
  };

  data.setRows([
    {},
    {},
    {},
  ]);
`;
</script>
