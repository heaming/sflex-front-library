<template>
  <guide-popup-view>
    <kw-popup
      class="kw-popup--lg"
      title="타이틀"
    >
      <kw-chip
        label="판매완료"
        color="primary"
        outline
      />
      <h2 class="h2-small">
        호시탐탐 문화유산(상품코드) <p><span>등록일 2022-08-01  /  김준</span><span>최종수정일 2022-04-09  / 임동욱</span></p>
      </h2>
      <kw-tabs
        model-value="1"
        class="kw-tab--dense mt20"
      >
        <!-- in page: mt30, in popup: mt20-->
        <kw-tab
          name="1"
          label="조직별"
        />
        <kw-tab
          name="2"
          label="개인별"
        />
      </kw-tabs>
      <kw-tab-panels model-value="1">
        <kw-tab-panel name="1">
          This sample page is ing.
        </kw-tab-panel>
        <kw-tab-panel name="2">
          This sample page is ing.
        </kw-tab-panel>
      </kw-tab-panels>
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
      <template #action>
        <kw-btn
          negative
          label="취소"
        />
        <kw-btn
          primary
          class="ml8"
          label="확인"
        />
      </template>
    </kw-popup>
  </guide-popup-view>
</template>

<script setup>

const sampleVueCode = `
<kw-popup
  class="kw-popup--lg"
  title="타이틀"
>
  <kw-chip
    label="판매완료"
    color="primary"
    outline
  />
  <h2 class="h2-small">호시탐탐 문화유산(상품코드) <p><span>등록일 2022-08-01  /  김준</span><span>최종수정일 2022-04-09  / 임동욱</span></p> </h2>
  <kw-tabs
    model-value="1"
    class="kw-tab--dense mt20"
  >
    <!-- in page: mt30, in popup: mt20-->
    <kw-tab
      name="1"
      label="조직별"
    />
    <kw-tab
      name="2"
      label="개인별"
    />
  </kw-tabs>
  <kw-tab-panels model-value="1">
    <kw-tab-panel name="1">
      This sample page is ing.
    </kw-tab-panel>
    <kw-tab-panel name="2">
      This sample page is ing.
    </kw-tab-panel>
  </kw-tab-panels>
  <template #action>
    <kw-btn
      negative
      label="취소"
    />
    <kw-btn
      primary
      class="ml8"
      label="확인"
    />
  </template>
</kw-popup>
`;

</script>
