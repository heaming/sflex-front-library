<template>
  <kw-page>
    <template #header>
      <kw-page-header
        :options="['홈', '역량/총무', '역량관리', 'Tabs Sample #2(Tab in Tab)']"
      />
    </template>

    <kw-tabs model-value="1">
      <kw-tab
        name="1"
        label="조직별"
      />
      <kw-tab
        name="2"
        label="개인별"
      />
    </kw-tabs>
    <kw-tab-panels model-value="1">
      <kw-tab-panel name="1">
        <kw-tabs model-value="1">
          <kw-tab
            name="1"
            label="일반조회"
          />
          <kw-tab
            name="2"
            label="주문번호 조회"
          />
          <kw-tab
            name="3"
            label="계약자 정보(교원키 조회)"
          />
          <kw-tab
            name="4"
            label="설치자 정보 조회"
          />
        </kw-tabs>
        <kw-tab-panels model-value="1">
          <kw-tab-panel name="1">
            <kw-search>
              <kw-search-row>
                <kw-search-item label="교육년월">
                  <kw-date-picker
                    type="month"
                  />
                </kw-search-item>
                <kw-search-item label="조직">
                  <kw-select
                    placeholder="총괄단 선택"
                    :options="['강남']"
                    use-input
                  />
                  <kw-select
                    placeholder="센터 선택"
                    :options="['강남센터', '광진센터']"
                    use-input
                  />
                </kw-search-item>
                <kw-search-item label="수료여부">
                  <kw-option-group
                    model-value=""
                    type="radio"
                    :options="['수료', '미수료']"
                    first-option="all"
                  />
                </kw-search-item>
              </kw-search-row>
              <kw-search-row>
                <kw-search-item label="수료여부">
                  <kw-select
                    :options="['플래너전문가(1차월)(1차수)']"
                    first-option="all"
                  />
                </kw-search-item>
              </kw-search-row>
            </kw-search>
          </kw-tab-panel>
        </kw-tab-panels>
        <div class="result-area">
          <h3>계약현황</h3>
          <kw-action-top>
            <template #left>
              <span>총</span>
              <span class="accent pl4">1,247</span>
            </template>
            <kw-btn
              dense
              secondary
              label="파트너과정 수료이관"
            />
            <kw-btn
              dense
              secondary
              label="버튼"
            />
            <kw-separator
              spaced
              vertical
              inset
            />
            <kw-btn
              icon="print_16"
              dense
              secondary
              label="인쇄"
            />
            <kw-btn
              icon="excel_download_16"
              dense
              secondary
              label="엑셀 다운로드"
              @click="onClickExcelDownload"
            />
            <kw-separator
              spaced
              vertical
              inset
            />
            <kw-btn
              primary
              dense
              label="주기능"
            />
          </kw-action-top>
          <kw-grid
            ref="grdRef"
            :visible-rows="5"
            @init="initGrid"
          />
          <ul class="mt12 kw-notification">
            <li>이것은 테이블 하단 안내문구 예시입니다.(This is a 'kw-notification' sample which located in grid bottom)</li>
          </ul>
          <h3>상품결과</h3>
          <kw-action-top>
            <template #left>
              <span>총</span>
              <span class="accent pl4">1,247</span>
            </template>
            <kw-btn
              dense
              secondary
              label="파트너과정 수료이관"
            />
            <kw-btn
              dense
              secondary
              label="버튼"
            />
            <kw-separator
              spaced
              vertical
              inset
            />
            <kw-btn
              icon="print_16"
              dense
              secondary
              label="인쇄"
            />
            <kw-btn
              icon="excel_download_16"
              dense
              secondary
              label="엑셀 다운로드"
              @click="onClickExcelDownload"
            />
            <kw-separator
              spaced
              vertical
              inset
            />
            <kw-btn
              primary
              dense
              label="주기능"
            />
          </kw-action-top>
          <kw-grid
            ref="grdRef"
            :visible-rows="5"
            @init="initGrid"
          />
        </div>
      </kw-tab-panel>
    </kw-tab-panels>
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
import { gridUtil } from '~kw-lib';

const grdRef = ref();

