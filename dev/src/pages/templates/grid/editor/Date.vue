<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Date
    </h2>
    <q-card>
      <kw-action-bar>
        <kw-btn>
          <kw-btn
            label="선택된 행 값 확인"
            @click="checkCurrentRowValue"
          />
        </kw-btn>
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
import { alert, gridUtil } from '~lib';
import dayjs from 'dayjs';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    {
      fieldName: 'date01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'date02',
    },
    {
      fieldName: 'date03',
    },
  ];

  const columns = [
    {
      fieldName: 'date01',
      header: 'Default',
      datetimeFormat: 'yyyy-MM-dd', // default value, 생략 가능
      editor: {
        type: 'btdate',
        datetimeFormat: 'yyyyMMdd', // default value, 생략 가능
      },
    },
    {
      fieldName: 'date02',
      header: 'Custom (datetimeFormat)',
      datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      editor: {
        type: 'btdate',
        datetimeFormat: 'yyyyMMddHHmmss',
      },
    },
    {
      fieldName: 'date03',
      header: 'Custom (datetimeFormat, align class)',
      styleName: 'text-center',
      datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      editable: false,
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      date01: dayjs().add(-1, 'M').format('YYYYMMDD'),
      date02: dayjs().add(-1, 'M').format('YYYYMMDDHHmmss'),
      date03: dayjs().add(-1, 'M').format('YYYYMMDDHHmmss'),
    },
    {
      date01: dayjs().format('YYYYMMDD'),
      date02: dayjs().format('YYYYMMDDHHmmss'),
      date03: dayjs().format('YYYYMMDDHHmmss'),
    },
    {
      date01: dayjs().add(1, 'M').format('YYYYMMDD'),
      date02: dayjs().add(1, 'M').format('YYYYMMDDHHmmss'),
      date03: dayjs().add(1, 'M').format('YYYYMMDDHHmmss'),
    },
  ]);
}

function checkCurrentRowValue() {
  const view = grdRef.value.getView();
  const rowValue = gridUtil.getSelectedRowValues(view)[0] || {};

  alert(JSON.stringify(rowValue, null, '\t'));
}

const sampleCode = `
  const fields = [
    {
      fieldName: 'date01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'date02',
    },
    {
      fieldName: 'date03',
    },
  ];

  const columns = [
    {
      fieldName: 'date01',
      header: 'Default',
      datetimeFormat: 'yyyy-MM-dd', // default value, 생략 가능
      editor: {
        type: 'btdate',
        datetimeFormat: 'yyyyMMdd', // default value, 생략 가능
      },
    },
    {
      fieldName: 'date02',
      header: 'Custom (datetimeFormat)',
      datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      editor: {
        type: 'btdate',
        datetimeFormat: 'yyyyMMddHHmmss',
      },
    },
    {
      fieldName: 'date03',
      header: 'Custom (datetimeFormat, align class)',
      styleName: 'text-center',
      datetimeFormat: 'yyyy-MM-dd HH:mm:ss',
      editable: false,
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      date01: dayjs().add(-1, 'M').format('YYYYMMDD'),
      date02: dayjs().add(-1, 'M').format('YYYYMMDDHHmmss'),
      date03: dayjs().add(-1, 'M').format('YYYYMMDDHHmmss'),
    },
    {
      date01: dayjs().format('YYYYMMDD'),
      date02: dayjs().format('YYYYMMDDHHmmss'),
      date03: dayjs().format('YYYYMMDDHHmmss'),
    },
    {
      date01: dayjs().add(1, 'M').format('YYYYMMDD'),
      date02: dayjs().add(1, 'M').format('YYYYMMDDHHmmss'),
      date03: dayjs().add(1, 'M').format('YYYYMMDDHHmmss'),
    },
  ]);
`;
</script>
