<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Heading Text (h1, h2, h3, h4)
    </h2>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <h1>h1 Heading-text</h1>
          <h2>h2 Heading-text</h2>
          <h3>h3 Heading-text</h3>
          <h4>h4 Heading-text</h4>
        </div>
        <guide-code-view
          :code-value="headingText"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>

const headingText = `
<h1>h1 Heading-text</h1>
<h2>h2 Heading-text</h2>
<h3>h3 Heading-text</h3>
<h4>h4 Heading-text</h4>
`;

</script>
