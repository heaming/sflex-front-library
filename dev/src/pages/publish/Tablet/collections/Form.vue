<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Tablet] Form
    </h2>
    <p class="kw-guide-description">
      This is the form example for Tablet. <br>
      <b>The methods is same with desktop</b>, only label width and between spacing have been changed
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        summary
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
              kw-form
            </td>
            <td>
              :cols="Number(1~4)" <br>
              dense
            </td>
            <td>
              (default : 3) <br> only have data text type use dense prop<br>
            </td>
          </tr>
          <tr>
            <td>
              kw-form-row
            </td>
            <td>
              wrap kw-form-item each row
            </td>
            <td>
              -
            </td>
          </tr>
          <tr>
            <td>
              kw-form-item<br>
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
        id="Example1"
        class="kw-guide-title"
      >
        example 01 - include form components (in 2column)
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-form
            :cols="2"
          >
            <kw-form-row>
              <kw-form-item label="Input">
                <kw-input />
              </kw-form-item>
              <kw-form-item label="Select">
                <kw-select />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="Input with Icon">
                <kw-input icon="search" />
              </kw-form-item>
              <kw-form-item label="Datepicker">
                <kw-date-picker />
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="DateRangePicker">
                <kw-date-range-picker />
              </kw-form-item>
              <kw-form-item label="Timepicker">
                <kw-time-picker />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="example1"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Example1"
        class="kw-guide-title"
      >
        example 02 - include only text data (in 3column)
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-form
            :cols="3"
            dense
          >
            <kw-form-row>
              <kw-form-item label="이름">
                <p>김교원</p>
              </kw-form-item>
              <kw-form-item label="휴대폰">
                <p>010-1234-5678</p>
              </kw-form-item>
              <kw-form-item label="자택">
                <p>02-1234-5678</p>
              </kw-form-item>
            </kw-form-row>
            <kw-form-row>
              <kw-form-item label="직책">
                <p>그룹장</p>
              </kw-form-item>
              <kw-form-item
                :colspan="2"
                label="주소"
              >
                <p>서울시 OO구 OO동 123-2번지 111-1111</p>
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="example2"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const example1 = `
<kw-form
  :cols="2"
>
  <kw-form-row>
    <kw-form-item label="Input">
      <kw-input />
    </kw-form-item>
    <kw-form-item label="Select">
      <kw-select />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="Input with Icon">
      <kw-input icon="search" />
    </kw-form-item>
    <kw-form-item label="Datepicker">
      <kw-date-picker />
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="DateRangePicker">
      <kw-date-range-picker />
    </kw-form-item>
    <kw-form-item label="Timepicker">
      <kw-time-picker />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const example2 = `
<kw-form
  :cols="3"
  dense
>
  <kw-form-row>
    <kw-form-item label="이름">
      <p>김교원</p>
    </kw-form-item>
    <kw-form-item label="휴대폰">
      <p>010-1234-5678</p>
    </kw-form-item>
    <kw-form-item label="자택">
      <p>02-1234-5678</p>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="직책">
      <p>그룹장</p>
    </kw-form-item>
    <kw-form-item
      :colspan="2"
      label="주소"
    >
      <p>서울시 OO구 OO동 123-2번지 111-1111</p>
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const guideHistory = [
  {
    timestamp: '2022-11-24',
    text: 'Tablet example',
  },
];
</script>
