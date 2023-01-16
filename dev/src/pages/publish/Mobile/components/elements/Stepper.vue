<template>
  <kw-page
    class="kw-guide"
    no-header
  >
    <h2 class="kw-guide-h2">
      [Mobile] Stepper
    </h2>
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
            <td rowspan="2">
              kw-steper
            </td>
            <td>
              v-model="stepInitNum"<br>
              :done="stepInitNum > 1"<br>
            </td>
            <td>
              Default<br>
              The number is same as step's number
            </td>
          </tr>
          <tr>
            <td>heading-text</td>
            <td>Add the title on leftside</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Stepper
      </h3>
      <p class="kw-guide-description">
        It's similar to use as Desktop.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-stepper v-model="stepInitNum">
            <kw-step
              :name="1"
              :done="stepInitNum > 1"
              prefix="1"
            />
            <kw-step
              :name="2"
              :done="stepInitNum > 2"
              prefix="2"
            />
            <kw-step
              :name="3"
              :done="stepInitNum > 3"
              prefix="3"
            />
            <kw-step
              :name="4"
              prefix="4"
              :done="stepInitNum > 4"
            />
            <kw-step
              :name="5"
              prefix="5"
              :done="stepInitNum > 5"
            />
          </kw-stepper>
        </div>
        <guide-code-view
          :code-value="[testCode, testScript2]"
          :lang="['vue', 'javascript']"
          multi
        />
      </q-card>
    </div>

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Stepper with heading-text
      </h3>
      <p class="kw-guide-description">
        Add the heading-text in kw-stepper and put tilte's name in kw-step
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-stepper
            v-model="stepInitNum"
            heading-text
          >
            <kw-step
              :name="1"
              :done="stepInitNum > 1"
              prefix="1"
            />
            <kw-step
              :name="2"
              :done="stepInitNum > 2"
              prefix="2"
            />
            <kw-step
              :name="3"
              :done="stepInitNum > 3"
              prefix="3"
              title="계약확인"
            />
            <kw-step-panel :name="3">
              <p>content</p>
            </kw-step-panel>
          </kw-stepper>
        </div>
        <guide-code-view
          :code-value="[testCode2, testScript2]"
          :lang="['vue', 'javascript']"
          multi
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<kw-stepper v-model="stepInitNum">
    <kw-step
      :name="1"
      :done="stepInitNum > 1"
      prefix="1"
    />
    <kw-step
      :name="2"
      :done="stepInitNum > 2"
      prefix="2"
    />
    <kw-step
      :name="3"
      :done="stepInitNum > 3"
      prefix="3"
    />
    <kw-step
      :name="4"
      prefix="4"
      :done="stepInitNum > 4"
    />
    <kw-step
      :name="5"
      prefix="5"
      :done="stepInitNum > 5"
    />
  </kw-stepper>
`;

const testCode2 = `
<kw-stepper
  v-model="stepInitNum"
  heading-text
>
  <kw-step
    :name="1"
    :done="stepInitNum > 1"
    prefix="1"
    title="ss"
  />
  <kw-step
    :name="2"
    :done="stepInitNum > 2"
    prefix="2"
  />
  <kw-step
    :name="3"
    :done="stepInitNum > 3"
    prefix="3"
    title="계약확인"
  />
  <kw-step-panel :name="3">
    <p>content</p>
  </kw-step-panel>
</kw-stepper>
`;
const testScript2 = `
const stepInitNum = ref(3);
`;

const stepInitNum = ref(3);

const guideHistory = [

  {
    timestamp: '2022-11-23',
    text: 'Add stepper in mobile ',
  },

];

</script>
