<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      gutter
    </h2>
    <p class="kw-guide-description">
      Gutter is used to easily define the 'margin' and 'padding' between each component.
      <br>It is provided in the form of a 'class'.10px, 20px, 30px ... 500px
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
        kw-mr-3(margin-right:30px), kw-pa-2(padding:20px)
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
