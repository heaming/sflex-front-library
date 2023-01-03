<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Button NEW Version
    </h2>
    <p class="kw-guide-description">
      Define the basic height and color.<br>
      For other special buttons, refer to those included in the corresponding component.
    </p>
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
              For what
            </th>
            <th>
              attribute
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 33.33%;">
              height
            </td>
            <td style="width: 33.33%;">
              <br>
              dense
            </td>
            <td style="width: 33.33%;">
              height: 40px<br>
              height: 32px
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              height(toggle-raido)
            </td>
            <td style="width: 33.33%;">
              dense="false"<br>
              default
            </td>
            <td style="width: 33.33%;">
              height: 42px<br>
              height: 32px
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              gap(toggle-radio)
            </td>
            <td style="width: 33.33%;">
              gap="px value"
            </td>
            <td style="width: 33.33%;">
              size between the toggle's button
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              padding of right and left
            </td>
            <td style="width: 33.33%;">
              padding="px value"
            </td>
            <td style="width: 33.33%;">
              Add this can control padding of right and left
            </td>
          </tr>
          <tr>
            <td>
              frequently-used
            </td>
            <td>
              primary<br>
              negative<br>
              secondary<br>
              <span class="delete">table-action</span> <em class="text-red">grid-action</em><br>
            </td>
            <td>
              bg: #2f8af3 / text: #fff<br>
              bg: #777777(black3) / text: #fff<br>
              border: #666(black-btn-line) / bg: #fff / text: #555(black3)<br>
              dense / border: #ddd(line-line) / bg: #f5f5f5 / text: #555(black3)
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              color
            </td>
            <td style="width: 33.33%;">
              background-color <br>
              text-color <br>
              border-color <br>
            </td>
            <td style="width: 33.33%;">
              color="colorname" <br>
              text-color="colorname" <br>
              border-color="colorname" *Have to be used with outlined <br>
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              color(toggle-radio)
            </td>
            <td style="width: 33.33%;">
              toggle-background-color <br>
              toggle-text-color <br>
              toggle-border-color <br>
            </td>
            <td style="width: 33.33%;">
              color="colorname" <br>
              text-color="colorname" <br>
              border-color="colorname" *Have to be used with outlined <br>
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              type
            </td>
            <td style="width: 33.33%;">
              filled <br>
              outlined <br>
              underline <br>
              borderless
            </td>
            <td style="width: 33.33%;">
              Add prop when only background-color(no border)<br>
              Add prop when need border <br>
              Add prop when need underline <br>
              Add prop when no border(no background-color)
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
        height 40px / padding 8px 20px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            primary
            label="프로모션등록"
            class="mr8"
          />
          <kw-btn
            negative
            label="취소"
            class="mr8"
          />
          <kw-btn
            secondary
            label="확인"
            class="mr8"
          />
          <kw-btn
            secondary
            disable
            label="확인"
          />
        </div>
        <guide-code-view
          :code-value="defaultCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="dense"
        class="kw-guide-title"
      >
        Dense
      </h3>
      <p class="kw-guide-description">
        Add <em>dense</em> prop <br>
        height 32px / padding 6px 8px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            primary
            dense
            label="프로모션등록"
            class="mr8"
          />
          <kw-btn
            negative
            dense
            label="취소"
            class="mr8"
          />
          <kw-btn
            secondary
            dense
            label="확인"
            class="mr8"
          />
          <kw-btn
            secondary
            dense
            disable
            label="확인"
          />
        </div>
        <guide-code-view
          :code-value="denseCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Form"
        class="kw-guide-title"
      >
        Form type(use with input type)
      </h3>
      <p class="kw-guide-description">
        If height 40px, please add <em>padding="px value"</em> (only custom padding of right and left )<br>
        (Default) height 40px / padding 8px 12px | (Dense) height 32px / padding 8px 6px <br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            padding="12px"
            secondary
            label="파일첨부"
            class="mr8"
          />
          <kw-btn
            padding="12px"
            secondary
            label="우편번호"
            class="mr8"
          />
          <kw-btn
            padding="12px"
            secondary
            disable
            label="우편번호"
            class="mr8"
          />
          <kw-btn
            secondary
            dense
            label="신규등록"
            class="mr8"
          />
        </div>
        <guide-code-view
          :code-value="formBtn"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="popupBottomButton"
        class="kw-guide-title"
      >
        Color
      </h3>
      <p class="kw-guide-description">
        Defined what frequently-used by three prop
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Primary/positive color
          </h4>
          <kw-btn
            primary
            label="확인"
            class="mr8"
          />
          <kw-btn
            primary
            dense
            label="확인"
            class="mr8"
          />
          <kw-btn
            primary
            dense
            disable
            label="확인"
          />
        </div>
        <guide-code-view
          :code-value="primaryPositive"
          lang="vue"
        />
        <div class="kw-guide-example">
          <h4 class="mb20">
            Negative color | bg-color: #777
          </h4>
          <kw-btn
            negative
            label="취소"
            class="mr8"
          />
          <kw-btn
            negative
            dense
            label="취소"
            class="mr8"
          />
          <kw-btn
            negative
            dense
            disable
            label="취소"
          />
        </div>
        <guide-code-view
          :code-value="primaryNegative"
          lang="vue"
        />
        <div class="kw-guide-example">
          <h4 class="mb20">
            Secondary | border-color: black / bg-color: white
          </h4>
          <kw-btn
            secondary
            label="초기화"
            class="mr8"
          />
          <kw-btn
            secondary
            dense
            label="초기화"
            class="mr8"
          />
          <kw-btn
            secondary
            dense
            disable
            label="초기화"
          />
        </div>
        <guide-code-view
          :code-value="secondary"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="table"
        class="kw-guide-title"
      >
        table button
      </h3>
      <p class="kw-guide-description">
        It used when related with grid and table component <br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Located in table top and bottom
          </h4>
          <kw-btn
            grid-action
            label="행추가"
            class="mr8"
          />
          <kw-btn
            grid-action
            label="저장"
            class="mr8"
          />
          <kw-btn
            icon-right="arrow_down"
            grid-action
            label="저장"
          />
        </div>
        <guide-code-view
          :code-value="tableBtn"
          lang="vue"
        />

        <div class="kw-guide-example">
          <h4 class="mb20">
            Located in table inside(For develop)
          </h4>
          <kw-btn
            outlined
            border-color="primary"
            text-color="primary"
            dense
            label="더보기"
            class="kw-btn--color-table-blue mr8"
          />
          <kw-btn
            outlined
            border-color="primary"
            text-color="primary"
            dense
            disable
            label="더보기"
            class="kw-btn--color-table-blue"
          />
        </div>
        <guide-code-view
          :code-value="tableInside"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="toggleButton"
        class="kw-guide-title"
      >
        Toggle(radio)
      </h3>
      <p class="kw-guide-description">
        default gap is 4px. <br>
        Adjust gap as attribute like gap="10px".<br>
        default height is 32px<br>
        Add dense = "false" as attribute is 40px<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn-toggle
            v-model="strModel"
            :label="'label'"
            :options="['오늘', '주간', '월간']"
          />
          <kw-btn-toggle
            v-model="strModel2"
            class="mt10"
            :label="'label'"
            :options="['오늘', '주간', '월간']"
            dense="false"
          />
          <kw-btn-toggle
            v-model="strModel3"
            class="mt10"
            :label="'label'"
            :options="['A', 'B', 'C']"
            dense="false"
            gap="0px"
          />
          <!-- 추후에 필요하면 추가 -->
          <!-- <kw-btn-toggle
            v-model="strModel3"
            class="mt10"
            :options="['오늘', '주간', '월간']"
            color="error"
            text-color="info"
            border-color="info"
            toggle-color="secondary"
            toggle-text-color="black3"
            toggle-border-color="black3"
          /> -->
        </div>
        <guide-code-view
          :code-value="[toggleRadio,toggleRadioScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="toggleButton"
        class="kw-guide-title"
      >
        Toggle(switch)
      </h3>
      <p class="kw-guide-description">
        For kw-toggle's label is located right side,Add <b>left-label="false"</b>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-toggle
            v-model="ynModel"
            label="가구 내 학습지 모두 보기"
            left-label="false"
          />
          <kw-toggle
            v-model="ynModel"
            label="가구 내 학습지 모두 보기"
          />
          <!-- 추후 필요시 option group 추가  -->
          <!-- <kw-option-group
            :model-value="[]"
            name="toggleOptionGroup"
            rules="required"
            type="toggle"
            :options="['A', 'B', 'C', 'D']"
            :left-label="false"
          /> -->
          <!-- in form  -->
          <!-- <kw-form>
            <kw-form-item label="Toggle (OptionGroup)">
              <kw-field
                :model-value="'Y'"
                rules="required"
              >
                <template #default="{ field }">
                  <kw-toggle
                    v-bind="field"
                    label="searchform"
                    left-label="false"
                  />
                </template>
              </kw-field>
            </kw-form-item>
            <kw-form-item
              label="Toggle (OptionGroup)"
              no-label
            >
              <kw-option-group
                :model-value="[]"
                name="toggleOptionGroup"
                rules="required"
                type="toggle"
                :options="['A', 'B', 'C', 'D']"
                :left-label="false"
              />
            </kw-form-item>
          </kw-form> -->
        </div>
        <guide-code-view
          :code-value="[toggleSwitch,toggleSwitchScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="dropdownButton"
        class="kw-guide-title"
      >
        Dropdown Button
      </h3>
      <p class="kw-guide-description">
        This component for button which have options
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn-dropdown
            label="상품등록"
            dense
            primary
          >
            <kw-btn
              label="기준 상품등록"
            />
            <kw-btn
              label="복합 상품등록"
            />
          </kw-btn-dropdown>
        </div>
        <guide-code-view
          :code-value="[dropdownBtn]"
          :lang="['vue']"
          multi
        />
      </q-card>
    </div>
    <!-- <div class="kw-guide-section">
      <h3
        id="toggleButton"
        class="kw-guide-title"
      >
        Toggle(switch)
      </h3>
      <p class="kw-guide-description">
        There are two options for kw-toggle and kw-option-group's toggle.<br>
        one toggle for kw-toggle, More than one toggle for kw-option-group.<br>
        Default's label location is left. And add
        <b>left-label="false"</b> as attirbue in kw-toggle for Right side's label<br>
      </p>
      <q-card>
        <div class="kw-guide-example row">
          <kw-toggle
            v-model="ynModel"
          />
          <kw-toggle
            v-model="ynModel2"
            label="Left Label"
          />
          <kw-toggle
            v-model="ynModel3"
            label="Right Label"
            left-label="false"
          />
          <kw-option-group
            class="ml30"
            :model-value="[]"
            name="toggleOptionGroup"
            type="toggle"
            :options="['A', 'B', 'C', 'D']"
          />
        </div>
        <guide-code-view
          :code-value="[toggle,toggleScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="toggleButton"
        class="kw-guide-title"
      >
        Toggle(switch) in form or searchform
      </h3>
      <p class="kw-guide-description">
        toggle switch button
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-form class="mt30">
            <kw-form-row>
              <kw-form-item label="서치폼">
                <kw-field
                  :model-value="'Y'"
                  rules="required"
                >
                  <template #default="{ field }">
                    <kw-toggle
                      v-bind="field"
                      label="formform"
                      left-label="false"
                    />
                  </template>
                </kw-field>
              </kw-form-item>
              <kw-form-item label="Toggle (OptionGroup)">
                <kw-option-group
                  :model-value="[]"
                  name="toggleOptionGroup"
                  type="toggle"
                  :options="['A', 'B', 'C', 'D']"
                />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </div>
        <guide-code-view
          :code-value="[toggle,toggleScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div> -->
  </kw-page>
