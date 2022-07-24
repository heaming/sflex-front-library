<template>
  <date-picker
    ref="inputRef"
    v-model="value"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    :readonly="readonly"
    :disable="disable"
    :unmasked-value="unmaskedValue"
    :navigation-min-year-month="navigationMinYearMonth"
    :navigation-max-year-month="navigationMaxYearMonth"
  />
</template>

<script>
import DatePicker from './DatePicker.vue';
import useField, { useFieldProps } from '../../composables/private/useField';

export default {
  name: 'KwDatePicker',
  components: {
    DatePicker,
  },

  props: {
    ...useFieldProps,

    modelValue: {
      type: String,
      default: undefined,
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
    navigationMinYearMonth: {
      type: String,
      default: '1000/01',
    },
    navigationMaxYearMonth: {
      type: String,
      default: '9999/12',
    },
  },

  emits: ['update:modelValue'],

  setup() {
    return useField();
  },
};
</script>
