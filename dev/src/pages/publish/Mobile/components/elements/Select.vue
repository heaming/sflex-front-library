<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Select
    </h2>
    <guide-history-view :items="historyData" />
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
              the Element(tag's name)
            </th>
            <th>
              Attr or Class
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-expansion-item
            </td>
            <td>
              label="" <br>
            </td>
            <td>
              The title for Expansion-item
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
        case1
      </h3>

      <p class="kw-guide-description">
        selectBox
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-field-wrap
            label="two"
            control-class="selectbox"
          >
            <kw-select
              v-model="selectModel"
              label="fit"
              class="fit"
              :options="optionsModel"
              borderless
              :error="true"
            />
            <kw-separator
              vertical
              spaced
              inset
              class="my14"
            />
            <kw-select
              v-model="selectModel2"
              borderless
              class="fit"
              :options="optionsModel2"
              stretch
            />
          </kw-field-wrap>

          <kw-field-wrap
            label="two"
            control-class="selectbox"
          >
            <kw-select
              v-model="selectModel"
              label="fit"
              class="fit"
              :options="optionsModel"
              borderless
              :error="true"
            />
            <kw-separator
              vertical
              spaced
              inset
              class="my14"
            />
            <kw-select
              v-model="selectModel2"
              borderless
              class="fit"
              :options="optionsModel2"
              stretch
            />
            <kw-separator
              vertical
              spaced
              inset
              class="my14"
            />
            <kw-select
              v-model="selectModel2"
              borderless
              class="fit"
              :options="optionsModel2"
              stretch
            />
          </kw-field-wrap>

          <kw-field-wrap
            label="three"
            control-class="selectbox"
          >
            <div class="col">
              <div class="row no-wrap">
                <kw-select
                  v-model="selectModel"
                  label="fit"
                  class="fit"
                  :options="optionsModel"
                  borderless
                  :error="true"
                />
                <kw-separator
                  vertical
                  spaced
                  inset
                  class="my14"
                />
                <kw-select
                  v-model="selectModel2"
                  borderless
                  class="fit"
                  :options="optionsModel2"
                  stretch
                />
              </div>
              <kw-select
                v-model="selectModel2"
                borderless
                class="fit"
                :options="optionsModel2"
                stretch
              />
            </div>
          </kw-field-wrap>
        </div>
        <guide-code-view
          :code-value="case1"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const case1 = `
<kw-list>
  <kw-item>
    <div class="kw-font-body text-weight-bold mt15">
      곽재원(21164) | 성수지점
    </div>
    <kw-expansion-item>
      <template #header>
        <div class="col">
          <div class="row justify-between">
            <p class="kw-font-pt14 kw-fc--black3">
              결재총액
            </p>
            <div class="kw-font-pt16 kw-fc--black1 mr8">
              30,000 원
            </div>
          </div>
        </div>
      </template>
      <div class="py16 px20">
        <ul class="card-text card-text--between">
          <li>
            <p>상품정보</p>
            <span>
              비데(BK750RWA)
            </span>
          </li>
          <li>
            <p>서비스정보</p>
            <span>고객 과실</span>
          </li>
        </ul>
      </div>
    </kw-expansion-item>
  </kw-item>
  <kw-item>
    <div class="kw-font-body text-weight-bold mt15">
      곽재원(21164) | 성수지점
    </div>
    <kw-expansion-item>
      <template #header>
        <div class="col">
          <div class="row justify-between">
            <p class="kw-font-pt14 kw-fc--black3">
              결재총액
            </p>
            <div class="kw-font-pt16 kw-fc--black1 mr8">
              30,000 원
            </div>
          </div>
        </div>
      </template>
      <div class="py16 px20">
        <ul class="card-text card-text--between">
          <li>
            <p>상품정보</p>
            <span>
              비데(BK750RWA)
            </span>
          </li>
          <li>
            <p>서비스정보</p>
            <span>고객 과실</span>
          </li>
        </ul>
      </div>
    </kw-expansion-item>
  </kw-item>
</kw-list>
`;

const historyData = [
  {
    timestamp: '2022-12-05',
    text: 'First added',
  },
];

const selectModel = ref('');
const selectModel2 = ref('');
const optionsModel = ['a', 'bghggS'];
const optionsModel2 = ['a', 'bghggS'];
</script>
