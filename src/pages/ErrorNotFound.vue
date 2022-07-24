<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h3">
        {{ $router.currentRoute.value.fullPath }}
      </div>
      <br>
      <div class="text-h2">
        페이지가 존재하지 않거나, 접근할 수 없습니다.
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
//
</script>
