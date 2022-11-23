<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Heading Text (h1, h2, h3, h4)
    </h2>
    <p class="kw-guide-description">
      The reference page of heading-text with stepper is in Stepper's page.<br>
    </p>
    <guide-history-view
      :items="historyData"
    />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Default
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <h1>h1 Heading-text</h1>
          <h2>h2 Heading-text</h2>
          <h2 class="h2-small">
            h2 small
          </h2>
          <h3>h3 Heading-text</h3>
          <h3 class="delete">
            h3 Heading-text<span class="kw-title-refrence">&#8251; 필수(&#42;)를 제외한 항목만 변경 가능합니다.</span>
          </h3>
          <h3>
            h3 Heading-text
            <ul class="kw-notification">
              <li>
                <span class="kw-fc--primary">필수(&#42;)를 제외</span>한 항목만 변경 가능합니다.
              </li>
            </ul>
          </h3>
          <h3>
            h3 Heading-text
            <ul class="kw-notification">
              <li>
                <span class="kw-fc--primary">필수(&#42;)를 제외</span>한 항목만 변경 가능합니다.
              </li>
              <li> 필수(&#42;)를 제외한 항목만 변경 가능합니다.</li>
            </ul>
          </h3>
          <h4>h4 Heading-text</h4>
        </div>
        <guide-code-view
          :code-value="[headingText, testScript]"
          :lang="['vue', 'javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Button"
        class="kw-guide-title"
      >
        H3 Title with
      </h3>
      <p class="kw-guide-description">
        If you need layout like as below(justify-between) please use
        <em>kw-action-top</em> component and <em>margin helper class</em>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-top class="mb20">
            <template #left>
              <h3>H3 Title</h3>
            </template>
            <kw-btn
              secondary
              dense
              label="거래처 마스터 선택"
            />
          </kw-action-top>
        </div>
        <guide-code-view
          :code-value="titleWithButton"
          :lang="'vue'"
        />
      </q-card>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-top class="mb20">
            <template #left>
              <h3>H3 Title</h3>
            </template>
            <span class="kw-fc--black3 text-weight-regular"> (단위:원)</span>
          </kw-action-top>
        </div>
        <guide-code-view
          :code-value="titleWithText"
          :lang="'vue'"
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>

const headingText = `
  <h1>h1 Heading-text</h1>
  <h2>h2 Heading-text</h2>
  <h2 class="h2-small">
    h2 small
  </h2>
  <h3>h3 Heading-text</h3>
  <h3 class="delete">
    h3 Heading-text<span class="kw-title-refrence">&#8251; 필수(&#42;)를 제외한 항목만 변경 가능합니다.</span>
  </h3>
  <h3>
    h3 Heading-text
    <ul class="kw-notification">
      <li>
        <span class="kw-fc--primary">필수(&#42;)를 제외</span>한 항목만 변경 가능합니다.
      </li>
    </ul>
  </h3>
  <h3>
    h3 Heading-text
    <ul class="kw-notification">
      <li>
        <span class="kw-fc--primary">필수(&#42;)를 제외</span>한 항목만 변경 가능합니다.
      </li>
      <li> 필수(&#42;)를 제외한 항목만 변경 가능합니다.</li>
    </ul>
  </h3>
  <h4>h4 Heading-text</h4>
`;

const testScript = `
const stepInitNum = ref(1);
`;

const titleWithButton = `
<kw-action-top class="mb20">
  <template #left>
    <h3>H3 Title</h3>
  </template>
  <kw-btn
    secondary
    dense
    label="거래처 마스터 선택"
  />
</kw-action-top>
`;

const titleWithText = `
<kw-action-top class="mb20">
  <template #left>
    <h3>H3 Title</h3>
  </template>
  <span class="kw-fc--black3 text-weight-regular"> (단위:원)</span>
</kw-action-top>
`;

const historyData = [
  {
    timestamp: '2022-11-17',
    text: 'Add h3 with button/text case',
  },
  {
    timestamp: '2022-09-16',
    text: 'Delete h3 title with reference mark',
  },
  {
    timestamp: '2022-09-15',
    text: 'stepper has been removed. add small version for h2',
  },
  {
    timestamp: '2022-08-30',
    text: 'Add heading text with stepper ',
  },
];
</script>
