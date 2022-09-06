<template>
  <kw-field-wrap
    class="kw-date-range-picker"
    v-bind="styleClassAttrs"
    :error="invalid"
    :error-message="invalidMessage"
  >
    <kw-date-picker
      ref="inputRef"
      :model-value="value[0]"
      v-bind="fieldStyles"
      :type="type"
      :readonly="readonly"
      :disable="disable"
      :unmasked-value="unmaskedValue"
      :min-date="minDate"
      :max-date="maxDate"
      :before-show="beforeShow"
      :placeholder="fromPlaceholder"
      :dense="dense"
      :underline="underline"
      :borderless="borderless"
      hide-bottom-space
      @update:model-value="onChangeDate($event, 0)"
    />
    <span>~</span>
    <kw-date-picker
      :model-value="value[1]"
      v-bind="fieldStyles"
      :type="type"
      :readonly="readonly"
      :disable="disable"
      :unmasked-value="unmaskedValue"
      :min-date="minDate"
      :max-date="maxDate"
      :before-show="beforeShow"
      :placeholder="toPlaceholder"
      :dense="dense"
      :underline="underline"
      :borderless="borderless"
      hide-bottom-space
      @update:model-value="onChangeDate($event, 1)"
    />
  </kw-field-wrap>
</template>

<script>
import { FormContextKey } from '../../consts/private/symbols';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import useField, { useFieldProps } from '../../composables/private/useField';

export default {
  name: 'KwDateRangePicker',

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,

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
      ...fieldCtx,
      onChangeDate,
    };
  },
};
</script>
