<template>
  <q-page class="q-pa-md">
    <kw-grid
      :visible-rows="7"
      @init="initGrid"
    />
  </q-page>
</template>

<script>
import { createGridData } from '~/utils/data';

export default {
  setup() {
    return {
      initGrid(gridData, gridView) {
        const fields = [
          { fieldName: 'button', dataType: 'text' },
          { fieldName: 'iconButton', dataType: 'text' },
          { fieldName: 'linkButton', dataType: 'text' },
          { fieldName: 'cellButton', dataType: 'text' },
        ];
        const columns = [
          {
            fieldName: 'button',
            renderer: { type: 'button' },
          },
          {
            fieldName: 'iconButton',
            styleName: 'rg-button-icon',
            renderer: { type: 'button' },
          },
          {
            fieldName: 'linkButton',
            styleName: 'rg-button-link rg-button-disabled',
            renderer: { type: 'button' },
          },
          {
            fieldName: 'cellButton',
            button: 'action',
          },
        ];

        gridData.setFields(fields);
        gridView.setColumns(columns);

        gridView.onCellItemClickable = (grid, index) => index.itemIndex % 2 === 0;

        gridView.onCellItemClicked = (grid, index) => {
          console.log(index);
        };

        gridView.onCellButtonClicked = (grid, index) => {
          console.log(index);
        };

        gridData.setRows(createGridData(columns, fields, 7));
      },
    };
  },

};
</script>
