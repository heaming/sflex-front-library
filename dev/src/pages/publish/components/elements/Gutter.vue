<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      gutter
    </h2>
    <p class="kw-guide-description">
      gutter는 레이아웃 상 각 컴퍼넌트간의 마진과 내부 패딩을 쉽게 정의하기 위해 사용한다. 클래스 형태로 제공된다.<br>10px, 20px, 30px ... 500px
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
              Prefix
            </th>
            <th>
              padding/margin
            </th>
            <th>
              position
            </th>
            <th>
              pixel
            </th>
            <th>
              class sample
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-
            </td>
            <td>
              [ p | m ]
            </td>
            <td>
              [ t | r | b | l | a | x | y ]-
            </td>
            <td>
              [ 1 | 2 | ... | 50 ]
            </td>
            <td>
              kw-mr-3, kw-pa-2
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="example"
        class="kw-guide-title"
      >
        example
      </h3>
      <p class="kw-guide-description">
        kw-mr-3
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="gutter-exam-el kw-mr-3">
            <div class="kw-pa-2">
              200px * 100px
            </div>
          </div>
          <div class="gutter-exam-el">
            <div class="kw-pa-2">
              200px * 100px
            </div>
          </div>
        </div>
        <div class="kw-guide-code">
          <HighCode
            :code-value="testCode"
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

const testCode = `
<div class="kw-guide-example">
  <div class="gutter-exam-el kw-mr-3">
    <div class="kw-pa-2">
      200px * 100px
    </div>
  </div>
  <div class="gutter-exam-el">
    <div class="kw-pa-2">
      200px * 100px
    </div>
  </div>
</div>
`;
</script>
