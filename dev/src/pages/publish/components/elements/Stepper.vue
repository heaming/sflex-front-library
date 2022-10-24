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
              v-model="stepInitNum""<br>
              alternative-labels
            </td>
            <td>
              Default<br>
              This is for the titles on the bottom
            </td>
          </tr>
          <tr>
            <td>
              kw-step
            </td>
            <td>
              :name="1"<br>
              title="" or :title="``"<br>
              :done="stepInitNum > 1"<br>
              prefix="1"<br>
            </td>
            <td>
              Put the number as many as step's number<br>
              Change the title's name as suitable names in Zeplin(:title="``" with alternative-labels)<br>
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
        Title on the bottom in stepper
      </h3>
      <p class="kw-guide-description">
        There are titles on the bottom in stepper.<br>
        Make sure to add <b>alternative-labels</b> in kw-stepper's tag<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-stepper
            v-model="stepInitNum2"
            alternative-labels
          >
            <kw-step
              :name="1"
              :title="`미팅참석 집계`"
              :done="stepInitNum2 > 1"
              prefix="1"
            />
            <kw-step
              :name="2"
              :title="`수수료\n생성`"
              :done="stepInitNum2 > 2"
              prefix="2"
            />
            <kw-step
              :name="3"
              :title="`세금\n공제`"
              :done="stepInitNum2 > 3"
              prefix="3"
            />
            <kw-step
              :name="4"
              :title="`원천세\n등록`"
              :done="stepInitNum2 > 4"
              prefix="4"
            />
            <kw-step
              :name="5"
              :title="`고용보험\n공제`"
              :done="stepInitNum2 > 5"
              prefix="5"
            />
            <kw-step
              :name="6"
              :title="`가지급금\n공제`"
              :done="stepInitNum2 > 6"
              prefix="6"
            />
            <kw-step
              :name="7"
              :title="`부담\n공제`"
              :done="stepInitNum2 > 7"
              prefix="7"
            />
            <kw-step
              :name="8"
              :title="`보험예치금\n적립`"
              :done="stepInitNum2 > 8"
              prefix="8"
            />
            <kw-step
              :name="9"
              :title="`이체자료\n생성`"
              :done="stepInitNum2 > 9"
              prefix="9"
            />
            <kw-step
              :name="10"
              :title="`품의\n작성`"
              :done="stepInitNum2 > 10"
              prefix="10"
            />
            <kw-step
              :name="11"
              :title="`전표\n생성`"
              :done="stepInitNum2 > 11"
              prefix="11"
            />
            <kw-step
              :name="12"
              :title="`선급판매\n수수료 확정`"
              :done="stepInitNum2 > 12"
              prefix="12"
            />
          </kw-stepper>
        </div>
        <guide-code-view
          :code-value="[testCodeLarge, testScriptLarge]"
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
            v-model="stepInitNum2"
          >
            <kw-step
              :name="1"
              title="step1"
              :done="stepInitNum2 > 1"
              prefix="1"
            />
            <kw-step
              :name="2"
              title="step2"
              :done="stepInitNum2 > 2"
              prefix="2"
            />
            <kw-step
              :name="3"
              title="step3"
              :done="stepInitNum2 > 3"
              prefix="3"
            />
            <kw-step
              :name="4"
              title="step4"
              :done="stepInitNum2 > 4"
              prefix="4"
            />
            <kw-step
              :name="5"
              title="step5"
              :done="stepInitNum2 > 5"
              prefix="5"
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
            <kw-stepper v-model="stepInitNum">
              <kw-step
                :name="1"
                title="step1"
                :done="stepInitNum > 1"
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
                :done="stepInitNum > 2"
                prefix="2"
              >
                <h2>Step2 title</h2>
                <h3>Form</h3>
                <kw-form>
                  <kw-form-row>
                    <kw-form-item label="new">
                      <kw-input />
                    </kw-form-item>
                    <kw-form-item label="new">
                      <kw-input />
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </kw-step>
              <kw-step
                :name="3"
                title="step3"
                :done="stepInitNum > 3"
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
              v-model="stepInitNum2"
            >
              <kw-step
                :name="1"
                title="step1"
                :done="stepInitNum2 > 1"
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
                :done="stepInitNum2 > 2"
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
                :done="stepInitNum2 > 3"
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
    v-model="stepInitNum"
  >
    <kw-step
      :name="1"
      title="step1"
      :done="stepInitNum > 1"
      prefix="1"
    />
    <kw-step
      :name="2"
      title="step2"
      :done="stepInitNum > 2"
      prefix="2"
    />
    <kw-step
      :name="3"
      title="step3"
      :done="stepInitNum > 3"
      prefix="3"
    />
    <kw-step
      :name="4"
      title="step4"
      :done="stepInitNum > 4"
      prefix="4"
    />
    <kw-step
      :name="5"
      title="step5"
      :done="stepInitNum > 5"
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
    v-model="stepInitNum"
  >
  <!-- This is only first step's content -->
    <kw-step
      :name="1"
      title="step1"
      :done="stepInitNum > 1"
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
      :done="stepInitNum > 2"
      prefix="2"
    />
    <kw-step
      :name="3"
      title="step3"
      :done="stepInitNum > 3"
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
      :done="stepInitNum > 1"
      prefix="1"
    />
    <!-- This is only Second step's content -->
    <kw-step
      :name="2"
      title="step2"
      :done="stepInitNum > 2"
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
      :done="stepInitNum > 3"
      prefix="3"
    />
  </kw-stepper>
