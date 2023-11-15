<template>
  <kw-field-wrap
    ref="inputRef"
    v-bind="{ ...styleClassAttrs, ...fieldWrapProps }"
    :error="invalid"
    :error-message="invalidMessage"
    @focus="$emit('focus')"
  >
    <!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
    <q-btn-toggle
      :model-value="value ?? ''"
      :class="toggleClass"
      :style="toggleStyle"
      :options="styledOptions"
      toggle-color="not-use"
      toggle-text-color="not-use"
      color="not-use"
      text-color="not-use"
      :dense="fieldWrapProps.dense"
      :disable="disable"
      :stack="stack"
      :no-wrap="noWrap"
      :stretch="stretch"
      :clearable="clearable"
      no-caps
      unelevated
      rectangle
      :ripple="false"
      @update:model-value="value = $event"
      @click.native="onClick"
    >
      <template
        v-if="showTooltip && styledOptions[0]"
        #slot0
      >
        <kw-tooltip
          class="tab_tooltip"
        >
          {{ styledOptions[0].slotText }}
        </kw-tooltip>
      </template>
      <template
        v-if="showTooltip && styledOptions[1]"
        #slot1
      >
        <kw-tooltip
          class="tab_tooltip"
        >
          {{ styledOptions[1].slotText }}
        </kw-tooltip>
      </template>
      <template
        v-if="showTooltip && styledOptions[2]"
        #slot2
      >
        <kw-tooltip
          class="tab_tooltip"
        >
          {{ styledOptions[2].slotText }}
        </kw-tooltip>
      </template>
      <template
        v-if="showTooltip && styledOptions[3]"
        #slot3
      >
        <kw-tooltip
          class="tab_tooltip"
        >
          {{ styledOptions[3].slotText }}
        </kw-tooltip>
      </template>
      <template
        v-if="showTooltip && styledOptions[4]"
        #slot4
      >
        <kw-tooltip
          class="tab_tooltip"
        >
          {{ styledOptions[4].slotText }}
        </kw-tooltip>
      </template>
    </q-btn-toggle>
    <!-- eslint-enable vue/no-deprecated-v-on-native-modifier -->
  </kw-field-wrap>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useOptions, { useOptionsProps } from '../../composables/private/useOptions';
import useBtnStyle, { useBtnStyleProps } from '../../composables/private/useBtnStyle';
import useStretch from '../../composables/private/useStretch';
import useFieldWrap, { useFieldWrapProps } from '../../composables/private/useFieldWrap';

export default {
  name: 'KwBtnToggle',
  inheritAttrs: false,
  props: {
    // customize props
    ...useFieldProps,
    ...useOptionsProps,
    ...useBtnStyleProps,
    ...useFieldWrapProps,

    toggleColor: { type: String, default: 'bg-white' },
    toggleTextColor: { type: String, default: 'primary' },
    toggleBorderColor: { type: String, default: 'primary' },

    gap: { type: String, default: '4px' },
    btnWrap: { type: Boolean, default: false },

    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    showTooltip: { type: Boolean, default: false },

    // fall through props
    disable: { type: Boolean, default: false },
    stack: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    onClick: { type: Function, default: null },
  },

  emits: ['update:modelValue', 'focus'],

  setup(props) {
    const { normalizedOptions } = useOptions();

    const { fieldWrapProps } = useFieldWrap({
      dense: true,
    });

    const { buttonClass, buttonStyles } = useBtnStyle({
      color: 'bg-white',
      textColor: 'black3',
      borderColor: 'line-stroke',
      outlined: true,
      dense: true,
    });

    const toggleButtonClass = computed(() => {
      const classes = {
        ...buttonClass.value,
      };
      if (props.toggleColor) {
        classes[`kw-btn--toggle-color-${props.toggleColor}`] = true;
      }
      if (props.toggleTextColor) {
        classes[`kw-btn--toggle-text-color-${props.toggleTextColor}`] = true;
      }
      if (props.toggleBorderColor) {
        classes[`kw-btn--toggle-border-color-${props.toggleBorderColor}`] = true;
      }
      return classes;
    });

    const { stretchClass } = useStretch();

    const toggleClass = computed(() => {
      const classes = {
        'kw-btn-group': true,
        'kw-btn-toggle': true,
        ...stretchClass.value,
      };
      if (props.gap) {
        classes['kw-btn-toggle--spaced'] = true;
      }
      if (props.btnWrap) {
        classes['kw-btn-group--wrap'] = true;
      }
      return classes;
    });

    const toggleStyle = computed(() => {
      let styles = '';
      styles += props.gap ? `gap: ${props.gap}; ` : '';
      return styles;
    });

    const assignOptionStyle = (v, idx) => ({
      ...v,
      class: toggleButtonClass.value,
      style: buttonStyles.value,
      slot: `slot${idx}`,
      slotText: v.slotText ? v.slotText : v.label,
    });

    const styledOptions = computed(() => normalizedOptions.value.map(assignOptionStyle));

    return {
      ...useInheritAttrs(),
      ...useField(),
      fieldWrapProps,
      styledOptions,
      toggleClass,
      toggleStyle,
    };
  },
};
</script>
