<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Color
    </h2>
    <p class="kw-guide-description">
      Ensure to add to the color name, if the color's name is existed in the table.<br>
      Please, Check out the color info below.<br>
      If the font color and background color are not defined, Add the class as below<br>
      font color : 'kw-fc--'<br>
      background : 'kw-bc--'<br>
      Add the color name of list after '--'
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        Color info
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              Name(css-value)
            </th>
            <th>
              Color info (HEX)
            </th>
            <th>
              Font color,Backgorund-color class name
            </th>
            <th>
              Color
            </th>
          </tr>
        </thead>
        <tbody class="color-system">
          <tr>
            <td>
              $primary
            </td>
            <td>
              #2f8af3
            </td>
            <td>
              kw-fc--primary<br>
              kw-bc--primary
            </td>
            <td>
              <div
                class="color-box primary"
              />
            </td>
          </tr>
          <tr>
            <td>
              $secondary
            </td>
            <td>
              #2f3c78
            </td>
            <td>
              kw-fc--secondary<br>
              kw-bc--secondary
            </td>
            <td>
              <div
                class="color-box secondary"
              />
            </td>
          </tr>
          <tr>
            <td>
              $info
            </td>
            <td>
              #6cbf67
            </td>
            <td>
              kw-fc--info<br>
              kw-bc--info
            </td>
            <td>
              <div
                class="color-box info"
              />
            </td>
          </tr>
          <tr>
            <td>
              $error
            </td>
            <td>
              #ed1941
            </td>
            <td>
              kw-fc--error<br>
              kw-bc--error
            </td>
            <td>
              <div
                class="color-box error"
              />
            </td>
          </tr>
          <tr>
            <td>
              $black1
            </td>
            <td>
              #222
            </td>
            <td>
              kw-fc--black1<br>
              kw-bc--black1
            </td>
            <td>
              <div
                class="color-box black1"
              />
            </td>
          </tr>
          <tr>
            <td>
              $black2
            </td>
            <td>
              #555
            </td>
            <td>
              kw-fc--black2<br>
              kw-bc--black2
            </td>
            <td>
              <div
                class="color-box black2"
              />
            </td>
          </tr>
          <tr>
            <td>
              $black3
            </td>
            <td>
              #777
            </td>
            <td>
              kw-fc--black3<br>
              kw-bc--black3
            </td>
            <td>
              <div
                class="color-box black3"
              />
            </td>
          </tr>
          <tr>
            <td>
              $black-btn-line
            </td>
            <td>
              #666
            </td>
            <td>
              kw-fc--black-btn-line<br>
              kw-bc--black-btn-line
            </td>
            <td>
              <div
                class="color-box black-btn-line"
              />
            </td>
          </tr>
          <tr>
            <td>
              $placeholder
            </td>
            <td>
              #999
            </td>
            <td>
              kw-fc--placeholder<br>
              kw-bc--placeholder
            </td>
            <td>
              <div
                class="color-box placeholder"
              />
            </td>
          </tr>
          <tr>
            <td>
              $line-stroke
            </td>
            <td>
              #ccc
            </td>
            <td>
              kw-fc--line-stroke<br>
              kw-bc--line-stroke
            </td>
            <td>
              <div
                class="color-box line-stroke"
              />
            </td>
          </tr>
          <tr>
            <td>
              $line-line
            </td>
            <td>
              #ddd
            </td>
            <td>
              kw-fc--line-line<br>
              kw-bc--line-line
            </td>
            <td>
              <div
                class="color-box line-line"
              />
            </td>
          </tr>
          <tr>
            <td>
              $line-bg
            </td>
            <td>
              #eee
            </td>
            <td>
              kw-fc--line-bg<br>
              kw-bc--line-bg
            </td>
            <td>
              <div
                class="color-box line-bg"
              />
            </td>
          </tr>
          <tr>
            <td>
              $bg-white
            </td>
            <td>
              #fff
            </td>
            <td>
              kw-fc--bg-white<br>
              kw-bc--bg-white
            </td>
            <td>
              <div
                class="color-box bg-white"
              />
            </td>
          </tr>
          <tr>
            <td>
              $bg-box
            </td>
            <td>
              #f5f5f5
            </td>
            <td>
              kw-fc--bg-box<br>
              kw-bc--bg-box
            </td>
            <td>
              <div
                class="color-box bg-box"
              />
            </td>
          </tr>
          <tr>
            <td>
              $bg-body
            </td>
            <td>
              #f3f4f5
            </td>
            <td>
              kw-fc--bg-body<br>
              kw-bc--bg-body
            </td>
            <td>
              <div
                class="color-box bg-body"
              />
            </td>
          </tr>
          <tr>
            <td>
              $accent
            </td>
            <td>
              #9c27b0
            </td>
            <td>
              kw-fc--accent<br>
              kw-bc--accent
            </td>
            <td>
              <div
                class="color-box accent"
              />
            </td>
          </tr>
          <tr>
            <td>
              $dark
            </td>
            <td>
              #1d1d1d
            </td>
            <td>
              kw-fc--dark<br>
              kw-bc--dark
            </td>
            <td>
              <div
                class="color-box dark"
              />
            </td>
          </tr>
          <tr>
            <td>
              $positive
            </td>
            <td>
              #21ba45
            </td>
            <td>
              kw-fc--positive<br>
              kw-bc--positive
            </td>
            <td>
              <div
                class="color-box positive"
              />
            </td>
          </tr>
          <tr>
            <td>
              $negative
            </td>
            <td>
              #c10015
            </td>
            <td>
              kw-fc--negative<br>
              kw-bc--negative
            </td>
            <td>
              <div
                class="color-box negative"
              />
            </td>
          </tr>
          <tr>
            <td>
              $warning
            </td>
            <td>
              #f2c037
            </td>
            <td>
              kw-fc--warning<br>
              kw-bc--warning
            </td>
            <td>
              <div
                class="color-box warning"
              />
            </td>
          </tr>
          <tr>
            <td>
              $bg-grid
            </td>
            <td>
              #f2c037
            </td>
            <td>
              kw-fc--bg-grid<br>
              kw-bc--bg-grid
            </td>
            <td>
              <div
                class="color-box bg-grid"
              />
            </td>
          </tr>
          <tr>
            <td>
              $bg-orange
            </td>
            <td>
              #ff8f1f
            </td>
            <td>
              kw-fc--bg-orange<br>
              kw-bc--bg-orange
            </td>
            <td>
              <div
                class="color-box bg-orange"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </kw-page>
