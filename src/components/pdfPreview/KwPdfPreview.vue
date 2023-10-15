<template>
  <vue-pdf-app
    :pdf="pdf"
    :title="title"
    :theme="theme"
    :file-name="fileName"
    :page-scale="pageScale"
    :page-number="pageNumber"
    :config="config"
    :id-config="idConfig"
    :style="{ 'height': $g.platform.is.desktop ? 'calc(100vh - 320px)' : 'calc(100vh - 55px)' }"
    @after-created="onAfterCreated()"
    @open="onOpenPdf()"
    @paged-rendered="onPageRendered()"
  />
</template>

<script>
import VuePdfApp from 'vue3-pdf-app';

export default {
  name: 'KwPdfPreview',
  components: {
    VuePdfApp,
  },
  props: {
    pdf: { type: [String, ArrayBuffer, Array], default: null },
    title: { type: Boolean, default: false }, // true값이면 문서 제목을 PDF 제목으로 재정의함.
    theme: { type: String, default: null }, // dark, light
    fileName: { type: String, default: null },

    // String은 "page-actual"| "page-width"| "page-height"| "page-fit"| "auto" 만 가능
    pageScale: { type: [Number, String], default: 20 },
    pageNumber: { type: Number, default: 1 }, // 페이지 넘버

    // https://www.npmjs.com/package/vue3-pdf-app 의 config 참조
    config: { type: Object, default: () => {} },
    // https://www.npmjs.com/package/vue3-pdf-app 의 idConfig 참조
    idConfig: { type: Object, default: () => {} },
    onAfterCreated: { type: Function, default: undefined },
    onOpenPdf: { type: Function, default: undefined },
    onPageRendered: { type: Function, default: undefined },
  },
  setup() {
    return {
    };
  },
};
</script>
