<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Block Box
    </h2>
    <p class="kw-guide-description">
      Here, you can find the block elements you need to build a page.
    </p>
    <!-- <div class="kw-guide-section">
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
    </div> -->
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Case #1 - Search Results Box
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <div class="result-area">
            <h3>조회결과</h3>
            <p>&lt;!-- Maybe 'grid' is here. --&gt;</p>
          </div>
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
<div class="result-area">
  <h3>조회결과</h3>
  <!-- Maybe 'grid' is here. -->
</div>
`;
</script>
