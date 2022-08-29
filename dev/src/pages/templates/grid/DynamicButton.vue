<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Dynamic Button
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
      },
    },
    {
      fieldName: 'btn02',
      header: 'Custom (Link)',
      styleName: 'rg-button-link',
      renderer: {
        type: 'button',
      },
    },
    {
      fieldName: 'btn03',
      header: 'Custom (Icon)',
      styleName: 'rg-button-icon--x',
      renderer: {
        type: 'button',
        hideWhenEmpty: false,
      },
    },
    {
      fieldName: 'btn04',
      header: 'Custom (cellButton Icon)',
      styleName: 'rg-button-icon--x',
      button: 'action',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.onCellItemClickable = (g, index) => {
    // when return false
    // stop propagation to clicked event
    // and set disable class
    if (index.itemIndex % 2 === 0) {
      return false;
    }
  };

  view.onCellItemClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\t'));
  };

  view.onCellButtonClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\t'));
  };

  data.setRows([
    {
      btn01: '버튼',
      btn02: '링크버튼',
    },
    {
      btn01: '버튼',
      btn02: '링크버튼',
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
      fieldName: 'btn03',
      header: 'Custom (Link)',
      styleName: 'rg-button-link',
      renderer: {
        type: 'button',
      },
    },
    {
      fieldName: 'btn03',
      header: 'Custom (Icon)',
      styleName: 'rg-button-icon--x',
      renderer: {
        type: 'button',
        hideWhenEmpty: false, // default value when rg-button-icon, 생략 가능
      },
    },
    {
      fieldName: 'btn04',
      header: 'Custom (Icon)',
      styleName: 'rg-button-icon--x',
      button: 'action',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.onCellItemClickable = (g, index) => {
    // when return false
    // stop propagation to clicked event
    // and set disable class
    if (index.itemIndex % 2 === 0) {
      return false;
    }
  };

  view.onCellItemClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\\t'));
  };

  view.onCellButtonClicked = (g, index) => {
    alert(JSON.stringify(index, null, '\\t'));
  };

  data.setRows([
    {
      btn01: '버튼',
      btn02: '링크버튼',
    },
    {
      btn01: '버튼',
      btn02: '링크버튼',
    },
    { },
  ]);
`;
</script>
