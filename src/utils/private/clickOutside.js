const registeredList = [];

let timer;

function registerHandler(clickOutsideProps) {
  function handler(e) {
    clearTimeout(timer);

    const { target } = e;

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

    const innerEls = innerRefs?.map((v) => v.value?.getNativeElement?.() || v.value?.$el || v.value);
    const isOutside = !innerEls.some((v) => v?.contains(target));

    if (isOutside) {
      e.__ClickOutside__ = true;
      onClickOutside(e);
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
  const index = registeredList.findIndex((v) => v[0] === clickOutsideProps);

  if (index > -1) {
    const [, handler] = registeredList.splice(index, 1)[0];

    clearTimeout(timer);
    document.removeEventListener('mousedown', handler, true);
    document.removeEventListener('touchstart', handler, true);
  }
}
