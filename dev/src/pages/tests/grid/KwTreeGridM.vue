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
    <kw-tree-grid
      :visible-rows="20"
      @init="initGrid"
    />
  </q-page>
</template>

<script>
import { gridUtil, alert } from '~kw-lib';
import { createTreeData } from '~dev/utils/data';

export default {
  setup() {
    let treeData = gridUtil.defineTreeData();
    let treeView = gridUtil.defineTreeView();

    let columns;
    let fields;

    let onClickExport;

    return {
      onClickGetRowValue() {
        const { dataRow } = treeView.getCurrent();

        if (dataRow > -1) {
          console.log(gridUtil.getRowValue(treeView, dataRow));
        }
      },

      onClickGetOrigRowValue() {
        const { dataRow } = treeView.getCurrent();

        if (dataRow > -1) {
          console.log(gridUtil.getOrigRowValue(treeView, dataRow));
        }
      },

      onClickExport() {
        onClickExport?.();
      },

      onClickAdd() {
        treeData.addRow({});
      },

      onClickRemove() {
        treeData.removeRows(treeView.getCheckedRows());
      },

      onClickInit() {
        gridUtil.init(treeView);
      },

      onClickReset() {
        gridUtil.reset(treeView);
      },
      onClickIsModified() {
        alert(gridUtil.isModified(treeView));
      },

      initGrid(data, view) {
        // eslint-disable-next-line no-unused-vars
        treeData = data;
        treeView = view;

        fields = [
          { fieldName: 'treeKey', dataType: 'text' },
          { fieldName: 'text', dataType: 'text' },
          { fieldName: 'number', dataType: 'number' },
          { fieldName: 'multiline', dataType: 'text' },
          { fieldName: 'list', dataType: 'text' },
          { fieldName: 'check', dataType: 'text' },
          { fieldName: 'date', dataType: 'datetime' },
        ];

        columns = [
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
            items: [
              { value: 'value1', label: 'label1' },
              { value: 'value2', label: 'label2' },
              { value: 'value3', label: 'label3' },
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

        treeData.setFields(fields);
        treeView.setColumns(columns);
        // treeView.editOptions.editable = false;

        treeView.onCellEditable = (grid, index) => index.itemIndex % 2 === 0;

        treeData.setRows(createTreeData(columns, fields, 1000, 'treeKey', 10), 'treeKey');

        onClickExport = async () => {
          await gridUtil.exportView(treeView, {
            exportData: createTreeData(columns, fields, 10000, 'treeKey'),
            exportLayout: fields.map((e) => e.fieldName).reverse(),
          });
        };
      },
    };
  },
};
</script>
