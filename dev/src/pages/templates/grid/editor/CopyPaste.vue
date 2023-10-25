<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Copy & Paste
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
        :visible-rows="10"
        @init="initGrd"
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
      fieldName: 'text01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'text02',
    },
    {
      fieldName: 'text03',
    },
    {
      fieldName: 'list01',
    },
    {
      fieldName: 'list02',
    },
  ];

  const columns = [
    {
      fieldName: 'text01',
      header: 'TEST1',
    },
    {
      fieldName: 'text02',
      header: 'TEST2',
      styleName: 'text-center', // text-left | text-center | text-right
    },
    {
      fieldName: 'text03',
      header: 'TEST3',
    },
    {
      fieldName: 'list01',
      header: '일반 리스트',
      options,
      optionValue: 'codeId',
      optionLabel: 'codeName',
      editor: { type: 'list' },
    },
    {
      fieldName: 'list02',
      header: 'displayCallback 리스트',
      options,
      editor: { type: 'list' },
      // displayCallback(g, index, value) {
      //   const { values, labels } = g.columnByName(index.column);
      //   const i = values.findIndex((v) => v === value);
      //   return i > -1 ? ` [${values[i]}] ${labels[i]}` : '';
      // },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;
  view.onCellClicked = onCellClicked;
  view.pasteOptions.enableAppend = true;

  data.setRows([
    {
      text01: '첫번째',
      text02: 'one',
      text03: '100Byte까지 입력 가능합니다. 한글은 3Byte 입니다.',
      list01: 'F',
      list02: 'F',
    },
    {
      text01: '두번째',
      text02: 'two',
      text03: '한글은 3Byte 입니다.',
      list01: 'C',
      list02: 'C',
    },
    {
      text01: '세번째',
      text02: 'three',
      text03: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼',
      list01: 'A',
      list02: 'A',
    },
    {
      text01: '네번째',
      text02: 'four',
      text03: '100Byte까지 입력 가능합니다. 한글은 3Byte 입니다.',
      list01: 'C',
      list02: 'C',
    },
    {
      text01: '다섯번째',
      text02: 'five',
      text03: '한글은 3Byte 입니다.',
      list01: 'B',
      list02: 'B',
    },
  ]);
}

async function checkCurrentRowValue() {
  const view = grdRef.value.getView();
  const rowValue = gridUtil.getSelectedRowValues(view)[0] || {};

  alert(JSON.stringify(rowValue, null, '\t'));
  await gridUtil.validate(view);
}

</script>
