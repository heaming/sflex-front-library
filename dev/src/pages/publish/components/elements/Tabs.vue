<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Tabs
    </h2>
    <p class="kw-guide-description">
      You can check how to use 'Tab' through the sample page.<br>
      <span class="notice">
        Check 'page tab' : PageSample02<br>
        Check 'tab in tab' : PageSample03<br>
        Check 'small height tab' : PopupSample02<br>
      </span>
    </p>
    <guide-history-view
      :items="guideHistory"
    />
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
              kw-tabs
            </td>
            <td>
              model-value="1"
            </td>
            <td>
              active tab of the same &lt;kw-tab&gt;'s name value
            </td>
          </tr>
          <tr>
            <td>
              kw-tabs
            </td>
            <td>
              dense
            </td>
            <td>
              When a small-height tab is used alone and 2depth<br>
              However, please do not add this class when you put a tab inside tabs which wrapped kw-search.
              cuz, a small height design is automatically applied.
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
        Tab for search form , and form
      </h3>
      <p class="kw-guide-description">
        Make sure to put <b>'model-value'</b> to be active current tab's number.<br>
        First example, There is only form, it has no border around the box.<br>
        Second example, There is only searchform, it has border around the searchform<br>
        <b>model-value of kw-tabs and kw-tab-panels</b> should be changed as the active number.<br>
        Also <b>name="1" of kw-tab-panel</b> should be same as model-value number
      </p>
      <q-card>
        <div class="kw-guide-example">
          <kw-tabs
            model-value="1"
            class="example-form"
          >
            <kw-tab
              name="1"
              label="form"
            />
            <kw-tab
              name="2"
              label="searchform"
            />
          </kw-tabs>
          <kw-tab-panels
            model-value="1"
          >
            <kw-tab-panel name="1">
              <div class="normal-area">
                <h3>kw-form</h3>
                <kw-form
                  :cols="2"
                  class="kw-form--textright"
                >
                  <kw-form-row>
                    <kw-form-item label="label">
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
                <kw-separator />
                <h3>kw-form</h3>
                <kw-form
                  :cols="2"
                  class="kw-form--textright"
                >
                  <kw-form-row>
                    <kw-form-item label="label">
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
            </kw-tab-panel>
          </kw-tab-panels>
        </div>
        <guide-code-view
          :code-value="tabform"
          :lang="vue"
        />
      </q-card>
      <q-card>
        <div class="kw-guide-example">
          <kw-tabs
            model-value="2"
          >
            <kw-tab
              name="1"
              label="form"
            />
            <kw-tab
              name="2"
              label="searchform"
            />
          </kw-tabs>
          <kw-tab-panels
            model-value="2"
          >
            <kw-tab-panel name="2">
              <kw-search
                :cols="2"
                class="kw-form--textright"
              >
                <kw-search-row>
                  <kw-search-item label="label">
                    <kw-input />
                  </kw-search-item>
                  <kw-search-item label="하이퍼센트">
                    <p>0</p>
                  </kw-search-item>
                </kw-search-row>
                <kw-search-row>
                  <kw-search-item label="크리에이티브">
                    <p>0</p>
                  </kw-search-item>
                  <kw-search-item label="크리에이티브">
                    <p>0</p>
                  </kw-search-item>
                </kw-search-row>
              </kw-search>
              <div class="result-area">
                <h3>content</h3>
              </div>
            </kw-tab-panel>
          </kw-tab-panels>
        </div>
        <guide-code-view
          :code-value="tabSearch"
          :lang="vue"
        />
      </q-card>
      <q-card>
        <div class="kw-guide-example">
          <kw-tabs
            dense
            model-value="1"
            class="example-form"
          >
            <kw-tab
              name="1"
              label="form"
            />
            <kw-tab
              name="2"
              label="searchform"
            />
          </kw-tabs>
          <kw-tab-panels
            model-value="1"
          >
            <kw-tab-panel name="1">
              <div class="normal-area">
                <h3>kw-form</h3>
                <kw-form
                  :cols="2"
                  dense
                  class="kw-form--textright"
                >
                  <kw-form-row>
                    <kw-form-item label="label">
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
            </kw-tab-panel>
          </kw-tab-panels>
        </div>
        <guide-code-view
          :code-value="denseTabs"
          :lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const guideHistory = [
  {
    timestamp: '2022.11.09',
    text: 'add example of using dense prop',
  },
  {
    timestamp: '2022.10.28',
    text: 'change methods class -> prop',
  },
  {
    timestamp: '2022.10.26',
    text: 'Modify explanation of dense class',
  },
  {
    timestamp: '2022.10.21',
    text: 'Modify code of Tab for search form , and form ',
  },
  {
    timestamp: '2022.09.15',
    text: 'Redefine tab',
  },
  {
    timestamp: '2022.09.14',
    text: 'Add summary - small height tab',
  },
];

const tabform = `
<kw-tabs
  model-value="1"
>
  <kw-tab
    name="1"
    label="form"
  />
  <kw-tab
    name="2"
    label="searchform"
  />
</kw-tabs>
<kw-tab-panels
  model-value="1"
>
  <kw-tab-panel name="1">
    <div class="normal-area">
      <h3>kw-form</h3>
      <kw-form
        :cols="2"
        class="kw-form--textright"
      >
        <kw-form-row>
          <kw-form-item label="label">
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
      <kw-separator />
      <h3>kw-form</h3>
      <kw-form
        :cols="2"
        class="kw-form--textright"
      >
        <kw-form-row>
          <kw-form-item label="label">
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
  </kw-tab-panel>
</kw-tab-panels>
`;
const tabSearch = `
<kw-tabs
  model-value="1"
>
  <kw-tab
    name="1"
    label="form"
  />
  <kw-tab
    name="2"
    label="searchform"
  />
</kw-tabs>
<kw-tab-panels
  model-value="2"
>
  <kw-tab-panel name="2">
    <kw-search
      :cols="2"
      class="kw-form--textright"
    >
      <kw-search-row>
        <kw-search-item label="label">
          <kw-input />
        </kw-search-item>
        <kw-search-item label="하이퍼센트">
          <p>0</p>
        </kw-search-item>
      </kw-search-row>
      <kw-search-row>
        <kw-search-item label="크리에이티브">
          <p>0</p>
        </kw-search-item>
        <kw-search-item label="크리에이티브">
          <p>0</p>
        </kw-search-item>
      </kw-search-row>
    </kw-search>
    <div class="result-area">
      <h3>content</h3>
    </div>
  </kw-tab-panel>
</kw-tab-panels>
`;

const denseTabs = `
<kw-tabs
  dense
  model-value="1"
  class="example-form"
>
  <kw-tab
    name="1"
    label="form"
  />
  <kw-tab
    name="2"
    label="searchform"
  />
</kw-tabs>
<kw-tab-panels
  model-value="1"
>
  <kw-tab-panel name="1">
    <div class="normal-area">
      <h3>kw-form</h3>
      <kw-form
        :cols="2"
        dense
        class="kw-form--textright"
      >
        <kw-form-row>
          <kw-form-item label="label">
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
  </kw-tab-panel>
</kw-tab-panels>
`;
</script>

<style lang="scss" scoped>
.example-form {
  border: none !important;
}
</style>
