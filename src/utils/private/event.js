export function stop(evt) {
  evt.stopPropagation();
}

export function prevent(evt) {
  if (evt.cancelable !== false) evt.preventDefault();
}

export function stopAndPrevent(evt) {
  if (evt.cancelable !== false) evt.preventDefault();
  evt.stopPropagation();
}
