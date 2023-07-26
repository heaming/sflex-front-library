<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Chip
    </h2>
    <p class="kw-guide-description">
      default - height: 19px , outlined style
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
              kw-chip
            </td>
            <td>
              tag name of chip component <br>
              label='text' <br>
              color="colorName" <br>
              outline <br>
              square <br>
              text-color <br>
              icon(left-side)/icon-right(right-side)
            </td>
            <td>
              <br>
              add text from zeplin <br>
              primary: #2f8af3 ,placeholder: #999, transparent: use icon-only type <br>
              add this when existed border <br>
              add this when squared type <br>
              add text-color <br>
              add icon file name in assets file(refer icon guide)
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
        Default
      </h3>
      <p class="kw-guide-description">
        description
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-chip
            label="결제완료"
            color="primary"
            outline
            class="ma2"
          />
          <kw-chip
            label="임시저장"
            color="placeholder"
            outline
            class="ma2"
          />
          <kw-chip
            label="엔지니어"
            square
            color="primary"
            text-color="primary"
            class="ma2"
          />
          <kw-chip
            icon-right="arrow_right"
            label="엔지니어"
            color="bg-body"
            square
            text-color="primary"
            class="ma2"
          />
          <kw-chip
            label="가구대표"
            color="bg-orange"
            square
            text-color="bg-orange"
            class="ma2"
          />
          <kw-chip
            label="고객"
            color="bg-green"
            square
            text-color="text-green"
            class="ma2"
          />
          <kw-chip
            label="파트너"
            color="bg-blue"
            square
            text-color="text-blue"
            class="ma2"
          />
          <kw-chip
            label="마일리지"
            color="bg-grey-opacity"
            square
            text-color="black-btn-line"
            class="ma2"
          />
        </div>
        <guide-code-view
          :code-value="chipCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const chipCode = `
<!-- Please remove margin helper class(ex:ma2) THX:) -->
<kw-chip
  label="결제완료"
  color="primary"
  outline
  class="ma2"
/>
<kw-chip
  label="임시저장"
  color="placeholder"
  outline
  class="ma2"
/>
<kw-chip
  label="엔지니어"
  square
  color="primary"
  text-color="primary"
  class="ma2"
/>
<kw-chip
  icon-right="arrow_right"
  label="엔지니어"
  color="bg-body"
  square
  text-color="primary"
  class="ma2"
/>
<kw-chip
  label="가구대표"
  color="bg-orange"
  square
  text-color="bg-orange"
  class="ma2"
/>

<!-- bg-blue: #73c4fa text-blue: #54bbff -->

<kw-chip
  label="고객"
  color="bg-green"
  text-color="text-green"
  square
  class="ma2"
/>

<!-- bg-green: #26bf8c10 text-green: #26bf8c -->
<kw-chip
  label="파트너"
  color="bg-blue"
  text-color="text-blue"
  square
  class="ma2"
/>
<!-- bg-grey-opacity #cccccc20 -->
<kw-chip
  label="마일리지"
  color="bg-grey-opacity"
  text-color="black-btn-line"
  square
  class="ma2"
/>
`;
const guideHistory = [
  {
    timestamp: '2023-01-27',
    text: 'Add new type chip',
  },
  {
    timestamp: '2022-10-18',
    text: 'Add new type chip and updated guide',
  },
  {
    timestamp: '2022-09-15',
    text: 'Tooltip icon move to Tooltip Page',
  },
  {
    timestamp: '2022-09-02',
    text: 'add chip example',
  },
];
</script>
