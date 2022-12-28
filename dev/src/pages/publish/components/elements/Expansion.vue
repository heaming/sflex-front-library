<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Expansion
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
            <td>
              kw-expansion-item
            </td>
            <td>
              label="" <br>
            </td>
            <td>
              The title for Expansion-item
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
        Expansion
      </h3>

      <p class="kw-guide-description">
        Make sure to Wrap <b>kw-expansion-item</b> by kw-list<br>
        <!-- <em># kw-list</em><br>
        default spacing top and bottom are 40px<br>
        dense : top and bottom are 32px<br> -->
        <em># item-padding</em><br>
        item-padding's default is 16px (padding top and bottom).<br>
        If it's needed to change padding, put item-padding="20px 0" in kw-list<br>
        <em># padding-target</em><br>
        This padding can be for self , header and put it in kw-expansion-item<br>
        padding-target="header", It's padding for header<br>
        padding-target="self" ,  it's whole padding for header and content<br>
        :padding-target="['header', 'self']", It's header's padding and whole padding for Expansion<br>
        <em># expansion-icon</em><br>
        expansion-icon-algin adjust the icon's positon as "top, center,bottom"<br>
        expand-icon-class= "" : If adjust spacing or style add the heler class in such as "pl8 kw-font-pt24"<br>
        <em># block-inherit-padding</em><br>
        default is false : this means affect the padding to kw-item <br>
        padding affect to the kw-item which is included in kw-list. If no need to put the other padding in kw-item,
        add affect :block-inherit-padding="true" <br>
        <a href="https://zpl.io/EmzP6Gl"> the reference page for expansion</a><br>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-list
            separator
            item-padding="20px 0"
          >
            <kw-expansion-item
              group="list-group"
              padding-target="header"
              expansion-icon-align="center"
              expand-icon-class="kw-font-pt24"
            >
              <template #header>
                <kw-item-section>
                  <kw-item-label>
                    <span class="text-bold kw-font-pt18">기본내역</span>
                    <span class="kw-font-pt14 ml8 kw-fc--black3 text-weight-regular">(단위: 원)</span>
                  </kw-item-label>
                </kw-item-section>
              </template>
              <div class="kw-bc--bg-body">
                <kw-form
                  dense
                  class="px40 py20"
                >
                  <kw-form-row>
                    <kw-form-item label="과표계">
                      12,345,600
                    </kw-form-item>
                    <kw-form-item label="공제계">
                      123,450
                    </kw-form-item>
                    <kw-form-item label="실지급액">
                      12,345,600
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </div>
            </kw-expansion-item>
            <kw-expansion-item
              group="list-group"
              padding-target="header"
              expansion-icon-align="center"
              expand-icon-class="kw-font-pt24"
              :block-inherit-padding="true"
            >
              <template #header>
                <kw-item-section>
                  <kw-item-label>
                    <span class="text-bold kw-font-pt18">기본내역</span>
                    <span class="kw-font-pt14 ml8 kw-fc--black3 text-weight-regular">(단위: 원)</span>
                  </kw-item-label>
                </kw-item-section>
              </template>
              <div class="kw-bc--bg-body">
                <kw-form
                  dense
                  class="px40 py20"
                >
                  <kw-form-row>
                    <kw-form-item label="과표계">
                      12,345,600
                    </kw-form-item>
                    <kw-form-item label="공제계">
                      123,450
                    </kw-form-item>
                    <kw-form-item label="실지급액">
                      12,345,600
                    </kw-form-item>
                  </kw-form-row>
                </kw-form>
              </div>
            </kw-expansion-item>
          </kw-list>
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<kw-list
  separator
  item-padding="20px 0"
>
  <kw-expansion-item
    group="list-group"
    padding-target="header"
    expansion-icon-align="center"
    expand-icon-class="kw-font-pt24"
  >
    <template #header>
      <kw-item-section>
        <kw-item-label>
          <span class="text-bold kw-font-pt18">기본내역</span>
          <span class="kw-font-pt14 ml8 kw-fc--black3 text-weight-regular">(단위: 원)</span>
        </kw-item-label>
      </kw-item-section>
    </template>
    <div class="kw-bc--bg-body">
      <kw-form
        dense
        class="px40 py20"
      >
        <kw-form-row>
          <kw-form-item label="과표계">
            12,345,600
          </kw-form-item>
          <kw-form-item label="공제계">
            123,450
          </kw-form-item>
          <kw-form-item label="실지급액">
            12,345,600
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </div>
  </kw-expansion-item>
  <kw-expansion-item
    group="list-group"
    padding-target="header"
    expansion-icon-align="center"
    expand-icon-class="kw-font-pt24"
    :block-inherit-padding="true"
  >
    <template #header>
      <kw-item-section>
        <kw-item-label>
          <span class="text-bold kw-font-pt18">기본내역</span>
          <span class="kw-font-pt14 ml8 kw-fc--black3 text-weight-regular">(단위: 원)</span>
        </kw-item-label>
      </kw-item-section>
    </template>
    <div class="kw-bc--bg-body">
      <kw-form
        dense
        class="px40 py20"
      >
        <kw-form-row>
          <kw-form-item label="과표계">
            12,345,600
          </kw-form-item>
          <kw-form-item label="공제계">
            123,450
          </kw-form-item>
          <kw-form-item label="실지급액">
            12,345,600
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </div>
  </kw-expansion-item>
</kw-list>
`;
const historyData = [
  {
    timestamp: '2022-12-08',
    text: 'Updated expansion newly',
  },
  {
    timestamp: '2022-11-04',
    text: 'First added',
  },
];
</script>
