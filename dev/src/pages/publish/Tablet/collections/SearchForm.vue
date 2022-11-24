<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Tablet] Search Form
    </h2>
    <p class="kw-guide-description">
      This is the search form example for Tablet. <br>
      <b>The methods is same with desktop</b>, only label width and between spacing have been changed
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li class="kw-fc--error">
          please add :label-size="108" prop and value in kw-form
        </li>
      </ul>
    </div>
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
              The Element(tag's name)
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
              kw-search
            </td>
            <td>
              :label-size="108" <br>
              :cols="Number(1~4)" <br>
            </td>
            <td>
              in tablet label width is 108 px <br> (default : 3)
            </td>
          </tr>
          <tr>
            <td>
              kw-search-row
            </td>
            <td>
              wrap kw-search-item each row
            </td>
            <td>
              -
            </td>
          </tr>
          <tr>
            <td>
              kw-search-item<br>
            </td>
            <td>
              :colspan="Number"
            </td>
            <td>
              use when need merged width
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="example"
        class="kw-guide-title"
      >
        example 01
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-search
            :cols="2"
            :label-size="108"
          >
            <kw-search-row>
              <kw-search-item label="이름">
                <kw-input />
              </kw-search-item>
              <kw-search-item label="날짜선택">
                <kw-date-picker />
              </kw-search-item>
            </kw-search-row>
            <kw-search-row>
              <kw-search-item label="상품구분">
                <kw-option-group
                  :model-value="'A'"
                  type="radio"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-search-item>
            </kw-search-row>
          </kw-search>
        </div>
        <guide-code-view
          :code-value="example"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const example = `
<kw-search
  :cols="2"
  :label-size="108"
>
  <kw-search-row>
    <kw-search-item label="이름">
      <kw-input />
    </kw-search-item>
    <kw-search-item label="날짜선택">
      <kw-date-picker />
    </kw-search-item>
  </kw-search-row>
  <kw-search-row>
    <kw-search-item label="상품구분">
      <kw-option-group
        :model-value="'A'"
        type="radio"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-search-item>
  </kw-search-row>
</kw-search>
`;

const guideHistory = [
  {
    timestamp: '2022-11-24',
    text: 'Tablet example',
  },
];
</script>
