<template>
  <kw-page class="kw-guide delete">
    <h2 class="kw-guide-h2">
      Action Bar
    </h2>
    <p class="kw-guide-description">
      Table Action bar.<br>
      'kw-action-bar' uses 'flex'. '&lt;template #left&gt;' is left-aligned, the rest are right-aligned.
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section delete">
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
            <th>
              Class(attribue)
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              div
            </td>
            <td>
              kw-action-bar--count
            </td>
            <td>
              Count area
            </td>
          </tr>
          <tr>
            <td>
              <p class="delete">
                Any tag in ActionBar
              </p>
              <b>kw-separator</b>
            </td>
            <td>
              <p class="delete">
                kw-action-bar--separator
              </p>
              <b>Check Separator Page</b>
            </td>
            <td>
              Separator between elements
            </td>
          </tr>
          <tr>
            <td>
              p
            </td>
            <td>
              kw-action-bar--description
            </td>
            <td>
              description, etc.
            </td>
          </tr>
          <tr>
            <td>
              kw-select
            </td>
            <td>
              v-model="selectData.model"<br>
              :options="selectData.options"<br>
              suffix=""<br>
              <b>borderless</b><br>
              <b>dense</b>
            </td>
            <td>
              const's name in javascript(const's name.model)<br>
              const's name in javascript(const's name.option)<br>
              Copy the text from zeplin<br>
              <b>default</b><br>
              <b>default</b>
            </td>
          </tr>
          <tr>
            <td>
              option in javascript
            </td>
            <td>
              options: [
              '10', '20', '30', '40', '50',
              ],
            </td>
            <td>
              Copy the numbers from zeplin
            </td>
          </tr>
          <tr>
            <td>
              template
            </td>
            <td>
              #left or #right
            </td>
            <td>
              The template is aligned left side or right side
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Case 01
      </h3>
      <p class="kw-guide-description notice">
        This case is not currently used because the button coding method and the location of each role have changed.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-bar>
            <template #left>
              <span>총</span>
              <span class="accent pl4">156</span>
              <kw-separator
                vertical
                inset
                spaced
              />
              <kw-select
                v-model="selectData.model"
                class="kw-select--rows-per-page"
                :options="selectData.options"
                borderless
                dense
                suffix="개씩보기"
              />
              <kw-btn
                label="URL 전송"
                class="ml40"
                dense
                color="bg-box"
                border-color="line-line"
                text-color="black3"
              />
              <p class="description ml16">
                고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
              </p>
            </template>
            <template #default>
              <kw-btn
                icon="excel"
                dense
                secondary
                label="엑셀 다운로드"
              />
              <kw-separator
                vertical
                inset
                spaced
              />
              <kw-btn
                label="개인 고객 등록 URL 전송"
                primary
                dense
              />
              <kw-btn
                label="개인 고객 등록"
                primary
                dense
              />
              <kw-btn
                label="법인 고객 등록"
                primary
                dense
              />
            </template>
          </kw-action-bar>
        </div>
        <guide-code-view
          :code-value="[testCode,testData]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Case 02
      </h3>
      <p class="kw-guide-description notice">
        This is sample which have a unit text in left-side
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-bar>
            <template #left>
              <span>(단위: 원)</span>
            </template>

            <template #default>
              <kw-btn
                icon="excel"
                dense
                secondary
                label="엑셀 다운로드"
              />
              <kw-separator
                vertical
                inset
                spaced
              />
              <kw-btn
                label="품의"
                primary
                dense
              />
            </template>
          </kw-action-bar>
        </div>
        <guide-code-view
          :code-value="testCode2"
          :lang="'vue'"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Case 03
      </h3>
      <p class="kw-guide-description notice">
        This is sample case 3
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-bar>
            <template #left>
              <span>총</span>
              <span class="accent pl4">1,247</span>
            </template>

            <template #default>
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
                icon="print"
                dense
                secondary
                label="인쇄"
              />
              <kw-btn
                icon="download_on"
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
            </template>
          </kw-action-bar>
        </div>
        <guide-code-view
          :code-value="testCode3"
          :lang="'vue'"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Case 04
      </h3>
      <p class="kw-guide-description notice">
        This is sample case 4
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-bar>
            <template #left>
              <span>총</span>
              <span class="accent pl4">156</span>
              <kw-separator
                vertical
                inset
                spaced
              />
              <kw-select
                v-model="selectData.model"
                class="kw-select--rows-per-page"
                :options="selectData.options"
                borderless
                dense
                suffix="개씩보기"
              />

              <kw-btn
                label="저장"
                grid-action
                class="ml16"
              />
            </template>

            <kw-btn
              icon="excel"
              dense
              secondary
              label="엑셀 다운로드"
            />
            <kw-separator
              vertical
              inset
              spaced
            />
            <kw-btn
              label="개인 고객 등록 URL 전송"
              primary
              dense
            />
            <kw-btn
              label="개인 고객 등록"
              primary
              dense
            />
            <kw-btn
              label="법인 고객 등록"
              primary
              dense
            />
          </kw-action-bar>
        </div>
        <guide-code-view
          :code-value="testCode4"
          :lang="'vue'"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const selectData = {
  model: '10',
  options: [
    '10', '20', '30', '40', '50',
  ],
};

