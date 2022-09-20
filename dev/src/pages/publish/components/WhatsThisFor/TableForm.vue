<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Table and Form
    </h2>
    <p class="kw-guide-description" />
    <guide-history-view
      :items="historyData"
    />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Form and table
      </h3>
      <p class="kw-guide-description">
        The reference page for <a href="http://kwlib-dev.kyowon.co.kr/#/Publish/Components/Collections/SearchForm">Search Form</a><br>
        The reference page for <a href="http://kwlib-dev.kyowon.co.kr/#/Publish/Components/Collections/Form">Form</a><br>
        The reference page for <a href="http://kwlib-dev.kyowon.co.kr/#/Publish/Components/Elements/Table">Table</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <img
            src="../../../../../assets/images/popup_form.png"
            alt="Layout Type 1"
          >
        </div>
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Form , table
      </h3>
      <p class="kw-guide-description">
        The reference page for <a href="http://kwlib-dev.kyowon.co.kr/#/Publish/Components/Elements/Table">Table</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-popup">
            <h3 class="mb20">
              1.Form-column3
            </h3>
            <kw-form
              :cols="3"
              align-content="left"
            >
              <kw-form-row>
                <kw-form-item
                  label="Label name"
                >
                  <p>교원디자인</p>
                </kw-form-item>
                <kw-form-item
                  label="Label name"
                >
                  <P>디자인</P>
                </kw-form-item>
                <kw-form-item
                  label="Label name"
                >
                  <p>날짜</p>
                </kw-form-item>
              </kw-form-row>
              <kw-form-row>
                <kw-form-item label="Select">
                  <kw-select
                    :model-value="[]"
                    :options="['A', 'B', 'C', 'D']"
                  />
                </kw-form-item>
                <kw-form-item
                  label="DatePicker"
                  colspan="1"
                >
                  <kw-date-picker />
                </kw-form-item>
              </kw-form-row>
            </kw-form>
            <kw-separator />
            <h3 class="mb20">
              2.None of elements(input,radio,select,datepicker)
            </h3>
            <kw-form align-content="right">
              <kw-form-row>
                <kw-form-item label="교원">
                  <p>0</p>
                </kw-form-item>
                <kw-form-item label="교원프라퍼티">
                  <p>0</p>
                </kw-form-item>
                <kw-form-item label="하이퍼센트">
                  <p>0</p>
                </kw-form-item>
              </kw-form-row>
              <kw-form-row>
                <kw-form-item label="크리에이티브">
                  <p>0</p>
                </kw-form-item>
              </kw-form-row>
            </kw-form>
            <kw-separator />
            <h3>3.table</h3>
            <table class="kw-table--normal mt20">
              <colgroup>
                <col style="width: 25%;">
                <col style="width: 25%;">
                <col style="width: 25%;">
                <col style="width: 25%;">
              </colgroup>
              <thead>
                <tr>
                  <th>계좌상태</th>
                  <th>오류번호</th>
                  <th>오류명</th>
                  <th>청구여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>유효</td>
                  <td class="text-left">
                    21(text-left)
                  </td>
                  <td>잔액부족</td>
                  <td>청구</td>
                </tr>
                <tr>
                  <td>유효</td>
                  <td class="text-right">
                    21(text-right)
                  </td>
                  <td>잔액부족</td>
                  <td>청구</td>
                </tr>
              </tbody>
            </table>
          </div>
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
        Form(input and text)
      </h3>
      <p class="kw-guide-description">
        There are included <b>both of text and the elements(input,select,radio,datepicker)</b>.<br>
        Both of them are included in kw-form,<br>
        The height is 44px and each of padding top
        and bottom are 10px except of first and last child of kw-form-row.<br>
        <b>align-content="left"</b> is default. <br>
        default is textalign left. and the height between row is 44px.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-popup">
            <h3 class="mb20">
              1.Form-column3
            </h3>
            <kw-form
              :cols="3"
            >
              <kw-form-row>
                <kw-form-item
                  label="Label name"
                >
                  <p>교원디자인</p>
                </kw-form-item>
                <kw-form-item
                  label="Label name"
                >
                  <P>디자인</P>
                </kw-form-item>
                <kw-form-item
                  label="Label name"
                >
                  <p>날짜</p>
                </kw-form-item>
              </kw-form-row>
              <kw-form-row>
                <kw-form-item label="Select">
                  <kw-select
                    :model-value="[]"
                    :options="['A', 'B', 'C', 'D']"
                  />
                </kw-form-item>
                <kw-form-item
                  label="DatePicker"
                  colspan="1"
                >
                  <kw-date-range-picker
                    rules="date_range_months:1"
                  />
                </kw-form-item>
              </kw-form-row>
            </kw-form>
          </div>
        </div>
        <guide-code-view
          :code-value="form"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Form(only text)
      </h3>
      <p class="kw-guide-description">
        There are included <b>only for text</b>. Use '<b>p</b>'
        tag instead of the elements(input,select,radio,datepicker)<br>
        The height is 24px and each of padding top and bottom are 6px except of first and last child of kw-form-row.<br>
        The default of text-align is left.<br>
        If it should be right, add the attribute <b>align-content="right"</b> in kw-form<br>
        If one of kw-form-item's p tags need to be textalign left,right
        and center,add <b>align-content=""</b> in kw-form-item.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-popup">
            <h3 class="mb20">
              2.None of elements(input,radio,select,datepicker)
            </h3>
            <kw-form
              align-content="right"
              dense
            >
              <kw-form-row>
                <kw-form-item
                  label="center"
                  align-content="center"
                >
                  <p>
                    0
                  </p>
                </kw-form-item>
                <kw-form-item
                  label="left"
                  align-content="left"
                >
                  <p>
                    0
                  </p>
                </kw-form-item>
                <kw-form-item label="하이퍼센트">
                  <p>0</p>
                </kw-form-item>
              </kw-form-row>
              <kw-form-row>
                <kw-form-item label="크리에이티브">
                  <p>0</p>
                </kw-form-item>
                <kw-form-item label="크리에이티브">
                  <p>0</p>
                </kw-form-item>
              </kw-form-row>
            </kw-form>
          </div>
        </div>
        <guide-code-view
          :code-value="textForm"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<kw-popup
  class="kw-popup--2xl"
  title="Form table data"
