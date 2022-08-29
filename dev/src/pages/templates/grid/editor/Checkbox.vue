<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Checkbox
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
import { alert, gridUtil } from '~kw-lib';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    {
      fieldName: 'check01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'check02',
    },
    {
      fieldName: 'check03',
    },
  ];

  const columns = [
    {
      fieldName: 'check01',
      header: 'Default',
      renderer: {
        type: 'check',
        trueValues: 'Y', // default value, 생략 가능
        falseValues: 'N', // default value, 생략 가능
      },
    },
    {
      fieldName: 'check02',
      header: 'Custom (trueValues, falseValues)',
      renderer: {
        type: 'check',
        trueValues: 'A,B',
        falseValues: 'N',
      },
    },
    {
      fieldName: 'check03',
      header: 'Custom (editable false)',
      renderer: {
        type: 'check',
        editable: false,
      },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      check01: 'Y',
      check02: 'A',
      check03: 'Y',
    },
    {
      check01: 'Y',
      check02: 'B',
      check03: 'Y',
    },
    {
      check01: 'N',
      check02: 'N',
      check03: 'N',
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
      fieldName: 'check01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'check02',
    },
    {
      fieldName: 'check03',
    },
  ];

  const columns = [
    {
      fieldName: 'check01',
      header: 'Default',
      renderer: {
        type: 'check',
        trueValues: 'Y', // default value, 생략 가능
        falseValues: 'N', // default value, 생략 가능
      },
    },
    {
      fieldName: 'check02',
      header: 'Custom (trueValues, falseValues)',
      renderer: {
        type: 'check',
        trueValues: 'A,B',
        falseValues: 'N',
      },
    },
    {
      fieldName: 'check03',
      header: 'Custom (editable false)',
      renderer: {
        type: 'check',
        editable: false,
      },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      check01: 'Y',
      check02: 'A',
      check03: 'Y',
    },
    {
      check01: 'Y',
      check02: 'B',
      check03: 'Y',
    },
    {
      check01: 'N',
      check02: 'N',
      check03: 'N',
    },
  ]);
`;
</script>
