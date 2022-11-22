<template>
  <div
    class="kw-field-wrap"
    :class="computedClass"
  >
    <div
      ref="controlRef"
      class="kw-field-wrap__control"
      :class="[controlClass, stretchClasses]"
      tabindex="-1"
    >
      <div
        class="kw-field-wrap__control-container"
        :class="stretchClasses"
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
import useStretch, { useStretchProps } from '../../composables/private/useStretch';

export default {
  name: 'KwFieldWrap',

  props: {
    ...useDenseProps,
    ...useStretchProps,

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
    const { stretchClasses } = useStretch();

    const showErrorMessage = computed(() => props.error || invalid.value);
    const showLabel = computed(() => platform.is.mobile && (props.label || slots.label));

    const computedClass = computed(() => {
      const classes = {
        ...stretchClasses.value,
      };
      classes['kw-field-wrap--error'] = props.error || invalid.value;
      classes['kw-field-wrap--dense'] = computedDense.value;
      classes['kw-field-wrap--labeled'] = showLabel.value;
      classes['kw-field-wrap--auto-height'] = props.autoHeight;
      classes[`kw-field-wrap--col-${cols.value}`] = !!cols.value;
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
      stretchClasses,
    };
  },
};
</script>
