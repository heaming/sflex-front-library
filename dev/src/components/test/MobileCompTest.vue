<template>
  <div>
    <mobile-test-page1 />
    <mobile-test-page2 />
    <mobile-test-page3 />
  </div>
</template>

<script setup>
import MobileTestPage1 from '~dev/components/test/MobileTestPage1.vue';
import MobileTestPage2 from '~dev/components/test/MobileTestPage2.vue';
import MobileTestPage3 from '~dev/components/test/MobileTestPage3.vue';
</script>

<style scoped lang="scss">
body.mobile:not(.tablet) {
  .maybe-window {
    position: fixed;
    inset: 0;
    border: 1px solid black;
    z-index: 2999;
    background-color: #fff;
    overflow: auto;
  }
}

.slot-handler {
  border: 1px solid red;
}

.maybe-page-contents {
  padding: 20px;
}
</style>
