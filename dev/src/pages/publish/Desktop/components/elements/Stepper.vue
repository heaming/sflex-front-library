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
              :tooltip="'text'"<br>
              :active-icon=""<br>
              :done-icon=""
            </td>
            <td>
              Put the number as many as step's number<br>
              Change the title's name as suitable names in Zeplin(:title="``" with alternative-labels)<br>
              Change the same number as the attribute of :name=""<br>
              Put the number as many as step's number<br>
              Add the text in tooltip<br>
              Add the icon's name in active-icon<br>
              Add the icon's name in done-icon<br>
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
        <b>Updated Content!</b><br>

        Add Props '<b>heading-text</b> ' in kw-stepper. This will be created heading text automatically.<br>
        Make sure to wrap the current content by <b>kw-step-panel</b> after using kw-step.<br>
        And add <b>name="1"</b> in <b>kw-step-panel</b>( It's for current active page number)<br>
        It means every content don't need to be included in one page except of active step <br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-stepper
            v-model="stepInitNum"
            heading-text
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

            <kw-step-panel :name="1">
              <h3>Form</h3>
              <kw-form :cols="2">
                <kw-form-row>
                  <kw-form-item
                    label="기준상품코드"
                    required
                  >
                    <kw-input
                      placeholder="기준상품코드"
                      rules="required"
                    />
                  </kw-form-item>
                  <kw-form-item
                    label="기준상품명"
                    required
                  >
                    <kw-input placeholder="입력" />
                  </kw-form-item>
                </kw-form-row>
              </kw-form>
            </kw-step-panel>
          </kw-stepper>
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
              heading-text
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

              <kw-step-panel :name="2">
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
              </kw-step-panel>
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
              :title="`미팅참석\n집계`"
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
        Title on the bottom in stepper with content
      </h3>
      <p class="kw-guide-description">
        The example for stepper with grid in content.<br>
        The content(Grid in this example) should be wrapped
        <b>kw-step-panel</b>'s tag and put active step number as
        <b>:name="2"</b> in kw-step-panel<br>
        <router-link to="/Publish/Desktop/Components/Elements/Elements/Grid">
          The reference page for Grid
        </router-link>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-stepper
            v-model="stepInitNum2"
            alternative-labels
          >
            <kw-step
              :name="1"
              :title="`미팅참석\n집계`"
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
            <kw-step-panel :name="2">
              <kw-action-top>
                <template #left>
                  <span>총</span>
                  <span class="accent pl4">156</span>
                </template>
              </kw-action-top>
              <kw-grid
                :visible-rows="10"
                @init="initGrid"
              />
            </kw-step-panel>
          </kw-stepper>
        </div>
        <guide-code-view
          :code-value="[stepperGrid, testScriptLarge]"
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
        Individual icon & tooltip
      </h3>
      <p class="kw-guide-description">
        Some screens are need to be added the active icon and done icon individiually.<br>
        The commone icon is checked icon and number basically.<br>
        <b>:done-icon=""</b><br>
        <span> - Replace icon from done-icon(default:checked icon) to the other icon</span><br>
        <b>:active-icon=""</b><br>
        <span> - Replace icon from number(default: number) to the other icon</span><br>
        <b>:tool-tip=""</b><br>
        <span> - Write the text</span><br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-stepper
            v-model="stepInitNum3"
            alternative-labels
          >
            <kw-step
              :name="1"
              :title="`미팅참석\n집계`"
              :done="stepInitNum3 > 1"
              prefix="1"
            />
            <kw-step
              :name="2"
              :title="`수수료\n생성`"
              :done="stepInitNum3 > 2"
              prefix="2"
              :done-icon="'retry'"
            />
            <kw-step
              :name="3"
              :title="`세금\n공제`"
              :done="stepInitNum3 > 3"
              prefix="3"
              :tooltip="'Write the text in here! :3'"
              :active-icon="'write'"
            />
            <kw-step
              :name="4"
              :title="`원천세\n등록`"
              :done="stepInitNum3 > 4"
              prefix="4"
            />
            <kw-step
              :name="5"
              :title="`고용보험\n공제`"
              :done="stepInitNum3 > 5"
              prefix="5"
            />
          </kw-stepper>
        </div>
        <guide-code-view
          :code-value="[iconTool, iconToolLarge]"
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
const headingStepper2 = `
<kw-stepper
  v-model="stepInitNum"
  heading-text
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

  <kw-step-panel :name="2">
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
  </kw-step-panel>
</kw-stepper>
`;
const headingStepper = `
<kw-stepper
  v-model="stepInitNum"
  heading-text
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

  <kw-step-panel :name="1">
    <h3>Form</h3>
    <kw-form :cols="2">
      <kw-form-row>
        <kw-form-item
          label="기준상품코드"
          required
        >
          <kw-input
            placeholder="기준상품코드"
            rules="required"
          />
        </kw-form-item>
        <kw-form-item
          label="기준상품명"
          required
        >
          <kw-input placeholder="입력" />
        </kw-form-item>
      </kw-form-row>
    </kw-form>
  </kw-step-panel>
</kw-stepper>
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
const stepperGrid = `
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
  <kw-step-panel :name="2">
    <kw-action-top>
      <template #left>
        <span>총</span>
        <span class="accent pl4">156</span>
      </template>
    </kw-action-top>
    <kw-grid
      :visible-rows="10"
      @init="initGrid"
    />
  </kw-step-panel>
</kw-stepper>
`;
const iconTool = `
<kw-stepper
  v-model="stepInitNum2"
  alternative-labels
>
  <kw-step
    :name="1"
   :title="\`미팅참석\\n집계\`"
    :done="stepInitNum2 > 1"
    prefix="1"
  />
  <kw-step
    :name="2"
    :title="\`수수료\\n생성\`"
    :done="stepInitNum2 > 2"
    prefix="2"
    :done-icon="'retry'"
  />
  <kw-step
    :name="3"
    :title="\`세금\\n공제\`"
    :done="stepInitNum2 > 3"
    prefix="3"
    :tooltip="'Write the text in here! :3'"
    :active-icon="'wr
  />
  <kw-step
    :name="4"
    :title="\`원천세\\n등록\`"
    :done="stepInitNum2 > 4"
    prefix="4"
  />
  <kw-step
    :name="5"
    :title="\`고용보험\\n공제\`"
    :done="stepInitNum2 > 5"
    prefix="5"
  />
</kw-stepper>
`;
const iconToolLarge = `
const stepInitNum3 = ref(3);
`;

const stepInitNum = ref(1);
const stepInitNum2 = ref(2);
const stepInitNum3 = ref(3);

const guideHistory = [
  {
    timestamp: '2022-12-23',
    text: 'Add kw-step-panel',
  },
  {
    timestamp: '2022-10-21',
    text: 'Add stepper with title on the bottm',
  },
  {
    timestamp: '2022-09-15',
    text: 'Redefine heading text with stepper ',
  },

];

function initGrid(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
  ];

  const columns = [
    { fieldName: 'col1', header: '고객 번호', width: '100', styleName: 'text-center' },
    { fieldName: 'col2', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '180' },
    { fieldName: 'col4', header: '이름/담당자', width: '80', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col5', header: '성별', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '생년월일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col7', header: '휴대전화번호', width: '160', styleName: 'text-center' },
    { fieldName: 'col8', header: '주소', width: '296' },
    { fieldName: 'col9', header: '약관동의', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col10', header: '본인인증', width: '100', styleName: 'text-center text-red' },
    { fieldName: 'col11', header: '통합고객', width: '100', styleName: 'text-center text-blue' },
    { fieldName: 'col12', header: '최종 수정일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col13', header: '최종 등록일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
  ];

  data.setFields(fields);
  view.setColumns(columns);

  view.checkBar.visible = true;
  view.rowIndicator.visible = true;

  data.setRows([
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
  ]);
}

</script>
