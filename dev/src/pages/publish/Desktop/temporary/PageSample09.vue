<template>
  <kw-page title="샘플페이지">
    d-pub에 css를 확인하면서 작업해야 하는 경우는 d-lib에서 샘플페이지를 생성하여 확인 후 css를 라이브러리에 넣고 먼저 배포해야 합니다.
  </kw-page>
</template>

<script setup>
</script>
<style scoped lang="scss">
// v-deep 기본 사용법 : 랜더링이 되어야 나타나는 클래스를 잡을 경우 scoped는 v-deep을 사용해 해당 클래스를 선택할 수 있음

::v-deep(.kw-item-type) {
  min-height: auto;
}
</style>