>
<h3 class="mb20">
    1.Form-column3
  </h3>
  <kw-form
    :cols="3"
    align-content="left"
  >
    <kw-form-row>
      <kw-form-item
        label="Label name"
      >
        <p>교원디자인</p>
      </kw-form-item>
      <kw-form-item
        label="Label name"
      >
        <P>디자인</P>
      </kw-form-item>
      <kw-form-item
        label="Label name"
      >
        <p>날짜</p>
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="Select">
        <kw-select
          :model-value="[]"
          :options="['A', 'B', 'C', 'D']"
        />
      </kw-form-item>
      <kw-form-item
        label="DatePicker"
        colspan="1"
      >
        <kw-date-picker />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <kw-separator />
  <h3 class="mb20">
    2.None of elements(input,radio,select,datepicker)
  </h3>
  <kw-form align-content="right">
    <kw-form-row>
      <kw-form-item label="교원">
        <p>0</p>
      </kw-form-item>
      <kw-form-item label="교원프라퍼티">
        <p>0</p>
      </kw-form-item>
      <kw-form-item label="하이퍼센트">
        <p>0</p>
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="크리에이티브">
        <p>0</p>
      </kw-form-item>
    </kw-form-row>
  </kw-form>
  <kw-separator />
  <h3>3.table</h3>
  <table class="kw-table--normal mt20">
    <colgroup>
      <col style="width: 25%;">
      <col style="width: 25%;">
      <col style="width: 25%;">
      <col style="width: 25%;">
    </colgroup>
    <thead>
      <tr>
        <th>계좌상태</th>
        <th>오류번호</th>
        <th>오류명</th>
        <th>청구여부</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>유효</td>
        <td class="text-left">
          21(text-left)
        </td>
        <td>잔액부족</td>
        <td>청구</td>
      </tr>
      <tr>
        <td>유효</td>
        <td class="text-right">
          21(text-right)
        </td>
        <td>잔액부족</td>
        <td>청구</td>
      </tr>
    </tbody>
  </table>
</kw-popup>
`;

const form = `
<kw-form
  :cols="3"
>
  <kw-form-row>
    <kw-form-item
      label="Label name"
    >
      <p>교원디자인</p>
    </kw-form-item>
    <kw-form-item
      label="Label name"
    >
      <P>디자인</P>
    </kw-form-item>
    <kw-form-item
      label="Label name"
    >
      <p>날짜</p>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="Select">
      <kw-select
        :model-value="[]"
        :options="['A', 'B', 'C', 'D']"
      />
    </kw-form-item>
    <kw-form-item
      label="DatePicker"
      colspan="1"
    >
      <kw-date-range-picker
        rules="date_range_months:1"
      />
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
const textForm = `
<h3 class="mb20">
  2.None of elements(input,radio,select,datepicker)
</h3>
<kw-form
  align-content="right"
  dense
>
  <kw-form-row>
    <kw-form-item
      label="center"
      align-content="center"
    >
      <p>
        0
      </p>
    </kw-form-item>
    <kw-form-item
      label="left"
      align-content="left"
    >
      <p>
        0
      </p>
    </kw-form-item>
    <kw-form-item label="하이퍼센트">
      <p>0</p>
    </kw-form-item>
  </kw-form-row>
  <kw-form-row>
    <kw-form-item label="크리에이티브">
      <p>0</p>
    </kw-form-item>
    <kw-form-item label="크리에이티브">
      <p>0</p>
    </kw-form-item>
  </kw-form-row>
</kw-form>
`;
const historyData = [
  {
    timestamp: '2022-09-08',
    text: 'Add attribute instead of classes(textalign)',
  },
  {
    timestamp: '2022-09-08',
    text: 'First added',
  },
];
</script>
