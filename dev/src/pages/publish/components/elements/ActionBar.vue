<template>
  <kw-page class="kw-guide">
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
              <div class="kw-action-bar--count">
                총 <span class="kw-action-bar--number pl4">156</span>
              </div>
              <kw-separator
                vertical
                inset
                spaced="8px"
              />
              <kw-select
                v-model="selectData.model"
                :options="selectData.options"
                borderless
                dense
                suffix="개씩보기"
              />
              <div class="kw-action-bar--send ml40">
                <kw-btn
                  label="URL 전송"
                  dense
                  color="bg-box"
                  border-color="line-line"
                  text-color="black3"
                />
                <p class="kw-action-bar--description ml16">
                  고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
                </p>
              </div>
            </template>

            <kw-btn
              icon="excel_16"
              dense
              secondary
              label="엑셀 다운로드"
            />
            <kw-separator
              vertical
              inset
              spaced="16px"
            />
            <kw-btn
              label="개인 고객 등록 URL 전송"
              primary
              dense
            />
            <kw-btn
              label="개인 고객 등록"
              class="ml8"
              primary
              dense
            />
            <kw-btn
              label="법인 고객 등록"
              class="ml8"
              primary
              dense
            />
          </kw-action-bar>
        </div>
        <guide-code-view
          :code-value="[testCode,testData]"
          :lang="['vue','javascript']"
          multi
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
    <div class="kw-action-bar--count">
      총 <span class="kw-action-bar--number pl4">156</span>
    </div>
    <kw-separator
      vertical
      inset
      spaced="8px"
    />
    <kw-select
      v-model="selectData.model"
      :options="selectData.options"
      borderless
      dense
      suffix="개씩보기"
    />
    <div class="kw-action-bar--send ml40">
      <kw-btn
        label="URL 전송"
        dense
        color="bg-box"
        border-color="line-line"
        text-color="black3"
      />
      <p class="kw-action-bar--description ml16">
        고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
      </p>
    </div>
  </template>

  <kw-btn
    secondary
    icon="excel_16"
    dense
    label="엑셀 다운로드"
  />
  <kw-separator
    vertical
    inset
    spaced="16px"
  />
  <kw-btn
    label="개인 고객 등록 URL 전송"
    primary
    dense
  />
  <kw-btn
    label="개인 고객 등록"
    class="ml8"
    primary
    dense
  />
  <kw-btn
    label="법인 고객 등록"
    class="ml8"
    primary
    dense
  />
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
const guideHistory = [
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
