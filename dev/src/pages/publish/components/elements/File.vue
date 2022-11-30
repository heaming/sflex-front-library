<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      File
    </h2>
    <p class="kw-guide-description">
      It's currently under development. <br>  Even if the style is different in screen with zeplin,
      <span class="text-bold">please do not care and just insert file component when it necessary</span>
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
              zwcm-file-attacher
            </td>
            <td>
              <br>
              multiple
              download-only
            </td>
            <td>
              default : single file attached<br>
              add the prop "multiple" in the tag when multiple type of file component <br>
              add the prop "multiple" with "download-only" in the tag when multiple download type of file component
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
        single file attachment component
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/example_file-single.png"
            width="500"
            alt="단일 파일첨부"
          >
        </div>
        <guide-code-view
          :code-value="singleCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="multiple"
        class="kw-guide-title"
      >
        Multiple
      </h3>
      <p class="kw-guide-description">
        Multiple files attachment component
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/example_file-multiple.png"
            width="500"
            alt="복수 파일첨부"
          >
        </div>
        <guide-code-view
          :code-value="multipleCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="multiple"
        class="kw-guide-title"
      >
        Multiple - download
      </h3>
      <p class="kw-guide-description">
        Multiple files download component <br> add download-only prop
        no checkbox, no header
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="~~dev/assets/images/example_file-multiple-download.png"
            width="500"
            alt="복수 파일첨부"
          >
        </div>
        <guide-code-view
          :code-value="multipleDownCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const singleCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="file">
      <zwcm-file-attacher />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const multipleCode = `
<kw-form>
  <kw-form-row>
    <kw-form-item label="multiple files">
      <zwcm-file-attacher multiple />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;

const multipleDownCode = `
<zwcm-file-attacher
  v-model="files"
  multiple
  download-only
/>
`;

const guideHistory = [
  {
    timestamp: '2022-11-09',
    text: 'Add file download case',
  },
  {
    timestamp: '2022-11-03',
    text: 'Updated guide',
  },
];
</script>
