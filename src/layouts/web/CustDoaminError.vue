<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h2">
        해당 페이지로는 접근할 수 없거나, 유효시간이 지났습니다.
      </div>
      <br>
      <div class="text-h3">
        전달받은 url을 확인 및 재시도 부탁드립니다.
      </div>
    </div>
  </div>
</template>

<script setup>
//
</script>

<style lang="scss" scoped>
@media screen and (max-width: 500px) {
  .text-h2 {
    font-size: 1.5rem !important;
  }

  .text-h3 {
    font-size: 1rem !important;
  }
}
</style>