</template>
<script setup>
const guideHistory = [
  {
    timestamp: '2022-09-16',
    text: 'change guide content',
  },
];
</script>
<style scoped lang="scss">
.color-system {
  .color-box {
    width: 30px;
    height: 20px;
    margin: 0 auto;

    &.primary {
      background: $primary;
    }

    &.secondary {
      background: $secondary;
    }

    &.info {
      background: $info;
    }

    &.error {
      background: $error;
    }

    &.black1 {
      background: $black1;
    }

    &.black2 {
      background: $black2;
    }

    &.black3 {
      background: $black3;
    }

    &.black-btn-line {
      background: $black-btn-line;
    }

    &.placeholder {
      background: $placeholder;
    }

    &.line-stroke {
      background: $line-stroke;
    }

    &.line-line {
      background: $line-line;
    }

    &.line-bg {
      background: $line-bg;
    }

    &.bg-white {
      background: $bg-white;
    }

    &.bg-box {
      background: $bg-box;
    }

    &.bg-body {
      background: $bg-body;
    }

    &.accent {
      background: $accent;
    }

    &.dark {
      background: $dark;
    }

    &.positive {
      background: $positive;
    }

    &.negative {
      background: $negative;
    }

    &.warning {
      background: $warning;
    }

    &.bg-grid {
      background: $bg-grid;
    }

    &.bg-orange {
      background: $bg-orange;
    }
  }
}
</style>
