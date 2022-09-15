<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Stepper
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
            <td>
              kw-steper
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
        Make sure to change the number of the current step in javascript.(ex: <b> ref(1) , ref(2) , ref(3) </b>)
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
        <b>div class="kw-guide-example"</b> wrap the all content and title to use stepper.<br>
        First example, first kw-step has content. and <b>const stepInitNum = ref(1)</b><br>
        Second example, Second kw-step has content. and <b>const stepInitNum = ref(2)</b><br>
        It means every content don't need to be included in one page except of active step <br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-stepper-headingtext">
            <kw-stepper
              ref="stepper"
              v-model="stepInitNum"
            >
              <kw-step
                :name="1"
                title="step1"
                :done="step > 1"
                prefix="1"
              >
                <h2>Step1 title</h2>
                <kw-form :cols="2">
                  <h3>Form</h3>
                  <kw-form-row>
                    <kw-form-item
                      label="기준상품코드"
                      required
                      hint-message="abc"
                    >
                      <kw-input
                        placeholder="기준상품코드"
                        rules="required"
                      />
                    </kw-form-item>
                    <kw-form-item
                      label="기준상품명"
                      required
                      hint-message="abc"
                    >
                      <kw-input placeholder="입력" />
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </kw-step>
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
            </kw-stepper>
          </div>
        </div>
        <guide-code-view
          :code-value="[headingStepper, testScript]"
          :lang="['vue', 'javascript']"
          multi
        />
      </q-card>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-stepper-headingtext">
            <kw-stepper
              ref="stepper"
              v-model="stepInitNum2"
            >
              <kw-step
                :name="1"
                title="step1"
                :done="step > 1"
                prefix="1"
              >
                <h2>title1</h2>
                <kw-form :cols="2">
                  <h3>Form</h3>
                  <kw-form-row>
                    <kw-form-item
                      label="기준상품코드"
                      required
                      hint-message="abc"
                    >
                      <kw-input
                        placeholder="기준상품코드"
                        rules="required"
                      />
                    </kw-form-item>
                    <kw-form-item
                      label="기준상품명"
                      required
                      hint-message="abc"
                    >
                      <kw-input placeholder="입력" />
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </kw-step>
              <kw-step
                :name="2"
                title="step2"
                :done="step > 2"
                prefix="2"
              >
                <h2>Step2 title</h2>
                <h3>Form</h3>
                <kw-form>
                  <kw-form-row>
                    <kw-form-item
                      label="new"
                    >
                      <kw-input />
                    </kw-form-item>
                    <kw-form-item
                      label="new"
                    >
                      <kw-input />
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </kw-step>
              <kw-step
                :name="3"
                title="step3"
                :done="step > 3"
                prefix="3"
              />
            </kw-stepper>
          </div>
        </div>
        <guide-code-view
          :code-value="[headingStepper2, testScript2]"
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
const testScript2 = `
const stepInitNum = ref(2);
`;
const headingStepper = `
<div class="kw-stepper-headingtext">
  <kw-stepper
    ref="stepper"
    v-model="stepInitNum"
  >
  <!-- This is only first step's content -->
    <kw-step
      :name="1"
      title="step1"
      :done="step > 1"
      prefix="1"
    >
      <h2>Step1 title</h2>
      <kw-form :cols="2">
        <h3>Form</h3>
        <kw-form-row>
          <kw-form-item
            label="기준상품코드"
            required
            hint-message="abc"
          >
            <kw-input
              placeholder="기준상품코드"
              rules="required"
            />
          </kw-form-item>
          <kw-form-item
            label="기준상품명"
            required
            hint-message="abc"
          >
            <kw-input placeholder="입력" />
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </kw-step>
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
  </kw-stepper>
</div>
`;
const headingStepper2 = `
<div class="kw-stepper-headingtext">
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
    <!-- This is only Second step's content -->
    <kw-step
      :name="2"
      title="step2"
      :done="step > 2"
      prefix="2"
    >
      <h2>Step2 title</h2>
      <h3>Form</h3>
      <kw-form>
        <kw-form-row>
          <kw-form-item
            label="new"
          >
            <kw-input />
          </kw-form-item>
          <kw-form-item
            label="new"
          >
            <kw-input />
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </kw-step>
    <kw-step
      :name="3"
      title="step3"
      :done="step > 3"
      prefix="3"
    />
  </kw-stepper>
</div>
`;

const stepInitNum = ref(1);
const stepInitNum2 = ref(2);

const guideHistory = [
  {
    timestamp: '2022-09-15',
    text: 'Redefine heading text with stepper ',
  },

];
</script>
