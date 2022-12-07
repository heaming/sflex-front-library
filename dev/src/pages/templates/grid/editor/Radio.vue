<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Radio
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
      fieldName: 'radio1',
    },
    {
      fieldName: 'radio2',
    },
    {
      fieldName: 'radio3',
    },
  ];

  const columns = [
    {
      fieldName: 'radio1',
      renderer: {
        type: 'radio',
      },
      options: ['Y', 'N'].map((v) => ({ codeId: v, codeName: v })),
    },
    {
      fieldName: 'radio2',
      renderer: {
        type: 'radio',
        editable: false,
      },
      options: ['Y', 'N'].map((v) => ({ codeId: v, codeName: v })),
    },
    {
      fieldName: 'radio3',
      renderer: {
        type: 'radio',
      },
      options: [...Array(5).keys()].map((v) => ({ codeId: v, codeName: v })),
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      radio1: 'Y',
      radio2: 'Y',
      radio3: '0',
    },
    {
      radio1: 'N',
      radio2: 'N',
      radio3: '1',
    },
    {
      radio1: null,
      radio2: null,
      radio3: null,
    },
  ]);
}

function checkCurrentRowValue() {
  const view = grdRef.value.getView();
  const rowValue = gridUtil.getSelectedRowValues(view)[0] || {};

  alert(JSON.stringify(rowValue, null, '\t'));
}

const sampleCode = `
`;
</script>
