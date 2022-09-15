<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Button with Icon
    </h2>
    <p class="kw-guide-description">
      Here is some example how to make the icon button and text with icon's button
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
              icon="icon file name" <br>
              icon-right="icon file name" <br>
              dense <br>
              borderless
            </td>
            <td>
              with icon type <br>
              when the icon is located in right side and text is located in left side. <br>
              Add this attribute when height size is 32px <br>
              when only icon img have
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
          mr8 is for the styling the guide.Remove it after copying the code.<br>
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
        Making only icon in the button.<br>
        Add the prop of <b>borderless</b> <br>
        <!-- Add the size of the icon<b>(ex: size="16px")</b> as the attribute of the <b>'kw-btn'</b>. -->
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            icon="search_24"
            borderless
            size="24px"
            class="mr8"
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
        Using the prop of 'icon-right' to swap the locations of the label and the icon
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            icon="plus_16"
            dense
            label="학습자 추가"
            class="mr8"
          />
          <kw-btn
            icon-right="plus_16"
            dense
            disable
            label="학습자 추가"
            class="mr8"
          />
          <kw-btn
            icon-right="arrow_down_16"
            dense
            label="상태추가"
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
        Excel/Doc upload or download button
      </h3>
      <p class="kw-guide-description">
        It is upload or download button.<br>
        having a look above the part '<b>#how to make the button</b>' of the page.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            icon="excel_download_16"
            dense
            class="mr8"
            label="양식 다운로드"
          />
          <kw-btn
            icon="excel_download_16"
            dense
            class="mr8"
            label="엑셀 다운로드"
          />
          <kw-btn
            icon="excel_upload_16"
            dense
            class="mr8"
            label="엑셀 업로드"
          />
          <kw-btn
            icon="excel_upload_16"
            dense
            disable
            class="mr8"
            label="엑셀 업로드"
          />
        </div>
        <guide-code-view
          :code-value="excelCode"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Print button
      </h3>
      <p class="kw-guide-description">
        It is print button.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-btn
            icon="print_16"
            dense
            label="인쇄"
          />
        </div>
        <guide-code-view
          :code-value="printCode"
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
<!--  mr8:gutter margin-right:10px  -->
<kw-btn
  icon="search_24"
  borderless
  size="24px"
  class="mr8"
/>
`;
// The size of icon is 16px, and The button's size is width:40px and height:40px
const testCode = `
  <kw-btn
    icon="plus_16"
    dense
    label="학습자 추가"
    class="mr8"
  />
  <kw-btn
    icon-right="plus_16"
    dense
    disable
    label="학습자 추가"
    class="mr8"
  />
  <kw-btn
    icon-right="arrow_down_16"
    dense
    label="상태추가"
  />
`;
const excelCode = `
  <kw-btn
    icon="excel_download_16"
    dense
    class="mr8"
    label="양식 다운로드"
  />
  <kw-btn
    icon="excel_download_16"
    dense
    class="mr8"
    label="엑셀 다운로드"
  />
  <kw-btn
    icon="excel_upload_16"
    dense
    class="mr8"
    label="엑셀 업로드"
  />
  <kw-btn
    icon="excel_upload_16"
    dense
    disable
    class="mr8"
    label="엑셀 업로드"
  />
`;

const printCode = `
<kw-btn
  icon="print_16"
  dense
  label="인쇄"
/>
`;
// History
const guideHistory = [
  {
    timestamp: '2022.09.15',
    text: 'revised button component guide',
  },
];
</script>
