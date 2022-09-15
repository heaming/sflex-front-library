<template>
  <q-input
    ref="inputRef"
    :model-value="value"
    v-bind="fieldStyles"
    class="kw-field kw-input"
    :label="undefined"
    :error="invalid"
    :error-message="invalidMessage"
    clear-icon="close_24"
    no-error-icon
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
      <q-icon
        v-if="icon"
        class="q-field__focusable-action"
        :tabindex="-1"
        :name="icon"
        :disable="disableIcon"
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
  </q-input>
</template>

<script>
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import { getMaxByteString } from '../../utils/string';

const NAMED_REGEX = {
  alpha: /^[A-Z]*$/i,
  alpha_dash: /^[0-9A-Z_-]*$/i,
  alpha_num: /^[0-9A-Z]*$/i,
  alpha_spaces: /^[A-Z\s]*$/i,
  alpha_underscore: /^[0-9A-Z_]*$/i,
};

export default {
  name: 'KwInput',

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,

    modelValue: {
      type: [String, Number],
      default: undefined,
    },
    maxlength: {
      type: Number,
      default: 0,
    },
    upperCase: {
      type: Boolean,
      default: false,
    },
    lowerCase: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: undefined,
    },
    disableIcon: {
      type: Boolean,
      default: false,
    },
    regex: {
      type: [String, Object],
      default: undefined,
      validator: (v) => v instanceof RegExp || !!NAMED_REGEX[v],
    },
  },

  emits: [
    'update:modelValue',
    'clickIcon',
  ],

  setup(props, { emit }) {
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
      const inputEl = inputRef.value.getNativeElement();
      val ??= '';

      if (regex.value?.test(val) === false) {
        val = value.value;
        inputEl.value = val;
      }

      if (props.maxlength) {
        val = getMaxByteString(val, props.maxlength);
        inputEl.value = val;
      }

      if (props.upperCase) {
        val = val.toUpperCase();
        inputEl.value = val;
      } else if (props.lowerCase) {
        val = val.toLowerCase();
        inputEl.value = val;
      }

      value.value = val;
    }

    const fieldStyles = useFieldStyle();

    return {
      fieldStyles,
      ...fieldCtx,
      select,
      onEnter,
      onChange,
      onUpdateValue,
    };
  },
};
</script>
