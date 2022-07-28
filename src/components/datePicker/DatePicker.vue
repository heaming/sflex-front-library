<template>
  <q-input
    ref="inputRef"
    v-bind="styleClassAttrs"
    v-model="innerValue"
    class="kw-date-picker"
    :class="{'q-field--focused': showing}"
    :label="label"
    :error="error"
    :error-message="errorMessage"
    :readonly="readonly"
    :disable="disable"
    mask="####-##-##"
    fill-mask="_"
    :unmasked-value="unmaskedValue"
    no-error-icon
    @click="toggleView()"
    @blur="onBlurInput"
    @change="onChangeInput"
  >
    <template #append>
      <q-icon
        ref="iconRef"
        name="event"
        class="cursor-pointer"
        @click.prevent="toggleView()"
      />
    </template>
    <q-menu
      v-model="showing"
      class="kw-date-picker"
      no-parent-event
      no-focus
      no-refocus
    >
      <q-date
        ref="dateRef"
        :model-value="modelValue"
        v-bind="inheritedAttrs"
        minimal
        :mask="unmaskedValue ? 'YYYYMMDD' : 'YYYY-MM-DD'"
        :navigation-min-year-month="navigationMinYearMonth"
        :navigation-max-year-month="navigationMaxYearMonth"
        :events="eventsFn"
        :event-color="eventColorFn"
        :options="optionsFn"
        @update:model-value="onChangeDate"
      />
    </q-menu>
  </q-input>
</template>

<script>
import { date } from 'quasar';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';
import { preventSubmitEnter } from '../../utils/private/event';

const dateStringValidator = (v) => v?.length === 10 && !Number.isNaN(Date.parse(v));

export default {
  name: 'DatePicker',
  inheritAttrs: false,

  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
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
    minDate: {
      type: String,
      default: '1000-01-01',
      validator: dateStringValidator,
    },
    maxDate: {
      type: String,
      default: '9999-12-31',
      validator: dateStringValidator,
    },
    events: {
      type: [Array, Function],
      default: undefined,
    },
    eventColor: {
      type: [String, Function],
      default: undefined,
    },
    options: {
      type: [Array, Function],
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const inputRef = ref();
    const iconRef = ref();
    const dateRef = ref();

    const showing = ref(false);
    const modelValue = toRef(props, 'modelValue');
    const innerValue = ref(modelValue.value);

    watch(modelValue, (val) => {
      innerValue.value = val;
    });

    function eventsFn(e) {
      const { events } = e;
      return Array.isArray(events)
        ? events.includes(e.replace(/\//g, '-')) : events?.(e.replace(/\//g, '-'));
    }

    function eventColorFn(e) {
      const { eventColor } = props;
      return eventColor === 'string'
        ? eventColor : eventColor?.(e.replace(/\//g, '-'));
    }

    function optionsFn(e) {
      e = e.replace(/\//g, '-');

      if (e < props.minDate || e > props.maxDate) {
        return false;
      }

      const { options } = props;

      return (
        Array.isArray(options) ? options.includes(e) : options?.(e)
      ) ?? true;
    }

    function toggleView(e) {
      showing.value = e ?? !showing.value;

      if (showing.value) {
        const el = inputRef.value.getNativeElement();

        if (el !== document.activeElement) {
          el.focus();
          el.setSelectionRange(10, 10);
        }
      }
    }

    function onBlurInput() {
      const el = dateRef.value?.$el;

      if (!el?.contains(document.activeElement)) {
        toggleView(false);
      }
    }

    async function onChangeInput(e) {
      e = e.replace(/_/g, '').replace(/(-)\1/, '');

      if (!e) {
        emit('update:modelValue', '');
        return;
      }

      const n = Date.parse(e);

      if (!Number.isNaN(n)) {
        let val = date.formatDate(n, 'YYYY-MM-DD').padStart(10, '0');

        if (optionsFn(val)) {
          if (val > props.maxDate) {
            val = props.maxDate;
          } else if (val < props.minDate) {
            val = props.minDate;
          }

          val = props.unmaskedValue ? val.replace(/-/g, '') : val;

          emit('update:modelValue', val);
          await nextTick();
        }
      }

      innerValue.value = modelValue.value;

      const el = inputRef.value.getNativeElement();
      const shouldChangeSelection = document.activeElement === el && e.length < 10;

      if (shouldChangeSelection) {
        const i = !innerValue.value ? 0 : 10;

        setTimeout(() => {
          el.setSelectionRange(i, i);
        });
      }
    }

    async function onChangeDate(e) {
      if (e) {
        const length = props.unmaskedValue ? 8 : 10;

        emit('update:modelValue', e.padStart(length, '0'));
        await nextTick();

        const el = inputRef.value.getNativeElement();

        el.focus();
        el.setSelectionRange(10, 10);
      }

      toggleView(false);
    }

    const clickOutsideProps = {
      innerRefs: [inputRef, iconRef, dateRef],
      onClickOutside() {
        toggleView(false);
      },
    };

    watch(showing, (val) => {
      if (val) {
        addClickOutside(clickOutsideProps);
      } else {
        removeClickOutside(clickOutsideProps);
      }
    });

    onMounted(() => {
      preventSubmitEnter(inputRef);
    });

    function focus() {
      inputRef.value?.focus();
    }

    const navigationMinYearMonth = computed(() => props.minDate.substring(0, 7).replace(/-/g, '/'));
    const navigationMaxYearMonth = computed(() => props.maxDate.substring(0, 7).replace(/-/g, '/'));

    return {
      ...useInheritAttrs(),
      inputRef,
      iconRef,
      dateRef,
      showing,
      innerValue,
      eventsFn,
      eventColorFn,
      optionsFn,
      toggleView,
      onBlurInput,
      onChangeInput,
      onChangeDate,
      focus,
      navigationMaxYearMonth,
      navigationMinYearMonth,
    };
  },
};
</script>
