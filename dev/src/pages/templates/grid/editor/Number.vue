<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Number
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
import { alert, gridUtil } from '~lib';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    {
      fieldName: 'number01',
      dataType: 'number',
    },
    {
      fieldName: 'number02',
      dataType: 'number',
    },
    {
      fieldName: 'number03',
      dataType: 'number',
    },
  ];

  const columns = [
    {
      fieldName: 'number01',
      header: 'Default',
      numberFormat: '#,##0.######', // default value, 생략 가능
      editor: {
        type: 'number',
        maxIntegerLength: 13, // default value, 생략 가능
      },
    },
    {
      fieldName: 'number02',
      header: 'Custom (positveOnly, maxIntegerLength)',
      editor: {
        type: 'number',
        maxIntegerLength: 4,
        positiveOnly: true,
      },
    },
    {
      fieldName: 'number03',
      header: 'Custom (numberFormat, editFormat)',
      numberFormat: '#,##0.###',
      editor: {
        type: 'number',
        editFormat: '#,##0.###',
      },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      number01: 123456789,
      number02: 1234,
      number03: 123456789,
    },
    {
      number01: 123456789.123,
      number02: 1234.123,
      number03: 123456789.1,
    },
    {
      number01: 123456789.123456,
      number02: 1234.123456,
      number03: 123456789.123,
    },
  ]);
}

function checkCurrentRowValue() {
  const view = grdRef.value.getView();
  const rowValue = gridUtil.getSelectedRowValues(view)[0] || {};

  alert(JSON.stringify(rowValue, null, '\t'));
}

const sampleCode = `
  const fields = [
    {
      fieldName: 'number01',
      dataType: 'number',
    },
    {
      fieldName: 'number02',
      dataType: 'number',
    },
    {
      fieldName: 'number03',
      dataType: 'number',
    },
  ];

  const columns = [
    {
      fieldName: 'number01',
      header: 'Default',
      numberFormat: '#,##0.######', // default value, 생략 가능
      editor: {
        type: 'number',
        maxIntegerLength: 13, // default value, 생략 가능
      },
    },
    {
      fieldName: 'number02',
      header: 'Custom (positveOnly, maxIntegerLength)',
      editor: {
        type: 'number',
        maxIntegerLength: 4,
        positiveOnly: true,
      },
    },
    {
      fieldName: 'number03',
      header: 'Custom (numberFormat, editFormat)',
      numberFormat: '#,##0.###',
      editor: {
        type: 'number',
        editFormat: '#,##0.###',
      },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      number01: 123456789,
      number02: 1234,
      number03: 123456789,
    },
    {
      number01: 123456789.123,
      number02: 1234.123,
      number03: 123456789.1,
    },
    {
      number01: 123456789.123456,
      number02: 1234.123456,
      number03: 123456789.123,
    },
  ]);
`;
</script>
