<template>
  <kw-page>
    <template #header>
      <kw-page-header
        :options="['홈','상품','상품목록', '기준상품 상세조회']"
      />
    </template>

    <kw-tabs model-value="4">
      <kw-tab
        name="1"
        label="기본속성"
      />
      <kw-tab
        name="2"
        label="연결상품"
      />
      <kw-tab
        name="3"
        label="관리속성"
      />
      <kw-tab
        name="4"
        label="가격"
      />
      <kw-tab
        name="5"
        label="변경이력"
      />
    </kw-tabs>
    <kw-tab-panels model-value="4">
      <kw-tab-panel name="4">
        <kw-search>
          <kw-search-row>
            <kw-search-item label="판매채널">
              <kw-select
                :options="['전체','B','C']"
              />
            </kw-search-item>
            <kw-search-item label="약정기간">
              <kw-select
                :options="['전체','B','C']"
              />
            </kw-search-item>
            <kw-search-item
              label="기준가 적용기간"
            >
              <kw-date-range-picker
                rules="date_range_months:1"
              />
            </kw-search-item>
          </kw-search-row>
        </kw-search>
        <div class="result-area normal-area--button-set-bottom">
          <kw-grid
            :visible-rows="4"
            @init="initGrid"
          />

          <div class="button-set--bottom">
            <div class="button-set--bottom-left">
              <kw-btn
                label="이전"
              />
            </div>
            <div class="button-set--bottom-right">
              <kw-btn
                label="수정"
                class="mr8"
              />
              <kw-btn
                label="목록"
                primary
              />
            </div>
          </div>
        </div>
      </kw-tab-panel>
    </kw-tab-panels>
    <div class="kw-guide pa0">
      <q-card>
        <h3 class="kw-guide-title mt20">
          Button on the bottom with search area & tabs
        </h3>
        <p class="kw-guide-description">
          Make sure to add the class <b>normal-area--button-set-bottom</b> with <b>result-area.</b><br>
          Add the class of <b>"button-set--bottom"</b> in the tag ,after putting the all content<br>
          The left side's button  side in button-set--bottom add <b>button-set--bottom-left</b><br>
          The right side's button in button-set--bottom add <b> button-set--bottom-right</b><br>
        </p>
        <guide-code-view
          :code-value="sampleVueCode"
          :lang="'vue'"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
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
  ];

  const columns = [
    { fieldName: 'col1', header: '판매채널', width: '178' },
    { fieldName: 'col2', header: '기준가 적용기간', width: '227', styleName: 'text-center' },
    { fieldName: 'col3', header: '기준가코드', width: '120' },
    { fieldName: 'col4', header: '약정기간', width: '120', styleName: 'text-right' },
    { fieldName: 'col5', header: '기준가', width: '120', styleName: 'text-right' },
    { fieldName: 'col6', header: '할부개월수', width: '120', styleName: 'text-right' },
    { fieldName: 'col7', header: '일시불가', width: '120', styleName: 'text-right' },
    { fieldName: 'col8', header: '판매가', width: '120', styleName: 'text-right' },
    { fieldName: 'col9', header: '사간거래가', width: '120', styleName: 'text-right' },
    { fieldName: 'col10', header: '인정금액', width: '120', styleName: 'text-right' },
    { fieldName: 'col11', header: '인정금액', width: '120', styleName: 'text-right' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = false;
  view.rowIndicator.visible = false;

  data.setRows([
    { col1: '방판', col2: '2022-06-30 ~ 2022-06-30', col3: '', col4: '일시불', col5: '350,000', col6: '12', col7: '330,000', col8: '330,000', col9: '300,000', col10: '10%', col11: '30,000' },
    { col1: '방판', col2: '2022-06-30 ~ 2022-06-30', col3: '', col4: '12', col5: '350,000', col6: '', col7: '330,000', col8: '330,000', col9: '300,000', col10: '10%', col11: '30,000' },
    { col1: '방판', col2: '2022-06-30 ~ 2022-06-30', col3: '', col4: '24', col5: '350,000', col6: '', col7: '330,000', col8: '330,000', col9: '300,000', col10: '10%', col11: '30,000' },
    { col1: '방판', col2: '2022-06-30 ~ 2022-06-30', col3: '', col4: '일시불', col5: '350,000', col6: '12', col7: '330,000', col8: '330,000', col9: '300,000', col10: '10%', col11: '30,000' },
  ]);
}

const sampleVueCode = `
<kw-page>
    <template #header>
      <kw-page-header
        :options="['홈','상품','상품목록', '기준상품 상세조회']"
      />
    </template>

    <kw-tabs model-value="4">
      <kw-tab
        name="1"
        label="기본속성"
      />
      <kw-tab
        name="2"
        label="연결상품"
      />
      <kw-tab
        name="3"
        label="관리속성"
      />
      <kw-tab
        name="4"
        label="가격"
      />
      <kw-tab
        name="5"
        label="변경이력"
      />
    </kw-tabs>
    <kw-tab-panels model-value="4">
      <kw-tab-panel name="4">
        <kw-search>
          <kw-search-row>
            <kw-search-item label="판매채널">
              <kw-select
                :options="['전체','B','C']"
              />
            </kw-search-item>
            <kw-search-item label="약정기간">
              <kw-select
                :options="['전체','B','C']"
              />
            </kw-search-item>
            <kw-search-item
              label="기준가 적용기간"
            >
              <kw-date-range-picker
                rules="date_range_months:1"
              />
            </kw-search-item>
          </kw-search-row>
        </kw-search>
        <div class="result-area normal-area--button-set-bottom">
          <kw-grid
            :visible-rows="4"
            @init="initGrid"
          />

          <div class="button-set--bottom">
            <div class="button-set--bottom-left">
              <kw-btn
                label="이전"
              />
            </div>
            <div class="button-set--bottom-right">
              <kw-btn
                label="수정"
                class="mr8"
              />
              <kw-btn
                label="목록"
                primary
              />
            </div>
          </div>
        </div>
      </kw-tab-panel>
    </kw-tab-panels>
  </kw-page>
`;
</script>
