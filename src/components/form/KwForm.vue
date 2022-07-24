<template>
  <q-form
    v-bind="styleClassAttrs"
    class="kw-form"
    @submit.prevent="onSubmit"
    @reset="onReset"
  >
    <slot />
  </q-form>
</template>

<script>
import { FormTypeContextKey } from '../../consts/private/symbols';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useForm, { useFormProps } from '../../composables/private/useForm';
import { FORM_TYPE } from '../../composables/private/useFormType';

export default {
  name: 'KwForm',
  inheritAttrs: false,

  props: {
    ...useFormProps,
  },

  emits: ['submit', 'reset'],

  setup(props, { emit }) {
    const formCtx = useForm();

    async function onSubmit() {
      const shouldFocus = !props.noErrorFocus;

      if (await formCtx.validate(shouldFocus)) {
        emit('submit', formCtx.values);
      }
    }

    async function onReset() {
      await formCtx.reset();
      await nextTick();
      emit('reset');
    }

    provide(FormTypeContextKey, FORM_TYPE.FORM);

    return {
      ...useInheritAttrs(),
      ...formCtx,
      onSubmit,
      onReset,
    };
  },
};
</script>
