<template>
  <q-input
    ref="inputRef"
    :model-value="value"
    v-bind="{...styleClassAttrs, ...fieldStyleProps}"
    class="kw-field kw-input"
    :class="fieldClass"
    :label="$g.platform.is.mobile ? label : undefined"
    :error="invalid"
    :type="type"
    :debounce="debounce"
    :disable="disable"
    :readonly="readonly"
    :autogrow="autogrow"
    :mask="mask"
    :fill-mask="fillMask"
    :reverse-fill-mask="reverseFillMask"
    :unmasked-value="unmaskedValue"
    :prefix="prefix"
    :suffix="suffix"
    :clearable="clearable"
    :color="color"
    :bg-color="bgColor"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :tabindex="tabindex"
    :min="min"
    :max="max"
    :step="step"
    :input-class="inputClass"
    no-error-icon
    clear-icon="clear"
    @focus="onFocus"
    @blur="onBlur"
    @clear="onClear"
    @keydown="onKeydownInput"
    @change="onChangeInput"
    @update:model-value="onUpdateValue"
  >
    <!-- prepend -->
    <template
      v-if="$slots.prepend"
      #prepend
    >
      <slot name="prepend" />
    </template>

    <!-- append -->
    <template
      v-if="icon || $slots.append"
      #append
    >
      <kw-icon
        v-if="icon"
        :tabindex="-1"
        :name="icon"
        :disable="disable || disableIcon"
        clickable
        @click="onClickIcon?.()"
      />
      <slot name="append" />
    </template>

    <!-- before -->
    <template
      v-if="$slots.before"
      #before
    >
      <slot name="before" />
    </template>

    <!-- after -->
    <template
      v-if="$slots.after"
      #after
    >
      <slot name="after" />
    </template>

    <!-- counter -->
    <template
      v-if="useCounter"
      #counter
    >
      {{ counterText }}
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      {{ invalidMessage }}
      <kw-tooltip
        anchor="center middle"
        show-when-ellipsised
      >
        {{ invalidMessage }}
      </kw-tooltip>
    </template>

    <!-- label -->
    <template
      v-if="$g.platform.is.mobile && (label || $slots.label)"
      #label
    >
      {{ label ?? label }}
    </template>
  </q-input>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import { getMaxByteString, getByte } from '../../utils/string';
import { preventSubmitEnter, stopAndPrevent } from '../../utils/private/event';
import i18n from '../../i18n';

const NAMED_REGEX = {
  alpha: /^[A-Z]*$/i,
  alpha_dash: /^[0-9A-Z_-]*$/i,
  alpha_num: /^[0-9A-Z]*$/i,
  alpha_spaces: /^[A-Z\s]*$/i,
  alpha_underscore: /^[0-9A-Z_]*$/i,
};

export default {
  name: 'KwInput',
  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,

    modelValue: { type: [String, Number], default: undefined },

    // fall through props
    type: { type: String, default: 'text' },
    debounce: { type: [Number, String], default: undefined },
    disable: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    autogrow: { type: Boolean, default: false },
    rows: { type: [Number, String], default: undefined },
    mask: { type: String, default: undefined },
    fillMask: { type: [Boolean, String], default: undefined },
    reverseFillMask: { type: Boolean, default: false },
    unmaskedValue: { type: Boolean, default: true },
    prefix: { type: String, default: undefined },
    suffix: { type: String, default: undefined },
    clearable: { type: Boolean, default: false },
    color: { type: String, default: undefined },
    bgColor: { type: String, default: undefined },
    autofocus: { type: Boolean, default: false },
    placeholder: { type: String, default: i18n.t('MSG_TXT_INP', null, '입력') },
    tabindex: { type: [Number, String], default: undefined },
    min: { type: [Number, String], default: undefined },
    max: { type: [Number, String], default: undefined },
    step: { type: [Number, String], default: undefined },
    onFocus: { type: Function, default: undefined },
    onBlur: { type: Function, default: undefined },
    onClear: { type: Function, default: undefined },
    onKeydown: { type: Function, default: undefined },

    // customize props
    icon: { type: String, default: undefined },
    disableIcon: { type: Boolean, default: false },
    maxlength: { type: [Number, String], default: 0 },
    counter: { type: Boolean, default: false },
    upperCase: { type: Boolean, default: false },
    lowerCase: { type: Boolean, default: false },
    regex: { type: [String, Object], default: undefined, validator: (v) => v instanceof RegExp || !!NAMED_REGEX[v] },
    alignRight: { type: Boolean, default: false },
    spinner: { type: Boolean, default: undefined },
    onClickIcon: { type: Function, default: undefined },

    // when use mask props, keydown event not fired.
    // so use this to block form submit
    preventSubmit: { type: Boolean, default: false },
  },

  emits: [
    'update:modelValue',
  ],

  setup(props) {
    const fieldStyles = useFieldStyle();
    const { fieldStyleProps, fieldClass } = fieldStyles;
    const fieldCtx = useField();
    const { inputRef, value } = fieldCtx;

    function select() {
      inputRef.value.select();
    }

    function onKeydownInput(e) {
      // enter
      if (e.keyCode === 13) {
        const disabled = props.disable || props.disableIcon;

        if (!disabled && props.icon) {
          stopAndPrevent(e);
          props.onClickIcon?.();
        }
      }

      props.onKeydown?.(e);
    }

    const isModifiersTrim = useAttrs().modelModifiers?.trim === true;

    function onChangeInput() {
      if (isModifiersTrim) {
        value.value = props.modelValue;
      }
    }

    const regex = computed(() => {
      const v = props.regex;
      return v && (v instanceof RegExp ? v : NAMED_REGEX[v]);
    });

    const min = computed(() => (props.min === undefined ? -Infinity : parseInt(props.min, 10)));
    const max = computed(() => (props.max === undefined ? Infinity : parseInt(props.max, 10)));

    function onUpdateNumberValue(val) {
      value.value = min(max(val, min.value), max.value);
    }

    function onUpdateTextValue(val) {
      if (val) {
        const el = inputRef.value.getNativeElement();

        // regex
        if (regex.value?.test(val) === false) {
          val = value.value;
          el.value = val;
        }

        // maxlength
        if (props.maxlength) {
          val = getMaxByteString(val, props.maxlength);
          el.value = val;
        }

        // convert case
        if (props.upperCase) {
          val = val.toUpperCase();
          el.value = val;
        } else if (props.lowerCase) {
          val = val.toLowerCase();
          el.value = val;
        }
      }

      value.value = val;
    }

    function onUpdateValue(val) {
      switch (props.type) {
        case 'number':
          return onUpdateNumberValue(val);
        default:
          return onUpdateTextValue(val ?? '');
      }
    }

    const useCounter = computed(() => props.maxlength > 0 && props.counter);
    const counterText = computed(() => (useCounter ? `${getByte(value.value)} / ${props.maxlength}` : null));
    const inputClass = computed(() => ({
      'text-right': props.alignRight,
      'q-no-input-spinner': !props.spinner,
    }));

    onMounted(() => {
      if (props.preventSubmit) {
        const el = inputRef.value.getNativeElement();
        preventSubmitEnter(el);
      }
    });

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      fieldStyleProps,
      fieldClass,
      select,
      onKeydownInput,
      onChangeInput,
      onUpdateValue,
      useCounter,
      counterText,
      inputClass,
    };
  },
};
</script>
