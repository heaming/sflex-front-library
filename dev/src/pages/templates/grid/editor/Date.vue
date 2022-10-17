<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Date
    </h2>
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
      datetimeFormat: 'date', // default value, 생략 가능
      editor: {
        type: 'btdate',
        datetimeFormat: 'date', // default value, 생략 가능
      },
    },
    {
      fieldName: 'date02',
      header: 'Custom (datetimeFormat)',
      datetimeFormat: 'datetime',
      editor: {
        type: 'btdate',
        // datetimeFormat: 'datetime', // 없을 시, column.datetimeFormat으로 설정 (즉, column.datetimeFormat과 같으면 생략 가능)
      },
    },
    {
      fieldName: 'date03',
      header: 'Custom (datetimeFormat, align class)',
      styleName: 'text-center',
      datetimeFormat: 'datetime',
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
      datetimeFormat: 'date', // default value, 생략 가능
      editor: {
        type: 'btdate',
        datetimeFormat: 'date', // default value, 생략 가능
      },
    },
    {
      fieldName: 'date02',
      header: 'Custom (datetimeFormat)',
      datetimeFormat: 'datetime',
      editor: {
        type: 'btdate',
        datetimeFormat: 'datetime', // 없을 시, column.datetimeFormat으로 설정 (즉, column.datetimeFormat과 같으면 생략 가능)
      },
    },
    {
      fieldName: 'date03',
      header: 'Custom (datetimeFormat, align class)',
      styleName: 'text-center',
      datetimeFormat: 'datetime',
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
