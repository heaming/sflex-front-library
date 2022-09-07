<template>
  <div
    class="kw-field-wrap"
    :class="computedClass"
  >
    <div
      ref="controlRef"
      class="kw-field-wrap__control"
      tabindex="-1"
    >
      <slot />
    </div>
    <div class="kw-field-wrap__bottom">
      <div class="kw-field-wrap__messages">
        <transition name="kw-field-wrap__messages--transition">
          <div
            v-if="showErrorMessage"
            role="alert"
          >
            {{ computedErrorMessage }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import useFieldStateWrap from '../../composables/private/useFieldStateWrap';
import useFieldDense, { useFieldDenseProps } from '../../composables/private/useFieldDense';

export default {
  name: 'KwFieldWrap',

  props: {
    ...useFieldDenseProps,

    error: {
      type: Boolean,
      default: undefined,
    },
    errorMessage: {
      type: String,
      default: undefined,
    },
  },

  emits: ['focus'],

  setup(props, { emit }) {
    const controlRef = ref();

    const { invalid, invalidMessage } = useFieldStateWrap();
    const dense = useFieldDense();

    const showErrorMessage = computed(() => props.error || invalid.value);
    const computedClass = computed(() => ({
      'kw-field-wrap--error': props.error || invalid.value,
      'kw-field-wrap--dense': dense.value,
    }));
    const computedErrorMessage = computed(() => props.errorMessage || invalidMessage.value);

    function focus() {
      controlRef.value.focus();
      emit('focus');
    }

    return {
      controlRef,
      showErrorMessage,
      computedClass,
      computedErrorMessage,
      focus,
    };
  },
};
</script>
