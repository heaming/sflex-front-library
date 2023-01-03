<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      button with title
    </h2>
    <p class="kw-guide-description" />
    <guide-history-view
      :items="historyData"
    />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        button with title
      </h3>
      <p class="kw-guide-description">
        The reference page for <router-link to="/Publish/Components/Elements/ActionBar/ActionTop">
          ActionTop
        </router-link><br>
        The reference page for <router-link to="/Publish/Components/Elements/ActionBar/ActionBottom">
          ActionBottom
        </router-link><br>

        In this case when title with button, This is not for action bar.<br>
        Use the helper classes of <b>row</b> and <b>justify-between</b><br>
        Wrap title class and kw-btn together by div's tag with <b>row</b> and <b>justify-between</b> ' classes
      </p>

      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/button_with_tittle.png"
            alt="Layout Type 1"
          >
        </div>
        <div class="kw-guide-example">
          <div class="row justify-between">
            <h3>고객자녀정보</h3>

            <kw-btn
              label="자녀추가"
              dense
            />
          </div>
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
<div class="row justify-between">
  <h3>고객자녀정보</h3>

  <kw-btn
    label="자녀추가"
    dense
  />
</div>
`;

const historyData = [
  {
    timestamp: '2022-10-07',
    text: 'First added',
  },
];
</script>
