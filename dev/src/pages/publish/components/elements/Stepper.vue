<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Stepper
    </h2>
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
            <td>
              kw-step
            </td>
            <td>
              ref="stepper"<br>
              v-model="stepInitNum""<br>
            </td>
            <td>
              Default<br>
              Default<br>
            </td>
          </tr>
          <tr>
            <td>
              kw-step
            </td>
            <td>
              :name="1"<br>
              title="step1"<br>
              :done="step > 1"<br>
              prefix="1"<br>
            </td>
            <td>
              Put the number as many as step's number<br>
              Change the title's name as suitable names in Zeplin<br>
              Change the same number as the attribute of :name=""<br>
              Put the number as many as step's number<br>
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
        Stepper
      </h3>
      <p class="kw-guide-description">
        Stepper's title have to be changed the title's name as the planing in Zeplin.<br>
        Change the attribute of <b>title=""</b> as the title from Zeplin<br>
        Make sure to change the number of the step in javascript.(ex: <b> ref(1) </b>)
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-stepper
            ref="stepper"
            v-model="stepInitNum"
          >
            <kw-step
              :name="1"
              title="step1"
              :done="step > 1"
              prefix="1"
            />
            <kw-step
              :name="2"
              title="step2"
              :done="step > 2"
              prefix="2"
            />
            <kw-step
              :name="3"
              title="step3"
              :done="step > 3"
              prefix="3"
            />
            <kw-step
              :name="4"
              title="step4"
              :done="step > 4"
              prefix="4"
            />
            <kw-step
              :name="5"
              title="step5"
              :done="step > 5"
              prefix="5"
            />
          </kw-stepper>
        </div>
        <guide-code-view
          :code-value="[testCode, testScript]"
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
        Heading text with stepper
      </h3>
      <p class="kw-guide-description">
        This is h2 heading text with stepper.<br>
        The tags of h2 and kw-stepper should be wrapped by the tag
        which is added "<b>kw-stepper-headingtext</b>" as class<br>
        Make sure to change the number of the step in javascript.(ex: <b> ref(1) </b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-stepper-headingtext">
            <h2>h2 Heading-text with stepper</h2>
            <kw-stepper
              ref="stepper"
              v-model="stepInitNum"
            >
              <kw-step
                :name="1"
                title="step"
                :done="step > 1"
                prefix="1"
              />
              <kw-step
                :name="2"
                title="step"
                :done="step > 2"
                prefix="2"
              />
              <kw-step
                :name="3"
                title="step"
                :done="step > 3"
                prefix="3"
              />
              <kw-step
                :name="4"
                title="step"
                :done="step > 4"
                prefix="4"
              />
            </kw-stepper>
          </div>
        </div>
        <guide-code-view
          :code-value="[headingStepper, testScript]"
          :lang="['vue', 'javascript']"
          multi
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
  <kw-stepper
    ref="stepper"
    v-model="stepInitNum"
  >
    <kw-step
      :name="1"
      title="step1"
      :done="step > 1"
      prefix="1"
    />
    <kw-step
      :name="2"
      title="step2"
      :done="step > 2"
      prefix="2"
    />
    <kw-step
      :name="3"
      title="step3"
      :done="step > 3"
      prefix="3"
    />
    <kw-step
      :name="4"
      title="step4"
      :done="step > 4"
      prefix="4"
    />
    <kw-step
      :name="5"
      title="step5"
      :done="step > 5"
      prefix="5"
    />
  </kw-stepper>
`;

const testScript = `
const stepInitNum = ref(1);
`;
const headingStepper = `
<div class="kw-stepper-headingtext">
  <h2>h2 Heading-text with stepper</h2>
  <kw-stepper
    ref="stepper"
    v-model="stepInitNum"
  >
    <kw-step
      :name="1"
      title="step"
      :done="step > 1"
      prefix="1"
    />
    <kw-step
      :name="2"
      title="step"
      :done="step > 2"
      prefix="2"
    />
    <kw-step
      :name="3"
      title="step"
      :done="step > 3"
      prefix="3"
    />
    <kw-step
      :name="4"
      title="step"
      :done="step > 4"
      prefix="4"
    />
  </kw-stepper>
</div>
`;

const stepInitNum = ref(1);
</script>
