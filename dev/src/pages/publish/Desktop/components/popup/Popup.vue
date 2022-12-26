<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Popup
    </h2>
    <p class="kw-guide-description">
      It is in progress. Please wait for it to complete.
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
              type/size
            </th>
            <th>
              class
            </th>
            <th>
              px
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              sm <br>
              md <br>
              lg <br>
              xl <br>
              2xl <br>
              3xl <br>
              4xl
            </td>
            <td>
              kw-popup--sm <br>
              kw-popup--md <br>
              kw-popup--lg <br>
              kw-popup--xl <br>
              kw-popup--2xl <br>
              kw-popup--3xl <br>
              kw-popup--4xl
            </td>
            <td>
              460px <br>
              660px <br>
              860px<br>
              1060px<br>
              1260px<br>
              1460px <br>
              1660px
            </td>
          </tr>
          <tr>
            <td>
              title="text" <br>
            </td>
            <td>
              <br>
            </td>
            <td>
              Add title when necessary <br>
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
        <li>
          <em class="text-red">[different size!]</em> <br>
          If the popup size which is located in<em> wireframe(proposal) page is different</em>,
          follow below step <br>
          <br>
          1. Check there is design screen <br>
          2. Check there is design reference <br>
          <!-- src="../../../../../assets/images/example_popup2.png" -->
          <img
            src="~~dev/assets/images/example_popup2.png"
            width="500"
            alt="디자인 참고"
          > <br> <br>
          3. If there is no infos about step 2 and 3,
          please use the popup class which have <em>approximate value</em> size. <br>
          <img
            src="~~dev/assets/images/example_popup.png"
            width="500"
            alt="디자인 참고"
          > <br>
          use class="kw-popup--sm"
        </li>
        <li class="mt10">
          <em class="text-red">[different button align!]</em> <br>
          The buttons which located in bottom is <em>align center</em>
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
          <img
            src="~~dev/assets/images/pop_sample.png"
            alt="popup sample"
            style="width: auto;"
          >
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
// Small & No title
<kw-popup
  class="kw-popup--sm"
>
  내용<br>
  내용이 들어갑니다.

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>

// Small & No action
<kw-popup
  class="kw-popup--sm"
  title="title"
>
  내용<br>
  내용이 들어갑니다.
</kw-popup>

// Small & No close button
<kw-popup
  class="kw-popup--sm"
  no-close-btn
>
  내용<br>
  내용이 들어갑니다.
  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>


// Small & Titled type
<kw-popup
  class="kw-popup--sm"
  title="카테고리 검색"
>
  내용<br>
  내용이 들어갑니다.

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>

// Medium
<kw-popup
  class="kw-popup--md"
  title="카테고리 검색"
>
  내용<br>
  내용이 들어갑니다.

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>

// Large
<kw-popup
  class="kw-popup--lg"
  title="상품선택"
>
  내용<br>
  내용이 들어갑니다.

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>

// X-Large
<kw-popup
  class="kw-popup--xl"
  title="상품선택"
>
  내용<br>
  내용이 들어갑니다.

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>

// 2X-Large
<kw-popup
  class="kw-popup--2xl"
  title="상품선택"
>
  내용<br>
  내용이 들어갑니다.

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>

// 3X-Large
<kw-popup
  class="kw-popup--3xl"
  title="상품선택"
>
  내용<br>
  내용이 들어갑니다.

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36"
      label="확인"
    />
  </template>
</kw-popup>
`;

const guideHistory = [
  {
    timestamp: '2022-10-11',
    text: 'remove button spacing helper class & add popup no-close btn case in code',
  },
  {
    timestamp: '2022-10-04',
    text: 'add popup no-action case in code',
  },
  {
    timestamp: '2022-09-14',
    text: 'add guide information',
  },
];
</script>
