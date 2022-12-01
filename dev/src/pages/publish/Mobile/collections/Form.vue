<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Form
    </h2>
    <p class="kw-guide-description">
      This is the form example for mobile.
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
        <li>
          <p class="kw-fc--error">
            In mobile, no need to wrap kw-form, kw-form-row and kw-form-item
          </p>
          Therefore, please add label text in each form components <br>
          ex: &lt; kw-input label="입력" /&gt;
        </li>
        <li>
          Spacing between the items in the example, use margin or padding helper class
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        label
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
              kw-input / kw-select / kw-datepicker etc..
            </td>
            <td>
              label
            </td>
            <td>
              input label text
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Example"
        class="kw-guide-title"
      >
        Example
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <h3 class="kw-font-body kw-fc--black mb16">
            운행정보
          </h3>
          <kw-input
            label="출발지"
            placeholder="입력해주세요"
          />
          <kw-select
            label="운행목적"
            class="pt20"
          />
          <kw-date-picker
            label="날짜선택"
            class="pt20"
          />
          <kw-date-range-picker
            label="날짜지정"
            grow
            class="pt20"
          />
          <kw-input
            icon="qrcode_24"
            label="상품 QR코드"
            placeholder="QR코드 입력"
            class="pt20"
          />
        </div>
        <guide-code-view
          :code-value="example"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="columns"
        class="kw-guide-title"
      >
        combination
      </h3>
      <p class="kw-guide-description">
        If you need one or more components, please wrap div.kw-field-wrap <br>
        If you need full width of form component in kw-field-wrap add 'grow' prop
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-field-wrap
            label="주민등록번호"
            class="pt20"
          >
            <kw-input grow />
            <span>-</span>
            <kw-input grow />
          </kw-field-wrap>
          <guide-code-view
            :code-value="combination"
            lang="vue"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="AddressExample"
        class="kw-guide-title"
      >
        Address form type
      </h3>
      <p class="kw-guide-description">
        please add <em>&lt; zwcm-post-code /&gt;</em> in kw-form-item tag
        <q-card>
          <div class="kw-guide-example">
            <!-- <img
              src="../../../../../assets/images/example_address.png"
              alt="address example"
              style="width: 65%;"
            > -->
          </div>

          <guide-code-view
            :code-value="AddressCode"
            lang="vue"
          />
        </q-card>
      </p>
    </div>
  </kw-page>
</template>

<script setup>
const example = `
<kw-input
  label="출발지"
  placeholder="입력해주세요"
/>
<kw-select
  label="운행목적"
  class="mt20"
/>
<kw-date-picker
  label="날짜선택"
  class="mt20"
/>
`;

const combination = `
<kw-field-wrap
  label="주민등록번호"
  class="pt20"
>
  <kw-input grow />
  <span>-</span>
  <kw-input grow />
</kw-field-wrap>
`;
const AddressCode = `
<kw-form-row>
  <kw-form-item
    label="주소"
  >
    <zwcm-post-code />
  </kw-form-item>
</kw-form-row>
`;
const guideHistory = [
  {
    timestamp: '2022-11-2',
    text: 'Mobile example',
  },
];
</script>
