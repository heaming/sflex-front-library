import { alert, confirm } from '../../plugins/dialog';
import { ObserverContextKey } from '../../consts/private/symbols';
import useObserverChild, { useObserverChildProps } from './useObserverChild';
import i18n from '../../i18n';

export const useObserverProps = {
  ...useObserverChildProps,
};

export default () => {
  const registered = {};

  function registerObserverChild(observerChildctx) {
    const { uid } = observerChildctx;
    registered[uid] = observerChildctx;
  }

  function unregisterObserverChild(observerChildctx) {
    const { uid } = observerChildctx;
    delete registered[uid];
  }

  function getRegisteredChild(name) {
    return Object.values(registered)
      .find((v) => v.name.value === name);
  }

  provide(ObserverContextKey, {
    registerObserverChild,
    unregisterObserverChild,
    getRegisteredChild,
  });

  async function init() {
    await Promise.all(
      Object.values(registered)
        .map((e) => e.ctx.init?.()),
    );
  }

  async function reset(shouldFocus) {
    await Promise.all(
      Object.values(registered)
        .map((e) => !e.ignoreOnReset.value && e.ctx.reset?.(shouldFocus)),
    );
  }

  async function resetValidation() {
    await Promise.all(
      Object.values(registered)
        .map((e) => e.ctx.resetValidation?.()),
    );
  }

  async function validate(shouldFocus) {
    const registeredArr = Object.values(registered);
    const results = await Promise.all(
      registeredArr.map((e) => e.ctx.validate?.(false)),
    );

    const invalidIndex = results.findIndex((v) => !v);
    const invalid = invalidIndex > -1;

    if (invalid) {
      await registeredArr[invalidIndex].ctx.validate?.(shouldFocus);
    }

    return !invalid;
  }

  function isModified() {
    return Object.values(registered)
      .some((e) => !e.ignoreOnModified.value && e.ctx.isModified?.());
  }

  async function alertIfIsNotModified(message) {
    const isNotModified = !isModified();

    if (isNotModified) {
      await alert(message || i18n.t('MSG_ALT_NO_CHG_CNTN'));
    }

    return isNotModified;
  }

  function confirmIfIsModified(message) {
    return !isModified() || confirm(message || i18n.t('MSG_ALT_CHG_CNTN'));
  }

  const observerCtx = {
    init,
    reset,
    resetValidation,
    validate,
    isModified,
    alertIfIsNotModified,
    confirmIfIsModified,
  };

  useObserverChild(observerCtx);

  return observerCtx;
};
