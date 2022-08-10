<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Dynamic Editable
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
import { createGridData } from '@/utils/data';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    { fieldName: 'text', dataType: 'text' },
    { fieldName: 'number', dataType: 'number' },
    { fieldName: 'multiline', dataType: 'text' },
    { fieldName: 'list', dataType: 'text' },
    { fieldName: 'check', dataType: 'text' },
    { fieldName: 'date', dataType: 'text' },
  ];

  const columns = [
    {
      fieldName: 'text',
      header: 'text',
    },
    {
      fieldName: 'number',
      editor: { type: 'number' },
    },
    {
      fieldName: 'multiline',
      editor: { type: 'multiline' },
    },
    {
      fieldName: 'list',
      editor: { type: 'list' },
      options: [
        { codeId: 'value1', codeName: 'label1' },
        { codeId: 'value2', codeName: 'label2' },
        { codeId: 'value3', codeName: 'label3' },
      ],
    },
    {
      fieldName: 'check',
      renderer: { type: 'check' },
    },
    {
      fieldName: 'date',
      editor: { type: 'btdate' },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  view.onCellEditable = (grid, index) => {
    // when return false
    // block to open editor
    // and set disable class
    if (index.itemIndex % 2 === 0) {
      return false;
    }
  };

  data.setRows(createGridData(columns, fields, 3));
}

const sampleCode = `
  const fields = [
    { fieldName: 'text', dataType: 'text' },
    { fieldName: 'number', dataType: 'number' },
    { fieldName: 'multiline', dataType: 'text' },
    { fieldName: 'list', dataType: 'text' },
    { fieldName: 'check', dataType: 'text' },
    { fieldName: 'date', dataType: 'text' },
  ];

  const columns = [
    {
      fieldName: 'text',
      header: 'text',
    },
    {
      fieldName: 'number',
      editor: { type: 'number' },
    },
    {
      fieldName: 'multiline',
      editor: { type: 'multiline' },
    },
    {
      fieldName: 'list',
      editor: { type: 'list' },
      options: [
        { codeId: 'value1', codeName: 'label1' },
        { codeId: 'value2', codeName: 'label2' },
        { codeId: 'value3', codeName: 'label3' },
      ],
    },
    {
      fieldName: 'check',
      renderer: { type: 'check' },
    },
    {
      fieldName: 'date',
      editor: { type: 'btdate' },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  view.onCellEditable = (grid, index) => {
    // when return false
    // block to open editor
    // and set disable class
    if (index.itemIndex % 2 === 0) {
      return false;
    }
  };
`;
</script>
