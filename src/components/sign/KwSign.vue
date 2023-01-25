<template>
  <canvas
    id="drawCanvas"
    ref="canvas"
    :width="width"
    :height="height"
    style="border: 1px solid #ccc;position: relative;"
  />
</template>

<script>
export default {
  name: 'KwSign',
  props: {
    width: { type: String, default: '400' },
    height: { type: String, default: '300' },
  },
  setup() {
    let canvas;
    let ctx;

    function setBackground() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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
      };

      canvas.onmouseup = function onMouseUp() {
        if (started) {
          started = false;
        }
      };
    }

    function reset() {
      ctx.reset();
      setBackground();
    }

    function recentSign() {
      reset();
      const image = new Image();
      image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/%ED%97%88%EA%B2%BD%EC%98%81%EC%84%9C%EB%AA%85.jpg/2338px-%ED%97%88%EA%B2%BD%EC%98%81%EC%84%9C%EB%AA%85.jpg';
      image.crossOrigin = 'Anonymous';
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }

    function downSign() {
      console.log('downSign ... ');
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.target = '_blank';
      link.download = 'test.png';
      link.click();
    }

    onMounted(() => {
      initDraw();
    });

    return {
      downSign,
      reset,
      recentSign,
      setBackground,
    };
  },
};
</script>
