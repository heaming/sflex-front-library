<template>
  <div
    ref="kwSignRef"
    class="kw-sign"
  >
    <div class="kw-sign__canvas-area">
      <canvas
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
    recentSignSrc: { type: String, default: '' },
    oriSignSrc: { type: String, default: '' },
    width: { type: [String, Number], default: undefined },
    height: { type: [String, Number], default: undefined },
  },

  setup(props) {
    const canvas = ref();
    const kwSignRef = ref();
    let ctx;
    const isSignExist = ref(false);

    function setBackground() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
    }
    function getSignData(type = 'image/png') {
      return canvas.value.toDataURL(type);
    }
    const mouse = ref({
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
    });

    async function initDraw() {
      ctx = canvas.value.getContext('2d');
      setBackground();
      ctx.fillStyle = '#ffffff';

      function setMousePosition(ev) {
        if (ev.layerX || ev.layerX === 0) {
          if (ev.targetTouches?.[0]) { // ios 핸드폰
            const boundingRect = ev.target.getBoundingClientRect();
            mouse.value.x = ev.targetTouches[0].clientX - boundingRect.x;
            mouse.value.y = ev.targetTouches[0].clientY - boundingRect.y;
          } else { // Firefox 브라우저
            mouse.value.x = ev.offsetX;
            mouse.value.y = ev.offsetY;
          }
        } else if (ev.offsetX || ev.offsetX === 0) { // Opera 브라우저
          mouse.value.x = ev.offsetX;
          mouse.value.y = ev.offsetY;
        } else if (ev.targetTouches[0] || ev.targetTouches[0].pageX === 0) { // 안드로이드 핸드폰
          const boundingRect = ev.target.getBoundingClientRect();
          mouse.value.x = ev.targetTouches[0].clientX - boundingRect.x;
          mouse.value.y = ev.targetTouches[0].clientY - boundingRect.y;
        }
      }
      let started = false;

      function onMouseMove(e) {
        setMousePosition(e);
        if (started) {
          ctx.lineTo(mouse.value.x, mouse.value.y);
          ctx.stroke();
          mouse.value.startX = mouse.value.x;
          mouse.value.startY = mouse.value.y;
        }
      }

      function onMouseDown(e) {
        e.preventDefault();
        setMousePosition(e);
        ctx.beginPath();
        ctx.moveTo(mouse.value.x, mouse.value.y);
        started = true;
        isSignExist.value = true;
        mouse.value.startX = mouse.value.x;
        mouse.value.startY = mouse.value.y;
      }

      function onMouseUp() {
        if (started) {
          started = false;
          ctx.beginPath();
          ctx.arc(mouse.value.startX, mouse.value.startY, ctx.lineWidth / 2, 0, 2 * Math.PI);
          ctx.fillStyle = ctx.strokeStyle;
          ctx.fill();
        }
      }

      canvas.value.onmousemove = onMouseMove;

      canvas.value.onmousedown = onMouseDown;

      canvas.value.onmouseup = onMouseUp;

      // canvas.value.touchstart = onMouseDown;
      // canvas.value.touchend = onMouseUp;
      // canvas.value.touchmove = onMouseMove;

      canvas.value.addEventListener('touchmove', (e) => onMouseMove(e, false), false);
      canvas.value.addEventListener('touchstart', (e) => onMouseDown(e, false), false);
      canvas.value.addEventListener('touchend', (e) => onMouseUp(e, false), false);
    }

    function reset() {
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      isSignExist.value = false;
      setBackground();
    }

    function recentSign() {
      reset();
      const image = new Image();
      image.src = props.recentSignSrc;
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
        isSignExist.value = true;
      };
    }

    function setOriginalSign() {
      const image = new Image();
      image.src = props.oriSignSrc;
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
        isSignExist.value = true;
      };
    }

    function downSign() {
      const link = document.createElement('a');
      link.href = canvas.value.toDataURL('image/png');
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

    onMounted(async () => {
      await initDraw();
      setOriginalSign();
    });

    return {
      mouse,
      canvas,
      kwSignRef,
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
