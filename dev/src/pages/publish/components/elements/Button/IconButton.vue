<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Button with Icon
    </h2>
    <p class="kw-guide-description">
      how to make the icons
    </p>
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
              Element(tag's name)
            </th>
            <th>
              Attribute(class)
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              kw-btn
            </td>
            <td>
              kw-btn-reverse
            </td>
            <td>
              Add the class of 'kw-btn-reverse' when the icon is located in right side and text is located in left side.
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        How to make the button
      </h3>
      <ol>
        <li>
          Download icon img
          (it should be a "<b>svg</b>" as filename extention) from zeplin and Save the file to <b>src\assets\icons</b>.
        </li>
        <li>Open the file and change the ID name in the file. and it should be same name with file name.</li>
        <li>
          Ensure to restart "npm run serve" after saving the icon file,
          otherwise the file may not be working well.
        </li>
        <li> Copy the code below the example.</li>
        <li>
          Add ID name in svg's tag which is included in the Svg file. <br>
          (<b>ex: id="plus" "</b>)
        </li>
        <li>
          Copy the kw-btn's tag in vue file.
          And add attribute 'icon' which is included the values of width and height <br>
          ( <b> ex: icon="plus_16|0 0 16 16 </b>) : The last two numbers are each of width and height.
        </li>
      </ol>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Button with icon
      </h3>
      <p class="kw-guide-description">
        Add the class of 'kw-btn-reverse' to swap the locations of the label and the icon
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 mr10"
            icon="arrow_down|0 0 16 16"
            label="상태변경"
          />
          <kw-btn
            class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 kw-btn-reverse"
            icon="arrow_down|0 0 16 16"
            label="상태변경"
          />
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Excel button
      </h3>
      <p class="kw-guide-description">
        It is Excel download button
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            icon="excel_download|0 0 16 16"
            class="kw-btn--excel mr10"
            label="엑셀 다운로드"
          />
          <kw-btn
            icon="excel_upload|0 0 16 16"
            class="kw-btn--excel"
            label="엑셀 업로드"
          />
        </div>
        <guide-code-view
          :code-value="excelCode"
          lang="vue"
        />
        <div class="kw-guide-example">
          <kw-btn
            icon="excel_download|0 0 16 16"
            class="kw-btn--line-black kw-btn--h32 mr10"
            label="엑셀 다운로드"
          />
          <kw-btn
            icon="excel_download|0 0 16 16"
            class="kw-btn--line-black kw-btn--h32"
            label="엑셀 다운로드"
            disable
          />
        </div>
        <guide-code-view
          :code-value="excelCode02"
          lang="vue"
        />
        <div class="kw-guide-example">
          <kw-btn
            icon="excel_upload|0 0 16 16"
            class="kw-btn--line-black kw-btn--h32 mr10"
            label="엑셀 업로드"
          />
          <kw-btn
            icon="excel_upload|0 0 16 16"
            class="kw-btn--line-black kw-btn--h32"
            label="엑셀 업로드"
            disable
          />
        </div>
        <guide-code-view
          :code-value="excelCode03"
          lang="vue"
        />
      </q-card>
    </div>
    <!-- <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        admin-arrow button
      </h3>
      <q-card>
        <div class="kw-guide-example">
          <div class="admin-arrow-box">
            <kw-btn
              class="kw-btn--line-gray"
              icon="arrow_right_24|0 0 24 24"
            />
            <kw-btn
              class="kw-btn--line-gray"
              icon="arrow_left_24|0 0 24 24"
            />
          </div>
        </div>
      </q-card>
    </div> -->
    <!-- <div class="kw-guide-section">
      <div class="kw-guide-section">
        <h3
          id="default"
          class="kw-guide-title"
        >
          icon button size(width & height: 40px)
        </h3>
        <q-card>
          <div class="kw-guide-example">
            <div class="admin-arrow-box">
              <kw-btn
                class="kw-btn--line-gray kw-btn--size40"
                icon="search_24|0 0 24 24"
              />
              <kw-btn
                class="kw-btn--line-gray kw-btn--size40"
                icon="double_check_24|0 0 24 24"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div> -->
  </kw-page>
</template>

<script setup>

const testCode = `
<kw-btn
  class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32"
  icon="arrow_down|0 0 16 16"
  label="상태변경"
/>
<!-- Add the class of 'kw-btn-reverse'. The icon is right side, and the text is left side -->
<kw-btn
  class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 kw-btn-reverse"
  icon="arrow_down|0 0 16 16"
  label="상태변경"
/>
`;
const excelCode = `
<kw-btn
  icon="excel_download|0 0 16 16"
  class="kw-btn--excel"
  label="엑셀 다운로드"
/>
<kw-btn
  icon="excel_upload|0 0 16 16"
  class="kw-btn--excel"
  label="엑셀 업로드"
/>
`;
const excelCode02 = `
<kw-btn
  icon="excel_download|0 0 16 16"
  class="kw-btn--line-black kw-btn--h32"
  label="엑셀 다운로드"
/>
<kw-btn
  icon="excel_download|0 0 16 16"
  class="kw-btn--line-black kw-btn--h32"
  label="엑셀 다운로드"
  disable
/>
`;
const excelCode03 = `
<kw-btn
  icon="excel_upload|0 0 16 16"
  class="kw-btn--line-black kw-btn--h32"
  label="엑셀 업로드"
/>
<kw-btn
  icon="excel_upload|0 0 16 16"
  class="kw-btn--line-black kw-btn--h32"
  label="엑셀 업로드"
  disable
/>
`;
</script>
