<template>
  <q-form
    v-bind="styleClassAttrs"
    class="kw-form"
    :class="{'kw-form--no-padding': oneRow, 'kw-form--dense' : dense, 'kw-form--auto-height': autoHeight }"
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
import useFormLayout, { useFormLayoutProps } from '../../composables/private/useFormLayout';

export default {
  name: 'KwForm',
  inheritAttrs: false,

  props: {
    ...useFormProps,
    ...useFormLayoutProps,

    oneRow: {
      type: Boolean,
      default: false,
    },

    dense: {
      type: Boolean,
      default: false,
    },

    autoHeight: {
      type: Boolean,
      default: false,
    },
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
      emit('reset');
    }

    // form type injection
    provide(FormTypeContextKey, FORM_TYPE.FORM);

    useFormLayout();

    return {
      ...useInheritAttrs(),
      ...formCtx,
      onSubmit,
      onReset,
    };
  },
};
</script>
