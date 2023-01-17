<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Checkbox
    </h2>
    <p class="kw-guide-description">
      Default design is same with desktop. <br>
      In this page, there is only case for mobile component which new added
    </p>
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
              kw-checkbox
            </td>
            <td>
              label <br>
              v-model <br>
              remove-spaced-sibling
            </td>
            <td>
              Add the title of content <br>
              Add check value in script tag <br>
              Remove sibling margin (8px) when necessary
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
        checkbox button
      </h3>
      <p class="kw-guide-description">
        Icon props:
        checked-icon="check_24"
        unchecked-icon="check_24"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-checkbox
            v-model="checkTemp"
            label="플러스서비스"
            checked-icon="check_24"
            unchecked-icon="check_24"
            class="check-btn"
          />
        </div>
        <guide-code-view
          :code-value="[checkboxDefaultCode,script1]"
          :lang="[vue, javascript]"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        example layout
      </h3>
      <p class="kw-guide-description">
        This is just sample, please adjust css in &lt;style scoped&gt;
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="row items-center">
            <kw-checkbox
              v-model="checkTemp1"
              label="플러스서비스"
              checked-icon="check_24"
              unchecked-icon="check_24"
              class="check-btn"
            />
            <kw-checkbox
              v-model="checkTemp2"
              label="플러스서비스"
              checked-icon="check_24"
              unchecked-icon="check_24"
              class="check-btn"
            />
          </div>
          <div class="row items-center mt8">
            <kw-checkbox
              v-model="checkTemp3"
              label="플러스서비스"
              checked-icon="check_24"
              unchecked-icon="check_24"
              class="check-btn"
            />
            <kw-checkbox
              v-model="checkTemp4"
              label="플러스서비스"
              checked-icon="check_24"
              unchecked-icon="check_24"
              class="check-btn"
            />
          </div>
        </div>
        <guide-code-view
          :code-value="[checkboxLayout,script2]"
          :lang="[vue, javascript]"
          multi
        />
      </q-card>
    </div>
  </kw-page>
</template>
<script setup>
const checkTemp = ref('Y');

const checkTemp1 = ref('N');
const checkTemp2 = ref('Y');
const checkTemp3 = ref('N');
const checkTemp4 = ref('Y');

const script1 = `
const checkTemp = ref('Y');
`;

const script2 = `
const checkTemp1 = ref('N');
const checkTemp2 = ref('Y');
const checkTemp3 = ref('N');
const checkTemp4 = ref('Y');
`;

const checkboxDefaultCode = `
<kw-checkbox
  v-model="checkTemp"
  label="플러스서비스"
  checked-icon="check_24"
  unchecked-icon="check_24"
  class="check-btn"
/>
`;

const checkboxLayout = `
<div class="row items-center">
  <kw-checkbox
    v-model="checkTemp1"
    label="플러스서비스"
    checked-icon="check_24"
    unchecked-icon="check_24"
    class="check-btn"
  />
  <kw-checkbox
    v-model="checkTemp2"
    label="플러스서비스"
    checked-icon="check_24"
    unchecked-icon="check_24"
    class="check-btn"
  />
</div>
<div class="row items-center mt8">
  <kw-checkbox
    v-model="checkTemp3"
    label="플러스서비스"
    checked-icon="check_24"
    unchecked-icon="check_24"
    class="check-btn"
  />
  <kw-checkbox
    v-model="checkTemp4"
    label="플러스서비스"
    checked-icon="check_24"
    unchecked-icon="check_24"
    class="check-btn"
  />
</div>
`;
</script>
