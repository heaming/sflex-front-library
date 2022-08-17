<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Action Bar
    </h2>
    <p class="kw-guide-description">
      Table Action bar.<br>
      'kw-action-bar' uses 'flex'. '&lt;template #left&gt;' is left-aligned, the rest are right-aligned.
    </p>
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
              Any tag in ActionBar
            </td>
            <td>
              kw-action-bar--separator
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
            </td>
            <td>
              const's name in javascript(const's name.model)<br>
              const's name in javascript(const's name.option)<br>
              Copy the text from zeplin
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
      <q-card>
        <div class="kw-guide-example">
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
              icon="excel|0 0 16 16"
              class="kw-btn--excel kw-action-bar--separator"
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
        </div>
        <guide-code-view
          :code-value="[testCode,testData]"
          :lang="['vue','javascript']"
          :multi="true"
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
    icon="excel|0 0 16 16"
    class="kw-btn--excel kw-action-bar--separator"
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
`;
const testData = `
const selectData = {
  model: '10',
  options: [
    '10', '20', '30', '40', '50',
  ],
};
`;
</script>
