<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Form style
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
            <td rowspan="4">
              kw-form
            </td>
            <td>
              default<br>
            </td>
            <td>
              12px between kw-form-item
            </td>
          </tr>
          <tr>
            <td>
              dense
            </td>
            <td>
              4px between kw-form-item
            </td>
          </tr>
          <tr>
            <td>
              label-size=""
            </td>
            <td>
              if the label size is diffrent, adjust it
            </td>
          </tr>
          <tr>
            <td>align-content="right" or align-content="center"</td>
            <td>Adjust align-right / align-center in p tag of kw-form-item</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Notice
      </h3>
      <p class="kw-guide-description">
        The way to use kw-form tag's definition is diffrent compared to DESKTOP!<br>
        kw-form in mobile is only used for style(such as spacing between list style and font size). <br>
        <b>If want to use form such as input, select, checkbox. These arre not for form style!</b><br>
        Please, Go to the page <router-link to="/Publish/Mobile/Collections/Form">
          form
        </router-link>,if want to use original form<br>
      </p>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        form style
      </h3>

      <p class="kw-guide-description">
        default -  label : 14px / p : 16px<br>
        label- width: 92px including padding-right /  pading-right: 12px<br>
        padding- 12px between kw-form-item<br>
        <br>
        No need to add kw-form-row!<br>
        The sequence of list style : kw-form > kw-form-item > p<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form>
            <kw-form-item
              label="연락처"
            >
              <p>010-8426-2759</p>
            </kw-form-item>
            <kw-form-item label="연락처">
              <p>010-8426-2759</p>
            </kw-form-item>
          </kw-form>
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
        Dense
      </h3>

      <p class="kw-guide-description">
        dense - label : 14px / p : 14px<br>
        label- width: 92px including padding-right / pading-right: 12px<br>
        padding- 4px between kw-form-item<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form dense>
            <kw-form-item
              label="연락처"
            >
              <p>010-8426-2759</p>
            </kw-form-item>
            <kw-form-item label="연락처">
              <a
                href="tel:"
                class="blue-line-link"
              >010-8426-2759</a>
            </kw-form-item>
          </kw-form>
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
        label-size
      </h3>

      <p class="kw-guide-description">
        default of label-size is 92px with padding right 12px.<br>
        However, If the label-size is needed to adjust according to design, Put it <b>:label-size</b> in kw-form
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h3>
            This is for 102px (including padding-right: 12px).
          </h3>
          <kw-form
            dense
            class="mt20"
            :label-size="102"
          >
            <kw-form-item
              label="연락처"
            >
              <p>010-8426-2759</p>
            </kw-form-item>
            <kw-form-item label="연락처">
              <p>010-8426-2759</p>
            </kw-form-item>
          </kw-form>
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
<kw-form>
  <kw-form-item
    label="연락처"
  >
    <p>010-8426-2759</p>
  </kw-form-item>
  <kw-form-item label="연락처">
    <p>010-8426-2759</p>
  </kw-form-item>
</kw-form>
`;
const case2 = `
<kw-form
  dense
>
  <kw-form-item
    label="연락처"
  >
    <p>010-8426-2759</p>
  </kw-form-item>
  <kw-form-item label="연락처">
    <p>010-8426-2759</p>
  </kw-form-item>
</kw-form>
`;

const case3 = `
<h3>
  This is for 102px (including padding-right: 12px).
</h3>
<kw-form
  dense
  class="mt20"
  :label-size="102"
>
  <kw-form-item
    label="연락처"
  >
    <p>010-8426-2759</p>
  </kw-form-item>
  <kw-form-item label="연락처">
    <p>010-8426-2759</p>
  </kw-form-item>
</kw-form>
`;
const historyData = [
  {
    timestamp: '2023-01-18',
    text: 'add case3 - label-size',
  },
  {
    timestamp: '2023-01-06',
    text: 'First added',
  },
];

</script>
