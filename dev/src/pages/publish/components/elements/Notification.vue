<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Notification
    </h2>
    <p class="kw-guide-description">
      It is in progress. Please wait for it to complete.
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
              kw-form-item (sample)
            </td>
            <td>
              essential (sample)
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
        Default
      </h3>
      <p class="kw-guide-description">
        description
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h4>화면안내사항 타이틀</h4>
          <ul class="kw-notification">
            <li>
              1dep nextline
            </li>
            <li>
              1dep nextline
            </li>
            <li>
              1dep<br>nextline
              <ul>
                <li>2dep</li>
              </ul>
            </li>
          </ul>
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
It is in progress. Please wait for it to complete.
`;
</script>
