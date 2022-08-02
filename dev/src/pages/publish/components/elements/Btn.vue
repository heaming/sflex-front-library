<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Btn
    </h2>
    <p class="kw-guide-description">
      button set
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
              the Element(tag's name)
            </th>
            <th>
              attribute(class)
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-form-item (sample)
            </td>
            <td>
              essential - class (sample)
            </td>
            <td>
              add the class "essential" in the tag of kw-form-item. (sample)
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
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryPositive"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn class="kw-btn--negative">
            취소
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryNegative"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn disable>
            확인
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryDisable"
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
        id="popupBottomButton"
        class="kw-guide-title"
      >
        popup bottom button
      </h3>
      <p class="kw-guide-description">
        button height 36px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn class="kw-btn--popup">
            확인
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryPopupPositive"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn class="kw-btn--popup kw-btn--negative">
            취소
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryPopupNegative"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--popup"
            disable
          >
            확인
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryPopupDisable"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn class="kw-btn--popup kw-btn--reset">
            초기화
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="primaryPopupReset"
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
        id="secondary"
        class="kw-guide-title"
      >
        Secondary
      </h3>
      <p class="kw-guide-description">
        button height 40px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn class="kw-btn--secondaray">
            신규등록
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="secondaryDefault"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--secondaray"
            disable
          >
            신규등록
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="secondaryDisable"
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
          <kw-btn class="kw-btn--contents kw-btn--add">
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
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--contents kw-btn--add"
            disable
          >
            학습자 추가
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="contentsAddIconDisable"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--contents"
            disable
          >
            수정
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="contentsDisable"
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
        id="step-cta"
        class="kw-guide-title"
      >
        Step_CTA
      </h3>
      <p class="kw-guide-description">
        button height 42px
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn class="kw-btn--step">
            이전
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="stepDefault"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--step"
            disable
          >
            이전
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="stepDisable"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--step"
          >
            임시저장
          </kw-btn>
          <kw-btn
            class="kw-btn--step kw-btn--primary"
          >
            다음
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="stepTwoBtn"
            :lang="vue"
            theme="light"
            width="100%"
            height="auto"
          />
        </div>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--step"
            disable
          >
            임시저장
          </kw-btn>
          <kw-btn
            class="kw-btn--step kw-btn--primary"
            disable
          >
            다음
          </kw-btn>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="stepTwoBtnDisable"
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

const primaryPositive = `
<kw-btn>프로모션등록</kw-btn>
`;

const primaryNegative = `
<kw-btn class="kw-btn--negative">취소</kw-btn>
`;

const primaryDisable = `
<kw-btn disable>확인</kw-btn>
`;

const primaryPopupPositive = `
<kw-btn class="kw-btn--popup">확인</kw-btn>
`;

const primaryPopupNegative = `
<kw-btn class="kw-btn--popup kw-btn--negative">취소</kw-btn>
`;

const primaryPopupDisable = `
<kw-btn class="kw-btn--popup" disable>확인</kw-btn>
`;

const primaryPopupReset = `
<kw-btn class="kw-btn--popup kw-btn--reset">초기화</kw-btn>
`;

const secondaryDefault = `
<kw-btn class="kw-btn--secondary">프로모션등록</kw-btn>
`;

const secondaryDisable = `
<kw-btn class="kw-btn--secondary" disable>프로모션등록</kw-btn>
`;

const contentsAddIcon = `
<kw-btn class="kw-btn--contents kw-btn--add">학습자 추가</kw-btn>
`;

const contentsDefault = `
<kw-btn class="kw-btn--contents">수정</kw-btn>
`;

const contentsAddIconDisable = `
<kw-btn class="kw-btn--contents kw-btn--add" disable>학습자 추가</kw-btn>
`;

const contentsDisable = `
<kw-btn class="kw-btn--contents" disable>수정</kw-btn>
`;

const stepDefault = `
<kw-btn class="kw-btn--step">이전</kw-btn>
`;

const stepDisable = `
<kw-btn class="kw-btn--step" disable>이전</kw-btn>
`;

const stepTwoBtn = `
<kw-btn
  class="kw-btn--step"
>
  임시저장
</kw-btn>
<kw-btn
  class="kw-btn--step kw-btn--primary"
>
  다음
</kw-btn>
`;

const stepTwoBtnDisable = `
<kw-btn
  class="kw-btn--step"
  disable
>
  임시저장
</kw-btn>
<kw-btn
  class="kw-btn--step kw-btn--primary"
  disable
>
  다음
</kw-btn>
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
