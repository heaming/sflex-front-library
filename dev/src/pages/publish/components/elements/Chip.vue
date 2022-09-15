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
              icon="iconName" <br>
              class="kw-chip--icon-only"
            </td>
            <td>
              <br>
              add text from zeplin <br>
              primary: #2f8af3 ,placeholder: #999, transparent: use icon-only type <br>
              add this when existed border(ex: text type chip) <br>
              add icon file name in assets file(refer iconButton guide) <br>
              add this when icon only type
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <h3
        id="default"
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>
          If you need another icon image chip,
          please refer to 'how to make icon button' inn iconButton page and add icon svg file.
        </li>
        <li>
          If you need tooltip type chip, add 'kw-tooltip' tag inside kw-chip like as last example
        </li>
      </ul>
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
            label="결제중"
            color="primary"
            outline
            class="ma2"
          />
          <kw-icon
            name="info_24"
          >
            <kw-tooltip>if you need tooltip type chip,<br> please add this element and content</kw-tooltip>
          </kw-icon>
          <kw-icon
            name="warning_16"
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
  label="결제중"
  color="primary"
  outline
  class="ma2"
/>
<kw-chip
  icon="info_24"
  color="transparent"
  class="kw-chip--icon-only ma2"
>
  <kw-tooltip>if you need tooltip type chip,<br> please add this element and content</kw-tooltip>
</kw-chip>
<kw-chip
  icon="warning_16"
  color="transparent"
  class="kw-chip--icon-only ma2"
/>
`;

const guideHistory = [
  {
    timestamp: '2022-09-02',
    text: 'add chip example',
  },
];
</script>
