<template>
  <kw-page
    class="kw-guide"
    no-header
  >
    <h2 class="kw-guide-h2">
      [Mobile] Layout & Page Header
    </h2>
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
        <li>The page header is finally controlled by the development team in Korea.</li>
        <li>GDCI only need to code 'Title', 'Text Button', and 'more Function'.</li>
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              title="Title" <br>
              template#etc <br>
              template#more
            </td>
            <td>
              kw-page 의 attr<br>
              Text btn<br>
              more 기능<br>
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
        Default(Only title, Action)
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-page-mobile-header
            title="Title"
          />
          <div class="px20 py50">
            Page Contents
          </div>
          <div
            class="row"
          >
            <kw-btn
              filled
              negative
              style="flex-grow: 1; height: 60px;"
              class="kw-font-pt16"
              label="취소"
            />
            <kw-btn
              filled
              primary
              style="flex-grow: 1; height: 60px;"
              class="kw-font-pt16"
              label="확인"
            />
          </div>
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
        Title + More
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-page-mobile-header
            title="Title"
            show-close
          >
            <template #more>
              <kw-btn label="menu1" />
              <kw-btn label="menu2" />
              <kw-btn label="menu3" />
            </template>
          </kw-page-mobile-header>
        </div>
        <guide-code-view
          :code-value="moreCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Title + Text btn
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-page-mobile-header
            title="Title"
          >
            <template #etc>
              <kw-btn
                label="Text btn"
                borderless
              />
            </template>
            <!--// more dropdown menu -->
          </kw-page-mobile-header>
        </div>
        <guide-code-view
          :code-value="btnCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Title + Text btn + More
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <kw-page-mobile-header
            title="Title"
          >
            <template #etc>
              <kw-btn
                label="Text btn"
                borderless
              />
            </template>
            <template #more>
              <kw-btn label="menu1" />
              <kw-btn label="menu2" />
              <kw-btn label="menu3" />
            </template>
          </kw-page-mobile-header>
        </div>
        <guide-code-view
          :code-value="totalCode"
          lang="vue"
        />
      </q-card>
    </div>
    <!-- <div class="kw-guide-section">
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
    </div> -->
  </kw-page>
</template>

<script setup>

const defaultCode = `
<kw-page title="Title">

  Page Contents

  <template #action>
    <kw-btn
      filled
      negative
      label="취소"
    />
    <kw-btn
      filled
      primary
      label="확인"
    />
  </template>
</kw-page>
`;

const moreCode = `
<kw-page title="Title">
  <template #more>
    <kw-btn label="menu1" />
    <kw-btn label="menu2" />
    <kw-btn label="menu3" />
  </template>

  Page Contents

</kw-page>
`;

const btnCode = `
<kw-page title="Title">
  <template #etc>
    <kw-btn
      label="Text btn"
      borderless
    />
  </template>

  Page Contents

</kw-page>
`;

const totalCode = `
<kw-page title="Title">
  <template #etc>
    <kw-btn
      label="Text btn"
      borderless
    />
  </template>
  <template #more>
    <kw-btn label="menu1" />
    <kw-btn label="menu2" />
    <kw-btn label="menu3" />
  </template>

  Page Contents

</kw-page>
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
