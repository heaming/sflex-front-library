<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Counter
    </h2>
    <p class="kw-guide-description" />
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
              the Element(tag's name)
            </th>
            <th>
              Attr or Class
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              zwcm-counter
            </td>
            <td>
              -
            </td>
            <td>
              This is a counting component
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
        Default
      </h3>
      <p class="kw-guide-description">
        description
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/example_counter.png"
            alt="address example"
            style="width: 15%;"
          >
        </div>
        <guide-code-view
          :code-value="counterCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const counterCode = `
 <zwcm-counter/>
`;

const guideHistory = [
  {
    timestamp: '2023-01-19',
    text: 'Add new guide',
  },
];
</script>
