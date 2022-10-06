<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Tooltip
    </h2>
    <!-- <p class="kw-guide-description">
      It is in progress. Please wait for it to complete.
    </p> -->
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
              kw-icon
            </td>
            <td>
              name
            </td>
            <td>
              Id used in svg
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
        Notice
      </h3>
      <ul>
        <!-- <li>
          If you need another icon image chip,
          please refer to 'how to make icon button' inn iconButton page and add icon svg file.
        </li> -->
        <li>
          If you need tooltip type icon, add 'kw-tooltip' tag inside kw-icon like as last example
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
      <p class="kw-guide-description">
        description
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-icon
            name="info_24"
          >
            <kw-tooltip>if you need tooltip type chip,<br> please add this element and content</kw-tooltip>
          </kw-icon>
          <kw-icon
            name="warning"
            class="ml20"
          />
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
<kw-icon
  name="info"
>
  <kw-tooltip>if you need tooltip type chip,<br> please add this element and content</kw-tooltip>
</kw-icon>

<kw-icon
  name="warning"
/>
`;

const guideHistory = [
  {
    timestamp: '2022.10.06',
    text: 'change icon name in code',
  },

];
</script>
