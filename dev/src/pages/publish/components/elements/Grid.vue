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
        <li>'Grid' that are not visible in the cases are replaced by the empty box(#No Case) below.</li>
        <li>
          Every cell's width in script is used 'px'
        </li>
        <li>
          You don't mind the this scripts(rg-button-link, type: 'button', datetimeFormat, text-red, text-blue...)<br>
          So you only need to care about width, alignment and text.
        </li>
        <li>In GDC, Please ensure apply the width that is aligned with design or planning from zeplin.</li>
        <li class="notice">
          The final is decorated by a Korean programmer, so don't worry :)
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Vue Code
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
        class="kw-guide-title"
      >
        Script Data
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>key</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              fieldName
            </td>
            <td>
              'col1' ~
            </td>
            <td>
              'col1', 'col2', 'col3'...<br>according to the total number of columns
            </td>
          </tr>
          <tr>
            <td>
              header
            </td>
            <td>
              '고객 번호'
            </td>
            <td>
              Enter as shown in the Zeplin
            </td>
          </tr>
          <tr>
            <td>
              width
            </td>
            <td>
              '150'
            </td>
            <td>
              As the width of the Zeplin, without 'px' units
            </td>
          </tr>
          <tr>
            <td>
              styleName
            </td>
            <td>
              'text-left', 'text-center', 'text-right'
            </td>
            <td>
              If no value is entered, default left alignment
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
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
            class="mb30"
            @init="initGrid"
          />
          <guide-code-view
            :code-value="[testCode1,testData1]"
            :lang="['vue','javascript']"
            multi="true"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Case #2
      </h3>
      <p class="kw-guide-description">
        1 row header & merged row body<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-grid
            :visible-rows="13"
            class="mb30"
            @init="initGrid2"
          />
          <guide-code-view
            :code-value="[testCode2,testData2]"
            :lang="['vue','javascript']"
            multi="true"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Case #3
      </h3>
      <p class="kw-guide-description">
        1 row header & merged col body<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-grid
            :visible-rows="13"
            class="mb30"
            @init="initGrid3"
          />
          <guide-code-view
            :code-value="[testCode3,testDate3]"
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
const testCode1 = `
<kw-grid
  :visible-rows="10"
  @init="initGrid"
/>
`;
const testData1 = `
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
    { fieldName: 'col4', header: '이름/담당자', width: '80', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
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

const testCode2 = `
<kw-grid
  :visible-rows="13"
  @init="initGrid2"
/>
`;

const testData2 = `
function initGrid2(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
  ];

  function valueCallback(g, column, groupFooterIndex, group) {
    const children = group.children
      .map((v) => (v.type === 'group' ? v.children : v)).flat()
      .filter((v) => v.type === 'row');

    return children.reduce((a, v) => a + (g.getValue(v.index, column.name) === 'Y' ? 1 : 0), 0);
  }
  const columns = [
    { fieldName: 'col1', header: '총괄단', width: '100', styleName: 'text-center', groupFooter: { styleName: 'text-center' } },
    { fieldName: 'col2', header: '센터', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '지국', width: '100' },
    { fieldName: 'col4', header: '성명', width: '100', styleName: 'text-center' },
    { fieldName: 'col5', header: '사번', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '교육과정', width: '283', styleName: 'text-left' },
    { fieldName: 'col7', header: '수료', width: '60', styleName: 'text-center', groupFooter: { styleName: 'text-center', valueCallback } },
  ];

  const layouts = [{ column: 'col1', groupFooterSpans: [6] }, 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];
  const groupFields = ['col1', 'col2'];

  data.setFields(fields);
  view.setColumns(columns);
  view.setColumnLayout(layouts);
  view.groupBy(groupFields);
  view.rowIndicator.visible = true;
  // eslint-disable-next-line no-template-curly-in-string
  view.rowGroup.footerStatement = '$ {groupValue} 총수료인원 (대상자 $ {rowCount}명)';

  data.setRows([
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
  ]);
}
`;

const testCode3 = `
<kw-grid
  :visible-rows="13"
  @init="initGrid3"
