<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Heading Text (h1, h2, h3, h4)
    </h2>
    <p class="kw-guide-description">
      The reference page of heading-text with stepper is in Stepper's page.<br>
      ※ The root for the reference page of heading-text with stepper: elements / stepper
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
          <div class="kw-stepper-headingtext">
            <h2>h2 Heading-text with stepper</h2>
            <kw-stepper
              ref="stepper"
              v-model="stepInitNum"
            >
              <kw-step
                :name="1"
                title="step"
                :done="step > 1"
                prefix="1"
              />
              <kw-step
                :name="2"
                title="step"
                :done="step > 2"
                prefix="2"
              />
              <kw-step
                :name="3"
                title="step"
                :done="step > 3"
                prefix="3"
              />
              <kw-step
                :name="4"
                title="step"
                :done="step > 4"
                prefix="4"
              />
            </kw-stepper>
          </div>
          <h3>h3 Heading-text</h3>
          <h3>h3 Heading-text<span class="kw-title-refrence">&#8251; 필수(&#42;)를 제외한 항목만 변경 가능합니다.</span></h3>
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
  <!-- h2 Heading-text with stepper -->
  <div class="kw-stepper-headingtext">
    <h2>h2 Heading-text with stepper</h2>
    <kw-stepper
      ref="stepper"
      v-model="stepInitNum"
    >
      <kw-step
        :name="1"
        title="step"
        :done="step > 1"
        prefix="1"
      />
      <kw-step
        :name="2"
        title="step"
        :done="step > 2"
        prefix="2"
      />
      <kw-step
        :name="3"
        title="step"
        :done="step > 3"
        prefix="3"
      />
      <kw-step
        :name="4"
        title="step"
        :done="step > 4"
        prefix="4"
      />
    </kw-stepper>
  </div>
  <h3>h3 Heading-text</h3>
  <h3>h3 Heading-text<span class="kw-title-refrence">&#8251; 필수(&#42;)를 제외한 항목만 변경 가능합니다.</span></h3>
  <h4>h4 Heading-text</h4>
`;

const testScript = `
const stepInitNum = ref(1);
`;

const historyData = [
  {
    timestamp: '2022-08-30',
    text: 'Add heading text with stepper ',
  },
];
</script>
