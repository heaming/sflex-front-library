<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Page Header
    </h2>
    <p class="kw-guide-description">
      Use this component if you need headers when composing your page.
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Summary
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
              The last value in the array is automatically rendered as the title of the page.<br><br>
              It doesn't matter if it's wrong because the actual data is loaded and input from DB.<br>
              Please put the contents in the plan/design as they are.<br>
              However, in this case, the title may not match the last of Breadcrumb.<br>
              Please put the title at the end of the breadcrumb.
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>
          Please don't care the icons which are located beside the title(ex. bell, star icon)
        </li>
        <li>
          Breadcrumb loads and inputs actual data from the DB, so it doesn't matter if it's wrong.
          Please put the contents in the plan/design as it is.
          However, in this case, the title may not match the last breadcrumb.
          Please put a title on the end of the breadcrumb.
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Default
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <!-- <template #header> -->
          <kw-page-header :options="['홈','상품','상품관리']" />
          <!-- </template> -->
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
<template #header>
  <kw-page-header
    :options="['홈','상품','상품관리']"
  />
</template>
`;

const guideHistory = [
  {
    timestamp: '2022.09.07',
    text: 'Add notice - Related to Breadcrumb data',
  },
];
</script>