/>
`;
const testDate3 = `
function initGrid3(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
  ];

  function valueCallback(g, column, groupFooterIndex, group) {
    const children = group.children
      .map((v) => (v.type === 'group' ? v.children : v)).flat()
      .filter((v) => v.type === 'row');

    if (column.name === 'col7') {
      return children.reduce((a, v) => a + (g.getValue(v.index, column.name) === 'Y' ? 1 : 0), 0);
    }

    const first = group.first.children?.[0] || group.first;
    const groupValue = g.getValue(first.index, group.level === 1 ? 'col1' : 'col2');

    return $ {groupValue} + '총수료인원 (대상자 '+ $ {children.length});
  }
  const columns = [
    { fieldName: 'col1', header: '총괄단', width: '100', styleName: 'text-center' },
    { fieldName: 'col2', header: '센터', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '지국', width: '100', styleName: 'text-center', groupFooter: { styleName: 'text-center', valueCallback } },
    { fieldName: 'col4', header: '성명', width: '100', styleName: 'text-center' },
    { fieldName: 'col5', header: '사번', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '교육과정', width: '283', styleName: 'text-left' },
    { fieldName: 'col7', header: '수료', width: '60', styleName: 'text-center', groupFooter: { styleName: 'text-center', valueCallback } },
  ];

  const layouts = ['col1', 'col2', { column: 'col3', groupFooterSpans: [4] }, 'col4', 'col5', 'col6', 'col7'];
  const groupFields = ['col1', 'col2'];

  data.setFields(fields);
  view.setColumns(columns);
  view.setColumnLayout(layouts);
  view.groupBy(groupFields);
  view.rowIndicator.visible = true;
  view.rowGroup.mergeMode = true;

  data.setRows([
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
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
    { fieldName: 'col4', header: '이름/담당자', width: '80', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
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

function initGrid2(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
  ];

  function valueCallback(g, column, groupFooterIndex, group) {
    const children = group.children
      .map((v) => (v.type === 'group' ? v.children : v)).flat()
      .filter((v) => v.type === 'row');

    return children.reduce((a, v) => a + (g.getValue(v.index, column.name) === 'Y' ? 1 : 0), 0);
  }
  const columns = [
    { fieldName: 'col1', header: '총괄단', width: '100', styleName: 'text-center', groupFooter: { styleName: 'text-center' } },
    { fieldName: 'col2', header: '센터', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '지국', width: '100' },
    { fieldName: 'col4', header: '성명', width: '100', styleName: 'text-center' },
    { fieldName: 'col5', header: '사번', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '교육과정', width: '283', styleName: 'text-left' },
    { fieldName: 'col7', header: '수료', width: '60', styleName: 'text-center', groupFooter: { styleName: 'text-center', valueCallback } },
  ];

  const layouts = [{ column: 'col1', groupFooterSpans: [6] }, 'col2', 'col3', 'col4', 'col5', 'col6', 'col7'];
  const groupFields = ['col1', 'col2'];

  data.setFields(fields);
  view.setColumns(columns);
  view.setColumnLayout(layouts);
  view.groupBy(groupFields);
  view.rowIndicator.visible = true;
  // eslint-disable-next-line no-template-curly-in-string
  view.rowGroup.footerStatement = '${groupValue} 총수료인원 (대상자 ${rowCount}명)';

  data.setRows([
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
  ]);
}

function initGrid3(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
  ];

  function valueCallback(g, column, groupFooterIndex, group) {
    const children = group.children
      .map((v) => (v.type === 'group' ? v.children : v)).flat()
      .filter((v) => v.type === 'row');

    if (column.name === 'col7') {
      return children.reduce((a, v) => a + (g.getValue(v.index, column.name) === 'Y' ? 1 : 0), 0);
    }

    const first = group.first.children?.[0] || group.first;
    const groupValue = g.getValue(first.index, group.level === 1 ? 'col1' : 'col2');

    return `${groupValue} 총수료인원 (대상자 ${children.length})`;
  }
  const columns = [
    { fieldName: 'col1', header: '총괄단', width: '100', styleName: 'text-center' },
    { fieldName: 'col2', header: '센터', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '지국', width: '100', styleName: 'text-center', groupFooter: { styleName: 'text-center', valueCallback } },
    { fieldName: 'col4', header: '성명', width: '100', styleName: 'text-center' },
    { fieldName: 'col5', header: '사번', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '교육과정', width: '283', styleName: 'text-left' },
    { fieldName: 'col7', header: '수료', width: '60', styleName: 'text-center', groupFooter: { styleName: 'text-center', valueCallback } },
  ];

  const layouts = ['col1', 'col2', { column: 'col3', groupFooterSpans: [4] }, 'col4', 'col5', 'col6', 'col7'];
  const groupFields = ['col1', 'col2'];

  data.setFields(fields);
  view.setColumns(columns);
  view.setColumnLayout(layouts);
  view.groupBy(groupFields);
  view.rowIndicator.visible = true;
  view.rowGroup.mergeMode = true;

  data.setRows([
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '강남센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'N' },
    { col1: '강남', col2: '광진센터', col3: 'B014223', col4: '김교원', col5: '1234567', col6: '플래너전문가(1차월)(1차수)', col7: 'Y' },
  ]);
}
</script>
