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
</script>
