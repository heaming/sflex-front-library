<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Action Top
    </h2>
    <p class="kw-guide-description">
      Action area located in table top.<br>
      <b>All button are located in right-side(updated)</b> <br>
      'kw-action-top' uses flex css style.<b class="accent"> '&lt;template #left&gt;'</b>
      is left-aligned, the rest are right-aligned.
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
              kw-action-top
            </td>
            <td>
              <!-- "kw-action--top" -->
            </td>
            <td>
              wrap by kw-action-top tag
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
        <li>The tag name is changed to seperate area grid top and bottom</li>
        <li>
          please check below change things
          <ol class="py10">
            <li>There is <em class="notice">no more spacing helperclass</em> between buttons (ex. ml8, mr8 )</li>
            <li>please add class <em class="notice">"kw-select--rows-per-page"</em> in left side select</li>
            <li>
              please change the class from 'kw-action-bar--number' to
              <em class="notice">'accent'</em>for bold text
            </li>
            <li>
              please remove the spaced px value in kw-separator
              (refer to <router-link to="/Publish/Components/Elements/Separator">
                separator page
              </router-link>)
            </li>
          </ol>
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Case 01
      </h3>
      <p class="kw-guide-description">
        default style <br>
        The right buttons have to
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-top>
            <template #left>
              <kw-paging-info
                :page-size="30"
                :page-size-options="[30,60,90,120]"
                :total-count="7"
              />
              <span class="ml8">(단위:원)</span>
            </template>
            <kw-btn
              icon="download_on"
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
          </kw-action-top>
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
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
          <kw-action-top>
            <template #left>
              <span>(단위:원)</span>
            </template>
            <kw-btn
              icon="download_on"
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
          </kw-action-top>
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
          <kw-action-top>
            <template #left>
              <kw-paging-info :total-count="7" />
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
          </kw-action-top>
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
          <kw-action-top>
            <template #left>
              <kw-paging-info
                :page-size="30"
                :page-size-options="[30,60,90,120]"
                :total-count="7"
              />
            </template>
            <kw-btn
              label="행추가"
              grid-action
              class="ml16"
            />
            <kw-separator
              vertical
              inset
              spaced
            />
            <kw-btn
              icon="download_on"
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
              label="법인 고객 등록"
              primary
              dense
            />
          </kw-action-top>
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

const testCode = `
<kw-action-top>
  <template #left>
    <kw-paging-info
      :page-size="30"
      :page-size-options="[30,60,90,120]"
      :total-count="7"
    />
    <span class="ml8">(단위:원)</span>
  </template>
  <kw-btn
    icon="download_on"
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
</kw-action-top>
`;

const testCode2 = `
<kw-action-top>
  <template #left>
    <span>(단위: 원)</span>
  </template>
  <kw-btn
    icon="download_on"
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
</kw-action-top>
`;

const testCode3 = `
<kw-action-top>
  <template #left>
    <kw-paging-info :total-count="7" />
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
  </kw-action-top>
`;
const testCode4 = `
<kw-action-top>
  <template #left>
    <kw-paging-info
      :page-size="30"
      :page-size-options="[30,60,90,120]"
      :total-count="7"
    />
  </template>
  <kw-btn
    label="행추가"
    grid-action
    class="ml16"
  />
  <kw-separator
    vertical
    inset
    spaced
  />
  <kw-btn
    icon="download_on"
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
    label="법인 고객 등록"
    primary
    dense
  />
  </kw-action-top>
`;

const guideHistory = [
  {
    timestamp: '2022.11.15',
    text: 'updated inside of template #left in action-top',
  },
  {
    timestamp: '2022.11.09',
    text: 'add unit text next to select in left side',
  },
  {
    timestamp: '2022.10.06',
    text: 'edit icon name in code',
  },
  {
    timestamp: '2022.09.23',
    text: 'add new version actionbar(top area)',
  },
];
</script>
