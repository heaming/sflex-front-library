<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Seperator
    </h2>
    <p class="kw-guide-description">
      Seperator's margin top & bottom are 30px | color code: $line-line(#ddd)
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Seperator
      </h3>
      <p class="kw-guide-description">
        Seperator
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="../../../../../assets/images/seperator.png"
            alt="seperator"
          >
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<kw-separator />
`;
</script>
