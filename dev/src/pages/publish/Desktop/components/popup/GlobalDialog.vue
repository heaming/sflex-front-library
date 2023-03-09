<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      GlobalDialog
    </h2>
    <p class="kw-guide-description">
      It is in progress. Please wait for it to complete.
    </p>
    <div class="kw-guide-section">
      <div class="kw-guide-section">
        <h3
          id="props"
          class="kw-guide-title"
        >
          Props
        </h3>
      </div>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              props
            </th><th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              message
            </td>
            <td>
              기본으로 나오는 메세지
            </td>
          </tr>
          <tr>
            <td>
              (options) subMessage
            </td>
            <td>
              하위에 서브로 나오는 메세지
            </td>
          </tr>
          <tr>
            <td>
              (options) icon
            </td>
            <td>
              상단 icon 명
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
        Sample
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            label="기본 alert"
            @click="sample1"
          />
          <kw-btn
            label="서브메세지"
            @click="sample2"
          />
          <kw-btn
            label="with Icon"
            @click="sample3"
          />
          <kw-btn
            label="confirm"
            @click="sample4"
          />
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
import { alert, confirm } from '~kw-lib';

async function sample1() {
  alert('기본메세지');
}
async function sample2() {
  alert('기본메세지', { subMessage: '서브메세지' });
}
async function sample3() {
  alert('아이콘 나오는 ALERT', { subMessage: 'icon은 warning_24 넣음', icon: 'warning_24' });
}

async function sample4() {
  confirm('아이콘 나오는 ALERT', { subMessage: 'icon은 warning_24 넣음', icon: 'warning_24' });
}

const testCode = `
import { alert } from '~kw-lib';

async function sample1() {
  alert('기본메세지');
}
async function sample2() {
  alert('기본메세지', { subMessage: '서브메세지' });
}
async function sample3() {
  alert('아이콘 나오는 ALERT', { subMessage: 'icon은 warning_24 넣음', icon: 'warning_24' });
}
`;
</script>
