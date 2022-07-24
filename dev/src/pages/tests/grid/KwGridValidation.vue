<template>
  <q-page class="q-pa-md">
    <button @click="onClickAdd">
      추가
    </button>
    <button @click="onClickCheck">
      값 체크
    </button>
    <kw-grid
      :visible-rows="7"
      @init="initGrid"
    />
  </q-page>
</template>

<script>
import { createGridData } from '~/utils/data';
import { gridUtil } from '~lib';

export default {
  setup() {
    let gridData;
    let gridView;

    return {
      onClickAdd() {
        gridData.addRow({});
      },

      async onClickCheck() {
        console.log(await gridUtil.validate(gridView));
      },

      initGrid(data, view) {
        gridData = data;
        gridView = view;

        const fields = [
          { fieldName: 'text', dataType: 'text' },
          { fieldName: 'number', dataType: 'number' },
          { fieldName: 'multiline', dataType: 'text' },
          { fieldName: 'list', dataType: 'text' },
          { fieldName: 'check', dataType: 'boolean' },
          { fieldName: 'date', dataType: 'date' },
        ];

        const columns = [
          {
            fieldName: 'text',
            rules: 'required',
          },
          {
            fieldName: 'number',
            editor: { type: 'number' },
          },
          {
            fieldName: 'multiline',
            editor: { type: 'multiline' },
          },
          {
            fieldName: 'list',
            editor: { type: 'list' },
            items: [
              { value: 'value1', label: 'label1' },
              { value: 'value2', label: 'label2' },
              { value: 'value3', label: 'label3' },
            ],
          },
          {
            fieldName: 'check',
            renderer: { type: 'check' },
          },
          {
            fieldName: 'date',
            editor: { type: 'btdate' },
          },
        ];

        gridData.setFields(fields);
        gridView.setColumns(columns);

        gridData.setRows(createGridData(columns, fields, 7));
      },
    };
  },
};
</script>
