<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Action Bottom
    </h2>
    <p class="kw-guide-description">
      Table Action bottom.<br>
      <b>All button are located in right-side(updated)</b> <br>
      'kw-action-bottom' uses flex css style.<b class="accent"> '&lt;template #left&gt;'</b> and
      is left-aligned, the rest are right-aligned.
    </p>
    <guide-history-view
      :items="guideHistory"
    />
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
              Tag
            </th>
            <th>
              Class(attribue)
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-action-bottom
            </td>
            <td>
              <!-- "kw-action--top" -->
            </td>
            <td>
              wrap by kw-action-bottom tag
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
        Notice
      </h3>
      <ul>
        <li>The tag name is changed to seperate area grid top and bottom</li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Case 01
      </h3>
      <p class="kw-guide-description notice">
        default style
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-bottom>
            <kw-btn
              label="수정"
              grid-action
            />
            <kw-btn
              label="삭제"
              grid-action
            />
            <kw-separator
              vertical
              inset
              spaced
            />
            <kw-btn
              label="링크"
              grid-action
            />
            <kw-separator
              vertical
              inset
              spaced
            />
            <kw-btn
              label="팝업"
              grid-action
            />
            <kw-separator
              vertical
              inset
              spaced
            />
            <kw-btn
              label="부기능"
              grid-action
            />
            <kw-btn
              label="부기능"
              grid-action
            />
            <kw-btn
              label="부기능"
              grid-action
            />
            <kw-btn
              label="부기능"
              grid-action
            />
          </kw-action-bottom>
        </div>
        <guide-code-view
          :code-value="testCode"
          :lang="'vue'"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Case 02
      </h3>
      <p class="kw-guide-description notice">
        This is sample case 2
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-action-bottom>
            <kw-btn
              label="링크"
              grid-action
            />
            <kw-separator
              vertical
              inset
              spaced
            />
            <kw-btn
              label="팝업"
              grid-action
            />
            <kw-separator
              vertical
              inset
              spaced
            />
            <kw-btn
              label="부기능"
              grid-action
            />
            <kw-btn
              label="부기능"
              grid-action
            />
            <kw-btn
              label="부기능"
              grid-action
            />
            <kw-btn
              label="부기능"
              grid-action
            />
          </kw-action-bottom>
        </div>
        <guide-code-view
          :code-value="testCode2"
          :lang="'vue'"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const testCode = `
<kw-action-bottom>
  <kw-btn
    label="수정"
    grid-action
  />
  <kw-btn
    label="삭제"
    grid-action
  />
  <kw-separator
    vertical
    inset
    spaced
  />
  <kw-btn
    label="링크"
    grid-action
  />
  <kw-separator
    vertical
    inset
    spaced
  />
  <kw-btn
    label="팝업"
    grid-action
  />
  <kw-separator
    vertical
    inset
    spaced
  />
  <kw-btn
    label="부기능"
    grid-action
  />
  <kw-btn
    label="부기능"
    grid-action
  />
  <kw-btn
    label="부기능"
    grid-action
  />
  <kw-btn
    label="부기능"
    grid-action
  />
</kw-action-bottom>
`;

const testCode2 = `
<kw-action-bottom>
  <kw-btn
    label="링크"
    grid-action
  />
  <kw-separator
    vertical
    inset
    spaced
  />
  <kw-btn
    label="팝업"
    grid-action
  />
  <kw-separator
    vertical
    inset
    spaced
  />
  <kw-btn
    label="부기능"
    grid-action
  />
  <kw-btn
    label="부기능"
    grid-action
  />
  <kw-btn
    label="부기능"
    grid-action
  />
  <kw-btn
    label="부기능"
    grid-action
  />
</kw-action-bottom>
`;
const guideHistory = [
  {
    timestamp: '2022.09.26',
    text: 'add new guide',
  },
];
</script>
