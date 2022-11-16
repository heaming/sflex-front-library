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
    <div
      v-if="showErrorMessage"
      class="kw-field-wrap__bottom"
      :class="computedBottomClass"
    >
      <template
        v-if="$g.platform.is.mobile"
      >
        <div
          v-if="showErrorMessage"
          class="kw-field-wrap__messages"
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
          class="kw-field-wrap__messages"
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
import useFormLayout from '../../composables/private/useFormLayout';

export default {
  name: 'KwFieldWrap',

  props: {
    ...useDenseProps,

    label: { type: String, default: undefined },
    controlClass: { type: [Object, Array, String], default: undefined },
    error: { type: Boolean, default: undefined },
    errorMessage: { type: String, default: undefined },
    autoHeight: { type: Boolean, default: true },
  },

  emits: ['focus'],

  setup(props, { emit, slots }) {
    const controlRef = ref();

    const {
      invalid,
      invalidMessage,
    } = useFieldStateWrap();

    const computedDense = useDense();
    const { cols } = useFormLayout();

    const showErrorMessage = computed(() => props.error || invalid.value);
    const showLabel = computed(() => platform.is.mobile && (props.label || slots.label));
    const computedClass = computed(() => {
      const classes = [];
      if (props.error || invalid.value) { classes.push('kw-field-wrap--error'); }
      if (computedDense.value) { classes.push('kw-field-wrap--dense'); }
      if (showLabel.value) { classes.push('kw-field-wrap--labeled'); }
      if (props.autoHeight) { classes.push('kw-field-wrap--auto-height'); }
      if (cols.value) { classes.push(`kw-field-wrap--col-${cols.value}`); }
      return classes;
    });
    const computedErrorMessage = computed(() => props.errorMessage || invalidMessage.value);
    const computedBottomClass = computed(() => {
      const classes = [];
      classes.push(platform.is.mobile ? 'kw-field-wrap__bottom--stale' : 'kw-field-wrap__bottom--animated');
      return classes;
    });

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
      computedBottomClass,
      focus,
    };
  },
};
</script>
