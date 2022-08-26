<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Button with Icon
    </h2>
    <p class="kw-guide-description">
      Here is some example how to make the icon button and text with icon's button
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
              kw-btn-reverse <br>
              icon="icon file name" <br>
              size="px"
            </td>
            <td>
              Add the class of 'kw-btn-reverse'
              when the icon is located in right side and text is located in left side. <br>
              Add this attribute in need <br>
              Add this attribute in need <br>
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
          (It should be a "<b>svg</b>" as filename extention) from zeplin
          and Save the file to <b>src\assets\icons</b>.<br>
          1-1. The svg's file is already existed in the icons folder, Use it.<br>
          1-2. The naming for the svg file follows the name in zeplin.<br>
          <b>(If the name is 'price2(h24)' in zeplin, svg's file name have to be changed to price2_24)</b><br>
        </li>
        <li>
          Then, open the file. <b>Change the ID name and remove width and height</b> in svg line. <br>
          (ID name should be same width file name)
        </li>
        <li>
          Ensure to restart "npm run serve" after saving the icon file,
          otherwise the file may not be working well.
        </li>
        <li> Copy the code below the example.</li>
        <li>
          Add ID name in svg's tag which is included in the Svg file. (<b>ex: id="price2_24"</b>)
        </li>
        <li>
          Copy the kw-btn's tag in vue file.
          Add attribute 'icon' (value is icon name) <br>
          ( <b> ex: icon="price2_24" </b>)
        </li>
        <li>
          In case of, you need to control the size of Icon, you cand add attribute size
        </li>
      </ol>
    </div>
    <div class="kw-guide-section">
      <h3
        class="kw-guide-title"
      >
        Notice
      </h3>
      <ul>
        <li>
          mr10 is for the styling the guide.Remove it after copying the code.<br>
          (The reference page of Gutter in publishing guide: Publish / Components / Element / Gutter)
        </li>
      </ul>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Icon Button
      </h3>
      <p class="kw-guide-description">
        Making only icon in the button.<br> Add the class of
        <b>'kw-btn--icon-only'</b> and Add the size of width and height as helper classes in 'kw-btn'.<br>
        (Ex: kw-btn--icon-only should be earlier than the other classes in 'kw-btn'.
        (such as size classes(w20,h20) and styling the button's classes(kw-btn--line-gray))<br>
        (<b>h40 means height: 40px  / w40 means width: 40px </b>
        - The reference page (Components/Elements/Gutter&size)<br>
        Add the size of the icon<b>(ex: size="16px")</b> as the attribute of the <b>'kw-btn'</b>.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            class="kw-btn--icon-only kw-btn--line-gray h40 w40 mr10"
            icon="search_24"
            size="16px"
          />
          <kw-btn
            class="kw-btn--icon-only kw-btn--line-gray h50 w50 mr10"
            icon="search_24"
            size="24px"
          />
          <kw-btn
            class="kw-btn--icon-only h50 w50 mr10"
            icon="search_24"
            size="24px"
          />
          <kw-btn
            class="kw-btn--icon-only h50 w50 mr10"
            icon="info_24"
          />
        </div>
        <guide-code-view
          :code-value="iconButton"
          lang="vue"
        />
      </q-card>
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
            icon="arrow_down_16"
            label="상태변경"
          />
          <kw-btn
            class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 kw-btn-reverse"
            icon="arrow_down_16"
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
        It is Excel download button.<br>If the icon is the diffrent with example,
        having a look above the part '<b>#how to make the button</b>' of the page.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            icon="excel_download_16"
            class="kw-btn--excel mr10"
            label="엑셀 다운로드"
          />
          <kw-btn
            icon="excel_upload_16"
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
            icon="excel_download_16"
            class="kw-btn--line-black kw-btn--h32 mr10"
            label="엑셀 다운로드"
          />
          <kw-btn
            icon="excel_download_16"
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
            icon="excel_upload_16"
            class="kw-btn--line-black kw-btn--h32 mr10"
            label="엑셀 업로드"
          />
          <kw-btn
            icon="excel_upload_16"
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
            <div>
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

const iconButton = `
<!--  mr10:gutter margin-right:10px  -->
<!--  The size of icon is 16px, and The button's size is width:40px and height:40px -->
<kw-btn
  class="kw-btn--icon-only kw-btn--line-gray h40 w40 mr10"
  icon="search_24"
  size="16px"
/>
<kw-btn
  class="kw-btn--icon-only kw-btn--line-gray h50 w50 mr10"
  icon="search_24"
  size="24px"
/>
<kw-btn
  class="kw-btn--icon-only h50 w50 mr10"
  icon="search_24"
  size="24px"
/>
`;
const testCode = `
<kw-btn
  class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 mr10"
  icon="arrow_down_16"
  label="상태변경"
/>
<kw-btn
  class="kw-btn--line-gray kw-btn--line-bg kw-btn--h32 kw-btn-reverse"
  icon="arrow_down_16"
  label="상태변경"
/>
`;
const excelCode = `
<kw-btn
  icon="excel_download_16"
  class="kw-btn--excel mr10"
  label="엑셀 다운로드"
/>
<kw-btn
  icon="excel_upload_16"
  class="kw-btn--excel"
  label="엑셀 업로드"
/>
`;
const excelCode02 = `
<kw-btn
  icon="excel_download_16"
  class="kw-btn--line-black kw-btn--h32 mr10"
  label="엑셀 다운로드"
/>
<kw-btn
  icon="excel_download_16"
  class="kw-btn--line-black kw-btn--h32"
  label="엑셀 다운로드"
  disable
/>
`;
const excelCode03 = `
<kw-btn
  icon="excel_upload_16"
  class="kw-btn--line-black kw-btn--h32 mr10"
  label="엑셀 업로드"
/>
<kw-btn
  icon="excel_upload_16"
  class="kw-btn--line-black kw-btn--h32"
  label="엑셀 업로드"
  disable
/>
`;
</script>
