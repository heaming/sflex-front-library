export function preventSubmitEnter(inputRef) {
  const input = inputRef.value.getNativeElement?.()
    || (inputRef.value.$el || inputRef.value).querySelector('input');

  input.addEventListener('focus', (evt) => {
    evt.target.__oldValue__ = evt.target.value;
  });

  input.addEventListener('keydown', (evt) => {
    const shouldPrevent = evt.key === 'Enter' || evt.keyCode === 13;

    if (shouldPrevent) {
      if (evt.target.value !== evt.target.__oldValue__) {
        evt.target.dispatchEvent(
          new Event('change', {
            bubbles: true,
            cancelable: false,
          }),
        );

        setTimeout(() => {
          evt.target.__oldValue__ = evt.target.value;
        });
      }

      if (evt.cancelable !== false) {
        evt.preventDefault();
      }
    }
  });
}
