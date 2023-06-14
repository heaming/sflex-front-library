<template>
  <kw-field-wrap
    class="kw-date-range-picker"
    v-bind="{...styleClassAttrs, ...fieldWrapProps}"
    :error="invalid"
    :error-message="invalidMessage"
  >
    <kw-date-picker
      ref="inputRef"
      v-bind="stretchProps"
      :model-value="value[0]"
      :type="type"
      :readonly="fromReadonly ?? readonly"
      :disable="fromDisable ?? disable"
      :unmasked-value="unmaskedValue"
      :min-date="minDate"
      :max-date="maxDate"
      :before-show="beforeShow"
      :placeholder="fromPlaceholder"
      :dense="dense"
      :underline="underline"
      :borderless="borderless"
      :outlined="outlined"
      :autofocus="autofocus"
      hide-bottom-space
      :select-date="fromSelectDate"
      @update:model-value="onChangeDate($event, 0)"
    />
    <span>~</span>
    <kw-date-picker
      :model-value="value[1]"
      v-bind="stretchProps"
      :type="type"
      :readonly="toReadonly ?? readonly"
      :disable="toDisable ?? disable"
      :unmasked-value="unmaskedValue"
      :min-date="minDate"
      :max-date="maxDate"
      :before-show="beforeShow"
      :placeholder="toPlaceholder"
      :dense="dense"
      :underline="underline"
      :borderless="borderless"
      :outlined="outlined"
      hide-bottom-space
      :select-date="toSelectDate"
      @update:model-value="onChangeDate($event, 1)"
    />
  </kw-field-wrap>
</template>

<script>
import { FormContextKey } from '../../consts/private/symbols';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldWrap, { useFieldWrapProps } from '../../composables/private/useFieldWrap';
import useStretch from '../../composables/private/useStretch';

export default {
  name: 'KwDateRangePicker',

  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useFieldWrapProps,
    underline: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },

    from: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'date',
    },
    unmaskedValue: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: String,
      default: undefined,
    },
    maxDate: {
      type: String,
      default: undefined,
    },
    fromReadonly: {
      type: Boolean,
      default: undefined,
    },
    toReadonly: {
      type: Boolean,
      default: undefined,
    },
    fromDisable: {
      type: Boolean,
      default: undefined,
    },
    toDisable: {
      type: Boolean,
      default: undefined,
    },
    fromPlaceholder: {
      type: String,
      default: undefined,
    },
    toPlaceholder: {
      type: String,
      default: undefined,
    },
    beforeShow: {
      type: Function,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    toSelectDate: {
      type: String,
      default: undefined,
    },
    fromSelectDate: {
      type: String,
      default: undefined,
    },
  },

  emits: [
    'update:from',
    'update:to',
  ],

  setup(props, { emit }) {
    const fieldCtx = useField({
      bindValueRef: computed(() => [
        props.from, props.to,
      ]),
      onUpdateValue(val) {
        emit('update:from', val[0]);
        emit('update:to', val[1]);
      },
    });
    const { value } = fieldCtx;

    const checkPair = (val, index, otherVal) => !val || !otherVal
      || (index === 0 ? val <= otherVal : val >= otherVal);

    function onChangeDate(val, index) {
      const otherIndex = index === 0 ? 1 : 0;
      const otherVal = value.value[otherIndex];

      value.value[index] = val;

      if (!checkPair(val, index, otherVal)) {
        value.value[otherIndex] = val;
      }
    }

    // prevent register children fields
    provide(FormContextKey, {});

    return {
      ...useInheritAttrs(),
      ...useFieldWrap(),
      ...useStretch(),
      ...fieldCtx,
      onChangeDate,
    };
  },
};
</script>
