<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Grid
    </h2>
    <!-- <p class="kw-guide-description">
      You don't have to publish the grid because of the complexity of interacting with the data.
      <br>Therefore, substitute the blank box below for that area.
    </p> -->
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              Tag
            </th>
            <th>Attribute</th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">
              kw-grid
            </td>
            <td>
              :visible-rows="10"
            </td>
            <td>
              default 10. <br>
              The height setting for drawing the 'grid'. 1 means 1 row. <br>
              Just use 10, unless there are special cases.(No headers included.)
            </td>
          </tr>
          <tr>
            <td>
              @init
            </td>
            <td>
              Initializing function
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>
          <a
            href="https://docs.realgrid.com/start/overview"
            target="_blank"
          >https://docs.realgrid.com/start/overview</a>
        </li>
        <li class="notice">
          The first(checkbox) and second columns(number) are created automatically.
          It is not included in the script's data.
        </li>
        <li>'Grid' that are not visible in the cases are replaced by the empty boxes below.</li>
        <li>
          Every cell's width in Grid is used 'px'
        </li>
        <li>
          In GDC, Please ensure apply the width that is aligned with design or planning from zeplin.
          The programmer will review later on to finalise
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Case #1
      </h3>
      <p class="kw-guide-description">
        1 row header & 1 row body<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-grid
            :visible-rows="10"
            class="kw-mb-3"
            @init="initGrid"
          />
          <guide-code-view
            :code-value="[testCode,testData]"
            :lang="['vue','javascript']"
            multi="true"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        No Case
      </h3>
      <p class="kw-guide-description">
        'Grid' that are not visible in the cases are replaced by the empty boxes below.<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="grid-blank" />
          <guide-code-view
            :code-value="testNoCase"
            lang="vue"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<kw-grid
  :visible-rows="10"
  @init="initGrid"
/>
`;
const testData = `
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
    { fieldName: 'col1', header: '고객 번호', width: '100', styleName: 'text-center' },
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

const testNoCase = `
<div class="grid-blank" />
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

  const columns = [
    { fieldName: 'col1', header: '고객 번호', width: '100', styleName: 'text-center' },
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
</script>
