<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Grid
    </h2>
    <!-- <p class="kw-guide-description">
      You don't have to publish the grid because of the complexity of interacting with the data.
      <br>Therefore, substitute the blank box below for that area.
    </p> -->
    <guide-history-view
      :items="guideHistory"
    />
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
          Please refer to #case4 if you need first(checkbox) and second column(number)
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
            <td rowspan="3">
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
          <tr>
            <td>
              style="height: px value"
            </td>
            <td>
              Setting the height by style="height:px(include thead height)" in kw-grid tag, <br>
              when it necessary(like as case #5)
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
              header
            </td>
            <td>
              stylename: essential
            </td>
            <td>
              Add essential in thead
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
              As the width of the Zeplin, without 'px' units <br>
              if could not access the width, please set width by '150px'
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
          <tr>
            <td>
              styleName
            </td>
            <td>
              background-color
            </td>
            <td>
              Use the color helper class in
              <router-link to="/Publish/Desktop/Components/color">
                color
              </router-link>
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
            multi
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
            multi
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
            multi
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Case #4
      </h3>
      <p class="kw-guide-description">
        <b>multi row header</b><br>
        please refer to this guide(#case 4) and publish. <br>
        If you couldn't publish this type table eventually, replace by the '#no case' code.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-grid
            :visible-rows="3"
            class="mb30"
            @init="initGrid4"
          />
          <img
            src="~~dev/assets/images/grid_case_4.png"
            alt="block_type1"
            style="width: 100%;"
          >
          <guide-code-view
            :code-value="[testCode4,testDate4]"
            :lang="['vue','javascript']"
            multi
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Case #5
      </h3>
      <p class="kw-guide-description">
        If the grids are located same line(horizontal), refer this guide and sample page
        <router-link to="/Publish/Desktop/Components/Temporary/PageSample06">
          samplepage06
        </router-link> <br>
        <b>please set height by style="height:px(include thead height)" in kw-grid tag when it necessary</b>
      </p>
      <q-card>
        <img
          src="~~dev/assets/images/example_horizon-grid.png"
          alt="block_type1"
          style="width: 100%;"
        >
        <div class="kw-guide-example">
          <guide-code-view
            :code-value="testCode5"
            :lang="'vue'"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Case #6 (Vetical thead and essential )
      </h3>
      <p class="kw-guide-description">
        As first row's first column has no text, Put blank in header
        (<b>header: ' '</b> - have to put space between '')<br>
        Apply the backgorund color of first columns in grid.<br>
        Add color name class in styleName<br>
        <router-link to="/Publish/Desktop/Components/Temporary/PopupSample03">
          PopupSample03
        </router-link>
        <br>
        It needs to be added <b>essential</b>, add { text : ' text ' , styleName: 'essential'} in header.<br>
        left side title should add "<b>{styleName: 'text-left kw-bc--bg-grid text-weight-medium'}</b> "
      </p>
      <q-card>
        <kw-grid
          :visible-rows="1"
          @init="initGrid6"
        />

        <div class="kw-guide-example">
          <guide-code-view
            :code-value="[testCode6,testCodeScript6]"
            :lang="['vue','javascript']"
            multi
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
    { fieldName: 'col1', header: '고객 번호',  width: '150', styleName: 'text-center', hint: 'HINT TEXT'  },
    { fieldName: 'col2', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '180' },
    { fieldName: 'col4', header: '이름/담당자', width: '80', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col5', header: '성별', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '생년월일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col7', header: '휴대전화번호', width: '160', styleName: 'text-center' },
    { fieldName: 'col8', header: '주소', width: '296' },
    { fieldName: 'col9', header: '약관동의', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col10', header: '본인인증', width: '100', styleName: 'text-center kw-fc--error' }, // 데이터값에 따라 구분이 필요할경우 글씨색상 참고 부탁드립니다
    { fieldName: 'col11', header: '통합고객', width: '100', styleName: 'text-center kw-fc--primary' }, // 데이터값에 따라 구분이 필요할경우 글씨색상 참고 부탁드립니다
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

const testCode4 = `
<kw-grid
  :visible-rows="3"
  @init="initGrid4"
/>
`;

const testDate4 = `
function initGrid4(data, view) {
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
    { fieldName: 'col1', header: '대상구분' },
    { fieldName: 'col2', header: '사업자구분' },
    { fieldName: 'col3', header: '사번' },
    { fieldName: 'col4', header: '성명' },
    { fieldName: 'col5', header: '업무제약일' },
    { fieldName: 'col6', header: '은행명' },
    { fieldName: 'col7', header: '계좌번호' },
    { fieldName: 'col8', header: '은행명' },
    { fieldName: 'col9', header: '계좌번호' },
    { fieldName: 'col10', header: '마지막' },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.checkBar.visible = true; // create checkbox column
  view.rowIndicator.visible = true; // create number indicator column

  // multi row header setting
  view.setColumnLayout([
    'col1', // single
    {
      header: '사업자정보', // colspan title
      direction: 'horizontal', // merge type
      items: ['col2', 'col3', 'col4', 'col5', 'col6'],
    },
    {
      header: 'RDS정보',
      direction: 'horizontal',
      items: ['col8', 'col9'],
    },
    'col10',
  ]);

  data.setRows([{ col1: 'a' }, { col1: 'b' }, { col1: 'c' }]);
}
`;

const testCode6 = `
<kw-grid
  :visible-rows="1"
  @init="initGrid"
/>
`;

const testCodeScript6 = `
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
    { fieldName: 'col1', header: ' ', width: '250', styleName: 'text-left kw-bc--bg-grid text-weight-medium' },
    {
      fieldName: 'col2',
      header: {
        text: '고객 유형',
        styleName: 'essential',
      },
      width: '250',
      styleName: 'text-right',
    },
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
    { fieldName: 'col1', header: '고객 번호', width: '150', styleName: 'text-center', hint: 'HINT TEXT' },
    { fieldName: 'col2', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '180' },
    { fieldName: 'col4', header: '이름/담당자', width: '80', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col5', header: '성별', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '생년월일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col7', header: '휴대전화번호', width: '160', styleName: 'text-center' },
    { fieldName: 'col8', header: '주소', width: '296' },
    { fieldName: 'col9', header: '약관동의', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col10', header: '본인인증', width: '100', styleName: 'text-center kw-fc--error' },
    { fieldName: 'col11', header: '통합고객', width: '100', styleName: 'text-center kw-fc--primary' },
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
  view.rowIndicator.visible = false;
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
  view.rowIndicator.visible = false;
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

function initGrid4(data, view) {
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
    { fieldName: 'col1', header: '대상구분' },
    { fieldName: 'col2', header: '사업자구분' },
    { fieldName: 'col3', header: '사번' },
    { fieldName: 'col4', header: '성명' },
    { fieldName: 'col5', header: '업무제약일' },
    { fieldName: 'col6', header: '은행명' },
    { fieldName: 'col7', header: '계좌번호' },
    { fieldName: 'col8', header: '은행명' },
    { fieldName: 'col9', header: '계좌번호' },
    { fieldName: 'col10', header: '마지막' },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.checkBar.visible = true;
  view.rowIndicator.visible = true;

  // multi row header setting
  view.setColumnLayout([
    'col1',
    {
      header: '사업자정보',
      direction: 'horizontal',
      items: ['col2', 'col3', 'col4', 'col5', 'col6'],
    },
    {
      header: 'RDS정보',
      direction: 'horizontal',
      items: ['col8', 'col9'],
    },
    'col10',
  ]);

  data.setRows([{ col1: 'a' }, { col1: 'b' }, { col1: 'c' }]);
}
function initGrid6(data, view) {
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
    { fieldName: 'col1', header: ' ', width: '250', styleName: 'text-left kw-bc--bg-grid text-weight-medium' },
    {
      fieldName: 'col2',
      header: {
        text: '고객 유형',
        styleName: 'essential',
      },
      width: '250',
      styleName: 'text-right',
    },
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

const testCode5 = `
<div class="grid-horizontal-wrap">
    <div class="grid-horizontal-wrap__section"> <!-- insert width helper class on smaller one when each 'grid-horizontal-wrap__section' has different size -->
      grid
      <!-- <kw-grid
        style="height:598px"
      />-->
    </div>
    <div class="grid-horizontal-wrap__section">
      grid
    </div>
  </div>
`;

const guideHistory = [
  {
    timestamp: '2023.01.26',
    text: 'Add thead hint case',
  },
  {
    timestamp: '2022.10.11',
    text: 'Add more detail of case #6',
  },
  {
    timestamp: '2022.10.11',
    text: 'Add guide content of case #5',
  },
  {
    timestamp: '2022.10.06',
    text: 'change guide case #5',
  },
  {
    timestamp: '2022.09.26',
    text: 'Add case #6, essential',
  },
  {
    timestamp: '2022.09.26',
    text: 'Add case #6, text-align and color in grid',
  },
  {
    timestamp: '2022.09.26',
    text: 'Add case #5, horizontal grid',
  },
  {
    timestamp: '2022.08.30',
    text: 'Add case - multi row header type(case#4) and modified notice area',
  },
];
</script>
