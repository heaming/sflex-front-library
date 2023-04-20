<template>
  <div class="fullscreen bg-white text-center q-pa-md flex flex-center">
    <div>
      <!-- <div class="text-h3">
        {{ $router.currentRoute.value.fullPath }}
      </div>
      <br>
      <div class="text-h2">
        페이지가 존재하지 않거나, 접근할 수 없습니다.
      </div> -->

      <svg
        viewBox="0 0 60 60"
        class="scoped-error--svg"
      >
        <path
          d="m28 0 28 52H0z"
          transform="translate(2 4)"
          style="fill: #ed1941;"
        />
        <text
          data-name="!"
          transform="translate(30 47)"
        ><tspan
          x="-5.55"
          y="0"
        >!</tspan></text>
      </svg>
      <h1 class="scoped-error--h1">
        페이지를 찾을 수 없습니다.
      </h1>
      <p class="scoped-error--p">
        <span>요청하신 페이지가 존재하지 않거나,</span> <span>잘못된 접근입니다.</span><br>
        <span>해당 페이지의 주소를 다시 확인하시거나, </span><br>
        <span>아래 링크를 눌러 홈 화면으로</span> <span>이동해주세요.</span>
      </p>
      <kw-btn
        primary
        to="/"
        class="scoped-error--btn"
        label="이전페이지로 이동"
      />
    </div>
  </div>
</template>

<script setup>
//
</script>
