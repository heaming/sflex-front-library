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

          <kw-action-top class="mt10">
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

          <kw-action-top class="mt10">
            <template #left>
              <kw-paging-info
                :total-count="7"
              />
            </template>
          </kw-action-top>
          <kw-separator
            color="black1"
            spaced="0"
            class="mt12"
          />
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

          <kw-action-top class="mt10">
            <template #left>
              <h3>작업정보</h3>
            </template>
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              label="사진"
            />
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              class="ml4"
              label="고객서명"
            />
          </kw-action-top>
        </div>
        <guide-code-view
          :code-value="case2"
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
        use helper class of margin for it between the space.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-top>
            <template #left>
              <span>총주행</span>
              <span class="accent pl4">7</span>
              <span class="pl12">업무용</span>
              <span class="accent pl4">1734</span>
              <span class="pl12">비율</span>
              <span class="accent pl4">100%</span>
            </template>
            <kw-btn
              secondary
              dense
              border-color="line-stroke"
              label="편집"
            />
          </kw-action-top>

          <kw-action-top class="mt10">
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

          <kw-action-top class="mt10">
            <template #left>
              <span>전체</span>
              <span class="accent pl4">268</span>
              <span class="pl8">완료</span>
              <span class="accent pl4">150</span>
              <span class="pl8">미완료</span>
              <span class="accent pl4">118</span>
              <span class="pl8">취소</span>
              <span class="accent pl4">0</span>
            </template>
            <span class="accent kw-font-pt14">55.97%</span>
          </kw-action-top>

          <kw-action-top class="mt10">
            <template #left>
              <span class="kw-fc--black1">08-09</span>
              <span class="kw-fc--black1 ml4">오늘</span>
              <kw-btn
                icon="sorti"
                dense
                borderless
                class="ml4 h20"
              />
            </template>
          </kw-action-top>
        </div>
        <guide-code-view
          :code-value="case3"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const case1 = `
<kw-action-top>
  <template #left>
    <kw-paging-info
      :total-count="7"
    />
  </template>
</kw-action-top>

<kw-action-top>
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
<kw-action-top class="mt10">
  <template #left>
    <kw-paging-info
      :total-count="7"
    />
  </template>
</kw-action-top>
<kw-separator
  color="black1"
  spaced="0"
  class="mt12"
/>
`;
const case2 = `
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
  />
  <kw-btn
    secondary
    dense
    border-color="line-stroke"
    class="ml4"
    label="고객서명"
  />
</kw-action-top>
`;
const case3 = `
<kw-action-top>
  <template #left>
    <span>총주행</span>
    <span class="accent pl4">7</span>
    <span class="pl12">업무용</span>
    <span class="accent pl4">1734</span>
    <span class="pl12">비율</span>
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

<kw-action-top>
  <template #left>
    <span>전체</span>
    <span class="accent pl4">268</span>
    <span class="pl8">완료</span>
    <span class="accent pl4">150</span>
    <span class="pl8">미완료</span>
    <span class="accent pl4">118</span>
    <span class="pl8">취소</span>
    <span class="accent pl4">0</span>
  </template>
  <span class="accent kw-font-pt14">55.97%</span>
</kw-action-top>

<kw-action-top>
  <template #left>
    <span class="kw-fc--black1">08-09</span>
    <span class="kw-fc--black1 ml4">오늘</span>
    <kw-btn
      icon="sorti"
      dense
      borderless
      class="ml4 h20"
    />
  </template>
</kw-action-top>
`;
const historyData = [
  {
    timestamp: '2023-1-09',
    text: 'First added',
  },
];
</script>
