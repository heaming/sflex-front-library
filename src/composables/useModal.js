import { PopupContainerContextKey } from '../consts/private/symbols';

export default () => {
  const { close } = inject(PopupContainerContextKey, {});

  function ok(payload) {
    close(true, payload);
  }

  function cancel(payload) {
    close(false, payload);
  }

  return {
    ok,
    cancel,
  };
};
