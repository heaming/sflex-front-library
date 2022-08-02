<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Grid Blank
    </h2>
    <p class="kw-guide-description">
      You don't have to publish the grid because of the complexity of interacting with the data.
      <br>Therefore, substitute the blank box below for that area.
    </p>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <div class="grid-blank kw-my-3" />
          <div class="kw-guide-code">
            <HighCode
              :code-value="testCode"
              :lang="vue"
              theme="light"
              width="100%"
              height="auto"
            />
          </div>
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';

const vue = 'vue';

const testCode = `
<div class="grid-blank" />
`;
</script>
