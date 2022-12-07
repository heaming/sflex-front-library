<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Action top
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
              kw-action-top
            </td>
            <td>
              kw-paging-info<br>
              accent
            </td>
            <td>
              총 ""건<br>
              wrap by span tag and add the class "accent" in span<br>
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
        case1- kw-paging-info in kw-action-top
      </h3>

      <p class="kw-guide-description">
        Make sure to use kw-paging-info,This is same way compare to Desktop<br>
        And Adding kw-btn on right side, Exclude from template #left.<br>
        <a href="https://zpl.io/AmdRNpo">Here is the reference pagem :kw-paiging-info</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-top>
            <template #left>
              <kw-paging-info
                :total-count="7"
              />
            </template>
          </kw-action-top>

          <kw-action-top>
            <template #left>
              <kw-paging-info
                :total-count="7"
              />
            </template>
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              label="조회"
            />
          </kw-action-top>
        </div>
        <guide-code-view
          :code-value="case1"
          lang="vue"
        />
      </q-card>
    </div>

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        case2- header and Button
      </h3>

      <p class="kw-guide-description">
        Add h3 in template # left <br>
        And Adding kw-btn on right side, Exclude from template #left<br>
        <a href="https://zpl.io/Q0OkyDR"> Here is the link for reference - leftside : h3 , rightside: btn</a><br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-top>
            <template #left>
              <kw-paging-info
                :total-count="7"
              />
            </template>
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              label="조회"
            />
          </kw-action-top>

          <kw-action-top>
            <template #left>
              <h3>작업정보</h3>
            </template>
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              label="사진"
              class="w70"
            />
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              class="w70"
              label="고객서명"
            />
          </kw-action-top>
        </div>
        <guide-code-view
          :code-value="case1"
          lang="vue"
        />
      </q-card>
    </div>

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Etc
      </h3>

      <p class="kw-guide-description">
        Make sure to add helper class of pl12 on left side between text and number<br>
        Make sure to add helper class of pl14 on right side between text and number<br>
        <a href="https://zpl.io/Md8YWvR"> Here is the link for reference - leftside: span  rightside: btn</a><br>
        <a href="https://zpl.io/vMqwj5J"> Here is the link for reference - leftside: p rightside: span</a><br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-top>
            <template #left>
              <span>총주행</span>
              <span class="accent pl4">7</span>
              <span class=" pl12">업무용</span>
              <span class="accent pl4">1734</span>
              <span class=" pl12">비율</span>
              <span class="accent pl4">100%</span>
            </template>
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              label="편집"
            />
          </kw-action-top>
          <kw-action-top>
            <template #left>
              <p>가구화코드 202266791613</p>
            </template>
            <span>전체</span>
            <span class="accent pl4">3</span>
            <span class="pl8">완료</span>
            <span class="accent pl4">1</span>
            <span class="pl8">미완료</span>
            <span class="accent pl4">1</span>
          </kw-action-top>
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
    timestamp: '2022-12-08',
    text: 'First added',
  },
];
</script>
