import { FormContextKey } from '../../consts/private/symbols';
import useObserverChild, { useObserverChildProps } from './useObserverChild';
import { alert, confirm } from '../../plugins/dialog';
import i18n from '../../i18n';

export const useFormProps = {
  ...useObserverChildProps,

  autofocus: {
    type: Boolean,
    default: false,
  },
  noErrorFocus: {
    type: Boolean,
    default: false,
  },
  noResetFocus: {
    type: Boolean,
    default: true,
  },
};

export default () => {
  const { props } = getCurrentInstance();

  const registered = {};
  const values = reactive({});

  function registerField(fieldCtx) {
    const { uid, value, valueKey } = fieldCtx;

    const unwatchValueKey = watch(valueKey, (newValue, oldValue) => {
      delete values[oldValue];
      values[newValue] = value.value;
    });

    const unwatchValue = watch(value, (newValue) => {
      if (Object.hasOwnProperty.call(values, valueKey.value)) {
        values[valueKey.value] = newValue;
      }
    });

    registered[uid] = {
      unwatchValueKey,
      unwatchValue,
      ctx: fieldCtx,
    };

    values[valueKey.value] = value.value;
  }

  function unregisterField(fieldCtx) {
    const { uid, valueKey } = fieldCtx;
    const { unwatchValueKey, unwatchValue } = registered[uid];

    unwatchValueKey();
    unwatchValue();

    delete registered[uid];
    delete values[valueKey.value];
  }

  provide(FormContextKey, {
    values,
    registerField,
    unregisterField,
  });

  function focus() {
    Object.values(registered)[0]?.ctx.focus();
  }

  async function init() {
    await Promise.all(
      Object.values(registered)
        .map((e) => e.ctx.init()),
    );
  }

  async function reset(shouldFocus) {
    shouldFocus ??= !props.noResetFocus;

    await Promise.all(
      Object.values(registered)
        .map((e) => (e.ignoreOnReset.value ? e.ctx.resetValidation() : e.ctx.reset())),
    );

    if (shouldFocus) {
      focus();
    }
  }

  async function resetValidation() {
    await Promise.all(
      Object.values(registered)
        .map((e) => e.ctx.resetValidation()),
    );
  }

  async function validate(shouldFocus, alertMessage = false) {
    shouldFocus ??= !props.noErrorFocus;

    const registeredArr = Object.values(registered);
    const results = await Promise.all(
      registeredArr.map((e) => e.ctx.validate()),
    );

    const invalidIndex = results.findIndex((v) => !v);
    const invalid = invalidIndex > -1;

    if (invalid && shouldFocus) {
      const { ctx } = registeredArr[invalidIndex];
      ctx.focus();

      if (alertMessage) {
        await alert(ctx.invalidMessage.value);
      }
    }

    return !invalid;
  }

  function isModified() {
    return Object.values(registered)
      .some((e) => e.ignoreOnModified.value === false && e.ctx.isModified());
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

  onMounted(() => {
    if (props.autofocus) {
      focus();
    }
  });

  const formCtx = {
    values,
    focus,
    init,
    reset,
    resetValidation,
    validate,
    isModified,
    alertIfIsNotModified,
    confirmIfIsModified,
  };

  useObserverChild(formCtx);

  return formCtx;
};
