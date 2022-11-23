<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Expansion
    </h2>
    <p class="kw-guide-description">
      It is in progress. Please wait for it to complete.
    </p>
    <guide-history-view :items="historyData" />
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
        Expansion
      </h3>

      <p class="kw-guide-description">
        Make sure to Wrap <b>kw-expansion-item</b> by kw-list<br>
        kw-expansion-item's label is for title.<br>
        Make sure to wrap <b>div with padding helper class (div class="py20 px40")</b> Before using the content<br>
        <a href="https://zpl.io/wq9YJk7">The reference page's design in zeplin </a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-list>
            <kw-expansion-item label="title">
              <div class="py20 px40">
                <kw-form dense>
                  <kw-form-row>
                    <kw-form-item label="과표계">
                      <p>12,345,600</p>
                    </kw-form-item>
                    <kw-form-item label="공제계">
                      <p>123,450</p>
                    </kw-form-item>
                    <kw-form-item label="실지급액">
                      <p>12,345,600</p>
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </div>
            </kw-expansion-item>
            <kw-expansion-item label="title">
              <div class="py20 px40">
                <p>content</p>
              </div>
            </kw-expansion-item>
          </kw-list>
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
<kw-list>
  <kw-expansion-item label="title">
    <div class="py20 px40">
      <kw-form dense>
        <kw-form-row>
          <kw-form-item label="과표계">
            <p>12,345,600</p>
          </kw-form-item>
          <kw-form-item label="공제계">
            <p>123,450</p>
          </kw-form-item>
          <kw-form-item label="실지급액">
            <p>12,345,600</p>
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </div>
  </kw-expansion-item>
  <kw-expansion-item label="title">
    <div class="py20 px40">
      <p>content</p>
    </div>
  </kw-expansion-item>
</kw-list>
`;
const historyData = [
  {
    timestamp: '2022-11-04',
    text: 'First added',
  },
];
</script>
