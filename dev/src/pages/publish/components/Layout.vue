<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Layout
    </h2>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Type 1
      </h3>
      <p class="kw-guide-description">
        Use full width
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="../../../../assets/images/layout_type1.png"
            alt="Layout Type 1"
          >
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="layoutCode1"
            lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Type 2
      </h3>
      <p class="kw-guide-description">
        Width : 1536px & Two Columns
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="../../../../assets/images/layout_type2.png"
            alt="Layout Type 1"
          >
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="layoutCode2"
            lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Type 3
      </h3>
      <p class="kw-guide-description">
        Width : 1212px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="../../../../assets/images/layout_type3.png"
            alt="Layout Type 1"
          >
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="layoutCode3"
            lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';

const layoutCode1 = `
<kw-page>
</kw-page>
`;
const layoutCode2 = `
<kw-page>
</kw-page>
`;
const layoutCode3 = `
<kw-page>
</kw-page>
`;
</script>
