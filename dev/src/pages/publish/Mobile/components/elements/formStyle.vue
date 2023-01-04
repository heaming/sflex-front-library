<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Form style
    </h2>
    <guide-history-view :items="historyData" />
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
              kw-expansion-item
            </td>
            <td>
              label="" <br>
            </td>
            <td>
              The title for Expansion-item
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
        form style
      </h3>

      <p class="kw-guide-description">
        form
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-item
              label="연락처"
            >
              <p>010-8426-2759</p>
            </kw-form-item>
            <kw-form-item label="연락처">
              <p>010-8426-2759</p>
            </kw-form-item>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="case1"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const historyData = [
  {
    timestamp: '2022-12-08',
    text: 'First added',
  },
];

</script>
