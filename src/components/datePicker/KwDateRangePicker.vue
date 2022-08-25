<template>
  <q-field
    v-bind="styleClassAttrs"
    class="kw-date-range-picker"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    no-error-icon
  >
    <kw-date-picker
      ref="inputRef"
      :model-value="value[0]"
      :type="type"
      :readonly="readonly"
      :disable="disable"
      :unmasked-value="unmaskedValue"
      :min-date="minDate"
      :max-date="maxDate"
      :before-show-day="beforeShowDay"
      hide-bottom-space
      :placeholder="startPlaceholder"
      @update:model-value="onChangeDate($event, 0)"
    /> ~
    <kw-date-picker
      :model-value="value[1]"
      :type="type"
      :readonly="readonly"
      :disable="disable"
      :unmasked-value="unmaskedValue"
      :min-date="minDate"
      :max-date="maxDate"
      :before-show-day="beforeShowDay"
      hide-bottom-space
      :placeholder="endPlaceholder"
      @update:model-value="onChangeDate($event, 1)"
    />
  </q-field>
</template>

<script>
import { FormContextKey } from '../../consts/private/symbols';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';

export default {
  name: 'KwDateRangePicker',
  inheritAttrs: false,

  props: {
    ...useFieldProps,

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
    startPlaceholder: {
      type: String,
      default: undefined,
    },
    endPlaceholder: {
      type: String,
      default: undefined,
    },
    beforeShowDay: {
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
