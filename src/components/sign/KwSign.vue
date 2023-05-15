<template>
  <div class="kw-sign">
    <div class="kw-sign__canvas-area">
      <canvas
        id="drawCanvas"
        ref="canvas"
        :width="computedWidth"
        :height="computedHeight"
        class="kw-sign__canvas"
      />
      <p
        v-if="!isSignExist"
        class="kw-sign__placeholder"
      >
        여기에 서명해 주세요
      </p>
    </div>
    <div class="kw-sign__action">
      <kw-btn
        v-if="needRecentSign"
        label="최근서명"
        secondary
        dense
        :border-color="$g.platform.is.mobile ? 'line-stroke' : '' "
        @click="recentSign"
      />
      <kw-btn
        label="재입력"
        secondary
        dense
        :border-color="$g.platform.is.mobile ? 'line-stroke' : '' "
        @click="reset"
      />
    </div>
  </div>
</template>

<script>
import { platform } from '../../plugins/platform';

export default {
  name: 'KwSign',
  props: {
    needRecentSign: { type: Boolean, default: true },
    recentSignSrc: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/%ED%97%88%EA%B2%BD%EC%98%81%EC%84%9C%EB%AA%85.jpg/2338px-%ED%97%88%EA%B2%BD%EC%98%81%EC%84%9C%EB%AA%85.jpg' },
    width: { type: [String, Number], default: undefined },
    height: { type: [String, Number], default: undefined },
  },

  setup(props) {
    let canvas;
    let ctx;
    const isSignExist = ref(false);

    function setBackground() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function getSignData() {
      return canvas.toDataURL();
    }

    function initDraw() {
      canvas = document.getElementById('drawCanvas');
      ctx = canvas.getContext('2d');
      setBackground();
      ctx.fillStyle = '#ffffff';
      const mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
      };

      function setMousePosition(ev) {
        if (ev.layerX || ev.layerX === 0) { // Firefox 브라우저
          mouse.x = ev.offsetX;
          mouse.y = ev.offsetY;
        } else if (ev.offsetX || ev.offsetX === 0) { // Opera 브라우저
          mouse.x = ev.offsetX;
          mouse.y = ev.offsetY;
        } else if (ev.targetTouches[0] || ev.targetTouches[0].pageX === 0) { // 핸드폰
          let left = 0;
          let top = 0;
          let elem = canvas;

          while (elem) {
            left += parseInt(elem.offsetLeft, 10);
            top += parseInt(elem.offsetTop, 10);
            elem = elem.offsetParent;
          }

          mouse.x = ev.targetTouches[0].pageX - left;
          mouse.y = ev.targetTouches[0].pageY - top;
        }
      }
      let started = false;

      canvas.onmousemove = function onMouseMove(e) {
        setMousePosition(e);
        if (started) {
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      };

      canvas.onmousedown = function onMouseDown(e) {
        setMousePosition(e);
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        started = true;
        isSignExist.value = true;
      };

      canvas.onmouseup = function onMouseUp() {
        if (started) {
          started = false;
        }
      };
    }

    function reset() {
      ctx.reset();
      isSignExist.value = false;
      setBackground();
    }

    function recentSign() {
      reset();
      const image = new Image();
      image.src = props.recentSignSrc;
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        isSignExist.value = true;
      };
    }

    function downSign() {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.target = '_blank';
      link.download = 'test.png';
      link.click();
    }

    const computedWidth = computed(() => {
      if (props.width) return props.width;
      if (platform.is.desktop) return 300;
      if (platform.is.mobile) return 320;
      if (platform.is.tablet) return 536;
    });

    const computedHeight = computed(() => {
      if (props.height) return props.height;
      if (platform.is.desktop) return 150;
      if (platform.is.mobile) return 180;
      if (platform.is.tablet) return 300;
    });

    onMounted(() => {
      initDraw();
    });

    return {
      downSign,
      reset,
      recentSign,
      setBackground,
      isSignExist,
      computedWidth,
      computedHeight,
      getSignData,
    };
  },
};
</script>
