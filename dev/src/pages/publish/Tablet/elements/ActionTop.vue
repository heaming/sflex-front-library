<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Tablet] Action Top
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
          <kw-action-top class="mt10">
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
            class="mt6"
          />

          <kw-action-top class="mt10">
            <template #left>
              <kw-paging-info
                :total-count="6"
              />
              <kw-separator
                spaced
                vertical
                inset
              />
              <span>합산청구</span>
              <span class="accent pl4">250,000원</span>
              <kw-separator
                spaced
                vertical
                inset
              />
              <span>신용카드</span>
              <span class="accent pl4">150,000원</span>
              <kw-separator
                spaced
                vertical
                inset
              />
              <span>가상계좌</span>
              <span class="accent pl4">150,000원</span>
              <kw-separator
                spaced
                vertical
                inset
              />
              <span>페이결제</span>
              <span class="accent pl4">0원</span>
            </template>
            <p class="kw-font-pt14 text-weight-regular w108 mr16">
              총 금액
            </p>
            <h3 class="kw-font-subtitle">
              94,000원
            </h3>
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

<kw-action-top>
  <template #left>
    <kw-paging-info
      :total-count="7"
    />
  </template>
</kw-action-top>
<kw-separator
  color="black1"
  spaced="0"
  class="mt6"
/>

<kw-action-top>
  <template #left>
    <kw-paging-info
      :total-count="6"
    />
    <kw-separator
      spaced
      vertical
      inset
    />
    <span>합산청구</span>
    <span class="accent pl4">250,000원</span>
    <kw-separator
      spaced
      vertical
      inset
    />
    <span>신용카드</span>
    <span class="accent pl4">150,000원</span>
    <kw-separator
      spaced
      vertical
      inset
    />
    <span>가상계좌</span>
    <span class="accent pl4">150,000원</span>
    <kw-separator
      spaced
      vertical
      inset
    />
    <span>페이결제</span>
    <span class="accent pl4">0원</span>
  </template>
  <p class="kw-font-pt14 text-weight-regular w108 mr16">
    총 금액
  </p>
  <h3 class="kw-font-subtitle">
    94,000원
  </h3>
</kw-action-top>
`;
const historyData = [
  {
    timestamp: '2023-02-27',
    text: 'add new Case',
  },
  {
    timestamp: '2023-01-31',
    text: 'First added',
  },
];
</script>
