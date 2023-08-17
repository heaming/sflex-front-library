<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      List (Dropdown)
    </h2>
    <q-card>
      <kw-action-bar>
        <kw-btn
          label="선택된 행 값 확인"
          @click="checkCurrentRowValue"
        />
      </kw-action-bar>
      <kw-grid
        ref="grdRef"
        :visible-rows="6"
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
import { alert, gridUtil } from '~kw-lib';

const grdRef = ref();

function onCellClicked(grid, clickData) {
  console.log(grid, clickData);
}

function initGrd(data, view) {
  const options = [
    { codeId: 'A', codeName: 'Name of A' },
    { codeId: 'B', codeName: 'Name of B' },
    { codeId: 'C', codeName: 'Name of C' },
    { codeId: 'D', codeName: 'Name of D' },
    { codeId: 'E', codeName: 'Name of E' },
    { codeId: 'F', codeName: 'Name of F' },
    { codeId: 'G', codeName: 'Name of G' },
    { codeId: 'H', codeName: 'Name of H' },
    { codeId: 'I', codeName: 'Name of I' },
    { codeId: 'J', codeName: 'Name of J' },
    { codeId: 'K', codeName: 'Name of K' },
    { codeId: 'L', codeName: 'Name of L' },
    { codeId: 'M', codeName: 'Name of M' },
    { codeId: 'N', codeName: 'Name of N' },
    { codeId: 'O', codeName: 'Name of O' },
    { codeId: 'P', codeName: 'Name of P' },
  ];

  const fields = [
    {
      fieldName: 'list01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'list02',
    },
    {
      fieldName: 'list03',
    },
    {
      fieldName: 'list04',
    },
  ];

  const columns = [
    {
      fieldName: 'list01',
      header: 'Default',
      options,
      styleName: 'text-right',
      editor: { type: 'list' },
    },
    {
      fieldName: 'list02',
      header: 'Custom (optionValue, optionLabel, firstOption)',
      options: options.map((v) => ({ value: v.codeId, label: v.codeName })),
      optionValue: 'value',
      optionLabel: 'label',
      styleName: 'text-center',
      editor: { type: 'list' },
      firstOption: 'select', // preset: 'all', 'select'
      firstOptionValue: '', // default value, 생략 가능
      firstOptionLabel: '선택', // default value, 생략 가능
    },
    {
      fieldName: 'list03',
      header: 'Custom (displayCallback)',
      options,
      editor: { type: 'list' },
      displayCallback(g, index, value) {
        const { values, labels } = g.columnByName(index.column);
        const i = values.findIndex((v) => v === value);
        return i > -1 ? ` [${values[i]}] ${labels[i]}` : '';
      },
    },
    {
      fieldName: 'list04',
      header: 'MultiCheckList',
      options: options.map((v) => ({ value: v.codeId, label: v.codeName })),
      optionValue: 'value',
      optionLabel: 'label',
      styleName: 'text-center',
      editor: { type: 'checklist', itemSortStyle: 'descending', showAllCheck: true, allCheckText: '전체' },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;
  view.onCellClicked = onCellClicked;
  data.setRows([
    {
      list01: '',
      list02: '',
      list03: '',
    },
    {
      list01: 'A',
      list02: 'A',
      list03: 'A',
    },
    {
      list01: 'B',
      list02: 'B',
      list03: 'B',
    },
  ]);
}

function checkCurrentRowValue() {
  const view = grdRef.value.getView();
  const rowValue = gridUtil.getSelectedRowValues(view)[0] || {};

  alert(JSON.stringify(rowValue, null, '\t'));
}

const sampleCode = `
  const options = [
    { codeId: 'A', codeName: 'Name of A' },
    { codeId: 'B', codeName: 'Name of B' },
    { codeId: 'C', codeName: 'Name of C' },
    { codeId: 'D', codeName: 'Name of D' },
  ];

  const fields = [
    {
      fieldName: 'list01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'list02',
    },
    {
      fieldName: 'list03',
    },
    {
      fieldName: 'list04',
    },
  ];

  const columns = [
    {
      fieldName: 'list01',
      header: 'Default',
      options,
      styleName: 'text-right',
      editor: { type: 'list' },
    },
    {
      fieldName: 'list02',
      header: 'Custom (optionValue, optionLabel, firstOption)',
      options: options.map((v) => ({ value: v.codeId, label: v.codeName })),
      optionValue: 'value',
      optionLabel: 'label',
      styleName: 'text-center',
      editor: { type: 'list' },
      firstOption: 'select', // preset: 'all', 'select'
      firstOptionValue: '', // default value, 생략 가능
      firstOptionLabel: '선택', // default value, 생략 가능
    },
    {
      fieldName: 'list03',
      header: 'Custom (displayCallback)',
      options,
      editor: { type: 'list' },
      displayCallback(g, index, value) {
        const { values, labels } = g.columnByName(index.column);
        const i = values.findIndex((v) => v === value);
        return i > -1 ? \` [\${values[i]}] \${labels[i]}\` : '';
      },
    },
    {
      fieldName: 'list04',
      header: 'MultiCheckList',
      options: options.map((v) => ({ value: v.codeId, label: v.codeName })),
      optionValue: 'value',
      optionLabel: 'label',
      styleName: 'text-center',
      editor: { type: 'checklist', itemSortStyle: 'descending', showAllCheck: true, allCheckText: '전체' },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;
  view.onCellClicked = onCellClicked;
  data.setRows([
    {
      list01: '',
      list02: '',
      list03: '',
    },
    {
      list01: 'A',
      list02: 'A',
      list03: 'A',
    },
    {
      list01: 'B',
      list02: 'B',
      list03: 'B',
    },
  ]);
`;
</script>
