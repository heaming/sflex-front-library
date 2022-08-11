<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Btn
    </h2>
    <p class="kw-guide-description">
      Define the basic height and color.<br>
      For other special buttons, refer to those included in the corresponding component.
    </p>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        summary
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
              color or type
            </td>
            <td>
              Default<br>
              kw-btn--negative<br>
              kw-btn--line-black<br>
              kw-btn--line-blue<br>
              kw-btn--gray<br>
              kw-btn--line-gray
            </td>
            <td>
              Primary color : #2f8af3<br>
              Negative gray type : #777777<br>
              Black line type : line color #222222<br>
              Blue line type : line color #2f8af3(Primary)<br>
              Gray color : #555555<br>
              Gray line type : line color #cccccc
            </td>
          </tr>
          <tr>
            <td>
              Etc.
            </td>
            <td>
              kw-btn--excel<br>
            </td>
            <td>
              Excel download
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
        default
      </h3>
      <p class="kw-guide-description">
        button height 42px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn>프로모션등록</kw-btn>
          <kw-btn class="kw-btn--negative ml8">
            취소
          </kw-btn>
          <kw-btn
            disable
            class="ml8"
          >
            확인
          </kw-btn>
        </div>
        <guide-code-view
          :code-value="primary"
          lang="vue"
          :button="false"
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
        40px, 36px, 32px, 24px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Primary/positive color
          </h4>
          <kw-btn>
            확인
          </kw-btn>
          <kw-btn class="kw-btn--h40 ml8">
            확인
          </kw-btn>
          <kw-btn class="kw-btn--h36 ml8">
            확인
          </kw-btn>
          <kw-btn class="kw-btn--h32 ml8">
            확인
          </kw-btn>
          <kw-btn class="kw-btn--h24 ml8">
            확인
          </kw-btn>
        </div>
        <guide-code-view
          :code-value="primaryPositive"
          lang="vue"
        />
        <div class="kw-guide-example">
          <h4 class="mb20">
            Primary/negative color
          </h4>
          <kw-btn class="kw-btn--negative">
            취소
          </kw-btn>
          <kw-btn class="kw-btn--negative kw-btn--h40 ml8">
            취소
          </kw-btn>
          <kw-btn class="kw-btn--negative kw-btn--h36 ml8">
            취소
          </kw-btn>
          <kw-btn class="kw-btn--negative kw-btn--h32 ml8">
            취소
          </kw-btn>
          <kw-btn class="kw-btn--negative kw-btn--h24 ml8">
            취소
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryNegative"
            lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Line type - Black
          </h4>
          <kw-btn class="kw-btn--line-black">
            초기화
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--h40 ml8">
            초기화
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--h36 ml8">
            초기화
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--h32 ml8">
            초기화
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--h24 ml8">
            초기화
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="blackLine"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Line type - Black & gray bg
          </h4>
          <kw-btn class="kw-btn--line-black kw-btn--line-bg">
            수정
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h40 ml8">
            수정
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h36 ml8">
            수정
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h32 ml8">
            수정
          </kw-btn>
          <kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h24 ml8">
            수정
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="blackLineBg"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Line type - Gray
          </h4>
          <kw-btn class="kw-btn--line-gray">
            추가
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--h40 ml8">
            추가
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--h36 ml8">
            추가
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--h32 ml8">
            추가
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--h24 ml8">
            추가
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="grayLine"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Line type - Gray & gray bg
          </h4>
          <kw-btn class="kw-btn--line-gray kw-btn--line-bg">
            삭제
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h40 ml8">
            삭제
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h36 ml8">
            삭제
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 ml8">
            삭제
          </kw-btn>
          <kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h24 ml8">
            삭제
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="grayLineBg"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Line type - Blue
          </h4>
          <kw-btn class="kw-btn--line-blue">
            결제요청
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--h40 ml8">
            결제요청
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--h36 ml8">
            결제요청
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--h32 ml8">
            결제요청
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--h24 ml8">
            결제요청
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="blueLine"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <h4 class="mb20">
            Line type - Blue & blue bg
          </h4>
          <kw-btn class="kw-btn--line-blue kw-btn--line-bg">
            오늘
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h40 ml8">
            오늘
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h36 ml8">
            오늘
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h32 ml8">
            오늘
          </kw-btn>
          <kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h24 ml8">
            오늘
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="blueLineBg"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
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
        button height 32px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--line-black kw-btn--h32"
            icon="plus_16|0 0 16 16"
          >
            학습자 추가
          </kw-btn>
          <kw-btn
            class="kw-btn--line-black kw-btn--h32 ml8"
            icon="plus_16|0 0 16 16"
            disable
          >
            학습자 추가
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="contentsAddIcon"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--contents"
          >
            수정
          </kw-btn>
          <kw-btn
            class="kw-btn--contents ml8"
            disable
          >
            수정
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="contentsDefault"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
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
          >
            더보기
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="more"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--more q-btn--append"
          >
            더보기
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="moreExpand"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="toggleButton"
        class="kw-guide-title"
      >
        Toggle
      </h3>
      <p class="kw-guide-description">
        toggle button
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
        <div class="kw-guide-code">
          <HighCode
            :code-value="toggle"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
