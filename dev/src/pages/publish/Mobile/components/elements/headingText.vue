<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Heading Text (h3)
    </h2>
    <guide-history-view :items="historyData" />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        h3 in MOBILE
      </h3>
      <p class="kw-guide-description">
        h3 has no margin top and bottom on mobile.<br>
        others are same as desktop.<br>
        Getting more about heading text, Have a look desktop/ headingtext!<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h3>h3 Heading-text</h3>
        </div>
        <guide-code-view
          :code-value="headingText"
          :lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const headingText = `
<h3>h3 Heading-text</h3>
`;

const historyData = [
  {
    timestamp: '2022-01-10',
    text: 'First added',
  },
];

</script>
