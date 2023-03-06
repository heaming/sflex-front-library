<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Pagination
    </h2>
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
              kw-pagination
            </td>
            <td>
              :page-index="1"<br>
              :total-count="100"
            </td>
            <td>
              Required, Default : "1"<br>
              Required, Default : "100"<br>
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
      <p class="kw-guide-description">
        default pagination
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-pagination
            :page-index="1"
            :total-count="100"
          />
        </div>
        <guide-code-view
          :code-value="pagination"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const pagination = `
<kw-pagination
  :page-index="1"
  :total-count="100"
/>
`;
</script>