const testCode = `
<kw-action-bar>
  <template #left>
    <span>총</span>
    <span class="accent pl4">156</span>
    <kw-separator
      vertical
      inset
      spaced
    />
    <kw-select
      v-model="selectData.model"
      class="kw-select--rows-per-page"
      :options="selectData.options"
      borderless
      dense
      suffix="개씩보기"
    />
    <kw-btn
      label="URL 전송"
      class="ml40"
      dense
      color="bg-box"
      border-color="line-line"
      text-color="black3"
    />
    <p class="description ml16">
      고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
    </p>
  </template>
  <template #default>
    <kw-btn
      icon="excel"
      dense
      secondary
      label="엑셀 다운로드"
    />
    <kw-separator
      vertical
      inset
      spaced
    />
    <kw-btn
      label="개인 고객 등록 URL 전송"
      primary
      dense
    />
    <kw-btn
      label="개인 고객 등록"
      primary
      dense
    />
    <kw-btn
      label="법인 고객 등록"
      primary
      dense
    />
  </template>
</kw-action-bar>
`;
const testData = `
const selectData = {
  model: '10',
  options: [
    '10', '20', '30', '40', '50',
  ],
};
`;

const testCode2 = `
<kw-action-bar>
  <template #left>
    <span>(단위: 원)</span>
  </template>

  <template #default>
    <kw-btn
      icon="excel"
      dense
      secondary
      label="엑셀 다운로드"
    />
    <kw-separator
      vertical
      inset
      spaced
    />
    <kw-btn
      label="품의"
      primary
      dense
    />
  </template>
</kw-action-bar>
`;

const testCode3 = `
<kw-action-bar>
  <template #left>
    <span>총</span>
    <span class="accent pl4">1,247</span>
  </template>

  <template #default>
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
      icon="print"
      dense
      secondary
      label="인쇄"
    />
    <kw-btn
      icon="download_on"
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
  </template>

</kw-action-bar>
`;
const testCode4 = `
<kw-action-bar>
  <template #left>
    <span>총</span>
    <span class="accent pl4">156</span>
    <kw-separator
      vertical
      inset
      spaced
    />
    <kw-select
      v-model="selectData.model"
      class="kw-select--rows-per-page"
      :options="selectData.options"
      borderless
      dense
      suffix="개씩보기"
    />

    <kw-btn
      label="저장"
      grid-action
      class="ml16"
    />
  </template>

  <kw-btn
    icon="excel"
    dense
    secondary
    label="엑셀 다운로드"
  />
  <kw-separator
    vertical
    inset
    spaced
  />
  <kw-btn
    label="개인 고객 등록 URL 전송"
    primary
    dense
  />
  <kw-btn
    label="개인 고객 등록"
    primary
    dense
  />
  <kw-btn
    label="법인 고객 등록"
    primary
    dense
  />
</kw-action-bar>
`;

const guideHistory = [
  {
    timestamp: '2022.09.23',
    text: 'delete old version actionbar',
  },
  {
    timestamp: '2022.09.19',
    text: 'Add case 2/3/4',
  },
  {
    timestamp: '2022.09.15',
    text: 'Add notice in Case1. Edit summary',
  },
  {
    timestamp: '2022.09.08',
    text: 'Add - select attr',
  },
];
</script>
