<template>
  <kw-page
    class="kw-guide"
    no-header
  >
    <h2 class="kw-guide-h2">
      [MOBILE] Expansion
    </h2>
    <guide-history-view :items="historyData" />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        summary
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
            <td rowspan="4">
              kw-expansion-item
            </td>
            <td>
              group=""
            </td>
            <td>
              same name in group is when one of expansions is opened, the other expansions are closed
            </td>
          </tr>
          <tr>
            <td>
              expand-icon-align
            </td>
            <td>
              top , center , bottom
            </td>
          </tr>
          <tr>
            <td>
              expand-icon-class
            </td>
            <td>
              helper class or created class
            </td>
          </tr>
          <tr>
            <td>
              expand-icon
            </td>
            <td>
              add icon on right side
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3 class="kw-guide-title">
        Notice
      </h3>
      <p class="kw-guide-description">
        Make sure to check kw-list before making Expansion. It's related to create Expansion.<br>
        <router-link to="/Publish/Mobile/Components/Elements/List">
          The guide of kw-list
        </router-link><br>
        <router-link to="/Publish/Mobile/Components/Elements/Formstyle">
          The guide of Formstyle
        </router-link><br>
      </p>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Expansion
      </h3>

      <p class="kw-guide-description">
        <em># group="list-group"</em><br>
        same name in group is when one of expansions is opened, the other expansions are closed<br>
        <em># expand-icon-align</em><br>
        align-item: top , center , bottom (default: center)<br>
        <em># expand-icon-class</em><br>
        Add the helper class or create 'class' in here, it's able to change the style after adding the class in here<br>
        <em># expand-icon</em><br>
        Add the icon on right side<br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-list
            item-padding="12px 0"
            separator
          >
            <kw-expansion-item
              group="list-group"
              padding-target="header"
              expand-icon-align="center"
              expand-icon-class="kw-font-pt16"
              expand-icon="arrow_down"
            >
              <template #header>
                <kw-item-section>
                  <kw-form>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        금액
                      </p>
                    </kw-form-item>
                  </kw-form>
                </kw-item-section>
              </template>
              <div class="kw-bc--bg-box">
                <div class="pa20">
                  <h4 class="pt0">
                    Title
                  </h4>
                  <kw-form
                    dense
                    class="mt8"
                  >
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                  </kw-form>
                </div>
              </div>
            </kw-expansion-item>
            <kw-expansion-item
              group="list-group"
              padding-target="header"
              expand-icon-align="center"
              expand-icon-class="kw-font-pt16"
              expand-icon="arrow_down"
            >
              <template #header>
                <kw-item-section>
                  <kw-form>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        금액
                      </p>
                    </kw-form-item>
                  </kw-form>
                </kw-item-section>
              </template>
              <div class="kw-bc--bg-box">
                <div class="pa20">
                  <h4 class="pt0">
                    Title
                  </h4>
                  <kw-form
                    dense
                    class="mt8"
                  >
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                  </kw-form>
                </div>
              </div>
            </kw-expansion-item>
            <kw-expansion-item
              group="list-group"
              padding-target="header"
              expand-icon-align="center"
              expand-icon-class="kw-font-pt16"
              expand-icon="arrow_down"
            >
              <template #header>
                <kw-item-section>
                  <kw-form>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        금액
                      </p>
                    </kw-form-item>
                  </kw-form>
                </kw-item-section>
              </template>
              <div class="kw-bc--bg-box">
                <div class="pa20">
                  <h4 class="pt0">
                    Title
                  </h4>
                  <kw-form
                    dense
                    class="mt8"
                  >
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                    <kw-form-item label="항목명">
                      <p class="text-right text-weight-medium">
                        내용
                      </p>
                    </kw-form-item>
                  </kw-form>
                </div>
              </div>
            </kw-expansion-item>
            <kw-separator class="my0" />
          </kw-list>
        </div>
        <guide-code-view
          :code-value="case1"
          lang="vue"
        />
      </q-card>
    </div>

    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Expansion in kw-item-section
      </h3>

      <p class="kw-guide-description">
        <em># kw-list</em><br>
        <b>padding,clickable,item-padding, separator for kw-item Not for kw-expansion</b><br>
        <em># the sequence in this example</em><br>
        - kw-list > kw-item > kw-item-section > div and kw-expansion<br>
        First div is for area above kw-expansion-item
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-list
            padding
            clickable
            item-padding="20px 0"
            separator
          >
            <kw-item>
              <kw-item-section>
                <div class="row justify-between no-wrap">
                  <div class="row items-start no-wrap">
                    <span class="kw-font-pt12">09:30</span>
                    <div class="column ml12">
                      <div class="row items-center">
                        <span class="text-weight-bold">김교원</span>
                        <span class="text-weight-bold ml4 kw-fc--primary">VIP</span>
                        <kw-chip
                          label="특이"
                          color="primary"
                          outline
                          class="ml4"
                        />
                      </div>
                      <span class="kw-font-pt14 kw-fc--placeholder">(2022-0532864)</span>
                      <span class="kw-font-pt14 kw-fc--black1">경기 파주시 후곡로 50 414동 1800호
                        (금촌동, 후곡마을뜨란채)</span>
                    </div>
                  </div>
                  <div class="kw-font-pt12 text-weight-medium text-no-wrap kw-fc--primary w45 text-right">
                    완료
                  </div>
                </div>
                <kw-expansion-item
                  group="list-group"
                  expand-icon-align="top"
                  expand-icon-class="kw-font-pt16 pr12 mt12"
                  class="kw-bc--bg-box"
                  expand-icon="arrow_down"
                >
                  <template #header>
                    <kw-item-section
                      side
                      class="ml12 pr8 py10"
                      top
                    >
                      <kw-chip
                        label="B/S"
                        color="primary"
                        outline
                        class="mt2"
                      />
                    </kw-item-section>
                    <kw-item-section
                      top
                      class="py10"
                    >
                      <span class="kw-font-pt14 kw-fc--black1 text-weight-regular">포트세척팜
                        | WIDE(KW-G01RR)공유
                      </span>
                    </kw-item-section>
                  </template>
                  <div class="kw-bc--bg-body">
                    <kw-separator
                      divider
                      :spaced="`false`"
                      size="1px"
                      class="kw-bc--line-line"
                    />
                    <kw-form
                      dense
                      :cols="1"
                      class="pa16"
                    >
                      <kw-form-item label="증상">
                        <p>정기, 정기점검</p>
                      </kw-form-item>
                      <kw-form-item label="고객특이">
                        <p>김민경 고객집, 주말 연락 피하기</p>
                      </kw-form-item>
                      <kw-form-item label="가구화">
                        <p>2건</p>
                      </kw-form-item>
                      <kw-form-item label="재약정">
                        <p>N</p>
                      </kw-form-item>
                      <kw-form-item label="최근방문일">
                        <p>2022-06-10</p>
                      </kw-form-item>
                      <kw-form-item label="방문예정일">
                        <p>2022-08-02 (월초)</p>
                      </kw-form-item>
                      <kw-form-item label="약속변경일">
                        <p>2022-08-09 14:30 (D-1)</p>
                      </kw-form-item>
                    </kw-form>
                  </div>
                </kw-expansion-item>
              </kw-item-section>
            </kw-item>
          </kw-list>
        </div>
        <guide-code-view
          :code-value="[case2,caseCss2]"
          multi
          lang="['vue','css']"
        />
      </q-card>
    </div>

    <!-- 우리가 해야하는 것!!  -->
    <!-- <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        case3
      </h3>

      <p class="kw-guide-description">
        <a href="https://zpl.io/PqMRBJA">Zeplin design</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-list>
            <kw-expansion-item>
              <template #header="{read}">
                <kw-icon :name="read ? 'alert_off_24' : 'alert_on_24'" />
                <div class="kw-expansion-item-text">
                  <p>[KSS 전자계약오류] 개인 신용정보 조회 동의 처리 가능한 상태가 아닙니다.</p>
                  <span>
                    오후 3:34
                  </span>
                </div>
              </template>

              <div class="py16 px20 kw-font-pt14">
                계약 고객이 사용하는 통신사에 신용정보 조회 동의를 거부한 상태인 경우에 나타나는 메세지입니다.
                통신사에 문의 바랍니다.
              </div>
            </kw-expansion-item>
            <kw-expansion-item>
              <template #header="{read}">
                <kw-icon :name="read ? 'alert_off_24' : 'alert_on_24'" />
                <div class="kw-expansion-item-text">
                  <p>[KSS 전자계약오류] 개인 신용정보 조회 동의 처리 가능한 상태가 아닙니다.</p>
                  <span>
                    오후 3:34
                  </span>
                </div>
              </template>

              <div class="py16 px20 kw-font-pt14">
                계약 고객이 사용하는 통신사에 신용정보 조회 동의를 거부한 상태인 경우에 나타나는 메세지입니다.
                통신사에 문의 바랍니다.
              </div>
            </kw-expansion-item>
          </kw-list>
        </div>
        <guide-code-view
          :code-value="case3"
          lang="vue"
        />
      </q-card>
    </div> -->
  </kw-page>
