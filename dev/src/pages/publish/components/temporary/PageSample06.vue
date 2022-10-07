<template>
  <kw-page>
    <template #header>
      <kw-page-header :options="['홈','고객','리쿠르팅 등록 관리(파트너)']" />
    </template>

    <kw-search>
      <kw-search-row>
        <kw-search-item label="고객 유형">
          <kw-select
            first-option="all"
            :options="['A','B','C']"
          />
        </kw-search-item>

        <kw-search-item label="교원키">
          <kw-input placeholder="입력해주세요" />
        </kw-search-item>

        <kw-search-item label="이름/대표자/담당자">
          <kw-input placeholder="입력해주세요" />
        </kw-search-item>
      </kw-search-row>

      <kw-search-row>
        <kw-search-item label="휴대전화번호">
          <kw-input
            placeholder="입력해주세요"
            mask="###-####-####"
          />
        </kw-search-item>

        <kw-search-item label="통합 고객">
          <kw-select
            first-option="all"
            :options="['A','B','C']"
          />
        </kw-search-item>
      </kw-search-row>
    </kw-search>

    <div class="result-area">
      <div class="grid-horizontal-wrap">
        <div class="grid-horizontal-wrap__section">
          <h3>방문실적</h3>
          <kw-action-top>
            <template #left>
              <span>총</span>
              <span class="accent pl4">30</span>
              <kw-separator
                spaced
                vertical
                inset
              />
              <span>처리율</span>
              <span class="accent pl4">30%</span>
              <kw-separator
                spaced
                vertical
                inset
              />
              <span class="accent">1,020,000원</span>
            </template>
          </kw-action-top>
          <kw-grid
            :visible-rows="10"
            @init="initGrid1"
          />
          <ul class="grid-fix-footer">
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">BS인정건수</span>
              <p class="grid-fix-footer__data">
                100,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">W1건수</span>
              <p class="grid-fix-footer__data">
                10,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">W2건수</span>
              <p class="grid-fix-footer__data">
                10
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">환경건수</span>
              <p class="grid-fix-footer__data">
                100,000
              </p>
            </li>
          </ul>
        </div>
        <div class="grid-horizontal-wrap__section w472">
          <h3>수수료내역</h3>
          <kw-action-top>
            <template #left>
              <span>적용률총</span>
              <span class="accent pl4">30%</span>
            </template>
            <kw-btn
              label="저장"
              grid-action
            />
          </kw-action-top>
          <kw-grid
            :visible-rows="10"
            @init="initGrid2"
          />
          <ul class="grid-fix-footer column">
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">지급합계</span>
              <p class="grid-fix-footer__data">
                100,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">지급총액</span>
              <p class="grid-fix-footer__data">
                10,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">공제합계</span>
              <p class="grid-fix-footer__data">
                10
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="kw-guide pa0">
      <q-card>
        <h3 class="center mb20">
          This is the source code for this page. This part is not included in the coding.
        </h3>
        <guide-code-view
          :code-value="[sampleVueCode, sampleJsCode]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

