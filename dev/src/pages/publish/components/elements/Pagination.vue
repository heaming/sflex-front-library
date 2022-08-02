<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Pagination
    </h2>
    <p class="kw-guide-description">
      default current page '1', total list count '100'
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
        <div class="kw-guide-code">
          <HighCode
            :code-value="pagination"
            :lang="vue"
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

const vue = 'vue';

const pagination = `
<kw-pagination
  :model-value="1"
  :total-count="100"
/>
`;
</script>
