<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      [Mobile] Img
    </h2>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        Step
      </h3>
      <ul class="pl20">
        <li>
          1. If you need a temporary image for the PUBLISH, download the image provided
          in Zeplin and request if there is no data available.
        </li>
        <li class="mt10">
          <div class="row items-center no-wrap">
            <p class="mr20">
              2. And put the downloaded image in the src>assets>images folder and load it as below and use it.
            </p>
            <img
              src="~~dev/assets/images/example_structure.png"
              alt="temp"
              class="h400"
            >
          </div>
        </li>
        <li class="mt10">
          <span class="notice">3. src/url</span> <br>
          - in IMG tag src="~~/assets/images/filename" <br>
          - in style tag background img url(~/assets/images/filename)
        </li>
      </ul>
    </div>
    <kw-separator />
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        About <em class="kkk">ICON</em>
      </h3>
      <ul class="pl20">
        <li>
          If you need an icon, look it up in the icon list on the <router-link to="/Publish/Common/Icons">
            screen.
          </router-link>
          And about the new one, tag '@zyekim' or '@sueun' on the Zeplin screen to request it. <br>
          (take 1~2days after check your comment)
        </li>
      </ul>
    </div>
  </kw-page>
</template>

<style lang="scss" scoped>
.kkk {
  font-size: 22px;
  animation-duration: 3s;
  animation-name: rainbow;
  animation-iteration-count: infinite;
}

@keyframes rainbow {
  0% {
    color: #ff2a2a;
  }

  15% {
    color: #ff7a2a;
  }

  30% {
    color: #ffc52a;
  }

  45% {
    color: #43ff2a;
  }

  60% {
    color: #2a89ff;
  }

  75% {
    color: #202082;
  }

  90% {
    color: #6b2aff;
  }

  100% {
    color: #e82aff;
  }
}
</style>
