<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Grid's elements
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
        <li>이 가이드페이지는 한국의 교원 개발자에게 제공하는 그리드 내부 요소에 대한 가이드입니다.</li>
        <li>
          그리드를 구성함에 있어 상세한 사항은 다음의 링크(리얼그리드)에서 확인하실 수 있습니다.<br>
          <a
            href="https://docs.realgrid.com/start/overview"
            target="_blank"
          >https://docs.realgrid.com/start/overview</a>
        </li>
        <li class="notice">
          그리드 내의 버튼 커스터마이징은 정해진 클래스를 추가하는 것으로만 진행해야 합니다. '버튼 클래스'을 참조하세요.
        </li>
      </ul>
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
              <router-link to="/Publish/Components/color">
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
        버튼
      </h3>
      <p class="kw-guide-description">
        위 버튼 클래스를 실제 적용한 그리드입니다. 소스코드를 참고하세요.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-grid
            :visible-rows="5"
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
  ];

  const columns = [
    { fieldName: 'col1', width: '100', styleName: 'text-center rg-button-default', renderer: { type: 'button' } },
    { fieldName: 'col2', width: '100', styleName: 'text-center rg-button-default rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col3', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col4', width: '100', styleName: 'text-center rg-button-exceldown', renderer: { type: 'button' } },
    { fieldName: 'col5', width: '100', styleName: 'text-center rg-button-exceldown rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col6', width: '100', styleName: 'text-center rg-button-excelup', renderer: { type: 'button' } },
  ];
  // text-red, text-blue
  data.setFields(fields);
  view.setColumns(columns);
  view.header.visible = false;

  data.setRows([
    { col1: '기본 활성', col2: '기본 비활성', col3: '링크 언더라인', col4: '엑셀 다운로드', col5: '엑셀 다운 비활성', col6: '엑셀 업로드' },
  ]);
}

const testCode1 = `
<kw-grid
  :visible-rows="5"
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
  ];

  const columns = [
    { fieldName: 'col1', width: '100', styleName: 'text-center rg-button-default', renderer: { type: 'button' } },
    { fieldName: 'col2', width: '100', styleName: 'text-center rg-button-default rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col3', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col4', width: '100', styleName: 'text-center rg-button-exceldown', renderer: { type: 'button' } },
    { fieldName: 'col5', width: '100', styleName: 'text-center rg-button-exceldown rg-button-disabled', renderer: { type: 'button' } },
    { fieldName: 'col6', width: '100', styleName: 'text-center rg-button-excelup', renderer: { type: 'button' } },
  ];
  data.setFields(fields);
  view.setColumns(columns);
  view.header.visible = false;

  data.setRows([
    { col1: '기본 활성', col2: '기본 비활성', col3: '링크 언더라인', col4: '엑셀 다운로드', col5: '엑셀 다운 비활성', col6: '엑셀 업로드' },
  ]);
}
`;

const guideHistory = [
  {
    timestamp: '2022.12.16',
    text: '본 페이지 최초 추가',
  },
];
</script>
