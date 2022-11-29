import { uniqueId } from 'lodash-es';

const NativeEventKey = Symbol.for('__NativeEvent__');
const uid = () => uniqueId(NativeEventKey);

export function createNativeEventBus() {
  const registeredEvents = {};

  function on(listener) {
    const id = uid();

    registeredEvents[id] = {
      id,
      listener,
    };

    return id;
  }

  function off(id) {
    registeredEvents[id] = null;
    delete registeredEvents[id];
  }

  function once(listener) {
    const id = on(
      (...args) => {
        off(id);
        listener(...args);
      },
    );

    return id;
  }

  function emit(id, ...args) {
    const registeredEvent = registeredEvents[id];

    if (registeredEvent) {
      registeredEvent.listener(...args);
    }
  }

  return {
    on,
    off,
    once,
    emit,
  };
}
