<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Action Bar
    </h2>
    <p class="kw-guide-description">
      description
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
        description
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-bar>
            <template #left>
              <div class="kw-action-bar--count kw-action-bar--separator">
                총 <span class="kw-action-bar--number">156</span>
              </div>
              <div
                class="kw-action-bar-menu"
                :class="{'kw-action-bar-menu--append': selectMenu === true }"
              >
                <span class="kw-action-bar-menu--value">{{ selectData.model }}</span><span>개씩보기</span>
                <q-menu
                  v-model="selectMenu"
                >
                  <q-list>
                    <q-item
                      v-for="i in selectData.items"
                      :key="i"
                      v-close-popup
                      clickable
                      @click="selectData.model=i"
                    >
                      <q-item-section>{{ i }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
              <div class="kw-action-bar--send">
                <kw-btn
                  class="kw-btn kw-btn--search"
                >
                  URL 전송
                </kw-btn>
                <p class="kw-action-bar--description">
                  고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
                </p>
              </div>
            </template>

            <kw-btn

              class="kw-btn--excel kw-action-bar--separator"
              label="엑셀 다운로드"
            />
            <kw-btn label="개인 고객 등록 URL 전송" />
            <kw-btn label="개인 고객 등록" />
            <kw-btn label="법인 고객 등록" />
          </kw-action-bar>
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

const selectMenu = ref(false);

const selectData = {
  model: '10',
  items: [
    '10', '20', '30', '40',
  ],
  itemArr: [...Array(10)].map((v, i) => i),
};

const testCode = `
<kw-action-bar>
  <template #left>
    <div class="kw-action-bar--count kw-action-bar--separator">
      총 <span class="kw-action-bar--number">156</span>
    </div>
    <kw-select
      v-model="model"
      :options="options"
      :display-value="model + '개씩보기'"
      name="select"
      rules="required"
    />

    <div class="kw-action-bar--send">
      <kw-btn
        class="kw-btn kw-btn--search"
      >
        URL 전송
      </kw-btn>
      <p class="kw-action-bar--description">
        고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
      </p>
    </div>
  </template>

  <kw-btn

    class="kw-btn--excel kw-action-bar--separator"
    label="엑셀 다운로드"
  />
  <kw-btn label="개인 고객 등록 URL 전송" />
  <kw-btn label="개인 고객 등록" />
  <kw-btn label="법인 고객 등록" />
</kw-action-bar>
`;
</script>