</template>

<script setup>

const strModel = ref('오늘');
const strModel2 = ref('오늘');
const strModel3 = ref('A');
const ynModel = ref('N');

const defaultCode = `
  <kw-btn
    primary
    label="프로모션등록"
    class="mr8"
  />
  <kw-btn
    negative
    label="취소"
    class="mr8"
  />
  <kw-btn
    secondary
    label="확인"
    class="mr8"
  />
  <kw-btn
    secondary
    disable
    label="확인"
  />
  <!-- mr8: gutter margin-left:8px -->
  `;

const denseCode = `
  <kw-btn
    primary
    dense
    label="프로모션등록"
    class="mr8"
  />
  <kw-btn
    negative
    dense
    label="취소"
    class="mr8"
  />
  <kw-btn
    secondary
    dense
    label="확인"
    class="mr8"
  />
  <kw-btn
    secondary
    dense
    disable
    label="확인"
  />
  <!-- mr8: gutter margin-left:8px -->
  `;

const formBtn = `
  <kw-btn
    padding="12px"
    secondary
    label="파일첨부"
    class="mr8"
  />
  <kw-btn
    padding="12px"
    secondary
    label="우편번호"
    class="mr8"
  />
  <kw-btn
    padding="12px"
    secondary
    disable
    label="우편번호"
    class="mr8"
  />
  <kw-btn
    secondary
    dense
    label="신규등록"
    class="mr8"
  />
  `;

