<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Toggle button
    </h2>
    <p class="kw-guide-description">
      토글버튼은 기본적으로 라디오버튼을 커스텀하여 사용됩니다.
    </p>
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
      fieldName: 'ToggleBtn1',
    },
    {
      fieldName: 'ToggleBtn2',
    },
    {
      fieldName: 'ToggleBtnDisabled',
    },
    {
      fieldName: '공백4',
    },
    {
      fieldName: '공백5',
    },
    {
      fieldName: '공백6',
    },
    {
      fieldName: '공백7',
    },
  ];

  const columns = [
    {
      fieldName: 'ToggleBtn1',
      renderer: {
        type: 'radio',
      },
      options: ['있다', '없다'].map((v) => ({ codeId: v, codeName: v })),
      styleName: 'rg-button-toggle',
    },
    {
      fieldName: 'ToggleBtn2',
      renderer: {
        type: 'radio',
      },
      options: ['있다', '없다'].map((v) => ({ codeId: v, codeName: v })),
      styleName: 'rg-button-toggle',
    },
    {
      fieldName: 'ToggleBtnDisabled',
      renderer: {
        type: 'radio',
        editable: false,
      },
      options: ['있다', '없다'].map((v) => ({ codeId: v, codeName: v })),
      styleName: 'rg-button-toggle rg-button-disabled',
    },
    {
      fieldName: '공백4',
    },
    {
      fieldName: '공백5',
    },
    {
      fieldName: '공백6',
    },
    {
      fieldName: '공백7',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      ToggleBtn1: '있다', ToggleBtn2: '없다', ToggleBtnDisabled: '있다', 공백4: '', 공백5: '', 공백6: '', 공백7: '',
    },
  ]);
}

function checkCurrentRowValue() {
  const view = grdRef.value.getView();
  const rowValue = gridUtil.getSelectedRowValues(view)[0] || {};

  alert(JSON.stringify(rowValue, null, '\t'));
}

const sampleCode = `
function initGrd(data, view) {
  const fields = [
    {
      fieldName: 'ToggleBtn1',
    },
    {
      fieldName: 'ToggleBtn2',
    },
    {
      fieldName: 'ToggleBtnDisabled',
    },
    {
      fieldName: '공백4',
    },
    {
      fieldName: '공백5',
    },
    {
      fieldName: '공백6',
    },
    {
      fieldName: '공백7',
    },
  ];

  const columns = [
    {
      fieldName: 'ToggleBtn1',
      renderer: {
        type: 'radio',
      },
      options: ['있다', '없다'].map((v) => ({ codeId: v, codeName: v })),
      styleName: 'rg-button-toggle',
    },
    {
      fieldName: 'ToggleBtn2',
      renderer: {
        type: 'radio',
      },
      options: ['있다', '없다'].map((v) => ({ codeId: v, codeName: v })),
      styleName: 'rg-button-toggle',
    },
    {
      fieldName: 'ToggleBtnDisabled',
      renderer: {
        type: 'radio',
        editable: false,
      },
      options: ['있다', '없다'].map((v) => ({ codeId: v, codeName: v })),
      styleName: 'rg-button-toggle rg-button-disabled',
    },
    {
      fieldName: '공백4',
    },
    {
      fieldName: '공백5',
    },
    {
      fieldName: '공백6',
    },
    {
      fieldName: '공백7',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      ToggleBtn1: '있다', ToggleBtn2: '없다', ToggleBtnDisabled: '있다', 공백4: '', 공백5: '', 공백6: '', 공백7: '',
    },
  ]);
}
`;
</script>
