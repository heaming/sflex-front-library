<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Avatar
    </h2>
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        summary
      </h3>
      <p class="kw-guide-description">
        please refer to <router-link to="/Publish/Common/Color">
          'Color'
        </router-link> library page for using color name
      </p>
      <q-markup-table class="kw-guide-table mt15">
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
              kw-avatar
            </td>
            <td>
              size="" <br>
              font-size="" <br>
              text-color <br>
              color <br>
              icon <br>
              square <br>
              rounded
            </td>
            <td>
              control avatar size <br>
              control font-size for inner icon <br>
              control icon color <br>
              control background-color <br>
              add icon name <br>
              add when need square shaped <br>
              border-radius=4px shaped
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
        default shape is round
      </p>
      <q-card>
        <div
          class="kw-guide-example"
          style="display: flex;column-gap: 5px;"
        >
          <kw-avatar
            size="48px"
            font-size="30px"
            color="line-bg"
            text-color="primary"
            icon="check_24"
          />
          <kw-avatar
            size="48px"
          >
            <img
              src="~~dev/assets/images/test_image.png"
              alt="test"
            >
          </kw-avatar>
          <kw-avatar
            size="48px"
            font-size="28px"
            color="line-bg"
            text-color="error"
          >
            A
          </kw-avatar>
        </div>
        <guide-code-view
          :code-value="defaultCase"
          :lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Square"
        class="kw-guide-title"
      >
        Square
      </h3>
      <p class="kw-guide-description">
        Square shape
      </p>
      <q-card>
        <div
          class="kw-guide-example"
          style="display: flex;column-gap: 5px;"
        >
          <kw-avatar
            size="48px"
            font-size="30px"
            color="line-bg"
            text-color="primary"
            icon="check_24"
            square
          />
          <kw-avatar
            size="48px"
            square
          >
            <img
              src="~~dev/assets/images/test_image.png"
              alt="test"
            >
          </kw-avatar>
          <kw-avatar
            size="48px"
            font-size="28px"
            color="line-bg"
            text-color="error"
            square
          >
            A
          </kw-avatar>
        </div>
        <guide-code-view
          :code-value="defaultCase"
          :lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="Rounded"
        class="kw-guide-title"
      >
        Rounded
      </h3>
      <p class="kw-guide-description">
        rounded shape( border-radius="4px")
      </p>
      <q-card>
        <div
          class="kw-guide-example"
          style="display: flex;column-gap: 5px;"
        >
          <kw-avatar
            size="48px"
            font-size="30px"
            color="line-bg"
            text-color="primary"
            icon="check_24"
            rounded
          />
          <kw-avatar
            size="48px"
            rounded
          >
            <img
              src="~~dev/assets/images/test_image.png"
              alt="test"
            >
          </kw-avatar>
          <kw-avatar
            size="48px"
            font-size="28px"
            color="line-bg"
            text-color="error"
            rounded
          >
            A
          </kw-avatar>
        </div>
        <guide-code-view
          :code-value="defaultCase"
          :lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const defaultCase = `
<kw-avatar
  size="48px"
  font-size="30px"
  color="line-bg"
  text-color="primary"
  icon="check_24"
/>
<kw-avatar
  size="48px"
>
  <img
    src="~~dev/assets/images/test_image.png"
    alt="test"
  >
</kw-avatar>
<kw-avatar
  size="48px"
  font-size="28px"
  color="line-bg"
  text-color="error"
>
  A
</kw-avatar>
`;
</script>

<style lang="scss" >
</style>
