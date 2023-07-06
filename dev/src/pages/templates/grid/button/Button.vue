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
    <q-card>
      <kw-action-bar />
      <kw-grid
        ref="grdRef"
        :visible-rows="3"
        @init="initGrid"
      />

      <guide-code-view
        :code-value="sampleCode2"
        lang="js"
      />
    </q-card>
  </kw-page>
</template>

<script setup>
import { alert } from '~kw-lib';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    {
      fieldName: 'btn01',
    },
    {
      fieldName: 'btn02',
    },
    {
      fieldName: 'btn03',
    },
    {
      fieldName: 'btn04',
    },
  ];

  const columns = [
    {
      fieldName: 'btn01',
      header: 'Default',
      renderer: {
        type: 'button',
        hideWhenEmpty: true, // default value, 생략 가능
      },
    },
    {
      fieldName: 'btn02',
      header: 'Custom (displayCallback)',
      renderer: {
        type: 'button',
        hideWhenEmpty: false,
      },
      displayCallback: () => '버튼',
    },
    {
      fieldName: 'btn03',
      header: 'Custom (Link)',
      styleName: 'rg-button-link',
      renderer: {
        type: 'button',
      },
    },
    {
      fieldName: 'btn04',
      header: 'Custom (Icon)',
      styleName: 'rg-button-icon--x',
      renderer: {
        type: 'button',
        hideWhenEmpty: false, // default value when rg-button-icon, 생략 가능
      },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.onCellItemClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\t'));
  };

  data.setRows([
    {
      btn01: '버튼',
      btn03: '링크버튼',
    },
    {
      btn01: '버튼',
      btn03: '링크버튼',
    },
    { },
  ]);
}

function initGrid(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
  ];

  const columns = [
    { fieldName: 'col1', width: '100', styleName: 'text-center rg-button-default', renderer: { type: 'button' } },
    { fieldName: 'col2', width: '100', styleName: 'text-center rg-button-default rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col3', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col4', width: '100', styleName: 'text-center rg-button-exceldown', renderer: { type: 'button' } },
    { fieldName: 'col5', width: '100', styleName: 'text-center rg-button-exceldown rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col6', width: '100', styleName: 'text-center rg-button-excelup', renderer: { type: 'button' } },
    { fieldName: 'col7',
      width: '100',
      styleName: 'rg-button-icon--search',
      button: 'action',
      styleCallback: (g, cell) => {
        if (cell.index.dataRow % 3 === 0) {
          return {
            styleName: 'rg-button-icon--search',
            editable: true,
          };
        }

        if (cell.index.dataRow % 3 === 1) {
          return {
            styleName: 'rg-button-icon--search boxed-icon',
            editable: false,
          };
        }
        return {
          styleName: 'rg-button-icon--search boxed-icon-disable',
          editable: false,
        };
      } },
    { fieldName: 'col8', width: '100', styleName: 'rg-button-icon--search rg-button-disabled', button: 'action' },
  ];
  data.setFields(fields);
  view.setColumns(columns);
  view.header.visible = false;
  view.editOptions.editable = true;

  data.setRows([
    { col1: '기본 활성1', col2: '기본 비활성1', col3: '링크 언더라인1', col4: '엑셀 다운로드1', col5: '엑셀 다운 비활성1', col6: '엑셀 업로드1', col7: '액션 검색(편집가능)1', col8: '액션 검색비활성1' },
    { col1: '기본 활성2', col2: '기본 비활성2', col3: '링크 언더라인2', col4: '엑셀 다운로드2', col5: '엑셀 다운 비활성2', col6: '엑셀 업로드2', col7: '액션 검색(편집불가)2', col8: '액션 검색비활성2' },
    { col1: '기본 활성3', col2: '기본 비활성3', col3: '링크 언더라인3', col4: '엑셀 다운로드3', col5: '엑셀 다운 비활성3', col6: '엑셀 업로드3', col7: '액션 검색(disable)3', col8: '액션 검색비활성3' },
    { col1: '기본 활성4', col2: '기본 비활성4', col3: '링크 언더라인4', col4: '엑셀 다운로드4', col5: '엑셀 다운 비활성4', col6: '엑셀 업로드4', col7: '액션 검색4', col8: '액션 검색비활성4' },
    { col1: '기본 활성5', col2: '기본 비활성5', col3: '링크 언더라인5', col4: '엑셀 다운로드5', col5: '엑셀 다운 비활성5', col6: '엑셀 업로드5', col7: '액션 검색5', col8: '액션 검색비활성5' },
    { col1: '기본 활성6', col2: '기본 비활성6', col3: '링크 언더라인6', col4: '엑셀 다운로드6', col5: '엑셀 다운 비활성6', col6: '엑셀 업로드6', col7: '액션 검색6', col8: '액션 검색비활성6' },
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
    {
      fieldName: 'btn03',
    },
    {
      fieldName: 'btn04',
    },
  ];

  const columns = [
    {
      fieldName: 'btn01',
      header: 'Default',
      renderer: {
        type: 'button',
        hideWhenEmpty: true, // default value, 생략 가능
      },
    },
    {
      fieldName: 'btn02',
      header: 'Custom (displayCallback)',
      renderer: {
        type: 'button',
        hideWhenEmpty: false,
      },
      displayCallback: () => '버튼',
    },
    {
      fieldName: 'btn03',
      header: 'Custom (Link)',
      styleName: 'rg-button-link',
      renderer: {
        type: 'button',
      },
    },
    {
      fieldName: 'btn04',
      header: 'Custom (Icon)',
      styleName: 'rg-button-icon--x',
      renderer: {
        type: 'button',
        hideWhenEmpty: false, // default value when rg-button-icon, 생략 가능
      },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.onCellItemClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\\t'));
  };

  data.setRows([
    {
      btn01: '버튼',
      btn03: '링크버튼',
    },
    {
      btn01: '버튼',
      btn03: '링크버튼',
    },
    { },
  ]);
`;

const sampleCode2 = `
function initGrid(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
  ];

  const columns = [
    { fieldName: 'col1', width: '100', styleName: 'text-center rg-button-default', renderer: { type: 'button' } },
    { fieldName: 'col2', width: '100', styleName: 'text-center rg-button-default rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col3', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col4', width: '100', styleName: 'text-center rg-button-exceldown', renderer: { type: 'button' } },
    { fieldName: 'col5', width: '100', styleName: 'text-center rg-button-exceldown rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col6', width: '100', styleName: 'text-center rg-button-excelup', renderer: { type: 'button' } },
    { fieldName: 'col7', width: '100', styleName: 'rg-button-icon--search', button: 'action' },
    { fieldName: 'col8', width: '100', styleName: 'rg-button-icon--search rg-button-disabled', button: 'action' },
  ];
  data.setFields(fields);
  view.setColumns(columns);
  view.header.visible = false;
  view.editOptions.editable = true;

  data.setRows([
    { col1: '기본 활성', col2: '기본 비활성', col3: '링크 언더라인', col4: '엑셀 다운로드', col5: '엑셀 다운 비활성', col6: '엑셀 업로드', col7: '액션 검색', col8: '액션 검색비활성' },
  ]);
}`;
</script>
