<template>
  <q-page class="q-pa-md">
    <button @click="onClickGetRowValue">
      getRowValue
    </button>
    <button @click="onClickGetOrigRowValue">
      getOrigRowValue
    </button>
    <button @click="onClickExport">
      ExportView
    </button>
    <button @click="onClickAdd">
      Add
    </button>
    <button @click="onClickRemove">
      Remove
    </button>
    <button @click="onClickInit">
      Init
    </button>
    <button @click="onClickReset">
      Reset
    </button>
    <button @click="onClickIsModified">
      isModified
    </button>
    <kw-grid
      :visible-rows="7"
      @init="initGrid"
    />
  </q-page>
</template>

<script>
import { gridUtil, alert } from '~kw-lib';
import { createGridData } from '~dev/utils/data';

export default {
  setup() {
    let gridData;
    let gridView;

    let onClickExport;

    return {
      onClickGetRowValue() {
        const { dataRow } = gridView.getCurrent();

        if (dataRow > -1) {
          console.log(gridUtil.getRowValue(gridView, dataRow));
        }
      },

      onClickGetOrigRowValue() {
        const { dataRow } = gridView.getCurrent();

        if (dataRow > -1) {
          console.log(gridUtil.getOrigRowValue(gridView, dataRow));
        }
      },

      onClickExport() {
        onClickExport?.();
      },

      onClickAdd() {
        gridData.addRow({});
      },

      onClickRemove() {
        gridData.removeRows(gridView.getCheckedRows());
      },

      onClickInit() {
        gridUtil.init(gridView);
      },

      onClickReset() {
        gridUtil.reset(gridView);
      },
      onClickIsModified() {
        alert(gridUtil.isModified(gridView));
      },

      initGrid(data, view) {
        // eslint-disable-next-line no-unused-vars
        gridData = data;
        gridView = view;

        const fields = [
          { fieldName: 'text', dataType: 'text' },
          { fieldName: 'number', dataType: 'number' },
          { fieldName: 'multiline', dataType: 'text' },
          { fieldName: 'list', dataType: 'text' },
          { fieldName: 'check', dataType: 'text' },
          { fieldName: 'date', dataType: 'datetime' },
        ];

        const columns = [
          {
            fieldName: 'text',
            rules: 'max:@number',
            header: 'text',
            editor: {
              maxLength: 30,
            },
          },
          {
            fieldName: 'number',
            editor: {
              type: 'number',
              positiveOnly: true,
              maxIntegerLength: 4,
            },
          },
          {
            fieldName: 'multiline',
            editor: { type: 'multiline' },
          },
          {
            fieldName: 'list',
            editor: { type: 'list' },
            options: [
              { codeId: 'value1', codeName: 'label1' },
              { codeId: 'value2', codeName: 'label2' },
              { codeId: 'value3', codeName: 'label3' },
            ],
            itemDefaultLabel: '-선택-',
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

        const layout = [
          'text',
          'number',
          'multiline',
          'list',
          {
            direction: 'horizontal',
            items: [
              'check',
              'date',
            ],
            hideChildHeaders: true,
            header: {
              text: 'test',
              styleName: 'essential',
            },
          },
        ];
        gridView.setColumnLayout(layout);
        gridData.setFields(fields);
        gridView.setColumns(columns);
        // gridView.editOptions.editable = false;

        gridView.onCellEditable = (grid, index) => index.itemIndex % 2 === 0;

        gridData.setRows(createGridData(columns, fields, 7));

        onClickExport = () => {
          gridUtil.exportView(gridView, {
            exportData: createGridData(columns, fields, 100000),
            exportLayout: fields.map((e) => e.fieldName).reverse(),
          });
        };
      },
    };
  },
};
</script>
