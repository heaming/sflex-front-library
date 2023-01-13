<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] separator
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
            <td rowspan="3">
              kw-separator
            </td>
            <td>
              spaced
            </td>
            <td>
              default(top and bottom : 20px)
            </td>
          </tr>
          <tr>
            <td>
              margin helper class
            </td>
            <td>
              margin top and bottom are diffrent use it instead of spaced
            </td>
          </tr>
          <tr>
            <td>
              divider
            </td>
            <td>
              8px / bg-color
            </td>
          </tr>
          <tr>
            <td>color</td>
            <td>add the color name</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        case1- normal separator
      </h3>

      <p class="kw-guide-description">
        This is normal separator<br>
        As default of margin top and bottom is 20px.<br>
        need to adjust spaced= "0" or margin top and bottom are diffrent, Add helper class of margin.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-separator spaced="0" />
          <img
            src="~~dev/assets/images/separator.png"
            alt="Layout Type 1"
          >
        </div>
        <guide-code-view
          :code-value="case1"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        case2- black separator
      </h3>

      <p class="kw-guide-description">
        Add the helper class in kw-separator
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-separator
            spaced="0"
            color="black1"
          />

          <img
            src="~~dev/assets/images/separator_black.png"
            alt="separator_black"
          >
        </div>
        <guide-code-view
          :code-value="case2"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        case3- divider separator
      </h3>

      <p class="kw-guide-description">
        Add divider in kw separator.<br>
        This is for 8px and bg-body
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-separator
            divider
          />

          <img
            src="~~dev/assets/images/separator_divider.png"
            alt="divider"
          >
        </div>
        <guide-code-view
          :code-value="case3"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const case1 = `
<kw-separator spaced="0" />
`;
const case2 = `
<kw-separator
  spaced="0"
  color="black1"
/>
`;
const case3 = `
<kw-separator
  divider
/>
`;

const historyData = [
  {
    timestamp: '2022-12-08',
    text: 'First added',
  },
];
</script>
