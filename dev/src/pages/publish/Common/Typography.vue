<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Typography
    </h2>
    <p class="kw-guide-description">
      This is a guide for typography helper class
    </p>
    <guide-history-view
      :items="historyData"
    />
    <div class="kw-guide-section">
      <h3
        id="Typography"
        class="kw-guide-title"
      >
        Typography
      </h3>
      <p class="kw-guide-description">
        Make text helper class according to zeplin design guide <br>
        <a href="https://zpl.io/r1nYyOX">typography guide</a>
      </p>
      <q-markup-table class="kw-guide-table mt20">
        <colgroup>
          <col style="width: 40%;">
        </colgroup>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Class
            </th>
            <th>font-size</th>
            <th>font-weight</th>
            <th>line-height</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p class="kw-font-title">
                Title
              </p>
            </td>
            <td>
              .kw-font-title
            </td>
            <td>
              22px
            </td>
            <td>
              700
            </td>
            <td>
              22px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-subtitle">
                Subtitle
              </p>
            </td>
            <td>
              .kw-font-subtitle
            </td>
            <td>
              18px
            </td>
            <td>
              700
            </td>
            <td>
              28px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-body">
                Body
              </p>
            </td>
            <td>
              .kw-font-body
            </td>
            <td>
              16px
            </td>
            <td>
              500
            </td>
            <td>
              24px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-dense">
                Dense
              </p>
            </td>
            <td>
              .kw-font-dense
            </td>
            <td>
              14px
            </td>
            <td>
              500
            </td>
            <td>
              22px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-caption">
                Caption
              </p>
            </td>
            <td>
              .kw-font-caption
            </td>
            <td>
              12px
            </td>
            <td>
              400
            </td>
            <td>
              20px
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Font"
        class="kw-guide-title"
      >
        Font (no weight style)
      </h3>
      <q-markup-table class="kw-guide-table mt20">
        <colgroup>
          <col style="width: 40%;">
        </colgroup>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Class
            </th>
            <th>font-size</th>
            <th>line-height</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p class="kw-font-pt24">
                pt24
              </p>
            </td>
            <td>
              .kw-font-pt24
            </td>
            <td>
              24px
            </td>
            <td>
              24px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-pt22">
                pt22
              </p>
            </td>
            <td>
              .kw-font-pt22
            </td>
            <td>
              22px
            </td>
            <td>
              22px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-pt20">
                pt20
              </p>
            </td>
            <td>
              .kw-font-pt20
            </td>
            <td>
              20px
            </td>
            <td>
              20px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-pt18">
                pt18
              </p>
            </td>
            <td>
              .kw-font-pt18
            </td>
            <td>
              18px
            </td>
            <td>
              28px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-pt16">
                pt16
              </p>
            </td>
            <td>
              .kw-font-pt16
            </td>
            <td>
              16px
            </td>
            <td>
              24px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-pt14">
                pt14
              </p>
            </td>
            <td>
              .kw-font-pt14
            </td>
            <td>
              14px
            </td>
            <td>
              22px
            </td>
          </tr>
          <tr>
            <td>
              <p class="kw-font-pt12">
                pt12
              </p>
            </td>
            <td>
              .kw-font-pt12
            </td>
            <td>
              12px
            </td>
            <td>
              20px
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Font-weight"
        class="kw-guide-title"
      >
        Font-weight (only font-weight)
      </h3>
      <q-markup-table class="kw-guide-table mt20">
        <colgroup>
          <col style="width: 40%;">
        </colgroup>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Class
            </th>
            <th>font-weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p class="text-weight-bold">
                Bold
              </p>
            </td>
            <td>
              .text-weight-bold
            </td>
            <td>
              font-weight: 700
            </td>
          </tr>
          <tr>
            <td>
              <p class="text-weight-medium">
                Medium
              </p>
            </td>
            <td>
              .text-weight-medium
            </td>
            <td>
              font-weight: 500
            </td>
          </tr>
          <tr>
            <td>
              <p class="text-weight-regular">
                Regular
              </p>
            </td>
            <td>
              .text-weight-regular
            </td>
            <td>
              font-weight: 400
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="mobile"
        class="kw-guide-title"
      >
        underline blue helper class (only Mobile & Tablet)
      </h3>
      <p class="kw-guide-description">
        this is a helper class for blue colored underline text or button
      </p>
      <q-markup-table class="kw-guide-table mt20">
        <colgroup>
          <col style="width: 40%;">
        </colgroup>
        <thead>
          <tr>
            <th>
              Example
            </th>
            <th>
              Class
            </th>
            <th>color & text-underline</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p class="blue-line-link">
                010-1234-1234
              </p>
            </td>
            <td>
              .blue-line-link
            </td>
            <td>
              color: $primary <br>
              text-decoration: underline
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
        example
      </h3>
      <p class="kw-guide-description">
        If you need a text style that is not in the guide, kindly asking to
        use a combination of the helper classes at the top like as below sample
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="row items-center">
            <p class="kw-font-pt14 text-weight-regular">
              구분
            </p>
            <kw-date-picker
              class="w140 ml12"
              dense
            />
          </div>
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
      <q-card>
        <div class="kw-guide-example">
          <p class="kw-font-pt16 text-weight-bold">
            2022-08-19
          </p>
          <p class="kw-font-pt14 mt2 kw-fc--black2">
            320-309262-20220718-001
          </p>
        </div>
        <guide-code-view
          :code-value="testCode2"
          lang="vue"
        />
      </q-card>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            label="02-111-2222"
            underline
            class="kw-font-pt16 blue-line-link"
          />
        </div>
        <guide-code-view
          :code-value="testCode3"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<div class="row items-center">
  <p class="kw-font-pt14 text-weight-regular">
    구분
  </p>
  <kw-date-picker
    class="w140 ml12"
    dense
  />
</div>
`;

const testCode2 = `
<p class="kw-font-pt16 text-weight-bold">
  2022-08-19
</p>
<p class="kw-font-pt14 mt2 kw-fc--black2">
  320-309262-20220718-001
</p>
`;

const testCode3 = `
<kw-btn
  label="02-111-2222"
  underline
  class="kw-font-pt16 blue-line-link"
/>
`;

const historyData = [
  {
    timestamp: '2023-03-03',
    text: 'add new case',
  },
  {
    timestamp: '2022-11-15',
    text: 'add new guide',
  },
];
</script>

<style scoped lang="scss">
.kw-guide-table td {
  color: $black1;
}

.kw-guide-table td:last-child {
  text-align: center;
}
</style>
