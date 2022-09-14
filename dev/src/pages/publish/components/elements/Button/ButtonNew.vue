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
              class
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
              Default<br>
              kw-btn--h40<br>
              kw-btn--h36<br>
              kw-btn--h32<br>
              kw-btn--h24
            </td>
            <td style="width: 33.33%;">
              height: 42px<br>
              height: 40px<br>
              height: 36px<br>
              height: 32px<br>
              height: 24px
            </td>
          </tr>
          <tr>
            <td>
              width
            </td>
            <td>
              Default<br>
              w1, w2, w3...w1000
            </td>
            <td>
              width : auto<br>
              If you need a specific width rather than 'auto', use a helper class. px
            </td>
          </tr>
          <tr>
            <td>
              color or type
            </td>
            <td>
              Default<br>
              kw-btn--negative<br>
              kw-btn--line-black<br>
              kw-btn--line-blue<br>
              kw-btn--gray<br>
              kw-btn--line-gray<br>
              kw-btn--underline
            </td>
            <td>
              Primary color : #2f8af3<br>
              Negative gray type : #777777<br>
              Black line type : line color #222222<br>
              Blue line type : line color #2f8af3(Primary)<br>
              Gray color : #555555<br>
              Gray line type : line color #cccccc<br>
              Simple link type or with icon
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
          :code-value="defaultCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="popupBottomButton"
        class="kw-guide-title"
      >
        Height & Color
      </h3>
      <p class="kw-guide-description">
        40px,32px
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
          :code-value="blackLine"
          lang="vue"
        />
        <div class="kw-guide-example">
          <h4 class="mb20">
            Form Button : different padding value (8px 12px)
          </h4>
          <kw-btn
            secondary
            form
            label="파일첨부"
            class="mr8"
          />
          <kw-btn
            secondary
            form
            disable
            label="파일첨부"
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
        id="contents"
        class="kw-guide-title"
      >
        Contents
      </h3>
      <p class="kw-guide-description">
        button height 32px, with plus icon
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--line-black kw-btn--h32"
            icon="plus_16"
            label="학습자 추가"
          />
          <kw-btn
            class="kw-btn--line-black kw-btn--h32 ml8"
            icon="plus_16"
            disable
            label="학습자 추가"
          />
        </div>
        <guide-code-view
          :code-value="contentsAddIcon"
          lang="vue"
        />
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--contents"
            label="수정"
          />
          <kw-btn
            class="kw-btn--contents ml8"
            disable
            label="수정"
          />
        </div>
        <guide-code-view
          :code-value="contentsDefault"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="etc"
        class="kw-guide-title"
      >
        Link(Underline)
      </h3>
      <p class="kw-guide-description">
        Simple underline button
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--underline"
            label="목록으로"
          />
        </div>
        <guide-code-view
          :code-value="underline"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="etc"
        class="kw-guide-title"
      >
        Etc
      </h3>
      <p class="kw-guide-description">
        button height 32px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--more"
            label="더보기"
          />
        </div>
        <guide-code-view
          :code-value="more"
          lang="vue"
        />
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--more q-btn--append"
            label="더보기"
          />
        </div>
        <guide-code-view
          :code-value="moreExpand"
          lang="vue"
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
    </div>
  </kw-page>
</template>

<script setup>

const dummyData = ref(true);
const toggleSelected = ref('오늘');

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

const primaryPositive = `
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

const primaryNegative = `
<kw-btn
  class="kw-btn--negative"
  label="취소"
/>
<kw-btn
  class="kw-btn--negative kw-btn--h40 ml8"
  label="취소"
/>
<kw-btn
  class="kw-btn--negative kw-btn--h36 ml8"
  label="취소"
/>
<kw-btn
  class="kw-btn--negative kw-btn--h32 ml8"
  label="취소"
/>
<kw-btn
  class="kw-btn--negative kw-btn--h24 ml8"
  label="취소"
/>
`;

const blackLine = `
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

const formBtn = `
<kw-btn
  secondary
  form
  label="파일첨부"
  class="mr8"
/>
<kw-btn
  secondary
  form
  disable
  label="파일첨부"
/>
`;

const contentsAddIcon = `
<kw-btn
  class="kw-btn--line-black kw-btn--h32"
  icon="plus_16"
  label="학습자 추가"
/>
<kw-btn
  class="kw-btn--line-black kw-btn--h32 ml8"
  icon="plus_16"
  disable
  label="학습자 추가"
/>
`;

const contentsDefault = `
<kw-btn
  class="kw-btn--contents"
  label="수정"
/>
<kw-btn
  class="kw-btn--contents ml8"
  disable
  label="수정"
/>
`;

const more = `
<kw-btn
  class="kw-btn--more"
  label="더보기"
/>
`;

const moreExpand = `
<kw-btn
  class="kw-btn--more q-btn--append"
  label="더보기"
/>
`;

const underline = `
<kw-btn
  class="kw-btn--underline"
  label="목록으로"
/>
`;

const toggle = `
<kw-toggle
  v-model="dummyData"
  label="text"
  :true-value="true"
  :false-value="false"
/>

`;
const toggleScript = `
const dummyData = ref(true); // select default value (true or false)
`;

const toggleRadio = `
<kw-btn-toggle
  v-model="toggleSelected"
  name="btnToggle"
  rules="required"
  :options="['오늘', '주간', '월간']"
  unelevated
  outline
/>
`;

const toggleRadioScript = `
const toggleSelected = ref('오늘')
`;

// History
const guideHistory = [
  {
    timestamp: '2022.08.30',
    text: 'Add Radio Toggle button case',
  },
];
</script>
