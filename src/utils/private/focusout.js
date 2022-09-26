import { Platform } from 'quasar';

const handlers = [];

function trigger(e) {
  handlers[handlers.length - 1](e);
}

export function addFocusout(fn) {
  if (Platform.is.desktop === true) {
    handlers.push(fn);

    if (handlers.length === 1) {
      document.body.addEventListener('focusin', trigger, true);
    }
  }
}

export function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index > -1) {
    handlers.splice(index, 1);

    if (handlers.length === 0) {
      document.body.removeEventListener('focusin', trigger, true);
    }
  }
}
