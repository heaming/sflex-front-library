<template>
  <guide-popup-view>
    <kw-popup
      class="kw-popup--xl"
      title="운영비 원천세정산(유가증권 제외)"
    >
      <kw-grid
        :visible-rows="1"
        @init="initGrid"
      />

      <kw-search
        :cols="2"
        class="mt30"
      >
        <kw-search-row>
          <kw-search-item label="직책">
            <kw-option-group
              :model-value="'지국장'"
              rules="required"
              type="radio"
              :options="['지국장', 'EP']"
            />
          </kw-search-item>
          <kw-form-item
            label="대상자"
          >
            <kw-input />
          </kw-form-item>
        </kw-search-row>
      </kw-search>

      <h3>
        대상자 조회결과
        <ul class="kw-notification">
          <li>
            <span class="kw-fc--primary">금액 입력 후 [추가]버튼을 클릭 </span>해 주세요.
          </li>
        </ul>
      </h3>

      <kw-action-bar class="mt20">
        <template #left>
          <span>총</span>
          <span class="accent pl4">156</span>
        </template>
        <kw-btn
          primary
          dense
          label="대상자 추가"
        />
      </kw-action-bar>
      <kw-grid
        :visible-rows="5"
        class="mb10"
        @init="initGrid2"
      />
      <h3>
        최종 원천세 정산 대상자
      </h3>

      <kw-action-bar class="mt20">
        <template #left>
          <span>총</span>
          <span class="accent pl4">156</span>
        </template>
        <kw-btn
          primary
          dense
          label="대상자 추가"
        />
      </kw-action-bar>
      <kw-grid
        :visible-rows="5"
        class="mb10"
        @init="initGrid2"
      />

      <kw-action-bottom>
        <kw-btn
          label="삭제"
          grid-action
        />
      </kw-action-bottom>

      <div class="kw-guide pa0">
        <q-card>
          <h3 class="center mb20">
            This is the source code for this page. This part is not included in the coding.
          </h3>
          <guide-code-view
            :code-value="[sampleVueCode,sampleVueCodeScript]"
            :lang="['vue','javascript']"
            multi
          />
        </q-card>
      </div>
      <template #action>
        <kw-btn
          negative
          label="취소"
        />
        <kw-btn
          primary
          class="ml8"
          label="확인"
        />
      </template>
    </kw-popup>
  </guide-popup-view>
</template>

<script setup>

const sampleVueCode = `
<kw-popup
  class="kw-popup--xl"
  title="운영비 원천세정산(유가증권 제외)"
>
  <kw-grid
    :visible-rows="1"
    @init="initGrid"
  />

  <kw-search
    :cols="2"
    class="mt30"
  >
    <kw-search-row>
      <kw-search-item label="직책">
        <kw-option-group
          :model-value="'지국장'"
          rules="required"
          type="radio"
          :options="['지국장', 'EP']"
        />
      </kw-search-item>
      <kw-form-item
        label="대상자"
      >
        <kw-input />
      </kw-form-item>
    </kw-search-row>
  </kw-search>

  <h3>
    대상자 조회결과
    <ul class="kw-notification">
      <li>
        <span class="kw-fc--primary">금액 입력 후 [추가]버튼을 클릭 </span>해 주세요.
      </li>
    </ul>
  </h3>

  <kw-action-bar class="mt20">
    <template #left>
      <span>총</span>
      <span class="accent pl4">156</span>
    </template>
    <kw-btn
      primary
      dense
      label="대상자 추가"
    />
  </kw-action-bar>
  <kw-grid
    :visible-rows="5"
    class="mb10"
    @init="initGrid2"
  />
  <h3>
    최종 원천세 정산 대상자
  </h3>

  <kw-action-bar class="mt20">
    <template #left>
      <span>총</span>
      <span class="accent pl4">156</span>
    </template>
    <kw-btn
      primary
      dense
      label="대상자 추가"
    />
  </kw-action-bar>
  <kw-grid
    :visible-rows="5"
    class="mb10"
    @init="initGrid2"
  />

  <kw-action-bottom>
    <kw-btn
      label="삭제"
      grid-action
    />
  </kw-action-bottom>

  <template #action>
    <kw-btn
      negative
      label="취소"
    />
    <kw-btn
      primary
      class="ml8"
      label="확인"
    />
  </template>
</kw-popup>
`;
const sampleVueCodeScript = `

function initGrid(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  const columns = [
    { fieldName: 'col1', header: ' ', width: '250', styleName: 'text-left kw-bc--bg-grid' },
    { fieldName: 'col2', header: '고객 유형', width: '250', styleName: 'text-right' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '250', styleName: 'text-right' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '250', styleName: 'text-right' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = false;
  view.rowIndicator.visible = false;

  data.setRows([
    { col1: '원천세 금액', col2: '개인', col3: '-', col4: '이엄마' },
  ]);
}
function initGrid2(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  const columns = [
    { fieldName: 'col1', header: '소속', width: '130', styleName: 'text-center' },
    { fieldName: 'col2', header: '센터', width: '130', styleName: 'text-center' },
    { fieldName: 'col3', header: '이름', width: '130', styleName: 'text-center' },
    { fieldName: 'col4', header: '번호', width: '130', styleName: 'text-center' },
    { fieldName: 'col5', header: '직책', width: '130', styleName: 'text-center' },
    { fieldName: 'col6', header: '금액', width: '130', styleName: 'text-center' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = true;
  view.rowIndicator.visible = false;

  data.setRows([
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
  ]);
}
`;

function initGrid(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  // Add the style "text-align: left and background-color"
  const columns = [
    { fieldName: 'col1', header: ' ', width: '245', styleName: 'text-left kw-bc--bg-grid' },
    { fieldName: 'col2', header: '고객 유형', width: '250', styleName: 'text-right' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '250', styleName: 'text-right' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '250', styleName: 'text-right' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = false;
  view.rowIndicator.visible = false;

  data.setRows([
    { col1: '원천세 금액', col2: '개인', col3: '-', col4: '이엄마' },
  ]);
}
function initGrid2(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  const columns = [
    { fieldName: 'col1', header: '소속', width: '130', styleName: 'text-center' },
    { fieldName: 'col2', header: '센터', width: '130', styleName: 'text-center' },
    { fieldName: 'col3', header: '이름', width: '130', styleName: 'text-center' },
    { fieldName: 'col4', header: '번호', width: '130', styleName: 'text-center' },
    { fieldName: 'col5', header: '직책', width: '130', styleName: 'text-center' },
    { fieldName: 'col6', header: '금액', width: '130', styleName: 'text-center' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = true;
  view.rowIndicator.visible = false;

  data.setRows([
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
    {
      col1: '호남총괄단', col2: '전주센터', col3: '이선녀', col4: '111', col5: '지국장', col6: '200,000',
    },
  ]);
}
</script>
