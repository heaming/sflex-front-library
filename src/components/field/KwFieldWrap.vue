<template>
  <div
    :class="fieldWrapClass"
  >
    <div
      ref="controlRef"
      class="kw-field-wrap__control"
      :class="stretchClass"
      tabindex="-1"
    >
      <div
        class="kw-field-wrap__control-container"
        :class="[controlClass, stretchClass]"
      >
        <slot />
        <div
          v-if="showLabel"
          class="kw-field-wrap__label"
        >
          <slot name="label">
            <span>{{ label ?? label }}</span>
            <q-icon
              v-if="hint"
              size="16px"
              name="info"
              style="vertical-align: -3px;"
              @click="toggleHint"
            >
              <kw-tooltip
                v-model="showingHint"
                :offset="[0, 3]"
              >
                <!-- eslint-disable vue/no-v-html -->
                <slot
                  name="hint"
                >
                  <div v-html="sanitize(hint)" />
                </slot>
                <!-- eslint-enable vue/no-v-html -->
              </kw-tooltip>
            </q-icon>
          </slot>
        </div>
      </div>
    </div>
    <div
      v-if="!doNotRenderBottom"
      class="kw-field-wrap__bottom"
      :class="computedBottomClass"
    >
      <template
        v-if="$g.platform.is.mobile"
      >
        <div
          class="kw-field-wrap__messages"
          role="alert"
        >
          {{ computedErrorMessage }}
          <kw-tooltip
            anchor="center middle"
            :offset="[0, 3]"
            show-when-ellipsised
          >
            {{ computedErrorMessage }}
          </kw-tooltip>
        </div>
      </template>
      <template v-else>
        <Transition
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
              :offset="[0, 3]"
              show-when-ellipsised
              class="ellipsis_tooltip"
            >
              {{ computedErrorMessage }}
            </kw-tooltip>
          </div>
        </Transition>
      </template>
    </div>
  </div>
</template>

<script>
import { platform } from '../../plugins/platform';
import useFormLayout from '../../composables/private/useFormLayout';
import useStretch from '../../composables/private/useStretch';
import useFieldStateWrap from '../../composables/private/useFieldStateWrap';
import useFieldWrap, { useFieldWrapProps } from '../../composables/private/useFieldWrap';
import { sanitize } from '../../plugins/sanitize';

export default {
  name: 'KwFieldWrap',

  props: {
    ...useFieldWrapProps,
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

    const { cols } = useFormLayout();
    const { stretchClass } = useStretch();
    const { fieldWrapProps, showingHint, toggleHint } = useFieldWrap({ autoHeight: true });

    const showErrorMessage = computed(() => props.error || invalid.value);
    const computedErrorMessage = computed(() => props.errorMessage || invalidMessage.value);

    const showLabel = computed(() => platform.is.mobile && (fieldWrapProps.value.label || slots.label));

    const computedHideBottom = computed(() => fieldWrapProps.value.hideBottomSpace ?? platform.is.mobile);
    const doNotRenderBottom = computed(() => computedHideBottom.value && !showErrorMessage.value);
    const computedBottomClass = computed(() => {
      const classes = [];
      classes.push(platform.is.mobile ? 'kw-field-wrap__bottom--stale' : 'kw-field-wrap__bottom--animated');
      return classes;
    });

    const fieldWrapClass = computed(() => {
      const classes = {
        ...stretchClass.value,
      };
      classes['kw-field-wrap'] = true;
      classes['kw-field-wrap--error'] = showErrorMessage.value;
      classes['kw-field-wrap--dense'] = fieldWrapProps.value.dense;
      classes['kw-field-wrap--labeled'] = showLabel.value;
      classes['kw-field-wrap--required'] = fieldWrapProps.value.required;
      classes['kw-field-wrap--auto-height'] = fieldWrapProps.value.autoHeight;
      classes['kw-field-wrap--multiline'] = fieldWrapProps.value.multiline;
      classes['kw-field-wrap--stack'] = fieldWrapProps.value.stack;
      classes[`kw-field-wrap--col-${cols.value}`] = !!cols.value;
      return classes;
    });

    function focus() {
      controlRef.value.focus();
      emit('focus');
    }

    return {
      controlRef,
      showErrorMessage,
      showLabel,
      fieldWrapClass,
      computedErrorMessage,
      computedBottomClass,
      focus,
      stretchClass,
      doNotRenderBottom,
      showingHint,
      toggleHint,
      sanitize,
    };
  },
};
</script>
