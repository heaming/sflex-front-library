<template>
  <guide-popup-view>
    <kw-popup
      class="kw-popup--md"
      title="조회 팝업"
    >
      내용(Content)<br>
      Content Area
    </kw-popup>
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
  </guide-popup-view>
</template>

<script setup>

const sampleVueCode = `
<kw-popup
  class="kw-popup--lg"
  title="조회 팝업"
>
  내용(Content)<br>
  Content Area
</kw-popup>`;

</script>
