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
            required
            hint="등록된 정보 외 연락처로 컨택한 경우
        사유와 통화자명을 필수로 입력해주세요."
          />
          <kw-select
            label="운행목적"
            :options="['a', 'b']"
            class="pt20"
          />
          <kw-date-picker
            label="날짜선택"
            class="pt20"
          />
          <kw-date-range-picker
            label="날짜지정(add grow prop)"
            grow
            class="pt20"
          />
          <kw-time-picker
            label="시간선택"
            class="pt20"
          />
          <kw-input
            icon="qrcode_24"
            label="상품 QR코드"
            placeholder="QR코드 입력"
            class="pt20"
          />
          <div class="row pt20">
            <kw-time-picker
              label="시간선택"
              class="col"
            />
            <kw-input
              icon="qrcode_24"
              label="상품 QR코드"
              placeholder="QR코드 입력"
              class="ml8 col"
            />
          </div>
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
        If you need one or more components and have <b>one label</b>, please wrap div.kw-field-wrap        <br>
        If you need full width of <b>form component</b> which located in kw-field-wrap add '<b>kw-grow</b>' class
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-field-wrap
            label="주민등록번호"
          >
            <kw-input />
            <span>-</span>
            <kw-input />
          </kw-field-wrap>
          <kw-field-wrap
            label="A/S 일정"
            required
            class="pt20"
          >
            <kw-date-picker />
            <kw-time-picker class="ml8" />
          </kw-field-wrap>
          <kw-field-wrap
            label="번호"
            class="pt20"
          >
            <kw-input class="kw-grow" />
            <kw-btn
              label="조회"
              class="ml8"
            />
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
        id="required"
        class="kw-guide-title"
      >
        required
      </h3>
      <p class="kw-guide-description">
        If you label with <b>*</b> special symbol <br> please add prop required
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-input
            label="출발지"
            required
          />
          <kw-field-wrap
            label="주민등록번호"
            class="pt20"
            required
          >
            <kw-input />
            <span>-</span>
            <kw-input />
          </kw-field-wrap>
          <guide-code-view
            :code-value="requiredCode"
            lang="vue"
          />
        </div>
      </q-card>
    </div>
    <!-- <div class="kw-guide-section">
      <h3
        id="Disable"
        class="kw-guide-title"
      >
        Disable
      </h3>
      <p class="kw-guide-description">
        <b>*</b> Have to add 'disable' prop in each form component which are wrapped by .kw-field-wrap(combination type)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-input
            label="출발지"
            disable
          />
          <kw-field-wrap
            label="주민등록번호"
            class="pt20"
          >
            <kw-input
              disable
            />
            <span>-</span>
            <kw-input
              disable
            />
          </kw-field-wrap>
          <guide-code-view
            :code-value="disableCode"
            lang="vue"
          />
        </div>
      </q-card>
    </div> -->
    <div class="kw-guide-section">
      <h3
        id="AddressExample"
        class="kw-guide-title"
      >
        Address form type
      </h3>
      <p class="kw-guide-description">
        please add <em>&lt; zwcm-post-code <b>class="kw-grow"</b> /&gt;</em> <br>
        "kw-grow" class have to be added
        <q-card>
          <div class="kw-guide-example">
            <img
              src="~~dev/assets/images/example_mobile_address.png"
              alt="address example"
              style="width: 65%;"
            >
          </div>

          <guide-code-view
            :code-value="AddressCode"
            lang="vue"
          />
        </q-card>
      </p>
    </div>
    <div class="kw-guide-section">
      <h3
        id="AddressExample"
        class="kw-guide-title"
      >
        Email form type
      </h3>
      <p class="kw-guide-description">
        please add <em>&lt; zwcm-email-address /&gt;</em>
        <q-card>
          <div class="kw-guide-example">
            <img
              src="~~dev/assets/images/example_mobile_email.png"
              alt="address example"
              style="width: 65%;"
            >
          </div>

          <guide-code-view
            :code-value="EmailCode"
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
  required
  hint="등록된 정보 외 연락처로 컨택한 경우
사유와 통화자명을 필수로 입력해주세요."
/>
<kw-select
  label="운행목적"
  :options="['a', 'b']"
  class="pt20"
/>
<kw-date-picker
  label="날짜선택"
  class="pt20"
/>
<kw-date-range-picker
  label="날짜지정(add grow prop)"
  grow
  class="pt20"
/>
<kw-time-picker
  label="시간선택"
  class="pt20"
/>
<kw-input
  icon="qrcode_24"
  label="상품 QR코드"
  placeholder="QR코드 입력"
  class="pt20"
/>
<div class="row pt20">
  <kw-time-picker
    label="시간선택"
    class="col"
  />
  <kw-input
    icon="qrcode_24"
    label="상품 QR코드"
    placeholder="QR코드 입력"
    class="ml8 col"
  />
</div>
`;

const combination = `
<kw-field-wrap
  label="주민등록번호"
>
  <kw-input />
  <span>-</span>
  <kw-input />
</kw-field-wrap>
<kw-field-wrap
  label="A/S 일정"
  required
  class="pt20"
>
  <kw-date-picker />
  <kw-time-picker class="ml8" />
</kw-field-wrap>
<kw-field-wrap
  label="번호"
  class="pt20"
>
  <kw-input class="kw-grow" />
  <kw-btn
    label="조회"
    class="ml8"
  />
</kw-field-wrap>
`;

const requiredCode = `
<kw-input
  label="출발지"
  required
/>
<kw-field-wrap
  label="주민등록번호"
  class="pt20"
  required
>
  <kw-input />
  <span>-</span>
  <kw-input />
</kw-field-wrap>
`;
// const disableCode = `
// <kw-input
//   label="출발지"
//   disable
// />
// <kw-field-wrap
//   label="주민등록번호"
//   class="pt20"
// >
//   <kw-input
//     disable
//   />
//   <span>-</span>
//   <kw-input
//     disable
//   />
// </kw-field-wrap>
// `;

const AddressCode = `
<zwcm-post-code
  label="주소"
  required
  class="kw-grow"
/>
<!-- required  type-->
<zwcm-post-code
  label="주소"
  class="kw-grow"
/>
`;

const EmailCode = `
<zwcm-email-address
  label="이메일"
  required
/>
<!-- required  type-->
<zwcm-email-address
  label="이메일"
/>
`;

const guideHistory = [
  {
    timestamp: '2023-02-06',
    text: 'add example case',
  },
];
</script>
