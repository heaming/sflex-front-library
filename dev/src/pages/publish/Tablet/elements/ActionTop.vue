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
`;
const historyData = [
  {
    timestamp: '2023-01-31',
    text: 'First added',
  },
];
</script>
