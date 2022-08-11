<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Pagination
    </h2>
    <p class="kw-guide-description">
      default current status '1', total list count '100'
    </p>
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
              attribute(class)
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-form-item (sample)
            </td>
            <td>
              essential - class (sample)
            </td>
            <td>
              add the class "essential" in the tag of kw-form-item. (sample)
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
            :model-value="1"
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
  :model-value="1"
  :total-count="100"
/>
`;
</script>
