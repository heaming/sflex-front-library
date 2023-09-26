/* eslint-disable no-bitwise */
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

  const registeredList = [];
  const values = {};
  const initialValues = {};

  function registerField(fieldCtx) {
    const {
      valueKey,
      value,
      initialValue,
    } = fieldCtx;

    const unwatchValueKey = watch(valueKey, (newValue, oldValue) => {
      delete values[oldValue];
      delete initialValues[oldValue];
      values[newValue] = value.value;
      initialValues[newValue] = initialValue.value;
    });

    const unwatchValue = watch(value, (newValue) => {
      if (Object.hasOwnProperty.call(values, valueKey.value)) {
        values[valueKey.value] = newValue;
      }
    });

    const unwatchInitialValue = watch(initialValue, (newValue) => {
      if (Object.hasOwnProperty.call(initialValues, valueKey.value)) {
        initialValues[valueKey.value] = newValue;
      }
    });

    registeredList.push({
      unwatchValueKey,
      unwatchValue,
      unwatchInitialValue,
      ctx: fieldCtx,
    });

    values[valueKey.value] = value.value;
    initialValues[valueKey.value] = initialValue.value;

    nextTick(() => {
      registeredList.sort((n, o) => {
        const node = n.ctx.el.value;
        const otherNode = o.ctx.el.value;
        const relativePosition = node.compareDocumentPosition(otherNode);
        const isOtherNodeFollowing = relativePosition & Node.DOCUMENT_POSITION_FOLLOWING;

        return isOtherNodeFollowing ? -1 : 1;
      });
    });
  }

  function unregisterField(fieldCtx) {
    const index = registeredList.findIndex((e) => e.ctx === fieldCtx);
    const registered = registeredList[index];

    registered.unwatchValueKey();
    registered.unwatchValue();
    registered.unwatchInitialValue();
    registeredList.splice(index, 1);

    const { valueKey } = fieldCtx;

    delete values[valueKey.value];
    delete initialValues[valueKey.value];
  }

  provide(FormContextKey, {
    values,
    registerField,
    unregisterField,
  });

  function focus() {
    registeredList[0]?.ctx.focus();
  }

  async function init() {
    await Promise.all(
      registeredList.map((e) => e.ctx.init()),
    );
  }

  async function reset(shouldFocus) {
    shouldFocus ??= !props.noResetFocus;

    await Promise.all(
      registeredList.map((e) => (e.ctx.ignoreOnReset.value ? e.ctx.resetValidation() : e.ctx.reset())),
    );

    if (shouldFocus) {
      focus();
    }
  }

  async function resetValidation() {
    await Promise.all(
      registeredList.map((e) => e.ctx.resetValidation()),
    );
  }

  async function validate(shouldFocus, alertMessage = false) {
    shouldFocus ??= !props.noErrorFocus;

    const results = await Promise.all(
      registeredList.map((e) => e.ctx.validate()),
    );

    const invalidIndex = results.findIndex((v) => !v);
    const invalid = invalidIndex > -1;

    if (invalid && shouldFocus) {
      const { ctx } = registeredList[invalidIndex];
      ctx.focus();
      ctx.el?.value?.scrollIntoView({ block: 'center', inline: 'nearest' });
      if (alertMessage) {
        await alert(ctx.invalidMessage.value);
      }
    }

    return !invalid;
  }

  function isModified() {
    return registeredList
      .some((e) => e.ctx.ignoreOnModified.value === false && e.ctx.isModified());
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

  function getInvalidFields() {
    return registeredList
      .filter((e) => e.ctx.invalid.value)
      .map((e) => e.ctx);
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
    getInvalidFields,
  };

  useObserverChild(formCtx);

  return formCtx;
};