</div>
`;
const testCodeLarge = `
<kw-stepper
  v-model="stepInitNum"
  alternative-labels
>
  <kw-step
    :name="1"
    :title="\`미팅참석\\n집계\`"
    :done="stepInitNum > 1"
    prefix="1"
  />
  <kw-step
    :name="2"
    :title="\`수수료\\n생성\`"
    :done="stepInitNum > 2"
    prefix="2"
  />
  <kw-step
    :name="3"
    :title="\`세금\\n공제\`"
    :done="stepInitNum > 3"
    prefix="3"
  />
  <kw-step
    :name="4"
    :title="\`원천세\\n등록\`"
    :done="stepInitNum > 4"
    prefix="4"
  />
  <kw-step
    :name="5"
    :title="\`고용보험\\n공제\`"
    :done="stepInitNum > 5"
    prefix="5"
  />
  <kw-step
    :name="6"
    :title="\`가지급금\\n공제\`"
    :done="stepInitNum > 6"
    prefix="6"
  />
  <kw-step
    :name="7"
    :title="\`부담\\n공제\`"
    :done="stepInitNum > 7"
    prefix="7"
  />
  <kw-step
    :name="8"
    :title="\`보험예치금\\n적립\`"
    :done="stepInitNum > 8"
    prefix="8"
  />
  <kw-step
    :name="9"
    :title="\`이체자료\\n생성\`"
    :done="stepInitNum > 9"
    prefix="9"
  />
  <kw-step
    :name="10"
    :title="\`품의\\n작성\`"
    :done="stepInitNum > 10"
    prefix="10"
  />
  <kw-step
    :name="11"
    :title="\`전표\\n생성\`"
    :done="stepInitNum > 11"
    prefix="11"
  />
  <kw-step
    :name="12"
    :title="\`선급판매\\n수수료 확정\`"
    :done="stepInitNum > 12"
    prefix="12"
  />
</kw-stepper>
`;
const testScriptLarge = `
const stepInitNum = ref(2);
`;

const stepInitNum = ref(1);
const stepInitNum2 = ref(2);

const guideHistory = [
  {
    timestamp: '2022-10-21',
    text: 'Add stepper with title on the bottm',
  },
  {
    timestamp: '2022-09-15',
    text: 'Redefine heading text with stepper ',
  },

];
</script>
