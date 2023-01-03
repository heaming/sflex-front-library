<template>
  <kw-page
    class="kw-guide"
    no-header
  >
    <h2 class="kw-guide-h2">
      [Mobile] Page Header
    </h2>
    <p class="kw-guide-description">
      Use this component if you need headers when composing your page.
      <!-- <router-link>sample page</router-link> -->
    </p>
    <guide-history-view
      :items="guideHistory"
    />
    <div class="kw-guide-section">
      <h3
        id="notice"
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul style="margin: 0; padding-left: 25px;">
        <li>
          This is for QA of publishing, so some function can be not provided. <br>
        </li>
        <li>
          Thus, For pages that cannot be implemented with the sample provided below,
          please use the default case and modify only the title
        </li>
      </ul>
    </div>
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
              Attribute or slot
            </th>
            <th>Values</th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              title <br>
              left-btn<br>
              show-close <br>
              hint or template#hint <br>
              template#more
            </td>
            <td>
              title text <br>
              'back': back icon , 'menu': menu icon<br>
              <br>
              hint text<br>
              <br>
            </td>
            <td>
              please insert title text
              <br>No icon is default type
              <br>Add this when you need close button like as popup page
              <br>Add this when you need hint icon in right-side
              <br>Add this when you need more icon in right-side with dropdown menu
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
      <q-card>
        <div class="kw-guide-example">
          <kw-page-mobile-header
            title="Default"
            left-btn="menu"
            hint="text"
          >
            <!-- you can also put tooltip text in template#hint instead of adding prop -->
            <!-- <template #hint>
              hint text
            </template> -->
            <!-- // you can also put tooltip text in template#hint instead of adding prop -->

            <!-- more dropdown menu -->
            <template #more>
              <kw-btn label="menu1" />
              <kw-btn label="menu2" />
              <kw-btn label="menu3" />
            </template>
          <!--// more dropdown menu -->
          </kw-page-mobile-header>
        </div>
        <guide-code-view
          :code-value="defaultCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="close"
        class="kw-guide-title"
      >
        close + no left-side icon
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-page-mobile-header
            title="title"
            show-close
          />
        </div>
        <guide-code-view
          :code-value="closeCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        back Button
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-page-mobile-header
            title="title"
            left-btn="back"
          >
            <!-- more dropdown menu -->
            <template #more>
              <kw-btn label="menu1" />
              <kw-btn label="menu2" />
              <kw-btn label="menu3" />
            </template>
            <!--// more dropdown menu -->
          </kw-page-mobile-header>
        </div>
        <guide-code-view
          :code-value="backCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="subHeader"
        class="kw-guide-title"
      >
        Sub Header(sticky, located below main Header)
      </h3>
      <p class="kw-guide-description">
        Please add this area(template#sub-header) when need the sticky sub-header in kw-page
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-field-wrap
            control-class="bg-bg-body px20"
          >
            <kw-select
              v-model="selectModel"
              label="fit"
              class="fit"
              :options="optionsModel"
              borderless
              :error="true"
            />
            <kw-separator
              vertical
              spaced
              inset
            />
            <kw-select
              v-model="selectModel"
              borderless
              class="fit"
              :options="optionsModel"
              stretch
            />
          </kw-field-wrap>
        </div>
        <guide-code-view
          :code-value="subHeader"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const defaultCode = `
<template #header>
  <kw-page-mobile-header
    title="Default"
    left-btn="menu"
    hint="text"
  >
    <!-- you can put tooltip text in template#hint instead of adding prop -->
    <!-- <template #hint>
      hint text
    </template> -->
    <!-- // you can put tooltip text in template#hint instead of adding prop -->

    <!-- more dropdown menu -->
    <template #more>
      <kw-btn label="menu1" />
      <kw-btn label="menu2" />
      <kw-btn label="menu3" />
    </template>
  <!--// more dropdown menu -->
  </kw-page-mobile-header>
</template>
`;

const closeCode = `
<template #header>
  <kw-page-mobile-header
    title="title"
    show-close
  />
</template>
`;

const backCode = `
<template #header>
  <kw-page-mobile-header
    title="title"
    left-btn="back"
  >
    <!-- more dropdown menu -->
    <template #more>
      <kw-btn label="menu1" />
      <kw-btn label="menu2" />
      <kw-btn label="menu3" />
    </template>
    <!--// more dropdown menu -->
  </kw-page-mobile-header>
</template>
`;

const subHeader = `
<template #sub-header>
  <kw-field-wrap
    control-class="bg-bg-body px20"
  >
    <kw-select
      v-model="selectModel"
      label="fit"
      class="fit"
      :options="optionsModel"
      borderless
      :error="true"
    />
    <kw-separator
      vertical
      spaced
      inset
    />
    <kw-select
      v-model="selectModel"
      borderless
      class="fit"
      :options="optionsModel"
      stretch
    />
  </kw-field-wrap>
</template>
`;

const guideHistory = [
  {
    timestamp: '2022.12.06',
    text: 'Add mobile header',
  },
];
</script>
<style lang="scss" scoped>
::v-deep(.kw-guide-example) {
  padding: 0 !important;
}

::v-deep(.q-card) {
  padding: 0 !important;
}
</style>