function onClickExcelDownload() {
  const view = grdRef.value.getView();

  gridUtil.exportView(view, {
    fileName: '교육수료 실적현황',
    timePostfix: true,
  });
}

function initGrid(data, view) {
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

  data.setFields(fields);
  view.setColumns(columns);

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

const sampleVueCode = `
<kw-page>
  <template #header>
    <kw-page-header
      :options="['홈', '역량/총무', '역량관리', 'Tabs Sample #2(Tab in Tab)']"
    />
  </template>

  <kw-tabs model-value="1">
    <kw-tab
      name="1"
      label="조직별"
    />
    <kw-tab
      name="2"
      label="개인별"
    />
  </kw-tabs>
  <kw-tab-panels model-value="1">
    <kw-tab-panel name="1">
      <kw-tabs model-value="1">
        <kw-tab
          name="1"
          label="일반조회"
        />
        <kw-tab
          name="2"
          label="주문번호 조회"
        />
        <kw-tab
          name="3"
          label="계약자 정보(교원키 조회)"
        />
        <kw-tab
          name="4"
          label="설치자 정보 조회"
        />
      </kw-tabs>
      <kw-tab-panels model-value="1">
        <kw-tab-panel name="1">
          <kw-search>
            <kw-search-row>
              <kw-search-item label="교육년월">
                <kw-date-picker
                  type="month"
                />
              </kw-search-item>
              <kw-search-item label="조직">
                <kw-select
                  placeholder="총괄단 선택"
                  :options="['강남']"
                  use-input
                />
                <kw-select
                  placeholder="센터 선택"
                  :options="['강남센터', '광진센터']"
                  use-input
                />
              </kw-search-item>
              <kw-search-item label="수료여부">
                <kw-option-group
                  model-value=""
                  type="radio"
                  :options="['수료', '미수료']"
                  first-option="all"
                />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item label="수료여부">
                <kw-select
                  :options="['플래너전문가(1차월)(1차수)']"
                  first-option="all"
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
        </kw-tab-panel>
      </kw-tab-panels>
      <div class="result-area">
        <h3>계약현황</h3>
        <kw-action-top>
          <template #left>
            <span>총</span>
            <span class="accent pl4">1,247</span>
          </template>
          <kw-btn
            dense
            secondary
            label="파트너과정 수료이관"
          />
          <kw-btn
            dense
            secondary
            label="버튼"
          />
          <kw-separator
            spaced
            vertical
            inset
          />
          <kw-btn
            icon="print_16"
            dense
            secondary
            label="인쇄"
          />
          <kw-btn
            icon="excel_download_16"
            dense
            secondary
            label="엑셀 다운로드"
            @click="onClickExcelDownload"
          />
          <kw-separator
            spaced
            vertical
            inset
          />
          <kw-btn
            primary
            dense
            label="주기능"
          />
        </kw-action-top>
        <kw-grid
          ref="grdRef"
          :visible-rows="5"
          @init="initGrid"
        />
        <ul class="mt12 kw-notification">
          <li>이것은 테이블 하단 안내문구 예시입니다.(This is a 'kw-notification' sample which located in grid bottom)</li>
        </ul>
        <h3>상품결과</h3>
        <kw-action-top>
          <template #left>
            <span>총</span>
            <span class="accent pl4">1,247</span>
          </template>
          <kw-btn
            dense
            secondary
            label="파트너과정 수료이관"
          />
          <kw-btn
            dense
            secondary
            label="버튼"
          />
          <kw-separator
            spaced
            vertical
            inset
          />
          <kw-btn
            icon="print_16"
            dense
            secondary
            label="인쇄"
          />
          <kw-btn
            icon="excel_download_16"
            dense
            secondary
            label="엑셀 다운로드"
            @click="onClickExcelDownload"
          />
          <kw-separator
            spaced
            vertical
            inset
          />
          <kw-btn
            primary
            dense
            label="주기능"
          />
        </kw-action-top>
        <kw-grid
          ref="grdRef"
          :visible-rows="5"
          @init="initGrid"
        />
      </div>
    </kw-tab-panel>
  </kw-tab-panels>
</kw-page>
`;

const sampleJsCode = `
function initGrid(data, view) {
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

  data.setFields(fields);
  view.setColumns(columns);

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
</script>
