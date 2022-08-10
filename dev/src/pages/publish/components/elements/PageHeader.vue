<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Page Header
    </h2>
    <p class="kw-guide-description">
      Use this component if you need headers when composing your page.
    </p>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              Attribute
            </th>
            <th>Values</th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              :options
            </td>
            <td>
              "['홈','상품','상품관리']"
            </td>
            <td>
              Check the 'Breadcrumb' in Design/Planning.<br>
              The last value in the array is automatically rendered as the title of the page.
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
        default
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <!-- <template #header> -->
          <kw-page-header
            :options="['홈','상품','상품관리']"
          />
          <!-- </template> -->
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="testCode"
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

const testCode = `
<template #header>
  <kw-page-header
    :options="['홈','상품','상품관리']"
  />
</template>
`;
</script>