const primaryPositive = `
  <kw-btn
    primary
    label="확인"
    class="mr8"
  />
  <kw-btn
    primary
    dense
    label="확인"
    class="mr8"
  />
  <kw-btn
    primary
    dense
    disable
    label="확인"
  />
  `;

const primaryNegative = `
  <kw-btn
    negative
    label="취소"
    class="mr8"
  />
  <kw-btn
    negative
    dense
    label="취소"
    class="mr8"
  />
  <kw-btn
    negative
    dense
    disable
    label="취소"
  />
  `;

const secondary = `
  <kw-btn
    secondary
    label="초기화"
    class="mr8"
  />
  <kw-btn
    secondary
    dense
    label="초기화"
    class="mr8"
  />
  <kw-btn
    secondary
    dense
    disable
    label="초기화"
  />
  `;

const tableBtn = `
  <kw-btn
    grid-action
    label="행추가"
    class="mr8"
  />
  <kw-btn
    grid-action
    label="저장"
    class="mr8"
  />
  <kw-btn
    icon-right="arrow_down
    grid-action
    label="저장"
  />
  `;
const tableInside = `
  <kw-btn
    outlined
    border-color="primary"
    text-color="primary"
    dense
    label="더보기"
    class="kw-btn--color-table-blue mr8"
  />
  <kw-btn
    outlined
    border-color="primary"
    text-color="primary"
    dense
    disable
    label="더보기"
    class="kw-btn--color-table-blue"
  />
  `;