function initGrid1(data, view) {
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
  ];

  const columns = [
    { fieldName: 'col1', header: '상품', width: '140' },
    { fieldName: 'col2', header: '관리', width: '110' },
    { fieldName: 'col3', header: '방문', width: '110' },
    { fieldName: 'col4', header: '금액', width: '110', styleName: 'text-right' },
    { fieldName: 'col5', header: '관리', width: '110' },
    { fieldName: 'col6', header: '방문', width: '110' },
    { fieldName: 'col7', header: '금액', width: '110', styleName: 'text-right' },
    { fieldName: 'col8', header: '합계', width: '134', styleName: 'text-right' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  // multi row header setting
  view.setColumnLayout([
    'col1', // single
    {
      header: '일반', // colspan title
      direction: 'horizontal', // merge type
      items: ['col2', 'col3', 'col4'],
    },
    {
      header: '정액',
      direction: 'horizontal',
      items: ['col5', 'col6', 'col7'],
    },
    'col8',
  ]);

  data.setRows([
    { col1: '정수기1', col2: '73', col3: '71', col4: '527,000', col5: ' ', col6: ' ', col7: ' ', col8: ' ' },
    { col1: '정수기2', col2: '47', col3: '5', col4: '40,000', col5: ' ', col6: ' ', col7: ' ', col8: '64,000' },
    { col1: '정수기3', col2: '13', col3: '1', col4: '8,500', col5: ' ', col6: '-', col7: '-', col8: '17,000' },
    { col1: '정수기4', col2: '39', col3: '0', col4: '10,000', col5: ' ', col6: ' ', col7: ' ', col8: '88,200' },
    { col1: '청정기1', col2: '2', col3: '1', col4: '56,700', col5: ' ', col6: ' ', col7: ' ', col8: ' ' },
    { col1: '청정기2', col2: ' ', col3: ' ', col4: ' ', col5: ' ', col6: '-', col7: '-', col8: ' ' },
    { col1: '아웃소싱,커피,삼성', col2: '3', col3: '3', col4: '21,000', col5: ' ', col6: ' ', col7: ' ', col8: '32,500' },
    { col1: '비데,연수기', col2: ' ', col3: ' ', col4: ' ', col5: ' ', col6: ' ', col7: ' ', col8: ' ' },
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
    { fieldName: 'col1', header: '수수료내역', width: '115', styleName: 'text-center' },
    { fieldName: 'col2', header: '금액', width: '115', styleName: 'text-right' },
    { fieldName: 'col3', header: '추가지급', width: '115', styleName: 'text-center' },
    { fieldName: 'col4', header: '수수료 공제', width: '115', styleName: 'text-center' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  data.setRows([
    { col1: '관리수당', col2: '1,020,000', col3: '-', col4: '-' },
    { col1: '판매장려', col2: '30,000', col3: '-', col4: '-' },
    { col1: '판매미팅', col2: '20,000', col3: '-', col4: '-' },
    { col1: '판매소급', col2: ' ', col3: '-', col4: '-' },
    { col1: '정착', col2: ' ', col3: '-', col4: '-' },
    { col1: '급지', col2: '20,000', col3: '-', col4: '-' },
    { col1: '통신수당', col2: ' ', col3: '-', col4: '-' },
    { col1: '기타수당', col2: ' ', col3: '-', col4: '-' },
    { col1: '유니폼', col2: ' ', col3: '-', col4: '-' },
    { col1: '사전방문', col2: ' ', col3: '-', col4: '-' },
    { col1: 'texttemp', col2: ' ', col3: '-', col4: '-' },
  ]);
}

const sampleVueCode = `
<kw-page>
    <template #header>
      <kw-page-header :options="['홈','고객','리쿠르팅 등록 관리(파트너)']" />
    </template>

    <kw-search>
      <kw-search-row>
        <kw-search-item label="고객 유형">
          <kw-select
            first-option="all"
            :options="['A','B','C']"
          />
        </kw-search-item>

        <kw-search-item label="교원키">
          <kw-input placeholder="입력해주세요" />
        </kw-search-item>

        <kw-search-item label="이름/대표자/담당자">
          <kw-input placeholder="입력해주세요" />
        </kw-search-item>
      </kw-search-row>

      <kw-search-row>
        <kw-search-item label="휴대전화번호">
          <kw-input
            placeholder="입력해주세요"
            mask="###-####-####"
          />
        </kw-search-item>

        <kw-search-item label="통합 고객">
          <kw-select
            first-option="all"
            :options="['A','B','C']"
          />
        </kw-search-item>
      </kw-search-row>
    </kw-search>

    <div class="result-area">
      <div class="grid-horizontal-wrap">
        <div class="grid-horizontal-wrap__section">
          <h3>방문실적</h3>
          <kw-action-top>
            <template #left>
              <span>총</span>
              <span class="accent pl4">30</span>
              <kw-separator
                spaced
                vertical
                inset
              />
              <span>처리율</span>
              <span class="accent pl4">30%</span>
              <kw-separator
                spaced
                vertical
                inset
              />
              <span class="accent">1,020,000원</span>
            </template>
          </kw-action-top>
          <kw-grid
            :visible-rows="10"
            @init="initGrid1"
          />
          <ul class="grid-fix-footer">
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">BS인정건수</span>
              <p class="grid-fix-footer__data">
                100,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">W1건수</span>
              <p class="grid-fix-footer__data">
                10,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">W2건수</span>
              <p class="grid-fix-footer__data">
                10
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">환경건수</span>
              <p class="grid-fix-footer__data">
                100,000
              </p>
            </li>
          </ul>
        </div>
        <div class="grid-horizontal-wrap__section w472">
          <h3>수수료내역</h3>
          <kw-action-top>
            <template #left>
              <span>적용률총</span>
              <span class="accent pl4">30%</span>
            </template>
            <kw-btn
              label="저장"
              grid-action
            />
          </kw-action-top>
          <kw-grid
            :visible-rows="10"
            @init="initGrid2"
          />
          <ul class="grid-fix-footer column">
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">지급합계</span>
              <p class="grid-fix-footer__data">
                100,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">지급총액</span>
              <p class="grid-fix-footer__data">
                10,000
              </p>
            </li>
            <li class="grid-fix-footer__item">
              <span class="grid-fix-footer__label">공제합계</span>
              <p class="grid-fix-footer__data">
                10
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="kw-guide pa0">
      <q-card>
        <h3 class="center mb20">
          This is the source code for this page. This part is not included in the coding.
        </h3>
        <guide-code-view
          :code-value="[sampleVueCode, sampleJsCode]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
  </kw-page>`;

const sampleJsCode = `
function initGrid1(data, view) {
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
  ];

  const columns = [
    { fieldName: 'col1', header: '상품', width: '140' },
    { fieldName: 'col2', header: '관리', width: '110' },
    { fieldName: 'col3', header: '방문', width: '110' },
    { fieldName: 'col4', header: '금액', width: '110', styleName: 'text-right' },
    { fieldName: 'col5', header: '관리', width: '110' },
    { fieldName: 'col6', header: '방문', width: '110' },
    { fieldName: 'col7', header: '금액', width: '110', styleName: 'text-right' },
    { fieldName: 'col8', header: '합계', width: '134', styleName: 'text-right' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  // multi row header setting
  view.setColumnLayout([
    'col1', // single
    {
      header: '일반', // colspan title
      direction: 'horizontal', // merge type
      items: ['col2', 'col3', 'col4'],
    },
    {
      header: '정액',
      direction: 'horizontal',
      items: ['col5', 'col6', 'col7'],
    },
    'col8',
  ]);

  data.setRows([
    { col1: '정수기1', col2: '73', col3: '71', col4: '527,000', col5: ' ', col6: ' ', col7: ' ', col8: ' ' },
    { col1: '정수기2', col2: '47', col3: '5', col4: '40,000', col5: ' ', col6: ' ', col7: ' ', col8: '64,000' },
    { col1: '정수기3', col2: '13', col3: '1', col4: '8,500', col5: ' ', col6: '-', col7: '-', col8: '17,000' },
    { col1: '정수기4', col2: '39', col3: '0', col4: '10,000', col5: ' ', col6: ' ', col7: ' ', col8: '88,200' },
    { col1: '청정기1', col2: '2', col3: '1', col4: '56,700', col5: ' ', col6: ' ', col7: ' ', col8: ' ' },
    { col1: '청정기2', col2: ' ', col3: ' ', col4: ' ', col5: ' ', col6: '-', col7: '-', col8: ' ' },
    { col1: '아웃소싱,커피,삼성', col2: '3', col3: '3', col4: '21,000', col5: ' ', col6: ' ', col7: ' ', col8: '32,500' },
    { col1: '비데,연수기', col2: ' ', col3: ' ', col4: ' ', col5: ' ', col6: ' ', col7: ' ', col8: ' ' },
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
    { fieldName: 'col1', header: '수수료내역', width: '115', styleName: 'text-center' },
    { fieldName: 'col2', header: '금액', width: '115', styleName: 'text-right' },
    { fieldName: 'col3', header: '추가지급', width: '115', styleName: 'text-center' },
    { fieldName: 'col4', header: '수수료 공제', width: '115', styleName: 'text-center' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  data.setRows([
    { col1: '관리수당', col2: '1,020,000', col3: '-', col4: '-' },
    { col1: '판매장려', col2: '30,000', col3: '-', col4: '-' },
    { col1: '판매미팅', col2: '20,000', col3: '-', col4: '-' },
    { col1: '판매소급', col2: ' ', col3: '-', col4: '-' },
    { col1: '정착', col2: ' ', col3: '-', col4: '-' },
    { col1: '급지', col2: '20,000', col3: '-', col4: '-' },
    { col1: '통신수당', col2: ' ', col3: '-', col4: '-' },
    { col1: '기타수당', col2: ' ', col3: '-', col4: '-' },
    { col1: '유니폼', col2: ' ', col3: '-', col4: '-' },
    { col1: '사전방문', col2: ' ', col3: '-', col4: '-' },
    { col1: 'texttemp', col2: ' ', col3: '-', col4: '-' },
  ]);
}
`;
</script>
