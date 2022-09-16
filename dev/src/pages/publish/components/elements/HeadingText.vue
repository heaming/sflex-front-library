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

const historyData = [
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