import { HighCode } from 'vue-highlight-code';
import 'vue-highlight-code/dist/style.css';

const vue = 'vue';

const dummyData = ref(true);

const primary = `
<kw-btn>프로모션등록</kw-btn>
<kw-btn class="kw-btn--negative ml8">취소</kw-btn>
<kw-btn disable class="ml8">확인</kw-btn>  <!-- ml8: gutter margin-left:8px -->
`;

const primaryPositive = `
<kw-btn>
  확인
</kw-btn>
<kw-btn class="kw-btn--h40 ml8">
  확인
</kw-btn>
<kw-btn class="kw-btn--h36 ml8">
  확인
</kw-btn>
<kw-btn class="kw-btn--h32 ml8">
  확인
</kw-btn>
<kw-btn class="kw-btn--h24 ml8">
  확인
</kw-btn>
`;

const primaryNegative = `
<kw-btn class="kw-btn--negative">
  취소
</kw-btn>
<kw-btn class="kw-btn--negative kw-btn--h40 ml8">
  취소
</kw-btn>
<kw-btn class="kw-btn--negative kw-btn--h36 ml8">
  취소
</kw-btn>
<kw-btn class="kw-btn--negative kw-btn--h32 ml8">
  취소
</kw-btn>
<kw-btn class="kw-btn--negative kw-btn--h24 ml8">
  취소
</kw-btn>
`;

const blackLine = `
<kw-btn class="kw-btn--line-black">
  초기화
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--h40 ml8">
  초기화
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--h36 ml8">
  초기화
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--h32 ml8">
  초기화
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--h24 ml8">
  초기화
</kw-btn>
`;

const blackLineBg = `
<kw-btn class="kw-btn--line-black kw-btn--line-bg">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h40 ml8">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h36 ml8">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h32 ml8">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-black kw-btn--line-bg kw-btn--h24 ml8">
  삭제
</kw-btn>
`;
const blueLine = `
<kw-btn class="kw-btn--line-blue">
  결제요청
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--h40 ml8">
  결제요청
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--h36 ml8">
  결제요청
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--h32 ml8">
  결제요청
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--h24 ml8">
  결제요청
</kw-btn>
`;

const blueLineBg = `
<kw-btn class="kw-btn--line-blue kw-btn--line-bg">
  오늘
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h40 ml8">
  오늘
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h36 ml8">
  오늘
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h32 ml8">
  오늘
</kw-btn>
<kw-btn class="kw-btn--line-blue kw-btn--line-bg kw-btn--h24 ml8">
  오늘
</kw-btn>
`;

const grayLine = `
<kw-btn class="kw-btn--line-gray">
  추가
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--h40 ml8">
  추가
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--h36 ml8">
  추가
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--h32 ml8">
  추가
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--h24 ml8">
  추가
</kw-btn>
`;

const grayLineBg = `
<kw-btn class="kw-btn--line-gray kw-btn--line-bg">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h40 ml8">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h36 ml8">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 ml8">
  삭제
</kw-btn>
<kw-btn class="kw-btn--line-gray kw-btn--line-bg kw-btn--h24 ml8">
  삭제
</kw-btn>
`;

const contentsAddIcon = `
<kw-btn
  class="kw-btn--line-black kw-btn--h32"
  icon="plus_16|0 0 16 16"
>
  학습자 추가
</kw-btn>
<kw-btn
  class="kw-btn--line-black kw-btn--h32 ml8"
  icon="plus_16|0 0 16 16"
  disable
>
  학습자 추가
</kw-btn>
`;

const contentsDefault = `
<kw-btn class="kw-btn--contents">수정</kw-btn>
<kw-btn class="kw-btn--contents ml8" disable>수정</kw-btn>
`;

const more = `
<kw-btn
  class="kw-btn--more"
>
  더보기
</kw-btn>
`;

const moreExpand = `
<kw-btn
  class="kw-btn--more q-btn--append"
>
  더보기
</kw-btn>
`;

const toggle = `
<kw-toggle
  v-model="dummyData"
  label="text"
  :true-value="true"
  :false-value="false"
/>

const dummyData = ref(true); // select default value (true or false)
`;

</script>
