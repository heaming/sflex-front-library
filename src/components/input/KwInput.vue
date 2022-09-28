<template>
  <q-input
    ref="inputRef"
    :model-value="value"
    v-bind="{...styleClassAttrs, ...fieldStyles}"
    class="kw-field kw-input"
    :label="undefined"
    :error="invalid"
    :type="type"
    :debounce="debounce"
    :disable="disable"
    :readonly="readonly"
    :autogrow="autogrow"
    :rows="rows"
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
    :input-class="{'text-right': alignRight}"
    no-error-icon
    clear-icon="close_24"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @clear="$emit('clear', $event)"
    @keydown.enter="onEnter"
    @change="onChange"
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
        :disable="disableIcon"
        clickable
        @click="$emit('clickIcon')"
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
      <div>
        {{ invalidMessage }}
        <kw-tooltip
          anchor="center middle"
          show-when-ellipsised
        >
          {{ invalidMessage }}
        </kw-tooltip>
      </div>
    </template>
  </q-input>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import { getMaxByteString, getByte } from '../../utils/string';
import { preventSubmitEnter } from '../../utils/private/event';

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
    debounce: { type: Number, default: undefined },
    disable: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    autogrow: { type: Boolean, default: false },
    rows: { type: Number, default: undefined },
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
    placeholder: { type: String, default: undefined },
    tabindex: { type: [Number, String], default: undefined },

    // customize props
    icon: { type: String, default: undefined },
    disableIcon: { type: Boolean, default: false },
    maxlength: { type: Number, default: 0 },
    counter: { type: Boolean, default: false },
    upperCase: { type: Boolean, default: false },
    lowerCase: { type: Boolean, default: false },
    regex: { type: [String, Object], default: undefined, validator: (v) => v instanceof RegExp || !!NAMED_REGEX[v] },
    alignRight: { type: Boolean, default: false },
    preventSubmit: { type: Boolean, default: false },
  },

  emits: [
    'update:modelValue',
    'clickIcon',
    'focus',
    'blur',
    'clear',
  ],

  setup(props, { emit }) {
    const fieldStyles = useFieldStyle();
    const fieldCtx = useField();
    const { inputRef, value } = fieldCtx;

    function select() {
      inputRef.value.select();
    }

    function onEnter(evt) {
      if (props.icon) {
        evt.preventDefault();

        if (!props.disableIcon) {
          emit('clickIcon');
        }
      }
    }

    const isModifiersTrim = useAttrs().modelModifiers?.trim === true;

    function onChange() {
      if (isModifiersTrim) {
        value.value = props.modelValue;
      }
    }

    const regex = computed(() => {
      const v = props.regex;
      return v && (v instanceof RegExp ? v : NAMED_REGEX[v]);
    });

    function onUpdateValue(val) {
      const el = inputRef.value.getNativeElement();
      val ??= '';

      if (val) {
        if (regex.value?.test(val) === false) {
          val = value.value;
          el.value = val;
        }

        if (props.maxlength) {
          val = getMaxByteString(val, props.maxlength);
          el.value = val;
        }

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

    const useCounter = computed(() => props.maxlength > 0 && props.counter);
    const counterText = computed(() => (useCounter ? `${getByte(value.value)} / ${props.maxlength}` : null));

    onMounted(() => {
      if (props.preventSubmit) {
        const el = inputRef.value.getNativeElement();
        preventSubmitEnter(el);
      }
    });

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      fieldStyles,
      select,
      onEnter,
      onChange,
      onUpdateValue,
      useCounter,
      counterText,
    };
  },
};
</script>
