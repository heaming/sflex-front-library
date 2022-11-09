<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Validation
    </h2>
    <q-card>
      <kw-action-bar>
        <kw-btn
          label="Validate"
          @click="validate"
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
import { gridUtil } from '~kw-lib';

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    { fieldName: 'text', dataType: 'text' },
    { fieldName: 'number', dataType: 'number' },
    { fieldName: 'list', dataType: 'text' },
    { fieldName: 'check', dataType: 'text' },
    { fieldName: 'date', dataType: 'text' },
  ];

  const columns = [
    {
      fieldName: 'text',
      rules: 'required',
    },
    {
      fieldName: 'number',
      editor: { type: 'number' },
      rules: 'max_value:100',
    },
    {
      fieldName: 'list',
      editor: { type: 'list' },
      options: [
        { codeId: 'Y', codeName: 'Y' },
        { codeId: 'N', codeName: 'N' },
      ],
    },
    {
      fieldName: 'check',
      renderer: { type: 'check' },
      rules: 'is:@list',
      customMessages: { is: 'check항목의 값은 list의 값과 일치해야 합니다.' },
    },
    {
      fieldName: 'date',
      editor: { type: 'btdate' },
      rules: 'required',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  view.onValidate = (g, index, value, values) => {
    console.log(index, value, values);
    // return 'error text if needed';
  };

  data.setRows([
    {
      text: '',
      number: 101,
      list: 'Y',
      check: '',
      date: '',
    },
    {
      text: 'filled',
      number: 100,
      list: 'Y',
      check: 'Y',
      date: '2222-02-22',
    },
    {
      text: null,
      number: null,
      list: 'Y',
      check: 'N',
      date: null,
    },
  ]);
}

async function validate() {
  const view = grdRef.value.getView();
  await gridUtil.validate(view, { isChangedOnly: false, bails: false });

  const validationErrors = gridUtil.getValidationErrors(view);
  console.log(validationErrors);
}

const sampleCode = `
function initGrd(data, view) {
  const fields = [
    { fieldName: 'text', dataType: 'text' },
    { fieldName: 'number', dataType: 'number' },
    { fieldName: 'list', dataType: 'text' },
    { fieldName: 'check', dataType: 'text' },
    { fieldName: 'date', dataType: 'text' },
  ];

  const columns = [
    {
      fieldName: 'text',
      rules: 'required',
    },
    {
      fieldName: 'number',
      editor: { type: 'number' },
      rules: 'max_value:100',
    },
    {
      fieldName: 'list',
      editor: { type: 'list' },
      options: [
        { codeId: 'Y', codeName: 'Y' },
        { codeId: 'N', codeName: 'N' },
      ],
    },
    {
      fieldName: 'check',
      renderer: { type: 'check' },
      rules: 'is:@list',
      customMessages: { is: 'check항목의 값은 list의 값과 일치해야 합니다.' },
    },
    {
      fieldName: 'date',
      editor: { type: 'btdate' },
      rules: 'required',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  view.onValidate = (g, index, value, values) => {
    console.log(index, value, values);
    // return 'error text if needed';
  };

  data.setRows([
    {
      text: '',
      number: 101,
      list: 'Y',
      check: '',
      date: '',
    },
    {
      text: 'filled',
      number: 100,
      list: 'Y',
      check: 'Y',
      date: '2222-02-22',
    },
    {
      text: null,
      number: null,
      list: 'Y',
      check: 'N',
      date: null,
    },
  ]);
}

async function validate() {
  const view = grdRef.value.getView();
  await gridUtil.validate(view, { isChangedOnly: false, bails: false });

  const validationErrors = gridUtil.getValidationErrors(view);
  console.log(validationErrors);
}
`;
</script>
