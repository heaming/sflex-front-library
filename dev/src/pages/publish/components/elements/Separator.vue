<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Separator
    </h2>
    <p class="kw-guide-description">
      Separator's margin top & bottom are 30px | color code: $line-line(#ddd)
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Separator
      </h3>
      <p class="kw-guide-description">
        Separator
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="../../../../../assets/images/seperator.png"
            alt="separator"
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