const toggleSwitch = `
<kw-toggle
  v-model="ynModel"
  label="가구 내 학습지 모두 보기"
  left-label="false"
/>
<kw-toggle
  v-model="ynModel"
  label="가구 내 학습지 모두 보기"
/>
  `;
const toggleSwitchScript = `
  const ynModel = ref('N'); // select default value (Y or N)
  `;

const toggleRadio = `
<!-- height: 32px -->
<kw-btn-toggle
  v-model="strModel"
  :label="'label'"
  :options="['오늘', '주간', '월간']"
/>
<!-- height: 40px -->
<kw-btn-toggle
  v-model="strModel"
  :label="'label'"
  :options="['오늘', '주간', '월간']"
  dense="false"
/>
<!-- gap="0" -->
<kw-btn-toggle
  v-model="strModel"
  :label="'label'"
  :options="['A', 'B', 'C']"
  dense="false"
  gap="0px"
/>
`;

const toggleRadioScript = `
const strModel = ref('오늘');
  `;

const dropdownBtn = `
<kw-btn-dropdown
  label="상품등록"
  dense
  primary
>
  <kw-btn
    label="기준 상품등록"
  />
  <kw-btn
    label="복합 상품등록"
  />
</kw-btn-dropdown>
`;

// History
const guideHistory = [
  {
    timestamp: '2022.10.14',
    text: 'modified button dropdown case',
  },
  {
    timestamp: '2022.10.12',
    text: 'add button dropdown case',
  },
  {
    timestamp: '2022.10.06',
    text: 'edit icon name in code',
  },
  {
    timestamp: '2022.09.27',
    text: 'Add toggle(switch)',
  },
  {
    timestamp: '2022.09.26',
    text: 'Add toggle(radio)',
  },
  {
    timestamp: '2022.09.21',
    text: 'Add content of padding prop guide',
  },
  {
    timestamp: '2022.09.16',
    text: 'revised wrong prop name',
  },
  {
    timestamp: '2022.09.15',
    text: 'revised button component guide',
  },
];
</script>
