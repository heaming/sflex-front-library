<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Text
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
        :visible-rows="6"
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
import { alert, gridUtil, useGlobal } from '~kw-lib';

const { modal } = useGlobal();

const grdRef = ref();

function initGrd(data, view) {
  const fields = [
    {
      fieldName: 'text01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'text02',
    },
    {
      fieldName: 'text03',
    },
    {
      fieldName: 'text04',
    },
    {
      fieldName: 'text05',
    },
  ];

  const columns = [
    {
      fieldName: 'text01',
      header: 'Default',
      styleName: 'rg-button-link',
      renderer: { type: 'button' },
      editable: true,
    },
    {
      fieldName: 'text02',
      header: 'Custom (align class)',
      styleName: 'text-center', // text-left | text-center | text-right
    },
    {
      fieldName: 'text03',
      header: 'Custom (maxLength)',
      editor: {
        type: 'text', // default value, 생략 가능
        maxLength: 100,
      },
    },
    {
      fieldName: 'text04',
      header: 'Multiline',
      editor: {
        type: 'multiline',
      },
    },
    {
      fieldName: 'text05',
      header: 'telephone',
      editor: {
        type: 'telephone',
      },
      rules: 'telephone',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;
  view.checkBar.visible = true;
  view.rowIndicator.visible = true;

  view.setCheckableCallback((dataSource, item) => item.dataRow % 2 === 0);

  view.onCellItemClicked = async () => {
    await modal({
      component: async () => await import('../../../publish/Mobile/temporary/PopupSample01.vue'),
    });
  };

  data.setRows([
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다. 사용 가능 클래스: text-left, text-center, text-right',
      text03: '100Byte까지 입력 가능합니다. 한글은 3Byte 입니다.',
      text04: '멀티라인으로 입력이 가능한 컬럼, \n줄바꿈이 가능합니다',
    },
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다.',
      text03: '한글은 3Byte 입니다.',
      text04: '줄바꿈이 가능합니다 \n줄바꿈이 가능합니다',
    },
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다.',
      text03: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼',
      text04: '줄바꿈이 가능합니다 \n줄바꿈이 가능합니다',
    },
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다. 사용 가능 클래스: text-left, text-center, text-right',
      text03: '100Byte까지 입력 가능합니다. 한글은 3Byte 입니다.',
      text04: '멀티라인으로 입력이 가능한 컬럼, \n줄바꿈이 가능합니다',
    },
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다.',
      text03: '한글은 3Byte 입니다.',
      text04: '줄바꿈이 가능합니다 \n줄바꿈이 가능합니다',
    },
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다.',
      text03: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼',
      text04: '줄바꿈이 가능합니다 \n줄바꿈이 가능합니다',
    },
  ]);
}

async function checkCurrentRowValue() {
  const view = grdRef.value.getView();
  const rowValue = gridUtil.getSelectedRowValues(view)[0] || {};

  alert(JSON.stringify(rowValue, null, '\t'));
  await gridUtil.validate(view);
}

const sampleCode = `
  const fields = [
    {
      fieldName: 'text01',
      dataType: 'text', // default value, 생략 가능
    },
    {
      fieldName: 'text02',
    },
    {
      fieldName: 'text03',
    },
    {
      fieldName: 'text04',
    },
  ];

  const columns = [
    {
      fieldName: 'text01',
      header: 'Default',
    },
    {
      fieldName: 'text02',
      header: 'Custom (align class)',
      styleName: 'text-center', // text-left | text-center | text-right
    },
    {
      fieldName: 'text03',
      header: 'Custom (maxLength)',
      editor: {
        type: 'text', // 생략 가능
        maxLength: 100,
      },
    },
    {
      fieldName: 'text04',
      header: 'Multiline',
      editor: {
        type: 'multiline',
      },
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.editOptions.editable = true;

  data.setRows([
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다. 사용 가능 클래스: text-left, text-center, text-right',
      text03: '100Byte까지 입력 가능합니다. 한글은 3Byte 입니다.',
      text04: '멀티라인으로 입력이 가능한 컬럼, \\n줄바꿈이 가능합니다',
    },
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다.',
      text03: '한글은 3Byte 입니다.',
      text04: '줄바꿈이 가능합니다 \\n줄바꿈이 가능합니다',
    },
    {
      text01: '기본 텍스트 필드 입니다',
      text02: '중앙 정렬 입니다.',
      text03: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼',
      text04: '줄바꿈이 가능합니다 \\n줄바꿈이 가능합니다',
    },
  ]);
`;

</script>
