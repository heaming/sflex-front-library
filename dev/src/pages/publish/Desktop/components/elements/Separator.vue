<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Separator
    </h2>
    <p class="kw-guide-description">
      color code: $line-line(#ddd)
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
              the element(tag's name)
            </th>
            <th>
              attribute
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-separator
            </td>
            <td>
              spaced <br>
              vertical and inset
            </td>
            <td>
              default: 30px / special case : input 'px value' according to design from zeplin <br>
              Add vertical and inset when vertical type please
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
        horizontal, spaced: 30px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/seperator.png"
            alt="separator"
          >
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Vertical
      </h3>
      <p class="kw-guide-description">
        have to use together <em>inset</em> prop
        <br>*there is no more px value in left and right side of &lt;kw-action-top &gt;*
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/example_separator_vertical.png"
            alt="separator"
          >
        </div>
        <guide-code-view
          :code-value="testCode2"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<kw-separator />
`;
const testCode2 = `
<!--There is no more spaced px value in kw-action-top
  -->
<kw-separator
  spaced
  vertical
  inset
/>
`;

const guideHistory = [
  {
    timestamp: '2022.09.26',
    text: 'edit the code of vertical case',
  },
  {
    timestamp: '2022.09.15',
    text: 'revised seperator component guide',
  },
];
</script>
