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
              height: 42px<br>
              height: 32px
            </td>
          </tr>
          <tr>
            <td style="width: 33.33%;">
              padding of right and left
            </td>
            <td style="width: 33.33%;">
              custom
            </td>
            <td style="width: 33.33%;">
              padding="'String'"
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
              table-action<br>
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
              border-color="colorname" <br>
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
        height 32px / padding 8px 6px
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
        If height 40px, please add <em>padding="'12px'"</em> <br>
        (Default) height 40px / padding 8px 12px | (Dense) height 32px / padding 8px 6px <br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            padding="'12px'"
            label="파일첨부"
            class="mr8"
          />
          <kw-btn
            padding="'12px'"
            label="우편번호"
            class="mr8"
          />
          <kw-btn
            padding="'12px'"
            disable
            label="우편번호"
            class="mr8"
          />
          <kw-btn
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
            label="행 추가"
            class="mr8"
          />
          <kw-btn
            grid-action
            label="저장"
            class="mr8"
          />
          <kw-btn
            icon-right="arrow_down_16"
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
            border-color="primary"
            text-color="primary"
            dense
            label="더보기"
            class="kw-btn--color-table-blue mr8"
          />
          <kw-btn
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
    <!-- To be updated -->
    <!-- <div class="kw-guide-section">
      <h3
        id="toggleButton"
        class="kw-guide-title"
      >
        Toggle(switch)
      </h3>
      <p class="kw-guide-description">
        toggle switch button
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-toggle
            v-model="dummyData"
            label="text"
            :true-value="true"
            :false-value="false"
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
        Toggle(radio)
      </h3>
      <p class="kw-guide-description">
        toggle radio button
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn-toggle
            v-model="toggleSelected"
            name="btnToggle"
            rules="required"
            :options="['오늘', '주간', '월간']"
            unelevated
            outline
          />
        </div>
        <guide-code-view
          :code-value="[toggleRadio,toggleRadioScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div> -->
  </kw-page>
</template>

<script setup>

// const dummyData = ref(true);
// const toggleSelected = ref('오늘');

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
    padding="'12px'"
    label="파일첨부"
    class="mr8"
  />
  <kw-btn
    padding="'12px'"
    label="우편번호"
    class="mr8"
  />
  <kw-btn
    padding="'12px'"
    disable
    label="우편번호"
    class="mr8"
  />
  <kw-btn
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
    label="행 추가"
    class="mr8"
  />
  <kw-btn
    grid-action
    label="저장"
    class="mr8"
  />
  <kw-btn
    icon-right="arrow_down_16"
    grid-action
    label="저장"
  />
  `;
const tableInside = `
  <kw-btn
    border-color="primary"
    text-color="primary"
    dense
    label="더보기"
    class="kw-btn--color-table-blue mr8"
  />
  <kw-btn
    border-color="primary"
    text-color="primary"
    dense
    disable
    label="더보기"
    class="kw-btn--color-table-blue"
  />
  `;

// const toggle = `
//   <kw-toggle
//     v-model="dummyData"
//     label="text"
//     :true-value="true"
//     :false-value="false"
//   />

//   `;
// const toggleScript = `
//   const dummyData = ref(true); // select default value (true or false)
//   `;

// const toggleRadio = `
//   <kw-btn-toggle
//     v-model="toggleSelected"
//     name="btnToggle"
//     rules="required"
//     :options="['오늘', '주간', '월간']"
//     unelevated
//     outline
//   />
//   `;

// const toggleRadioScript = `
//   const toggleSelected = ref('오늘')
//   `;

// History
const guideHistory = [
  {
    timestamp: '2022.09.15',
    text: 'revised button component guide',
  },
];
</script>
