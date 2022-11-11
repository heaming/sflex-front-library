<template>
  <div
    class="kw-field-wrap"
    :class="computedClass"
  >
    <div
      ref="controlRef"
      class="kw-field-wrap__control"
      :class="controlClass"
      tabindex="-1"
    >
      <div
        class="kw-field-wrap__control-container"
      >
        <slot />
        <div
          v-if="showLabel"
          class="kw-field-wrap__label"
        >
          <slot name="label">
            {{ label ?? label }}
          </slot>
        </div>
      </div>
    </div>
    <div class="kw-field-wrap__bottom">
      <template
        v-if="$g.platform.is.mobile"
      >
        <div
          v-if="showErrorMessage"
          class="kw-field-wrap__messages kw-field-wrap__messages--stale"
          role="alert"
        >
          {{ computedErrorMessage }}
          <kw-tooltip
            anchor="center middle"
            show-when-ellipsised
          >
            {{ computedErrorMessage }}
          </kw-tooltip>
        </div>
      </template>
      <transition
        v-else
        name="q-transition--field-message"
      >
        <div
          v-if="showErrorMessage"
          class="kw-field-wrap__messages kw-field-wrap__messages--animated"
          role="alert"
        >
          {{ computedErrorMessage }}
          <kw-tooltip
            anchor="center middle"
            show-when-ellipsised
          >
            {{ computedErrorMessage }}
          </kw-tooltip>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import useFieldStateWrap from '../../composables/private/useFieldStateWrap';
import useDense, { useDenseProps } from '../../composables/private/useDense';
import { platform } from '../../plugins/platform';

export default {
  name: 'KwFieldWrap',

  props: {
    ...useDenseProps,

    label: { type: String, default: undefined },
    controlClass: { type: [Object, Array, String], default: undefined },
    error: { type: Boolean, default: undefined },
    errorMessage: { type: String, default: undefined },
  },

  emits: ['focus'],

  setup(props, { emit, slots }) {
    const controlRef = ref();

    const {
      invalid,
      invalidMessage,
    } = useFieldStateWrap();

    const computedDense = useDense();

    const showErrorMessage = computed(() => props.error || invalid.value);
    const showLabel = computed(() => platform.is.mobile && (props.label || slots.label));
    const computedClass = computed(() => ({
      'kw-field-wrap--error': props.error || invalid.value,
      'kw-field-wrap--dense': computedDense.value,
      'kw-field-wrap--labeled': showLabel.value,
    }));
    const computedErrorMessage = computed(() => props.errorMessage || invalidMessage.value);

    function focus() {
      controlRef.value.focus();
      emit('focus');
    }

    return {
      dense: computedDense,
      controlRef,
      showErrorMessage,
      showLabel,
      computedClass,
      computedErrorMessage,
      focus,
    };
  },
};
</script>
