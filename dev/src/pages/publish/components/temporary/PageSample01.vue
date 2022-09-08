<template>
  <kw-page>
    <template #header>
      <kw-page-header :options="['홈','고객','Search Result(Normal)']" />
    </template>

    <kw-search title="조회조건">
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
      <h3>
        조회결과<span class="kw-title-refrence">&#8251;필수(&#42;)를 제외한 항목만 변경 가능합니다.</span>
      </h3>
      <kw-action-bar>
        <template #left>
          <div class="kw-action-bar--count kw-action-bar--separator">
            총 <span class="kw-action-bar--number pl4">156</span>
          </div>
          <kw-select
            v-model="selectData.model"
            :options="selectData.options"
            borderless
            dense
            suffix="개씩보기"
          />
          <div class="kw-action-bar--send ml40">
            <kw-btn
              class="kw-btn--h24 kw-btn--line-gray kw-btn--line-bg"
              label="URL 전송"
            />
            <p class="kw-action-bar--description ml16">
              고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
            </p>
          </div>
        </template>

        <kw-btn
          icon="excel_16"
          class="kw-btn--underline kw-action-bar--separator"
          label="엑셀 다운로드"
        />
        <kw-btn
          label="개인 고객 등록 URL 전송"
          class="kw-btn--h32"
        />
        <kw-btn
          label="개인 고객 등록"
          class="kw-btn--h32 ml4"
        />
        <kw-btn
          label="법인 고객 등록"
          class="kw-btn--h32 ml4"
        />
      </kw-action-bar>
      <kw-grid
        :visible-rows="10"
        @init="initGrid"
      />
      <div class="row justify-start items-center mt12">
        <!-- 'the helper classes' from Quasar & gutter -->
        <kw-btn
          class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32"
          label="삭제"
        />
        <kw-btn
          class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 ml4"
          label="저장"
        />
      </div>
      <kw-pagination
        :model-value="1"
        :total-count="100"
      />
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

const selectData = { model: '10',
  options: [
    '10', '20', '30', '40', '50',
  ] };

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
    { fieldName: 'col14' },
  ];

  const columns = [
    { fieldName: 'col1', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col2', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '180' },
    { fieldName: 'col4', header: '이름/담당자', width: '080', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col5', header: '성별', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '생년월일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col7', header: '휴대전화번호', width: '160', styleName: 'text-center' },
    { fieldName: 'col8', header: '주소', width: '296' },
    { fieldName: 'col9', header: '약관동의', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col10', header: '본인인증', width: '100', styleName: 'text-center text-red' },
    { fieldName: 'col11', header: '통합고객', width: '100', styleName: 'text-center text-blue' },
    { fieldName: 'col12', header: '최종 수정일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col13', header: '최종 등록일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = true;
  view.rowIndicator.visible = true;

  data.setRows([
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
  ]);
}

const sampleVueCode = `
<kw-page>
  <template #header>
    <kw-page-header :options="['홈','고객','Search Result(Normal)']" />
  </template>

  <kw-search title="조회조건">
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
    <h3>조회결과</h3>
    <kw-action-bar>
      <template #left>
        <div class="kw-action-bar--count kw-action-bar--separator">
          총 <span class="kw-action-bar--number pl4">156</span>
        </div>
        <kw-select
          v-model="selectData.model"
          :options="selectData.options"
          suffix="개씩보기"
        />
        <div class="kw-action-bar--send ml40">
          <kw-btn
            class="kw-btn--h24 kw-btn--line-gray kw-btn--line-bg"
            label="URL 전송"
          />
          <p class="kw-action-bar--description ml16">
            고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
          </p>
        </div>
      </template>

      <kw-btn
        icon="excel_16"
        class="kw-btn--underline kw-action-bar--separator"
        label="엑셀 다운로드"
      />
      <kw-btn
        label="개인 고객 등록 URL 전송"
        class="kw-btn--h32"
      />
      <kw-btn
        label="개인 고객 등록"
        class="kw-btn--h32 ml4"
      />
      <kw-btn
        label="법인 고객 등록"
        class="kw-btn--h32 ml4"
      />
    </kw-action-bar>
    <kw-grid
      :visible-rows="10"
      @init="initGrid"
    />
    <div class="row justify-start items-center mt12">
      <!-- 'the helper classes' from Quasar & gutter -->
      <kw-btn
        class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32"
        label="삭제"
      />
      <kw-btn
        class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 ml4"
        label="저장"
      />
    </div>
    <kw-pagination
      :model-value="1"
      :total-count="100"
    />
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
const selectData = { model: '10',
  options: [
    '10', '20', '30', '40', '50',
  ] };

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
    { fieldName: 'col14' },
  ];

  const columns = [
    { fieldName: 'col1', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col2', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '180' },
    { fieldName: 'col4', header: '이름/담당자', width: '080', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col5', header: '성별', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '생년월일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col7', header: '휴대전화번호', width: '160', styleName: 'text-center' },
    { fieldName: 'col8', header: '주소', width: '296' },
    { fieldName: 'col9', header: '약관동의', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col10', header: '본인인증', width: '100', styleName: 'text-center text-red' },
    { fieldName: 'col11', header: '통합고객', width: '100', styleName: 'text-center text-blue' },
    { fieldName: 'col12', header: '최종 수정일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col13', header: '최종 등록일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = true;
  view.rowIndicator.visible = true;

  data.setRows([
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
  ]);
}
`;
</script>
