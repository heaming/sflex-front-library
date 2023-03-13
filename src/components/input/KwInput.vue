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
    :rows="rows"
    :cols="cols"
    :autogrow="autogrow"
    :mask="computedMask"
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
    :input-class="computedInputClass"
    :input-style="inputStyle"
    no-error-icon
    clear-icon="clear"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydownInput"
    @clear="onClearInput"
    @change="onChangeInput"
    @update:model-value="onUpdateValue"
  >
    <!-- default -->
    <template
      v-if="$slots.default"
      #default
    >
      <slot />
    </template>

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
      v-if="inputCounter"
      #counter
    >
      {{ inputCounter }}
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
      <q-icon
        v-if="hint"
        size="16px"
        name="info"
        @click="toggleHint"
      >
        <kw-tooltip v-model="showingHint">
          <slot name="hint">
            {{ hint }}
          </slot>
        </kw-tooltip>
      </q-icon>
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
  num: /^[0-9]*$/i,
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
    cols: { type: [Number, String], default: undefined },
    mask: { type: String, default: undefined },
    fillMask: { type: [Boolean, String], default: false },
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
    align: { type: String, default: undefined },
    inputClass: { type: [Array, String, Object], default: undefined },
    inputStyle: { type: [Array, String, Object], default: undefined },

    // customize props
    icon: { type: String, default: undefined },
    disableIcon: { type: Boolean, default: false },
    maxlength: { type: [Number, String], default: 0 },
    counter: { type: Boolean, default: false },
    upperCase: { type: Boolean, default: false },
    lowerCase: { type: Boolean, default: false },
    regex: { type: [String, Object], default: undefined, validator: (v) => v instanceof RegExp || !!NAMED_REGEX[v] },
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
    const fieldCtx = useField({ onChangeValue: () => {} });
    const { inputRef, value, showingHint, toggleHint } = fieldCtx;

    const computedInputClass = computed(() => {
      const classes = {
        'q-no-input-spinner': !props.spinner,
      };
      if (props.align) { classes[`text-${props.align}`] = true; }
      if (props.inputClass) { return [props.inputClass, classes]; }
      return classes;
    });

    const inputCounter = computed(() => {
      if (props.counter === true && props.maxlength > 0) {
        return `${getByte(value.value ?? '')} / ${props.maxlength}`;
      }
    });

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
    const isModifiersNumber = useAttrs().modelModifiers?.number === true;

    const clearValue = computed(() => (props.type === 'number' && isModifiersNumber ? null : ''));

    function onClearInput(val) {
      props.onClear?.(val);
      props.onChange?.(clearValue.value);
    }

    function onChangeInput(val) {
      if (isModifiersTrim) {
        value.value = props.modelValue;
      }

      props.onChange?.(val);
    }

    const regex = computed(() => {
      const v = props.regex;
      return v && (v instanceof RegExp ? v : NAMED_REGEX[v]);
    });

    const min = computed(() => (props.min === undefined ? -Infinity : parseInt(props.min, 10)));
    const max = computed(() => (props.max === undefined ? Infinity : parseInt(props.max, 10)));

    function onUpdateNumberValue(val) {
      val ||= clearValue.value;

      if (val) {
        // min, max
        val = Math.min(Math.max(val, min.value), max.value).toString();

        // maxlength
        if (props.maxlength) {
          val = getMaxByteString(val, props.maxlength);
        }
      }

      const el = inputRef.value.getNativeElement();

      el.value = val;
      value.value = val;
    }

    function onUpdateTextValue(val) {
      val ||= clearValue.value;

      if (val) {
        // regex
        if (regex.value?.test(val) === false) {
          val = value.value;
        }

        // maxlength
        if (props.maxlength) {
          val = getMaxByteString(val, props.maxlength);
        }

        // convert case
        if (props.upperCase) {
          val = val.toUpperCase();
        } else if (props.lowerCase) {
          val = val.toLowerCase();
        }
      }

      const el = inputRef.value.getNativeElement();

      el.value = val;
      value.value = val;
    }

    function onUpdateValue(val) {
      switch (props.type) {
        case 'number':
          return onUpdateNumberValue(val);
        default:
          return onUpdateTextValue(val);
      }
    }
    const computedMask = computed(() => {
      const newVal = inputRef?.value?.modelValue;
      if (props.mask === 'telephone') {
        if (newVal?.startsWith('02')) {
          if (newVal?.length <= 9) return '##-###-#####';
          return '##-####-####';
        }

        if (newVal?.length <= 10) return '###-###-#####';
        return '###-####-####';
      }

      return props.mask;
    });

    onMounted(() => {
      if (props.preventSubmit) {
        const el = inputRef.value.getNativeElement();
        preventSubmitEnter(el);
      }
    });

    function select() {
      inputRef.value.select();
    }

    return {
      ...useInheritAttrs(),
      ...useFieldStyle(),
      ...fieldCtx,
      computedInputClass,
      inputCounter,
      select,
      onKeydownInput,
      onClearInput,
      onChangeInput,
      onUpdateValue,
      showingHint,
      toggleHint,
      computedMask,
    };
  },
};
</script>
