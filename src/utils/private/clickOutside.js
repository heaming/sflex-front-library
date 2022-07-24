const registeredList = [];

let timer;

function registerHandler(clickOutsideProps) {
  function handler(evt) {
    clearTimeout(timer);

    const { target } = evt;

    if (
      target === undefined
      || target.nodeType === 8
      || target.classList.contains('no-pointer-events') === true
    ) {
      return;
    }

    const { innerRefs, onClickOutside } = clickOutsideProps;

    if (innerRefs === undefined || typeof onClickOutside !== 'function') {
      return;
    }

    const innerEls = innerRefs?.map((e) => e.value?.$el || e.value);
    const isOutside = !innerEls.some((e) => e?.contains(target));

    if (isOutside) {
      evt.__ClickOutside__ = true;
      onClickOutside(evt);
    }
  }

  document.addEventListener('mousedown', handler, true);
  document.addEventListener('touchstart', handler, true);

  return handler;
}

export function addClickOutside(clickOutsideProps) {
  registeredList.push([
    clickOutsideProps,
    registerHandler(clickOutsideProps),
  ]);
}

export function removeClickOutside(clickOutsideProps) {
  const index = registeredList.findIndex((e) => e[0] === clickOutsideProps);

  if (index > -1) {
    const [, handler] = registeredList.splice(index, 1)[0];

    clearTimeout(timer);
    document.removeEventListener('mousedown', handler, true);
    document.removeEventListener('touchstart', handler, true);
  }
}
