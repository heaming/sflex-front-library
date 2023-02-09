<template>
  <kw-page
    class="kw-guide"
    no-header
  >
    <h2 class="kw-guide-h2">
      [Mobile] Button
    </h2>
    <p class="kw-guide-description">
      Button's Examples in Mobile
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
              <em class="text-red">height: 30px</em>
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              height(toggle-raido)
            </td>
            <td style="width: 33.33%;">
              :dense="false"<br>
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
              secondary
            </td>
            <td>
              bg: #2f8af3 / text: #fff<br>
              bg: #777777(black3) / text: #fff<br>
              border: #666(black-btn-line) / bg: #fff / text: #555(black3)
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
              borderless <br>
              round
            </td>
            <td style="width: 33.33%;">
              Add prop when only background-color(no border)<br>
              Add prop when need border <br>
              Add prop when need underline <br>
              Add prop when no border(no background-color) <br>
              Add prop when need circle shape button
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Width / Height
      </h3>
      <p class="kw-guide-description">
        please use helper class of height
      </p>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              The Element(tag's name)
            </th>
            <th>
              Attr or Class
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-btn
            </td>
            <td>
              w1, w2, w3......w1000
            </td>
          </tr>
          <tr>
            <td>
              kw-btn
            </td>
            <td>
              h1, h2, h3......h1000
            </td>
          </tr>
          <tr>
            <td>
              kw-btn
            </td>
            <td>
              full-width
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Default"
        class="kw-guide-title"
      >
        Default
      </h3>
      <p class="kw-guide-description">
        height 40px / padding 10px 12px
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
            class="mr8"
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
        height 30px / padding 5px 12px
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
            class="mr8"
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
            dense
            negative
            label="취소"
            class="mr8"
          />
          <kw-btn
            dense
            negative
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
            dense
            secondary
            label="초기화"
            class="mr8"
          />
          <kw-btn
            dense
            secondary
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
        T맵 아이콘
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            dense
            disable
            label="TMAP 최적경로"
            class="mr8 kw-btn--tmap-icon"
          />
          <kw-btn
            dense
            label="TMAP 최적경로"
            class="mr8 kw-btn--tmap-icon"
          />
          <kw-btn
            round
            class="mr8 kw-btn--tmap-icon"
          />
        </div>
        <guide-code-view
          :code-value="TmapIcon"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="table"
        class="kw-guide-title"
      >
        custom button
      </h3>
      <p class="kw-guide-description">
        if you need to another style button please use prop of color, border-color and text-color,
        also you can control width and height by helper class
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            dense
            secondary
            border-color="line-stroke"
            label="TEXT"
            class="mr8"
          />
          <kw-btn
            dense
            secondary
            label="TEXT"
            class="w120 mr8"
          />
          <kw-btn
            negative
            label="TEXT"
            class="w180"
          />
          <p class="mt20">
            dense full width
          </p>
          <kw-btn
            dense
            secondary
            border-color="line-stroke"
            label="TEXT"
            class="full-width mt10"
          />
          <p class="mt10">
            height:37px and full width
          </p>
          <kw-btn
            dense
            secondary
            border-color="line-stroke"
            label="TEXT"
            class="full-width mt10 h37"
          />
        </div>
        <guide-code-view
          :code-value="customBtn"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="table"
        class="kw-guide-title"
      >
        ETC
      </h3>
      <p class="kw-guide-description">
        anchor type and icon only type
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            borderless
            icon="sms_24"
            style="font-size: 24px;"
            class="mr8"
          />
          <kw-btn
            dense
            icon="plus"
            class="mr8"
          />
          <kw-btn
            underline
            text-color="black3"
            icon-right="plus"
            label="TEXT"
            class="mr8"
          />
          <kw-btn
            borderless
            text-color="primary"
            icon-right="arrow_right"
            label="TEXT"
            class="mr8"
          />
          <kw-btn
            icon-right="arrow_down"
            borderless
            label="더보기"
            class="kw-fc--black3 mr8"
          />
          <kw-btn
            round
            filled
            color="bg-box"
            icon="call_24_WH"
            style="font-size: 20px;"
            class="w32 h32"
          />
        </div>
        <guide-code-view
          :code-value="etcBtn"
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
        Adjust gap as attribute like gap="8px".<br>
        default height is 30px<br>
        Add dense = "false" as attribute is 40px<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <p>default</p>
          <kw-btn-toggle
            v-model="strModel"
            label="label"
            :options="['오늘', '주간', '월간']"
          />
          <p class="mt10">
            grow / gap="0"
          </p>
          <kw-btn-toggle
            v-model="strModel2"
            class="mt10"
            label="label"
            :options="['남성','여성']"
            gap="0px"
            :dense="false"
            grow
            disable
          />
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
        For kw-toggle's label is located right side,Add left-label="false"
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-toggle
            v-model="ynModel"
            :label="ynModel === 'N' ? 'off' : 'on'"
            left-label="false"
          />
          <p class="mt10">
            no label
          </p>
          <kw-toggle
            v-model="ynModel2"
          />
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
        id="toggleButton"
        class="kw-guide-title"
      >
        Date button and time button
      </h3>
      <p class="kw-guide-description">
        It looks same with date picker and time picker.<br>
        But If there is used button in zeplin, have to use it in <a href="https://zpl.io/1ymW0Pm">this link</a><br>
        Add the class "select-btn" in kw-btn<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/select-btn.png"
            alt="Layout Type 1"
            class="mb30"
          >
          <kw-btn
            icon-right="arrow_down"
            class="select-btn"
            borderless
            label="선택"
          />
          <guide-code-view
            :code-value="selectBtn"
            :lang="vue"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const strModel = ref('오늘');
const strModel2 = ref('남성');
const ynModel = ref('N');
const ynModel2 = ref('N');

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
  class="mr8"
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
  class="mr8"
/>
  <!-- mr8: gutter margin-left:8px -->
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
<!-- mr8: gutter margin-left:8px -->
  `;

const primaryNegative = `
<kw-btn
  negative
  label="취소"
  class="mr8"
/>
<kw-btn
  dense
  negative
  label="취소"
  class="mr8"
/>
<kw-btn
  dense
  negative
  disable
  label="취소"
/>
<!-- mr8: gutter margin-left:8px -->
  `;

const secondary = `
<kw-btn
  secondary
  label="초기화"
  class="mr8"
/>
<kw-btn
  dense
  secondary
  label="초기화"
  class="mr8"
/>
<kw-btn
  dense
  secondary
  disable
  label="초기화"
/>
  `;

const TmapIcon = `
<kw-btn
  dense
  disable
  label="TMAP 최적경로"
  class="mr8 kw-btn--tmap-icon"
/>
<kw-btn
  dense
  label="TMAP 최적경로"
  class="mr8 kw-btn--tmap-icon"
/>
<kw-btn
  round
  class="mr8 kw-btn--tmap-icon"
/>
`;

const customBtn = `
<kw-btn
  dense
  secondary
  border-color="line-stroke"
  label="TEXT"
  class="mr8"
/>
<kw-btn
  dense
  secondary
  label="TEXT"
  class="w120 mr8"
/>
<kw-btn
  negative
  label="TEXT"
  class="w180"
/>

// dense full width
<kw-btn
  dense
  secondary
  border-color="line-stroke"
  label="TEXT"
  class="full-width mt10"
/>

//height:37px and full width
<kw-btn
  dense
  secondary
  border-color="line-stroke"
  label="TEXT"
  class="full-width mt10 h37"
/>
`;

const etcBtn = `
<kw-btn
  borderless
  icon="sms_24"
  style="font-size: 24px;"
  class="mr8"
/>
<kw-btn
  dense
  icon="plus"
  class="mr8"
/>
<kw-btn
  underline
  text-color="black3"
  icon-right="plus"
  label="TEXT"
  class="mr8"
/>
<kw-btn
  borderless
  text-color="primary"
  icon-right="arrow_right"
  label="TEXT"
  class="mr8"
/>
<kw-btn
  icon-right="arrow_down"
  borderless
  label="더보기"
  class="kw-fc--black3 mr8"
/>
<kw-btn
  round
  filled
  color="bg-box"
  icon="call_24_WH"
  style="font-size: 20px;"
  class="w32 h32"
/>
`;

const toggleSwitch = `
<kw-toggle
  v-model="ynModel"
  :label="ynModel === 'N' ? 'off' : 'on'"
  left-label="false"
/>
<!-- no label-->
<kw-toggle
  v-model="ynModel2"
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
<!-- full-width (flexible) / gap="0" -->
<kw-btn-toggle
  v-model="strModel2"
  class="mt10"
  label="label"
  :options="['남성','여성']"
  gap="0px"
  :dense="false"
  grow
  disable
/>
`;

const toggleRadioScript = `
const strModel = ref('오늘');
const strModel2 = ref('남성');
  `;

const selectBtn = `
<kw-btn
  icon-right="arrow_down"
  class="select-btn"
  borderless
  label="선택"
/>
`;
// History
const guideHistory = [
  {
    timestamp: '2023.01.26',
    text: 'modified :dense="false" ',
  },
  {
    timestamp: '2023.01.25',
    text: 'modified etc button case ',
  },
];

</script>
