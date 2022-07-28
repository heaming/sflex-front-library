export function stop(e) {
  e.stopPropagation();
}

export function prevent(e) {
  if (e.cancelable !== false) e.preventDefault();
}

export function stopAndPrevent(e) {
  if (e.cancelable !== false) e.preventDefault();
  e.stopPropagation();
}

export function preventSubmitEnter(target) {
  const input = target.value?.getNativeElement?.() || target.value?.$el || target.value;

  input.addEventListener('focus', (e) => {
    e.target.__oldValue__ = e.target.value;
  });

  input.addEventListener('keydown', (e) => {
    const shouldPrevent = e.key === 'Enter' || e.keyCode === 13;

    if (shouldPrevent) {
      if (e.target.value !== e.target.__oldValue__) {
        e.target.dispatchEvent(
          new Event('change', {
            bubbles: true,
            cancelable: false,
          }),
        );

        setTimeout(() => {
          e.target.__oldValue__ = e.target.value;
        });
      }

      if (e.cancelable !== false) {
        e.preventDefault();
      }
    }
  });
}
