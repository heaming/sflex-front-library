import { FieldStateWrapContextKey } from '../../consts/private/symbols';

export default () => {
  const registeredList = reactive([]);

  function registerFieldState(fieldCtx) {
    registeredList.push(fieldCtx);
  }

  function unregisterFieldState(fieldCtx) {
    const index = registeredList.findIndex((v) => v === fieldCtx);
    registeredList.splice(index, 1);
  }

  provide(FieldStateWrapContextKey, {
    registerFieldState,
    unregisterFieldState,
  });

  const findInvalidCtx = () => registeredList.find((ctx) => ctx.invalid);
  const invalid = computed(() => findInvalidCtx() !== undefined);
  const invalidMessage = computed(() => findInvalidCtx()?.invalidMessage);

  return {
    invalid,
    invalidMessage,
  };
};
