<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Tabs
    </h2>
    <p class="kw-guide-description">
      You can check how to use 'Tab' through the sample page.<br>
      <span class="notice">
        Check 'page tab' : PageSample02<br>
        Check 'tab in tab' : PageSample03
      </span>
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
              kw-tabs
            </td>
            <td>
              model-value="1"
            </td>
            <td>
              active tab of the same &lt;kw-tab&gt;'s name value
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <!-- <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <p class="kw-guide-description">
        description
      </p>
      <q-card>
        <div class="kw-guide-example">
          It is in progress. Please wait for it to complete.
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div> -->
  </kw-page>
</template>

<script setup>
// const testCode = `
// It is in progress. Please wait for it to complete.
// `;
</script>
