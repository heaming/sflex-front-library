<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Sign
    </h2>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        summary
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
              kw-sign
            </td>
            <td>
              <!-- class="kw-sign" -->
            </td>
            <td>
              can draw autograph component
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
        This 'sign component' is not completed developed, <br> so please do not care different design
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-sign />
        </div>
        <guide-code-view
          :code-value="case1"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="example"
        class="kw-guide-title"
      >
        Example
      </h3>
      <p class="kw-guide-description">
        When you find like below component please use <b>&lt;kw-sign /&gt;</b>
        <br><a
          href="https://zpl.io/ewrMrvl"
          target="_blank"
        >example zeplin screen</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/example_mobile_sign.png"
            alt="sign example"
            style="width: 65%;"
          >
        </div>
        <guide-code-view
          :code-value="exampleCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>
const case1 = `
<kw-sign />
`;

const exampleCode = `
<kw-sign />

<!-- please insert buttons which are located in kw-sign bottom -->
<!-- example -->
<!-- <div class="row justify-end mt12">
  <kw-btn
    dense
    border-color="line-stroke"
    label="최근서명"
  />
  <kw-btn
    dense
    border-color="line-stroke"
    label="재입력"
    class="ml4"
  />
</div> -->
`;
</script>
