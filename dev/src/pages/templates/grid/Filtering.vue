<template>
  <kw-page>
    Filtering
    <q-card>
      <kw-action-bar />
      <kw-btn @click="test" />
      <kw-grid
        ref="grdRef"
        :visible-rows="3"
        @init="initGrd"
      />

      <!-- <guide-code-view
        :code-value="sampleCode"
        lang="js"
      /> -->
    </q-card>
  </kw-page>
</template>

<script setup>
const grdRef = ref();

const jobOptions = [
  { codeId: 'a', codeName: '사람' },
  { codeId: 'b', codeName: '거북이' },
  { codeId: 'c', codeName: '두루미' },
];

function initGrd(data, view) {
  const fields = [
    { fieldName: 'name' },
    { fieldName: 'job' },
  ];

  const columns = [
    { fieldName: 'name', autoFilter: true },
    { fieldName: 'job', editor: { type: 'list' }, options: jobOptions, autoFilter: true },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.checkBar.visible = true;
  view.editOptions.editable = true;
  view.filteringOptions.enabled = true;

  data.setRows([
    {
      name: '김수한무',
      job: 'a',
    },
    {
      name: '거북이와',
      job: 'b',
    },
    {
      name: '두루미',
      job: 'c',
    },
  ]);
}

function test() {
  const view = grdRef.value.getView();
  console.log(view.getCheckedRows(true, true));
}

</script>
