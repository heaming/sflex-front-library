<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Tabs
    </h2>
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
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <p class="kw-guide-description">
        The usage is same with desktop's tab component <br>
        About the different things one is design and other is only 1depth tab at now
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="pa20">
            <kw-tabs
              model-value="1"
            >
              <kw-tab
                name="1"
                label="TAB 1"
              />
              <kw-tab
                name="2"
                label="TAB 2"
              />
            </kw-tabs>
            <kw-tab-panels
              model-value="1"
            >
              <kw-tab-panel name="1">
                <div class="py20 kw-bc--bg-white">
                  <p class="kw-font-dense">
                    TAB 1 content1
                  </p>
                </div>
                <kw-separator divider />
                <div class="py20 kw-bc--bg-white">
                  <p class="kw-font-dense">
                    TAB 1 content2
                  </p>
                </div>
              </kw-tab-panel>
            </kw-tab-panels>
          </div>
        </div>
        <guide-code-view
          :code-value="tabform"
          :lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>

const tabform = `
<div class="pa20"> <!-- please use padding or margin helper class when necessary -->
  <kw-tabs
    model-value="1"
  >
    <kw-tab
      name="1"
      label="TAB 1"
    />
    <kw-tab
      name="2"
      label="TAB 2"
    />
  </kw-tabs>
  <kw-tab-panels
    model-value="1"
  >
    <kw-tab-panel name="1">
      <div class="py20 kw-bc--bg-white">
        <p class="kw-font-dense">
          TAB 1 content1
        </p>
      </div>
      <kw-separator divider />
      <div class="py20 kw-bc--bg-white">
        <p class="kw-font-dense">
          TAB 1 content2
        </p>
      </div>
    </kw-tab-panel>
  </kw-tab-panels>
</div>
`;
</script>

<style lang="scss" >
</style>
