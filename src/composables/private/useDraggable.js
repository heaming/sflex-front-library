const { min, max } = Math;

export const useDraggableProps = {
  draggable: {
    type: Boolean,
    default: false,
  },
};

export default (containerRef) => {
  const { props } = getCurrentInstance();

  const translate = reactive({ x: 0, y: 0 });
  const transform = computed(() => `translate(${translate.x}px, ${translate.y}px)`);

  let sPositionX;
  let sPositionY;
  let sTranslateX;
  let sTranslateY;

  function onMove(evt) {
    const { clientX, clientY } = evt.touches?.[0] || evt;

    let nTranslateX = sTranslateX + clientX - sPositionX;
    let nTranslateY = sTranslateY + clientY - sPositionY;

    if (containerRef) {
      const el = containerRef.value.$el || containerRef.value;
      const { width, height } = el.getBoundingClientRect();

      const absTranslateX = (document.body.clientWidth - width) / 2;
      const absTranslateY = (window.innerHeight - height) / 2;

      nTranslateX = translate.x > nTranslateX
        ? max(nTranslateX, -absTranslateX) : min(nTranslateX, absTranslateX);

      nTranslateY = translate.y > nTranslateY
        ? max(nTranslateY, -absTranslateY) : min(nTranslateY, absTranslateY);
    }

    translate.x = nTranslateX;
    translate.y = nTranslateY;
  }

  function onFinish() {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('mouseup', onFinish);
    window.removeEventListener('touchend', onFinish);
  }

  function onStart(evt) {
    if (props.draggable) {
      const { clientX, clientY } = evt.touches?.[0] || evt;

      sPositionX = clientX;
      sPositionY = clientY;
      sTranslateX = translate.x;
      sTranslateY = translate.y;

      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', onFinish);
      window.addEventListener('touchend', onFinish);
    }
  }

  const events = {
    onMousedown: onStart,
    onTouchstart: onStart,
  };

  return {
    transform,
    events,
  };
};
