<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [MOBILE] Expansion
    </h2>
    <guide-history-view :items="historyData" />
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
        case2
      </h3>

      <p class="kw-guide-description">
        kw-list > kw-expansion-item<br>
        Use the helper class for kw-expansion-item and text<br>
        <a href="https://zpl.io/noN35EA">Zeplin design</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-list>
            <kw-expansion-item>
              <template #header>
                <div class="col">
                  <div class="row justify-between">
                    <p
                      class="kw-font-pt16 kw-fc--black1"
                    >
                      현금 입금 (총 3건)
                    </p>
                    <div class="kw-font-body kw-fc--black1 mr8">
                      220,000원
                    </div>
                  </div>
                </div>
              </template>
              <div class="py16 px20">
                <kw-form :cols="3">
                  <kw-form-row>
                    <kw-form-item label="상품정보">
                      <p>비데(BK750RWA)</p>
                    </kw-form-item>
                    <kw-form-item label="상품정보">
                      <p>비데(BK750RWA)</p>
                    </kw-form-item>
                    <kw-form-item label="상품정보">
                      <p>비데(BK750RWA)</p>
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </div>
            </kw-expansion-item>
          </kw-list>
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
  <kw-expansion-item>
    <template #header>
      <div class="col">
        <div class="row justify-between">
          <p class="kw-font-pt14 kw-fc--black3">
            현금 입금 (총 3건)
          </p>
          <div class="kw-font-pt16 kw-fc--black1 mr8">
            220,000원
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
  <kw-expansion-item>
    <template #header>
      <div class="col">
        <div class="row justify-between">
          <p class="kw-font-pt14 kw-fc--black3">
            카드 입금 (총 5건)
          </p>
          <div class="kw-font-pt16 kw-fc--black1 mr8">
            120,000원
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
</kw-list>
`;

const historyData = [
  {
    timestamp: '2022-11-24',
    text: 'First added',
  },
];
</script>
