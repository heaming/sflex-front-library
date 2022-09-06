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
        Form, Info list, Popup box
      </h3>
      <p class="kw-guide-description">
        Depedning on the design or Planing, The tags would be different.<br>
        Search form has the buttons on the bottom.<br>
        If there is included both of input or text in Planing, It should be form<br>
        Lastly, The data text in form, it should be info list<br>

        The reference page for <a href="http://kwlib-dev.kyowon.co.kr/#/Publish/Components/Collections/SearchForm">Search Form</a><br>
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
        Form , table in popup
      </h3>
      <p class="kw-guide-description">
        Here is example for Form, Info List and table in popup box.<br>

        The reference page for <a href="http://kwlib-dev.kyowon.co.kr/#/Publish/Components/Elements/Table">Table</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-popup">
            <h3>1.Form-column3</h3>
            <kw-form
              :cols="3"
              class="kw-form--textright mt10"
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
            <h3>2.info list -column3</h3>
            <ul class="kw-info kw-info-textright mt20">
              <li class="kw-info-item">
                <p>교원</p>
                <div>0</div>
              </li>
              <li class="kw-info-item">
                <p>교원프라퍼티</p>
                <div>0</div>
              </li>
              <li class="kw-info-item">
                <p>하이퍼센트</p>
                <div>0</div>
              </li>
              <li class="kw-info-item">
                <p>크리에이티브</p>
                <div>0</div>
              </li>
            </ul>
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
        There are included <b>both of text and input</b>. It should be used form.<br>
        If there is only text instead of input's tag, It need to be used <b>p</b> tag.<br>
        The default of text-align is left.<br>
        If it should be right, add the class <b>kw-form--textright</b> in kw-form<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-popup">
            <h3>1.Form-column3</h3>
            <kw-form
              :cols="3"
              class="kw-form--textright mt10"
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
        Info list
      </h3>
      <p class="kw-guide-description">
        This is only when it comes only text in list.<br>
        It's used tags of ul and li<br>
        ul is included the class of <b>'kw-info'</b><br>
        li is included the class of <b>'kw-info-item'</b><br>
        div in kw-info-item need to be text-align( <b>default- text-align:left</b> ).
        Add the class <b>kw-info-textright</b> in ul. If it needs to be text-align right<br>
        Add the kw-info-item as many as it requires.
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-popup">
            <h3>2.info list -column3</h3>
            <ul class="kw-info kw-info-textright mt20">
              <li class="kw-info-item">
                <p>교원</p>
                <div>0</div>
              </li>
              <li class="kw-info-item">
                <p>교원프라퍼티</p>
                <div>0</div>
              </li>
              <li class="kw-info-item">
                <p>하이퍼센트</p>
                <div>0</div>
              </li>
              <li class="kw-info-item">
                <p>크리에이티브</p>
                <div>0</div>
              </li>
            </ul>
          </div>
        </div>
        <guide-code-view
          :code-value="infoLIst"
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
  <h3>1.Form-column3</h3>
  <kw-form
    :cols="3"
    class="kw-form--textright mt10"
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
  <h3>2.info list -column3</h3>
  <ul class="kw-info kw-info-textright mt20">
    <li class="kw-info-item">
      <p>교원</p>
      <div>0</div>
    </li>
    <li class="kw-info-item">
      <p>교원프라퍼티</p>
      <div>0</div>
    </li>
    <li class="kw-info-item">
      <p>하이퍼센트</p>
      <div>0</div>
    </li>
    <li class="kw-info-item">
      <p>크리에이티브</p>
      <div>0</div>
    </li>
  </ul>
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

  <template #action>
    <kw-btn
      class="kw-btn--negative kw-btn--h36"
      label="취소"
    />
    <kw-btn
      class="kw-btn--h36 ml8"
      label="확인"
    />
  </template>
</kw-popup>
`;
const form = `
<h3>1.Form-column3</h3>
<kw-form
  :cols="3"
  class="kw-form--textright mt10"
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
`;
const infoLIst = `
<h3>2.info list -column3</h3>
<ul class="kw-info kw-info-textright mt20">
  <li class="kw-info-item">
    <p>교원</p>
    <div>0</div>
  </li>
  <li class="kw-info-item">
    <p>교원프라퍼티</p>
    <div>0</div>
  </li>
  <li class="kw-info-item">
    <p>하이퍼센트</p>
    <div>0</div>
  </li>
  <li class="kw-info-item">
    <p>크리에이티브</p>
    <div>0</div>
  </li>
</ul>
`;
const historyData = [
  {
    timestamp: '2022-08-29',
    text: 'First added',
  },
];
</script>
