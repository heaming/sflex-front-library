<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      StyleCallback
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
import { createGridData } from '~dev/utils/data';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    { fieldName: 'col01' },
    { fieldName: 'col02' },
  ];

  const columns = [
    {
      fieldName: 'col01',
      // column style callback
      styleCallback(g, model) {
        const { itemIndex } = model.index;

        if (itemIndex % 2 === 0) {
          return {
            editable: false,
            styleName: 'text-left rg-button-link',
            renderer: { type: 'button' },
          };
        }
      },
    },
    {
      fieldName: 'col02',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  // global style callback
  // not invoked when column callback exists.
  view.setCellStyleCallback((g, model) => {
    const { itemIndex } = model.index;

    if (itemIndex % 2 === 0) {
      return {
        styleName: 'text-left text-red',
      };
    }
  });

  data.setRows(createGridData(columns, fields, 3));
}

const sampleCode = `
function initGrd(data, view) {
  const fields = [
    { fieldName: 'col01' },
    { fieldName: 'col02' },
  ];

  const columns = [
    {
      fieldName: 'col01',
      // column style callback
      styleCallback(g, model) {
        const { itemIndex } = model.index;

        if (itemIndex % 2 === 0) {
          return {
            editable: false,
            styleName: 'text-left rg-button-link',
            renderer: { type: 'button' },
          };
        }
      },
    },
    {
      fieldName: 'col02',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  // global style callback
  // not invoked when column callback exists.
  view.setCellStyleCallback((g, model) => {
    const { itemIndex } = model.index;

    if (itemIndex % 2 === 0) {
      return {
        styleName: 'text-left text-red',
      };
    }
  });

  data.setRows(createGridData(columns, fields, 3));
}
`;
</script>
