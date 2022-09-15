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
            <td>
              color or type
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
              border: #ddd(line-line) / bg: #f5f5f5 / text: #555(black3)
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
        Form type
      </h3>
      <p class="kw-guide-description">
        (Default) height 40px / padding 8px 12px <br>
        (Dense) height 32px / padding 8px 6px <br>
        use with input type
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            form
            label="파일첨부"
            class="mr8"
          />
          <kw-btn
            form
            label="우편번호"
            class="mr8"
          />
          <kw-btn
            form
            disable
            label="우편번호"
          />
          <!-- form type dense size is same with default type dense so just put dense attribute-->
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
          :code-value="secondary"
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
            icon="plus_16"
            dense
            label="학습자 추가"
            class="mr8"
          />
          <kw-btn
            icon="plus_16"
            dense
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
            underline
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
          <!-- <kw-btn
            text-color="primary"
            border-color="primary"
            class="kw-btn--color-table-blue"
            dense
            label="삭제"
          /> -->
          <kw-btn
            l-gray
            label="저장"
          />
          <kw-btn
            primary
            label="저장"
          />
        </div>
        <guide-code-view
          :code-value="more"
          lang="vue"
        />
        <div class="kw-guide-example">
          <h4 class="mb20">
            Located in table inside
          </h4>
          <kw-btn
            class="kw"
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
        id="etc"
        class="kw-guide-title"
      >
        Etc
      </h3>
      <p class="kw-guide-description">
        table bkye
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
  </div>
  `;

const formBtn = `
  <kw-btn
    form
    label="파일첨부"
    class="mr8"
  />
  <kw-btn
    form
    label="우편번호"
    class="mr8"
  />
  <kw-btn
    form
    disable
    label="우편번호"
  />
  <!-- form type dense size is same with default type dense -->
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
