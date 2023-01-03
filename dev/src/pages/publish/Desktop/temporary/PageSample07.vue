<template>
  <kw-page class="kw-page--md">
    <template #header>
      <kw-page-header
        :options="['홈', '상품', '교재/제품', '교재/제품 상세']"
      />
    </template>

    <div class="normal-area normal-area--button-set-bottom">
      <kw-stepper
        ref="stepper"
        v-model="stepInitNum"
        class="has-search"
        heading-text
      >
        <kw-step
          :name="1"
          title="step1"
          :done="stepInitNum > 1"
          prefix="1"
        />
        <!-- This is only Second step's content -->
        <kw-step
          :name="2"
          title="step2"
          :done="stepInitNum > 2"
          prefix="2"
        />

        <kw-step
          :name="3"
          title="step3"
          :done="stepInitNum > 3"
          prefix="3"
        />
        <kw-step-panel :name="2">
          <kw-tabs
            model-value="1"
            class="my20"
          >
            <kw-tab
              name="1"
              label="기본속성"
            />
            <kw-tab
              name="2"
              label="관리속성"
            />
            <kw-tab
              name="3"
              label="변경이력"
            />
          </kw-tabs>
          <kw-tab-panels model-value="1">
            <kw-tab-panel name="1">
              <div class="over-width">
                <kw-search>
                  <kw-search-row>
                    <kw-search-item label="abc">
                      <kw-input />
                    </kw-search-item>
                  </kw-search-row>
                </kw-search>
              </div>
              <kw-action-top class="mt40">
                <span class="kw-fc--black3 text-weight-regular"> (단위:원)</span>
              </kw-action-top>
              <div class="grid-blank" />
            </kw-tab-panel>
            <kw-tab-panel name="2">
              aaaa
            </kw-tab-panel>
          </kw-tab-panels>
        </kw-step-panel>
      </kw-stepper>
      <div class="button-set--bottom">
        <div class="button-set--bottom-left">
          <kw-btn
            label="이전"
          />
        </div>
        <div class="button-set--bottom-right">
          <kw-btn
            label="수정"
          />
          <kw-btn
            label="목록"
            class="ml8"
            primary
          />
        </div>
      </div>
    </div>
    <div class="kw-guide pa0">
      <q-card>
        <h3 class="center mb20">
          This is the source code for this page. This part is not included in the coding.
        </h3>
        <guide-code-view
          :code-value="sampleVueCode"
          :lang="'vue'"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const stepInitNum = ref(2);
const sampleVueCode = `
<div class="kw-stepper-headingtext">
  <kw-stepper
    ref="stepper"
    v-model="stepInitNum"
    class="has-search"
  >
    <kw-step
      :name="1"
      title="step1"
      :done="stepInitNum > 1"
      prefix="1"
    />
    <!-- This is only Second step's content -->
    <kw-step
      :name="2"
      title="step2"
      :done="stepInitNum > 2"
      prefix="2"
    >
      <h2>Step2 title</h2>
      <kw-tabs
        model-value="1"
        class="my20"
      >
        <kw-tab
          name="1"
          label="기본속성"
        />
        <kw-tab
          name="2"
          label="관리속성"
        />
        <kw-tab
          name="3"
          label="변경이력"
        />
      </kw-tabs>
      <kw-tab-panels model-value="1">
        <kw-tab-panel name="1">
          <div class="over-width">
            <kw-search>
              <kw-search-row>
                <kw-search-item label="abc">
                  <kw-input />
                </kw-search-item>
              </kw-search-row>
            </kw-search>
          </div>
          <kw-action-top class="mt40">
            <span class="kw-fc--black3 text-weight-regular"> (단위:원)</span>
          </kw-action-top>
          <div
            class="grid-blank"
          />
        </kw-tab-panel>
        <kw-tab-panel name="2">
          aaaa
        </kw-tab-panel>
      </kw-tab-panels>
    </kw-step>
    <kw-step
      :name="3"
      title="step3"
      :done="stepInitNum > 3"
      prefix="3"
    />
  </kw-stepper>
  <div class="button-set--bottom">
    <div class="button-set--bottom-left">
      <kw-btn
        label="이전"
      />
    </div>
    <div class="button-set--bottom-right">
      <kw-btn
        label="수정"
      />
      <kw-btn
        label="목록"
        class="ml8"
        primary
      />
    </div>
  </div>
</div>

`;
</script>

<style lang="scss">
</style>
