<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Border Box
    </h2>
    <p class="kw-guide-description">
      It is in progress. Please wait for it to complete.
    </p>
    <guide-history-view :items="historyData" />
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
              border-box--one-column
            </td>
            <td>
              Wrap 'border-box' by this class
            </td>
          </tr>
          <tr>
            <td>
              border-box
            </td>
            <td>
              Add the div tag with this class in border-box--one-column
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
        border-box
      </h3>

      <p class="kw-guide-description">
        Wrap <b>border-box</b>(class of inside) by <b>border-box--one-column</b>(class of outside)<br>
        border-box has ourside border of content.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="border-box--one-column">
            <div class="border-box">
              <h3>자녀1</h3>
              <kw-form cols="2">
                <kw-form-row>
                  <kw-form-item label="이름">
                    <kw-input />
                  </kw-form-item>
                  <kw-form-item label="생년월일">
                    <kw-date-picker />
                  </kw-form-item>
                </kw-form-row>
              </kw-form>
            </div>
            <div class="border-box">
              <h3>자녀1</h3>
              <kw-form cols="2">
                <kw-form-row>
                  <kw-form-item label="이름">
                    <kw-input />
                  </kw-form-item>
                  <kw-form-item label="생년월일">
                    <kw-date-picker />
                  </kw-form-item>
                </kw-form-row>
              </kw-form>
              <kw-separator class="my20" />
              <kw-btn
                padding="12px"
                label="삭제"
              />
            </div>
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
<div class="border-box--one-column">
  <div class="border-box">
    <h3>자녀1</h3>
    <kw-form cols="2">
      <kw-form-row>
        <kw-form-item label="이름">
          <kw-input />
        </kw-form-item>
        <kw-form-item label="이름">
          <kw-date-picker />
        </kw-form-item>
      </kw-form-row>
    </kw-form>
  </div>
  <div class="border-box">
    <h3>자녀1</h3>
    <kw-form cols="2">
      <kw-form-row>
        <kw-form-item label="이름">
          <kw-input />
        </kw-form-item>
        <kw-form-item label="이름">
          <kw-date-picker />
        </kw-form-item>
      </kw-form-row>
    </kw-form>
    <kw-separator class="my20" />
    <kw-btn
      padding="12px"
      label="삭제"
    />
  </div>
</div>
`;
const historyData = [
  {
    timestamp: '2022-10-04',
    text: 'First added',
  },
];
</script>