</template>

<script setup>
const case1 = `
<kw-list
  item-padding="12px 0"
  separator
>
  <kw-expansion-item
    group="list-group"
    padding-target="header"
    expand-icon-align="center"
    expand-icon-class="kw-font-pt16"
    expand-icon="arrow_down"
  >
    <template #header>
      <kw-item-section>
        <kw-form>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              금액
            </p>
          </kw-form-item>
        </kw-form>
      </kw-item-section>
    </template>
    <div class="kw-bc--bg-box">
      <div class="pa20">
        <h4 class="pt0">
          Title
        </h4>
        <kw-form
          dense
          class="mt8"
        >
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
        </kw-form>
      </div>
    </div>
  </kw-expansion-item>
  <kw-expansion-item
    group="list-group"
    padding-target="header"
    expand-icon-align="center"
    expand-icon-class="kw-font-pt16"
    expand-icon="arrow_down"
  >
    <template #header>
      <kw-item-section>
        <kw-form>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              금액
            </p>
          </kw-form-item>
        </kw-form>
      </kw-item-section>
    </template>
    <div class="kw-bc--bg-box">
      <div class="pa20">
        <h4 class="pt0">
          Title
        </h4>
        <kw-form
          dense
          class="mt8"
        >
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
        </kw-form>
      </div>
    </div>
  </kw-expansion-item>
  <kw-expansion-item
    group="list-group"
    padding-target="header"
    expand-icon-align="center"
    expand-icon-class="kw-font-pt16"
    expand-icon="arrow_down"
  >
    <template #header>
      <kw-item-section>
        <kw-form>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              금액
            </p>
          </kw-form-item>
        </kw-form>
      </kw-item-section>
    </template>
    <div class="kw-bc--bg-box">
      <div class="pa20">
        <h4 class="pt0">
          Title
        </h4>
        <kw-form
          dense
          class="mt8"
        >
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
          <kw-form-item label="항목명">
            <p class="text-right text-weight-medium">
              내용
            </p>
          </kw-form-item>
        </kw-form>
      </div>
    </div>
  </kw-expansion-item>
  <kw-separator class="my0" />
</kw-list>
`;
const case2 = `
<kw-list
  padding
  clickable
  item-padding="20px 0"
  separator
>
  <kw-item>
    <kw-item-section>
      <div class="row justify-between no-wrap">
        <div class="row items-start no-wrap">
          <span class="kw-font-pt12">09:30</span>
          <div class="column ml12">
            <div class="row items-center">
              <span class="text-weight-bold">김교원</span>
              <span class="text-weight-bold ml4 kw-fc--primary">VIP</span>
              <kw-chip
                label="특이"
                color="primary"
                outline
                class="ml4"
              />
            </div>
            <span class="kw-font-pt14 kw-fc--placeholder">(2022-0532864)</span>
            <span class="kw-font-pt14 kw-fc--black1">경기 파주시 후곡로 50 414동 1800호
              (금촌동, 후곡마을뜨란채)</span>
          </div>
        </div>
        <div class="kw-font-pt12 text-weight-medium text-no-wrap kw-fc--primary w45 text-right">
          완료
        </div>
      </div>
      <kw-expansion-item
        group="list-group"
        expand-icon-align="top"
        expand-icon-class="kw-font-pt16 pr12 mt12"
        class="kw-bc--bg-box"
        expand-icon="arrow_down"
      >
        <template #header>
          <kw-item-section
            side
            class="ml12 pr8 py10"
            top
          >
            <kw-chip
              label="B/S"
              color="primary"
              outline
              class="mt2"
            />
          </kw-item-section>
          <kw-item-section
            top
            class="py10"
          >
            <span class="kw-font-pt14 kw-fc--black1 text-weight-regular">포트세척팜
              | WIDE(KW-G01RR)공유
            </span>
          </kw-item-section>
        </template>
        <div class="kw-bc--bg-body">
          <kw-separator
            divider
            :spaced="\`false\`"
            size="1px"
            class="kw-bc--line-line"
          />
          <kw-form
            dense
            :cols="1"
            class="pa16"
          >
            <kw-form-item label="증상">
              <p>정기, 정기점검</p>
            </kw-form-item>
            <kw-form-item label="고객특이">
              <p>김민경 고객집, 주말 연락 피하기</p>
            </kw-form-item>
            <kw-form-item label="가구화">
              <p>2건</p>
            </kw-form-item>
            <kw-form-item label="재약정">
              <p>N</p>
            </kw-form-item>
            <kw-form-item label="최근방문일">
              <p>2022-06-10</p>
            </kw-form-item>
            <kw-form-item label="방문예정일">
              <p>2022-08-02 (월초)</p>
            </kw-form-item>
            <kw-form-item label="약속변경일">
              <p>2022-08-09 14:30 (D-1)</p>
            </kw-form-item>
          </kw-form>
        </div>
      </kw-expansion-item>
    </kw-item-section>
  </kw-item>
</kw-list>
`;

const caseCss2 = `
::v-deep(.kw-expansion-item) {
  margin-top: 20px;

  & + .kw-expansion-item {
    margin-top: 8px;
  }
}
`;
const historyData = [
  {
    timestamp: '2022-01-06',
    text: 'First added',
  },
];
</script>

<style lang="scss" scoped>
::v-deep(.kw-expansion-item) {
  margin-top: 20px;

  & + .kw-expansion-item {
    margin-top: 8px;
  }
}
</style>
