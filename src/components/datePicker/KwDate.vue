<template>
  <div class="kw-date" />
</template>

<script>
import { date } from 'quasar';

const viewModeValues = [0, 1, 2];
const dateStringValidator = (v) => [4, 7, 10].includes(v.length) && !Number.isNaN(Date.parse(v));

export default {
  name: 'KwDate',

  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
    unmaskedValue: {
      type: Boolean,
      default: true,
    },
    minViewMode: {
      type: Number,
      default: 0,
      validator: (v) => viewModeValues.includes(v),
    },
    maxViewMode: {
      type: Number,
      default: 2,
      validator: (v) => viewModeValues.includes(v),
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
    disable: {
      type: Boolean,
      default: false,
    },
    beforeShow: {
      type: Function,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    let el;

    const valueFormat = computed(() => (props.unmaskedValue ? 'YYYYMMDD' : 'YYYY-MM-DD'));

    function updateDate(val) {
      el.datepicker(
        'update',
        val ? date.extractDate(val, valueFormat.value) : null,
      );
    }

    let unwatchValue;
    function watchValue() {
      unwatchValue = watch(() => props.modelValue, updateDate);
    }

    watchValue();

    function onChange(e) {
      unwatchValue();
      emit('update:modelValue', date.formatDate(e.date, valueFormat.value));
      nextTick(watchValue);
    }

    onMounted(() => {
      const options = {
        language: useI18n().locale.value,
        keyboardNavigation: false,
        todayHighlight: true,
        minViewMode: props.minViewMode,
        maxViewMode: props.maxViewMode,
      };

      const isViewModeEnabled = (v) => props.minViewMode <= v && props.maxViewMode >= v;
      const isInvalidRange = (s) => s < props.minDate || s > props.maxDate;

      if (isViewModeEnabled(0)) {
        options.beforeShowDay = (e) => {
          if (props.disable) return false;

          const s = e instanceof Date ? date.formatDate(e, 'YYYY-MM-DD') : e;
          if (isInvalidRange(s)) return false;

          const r = props.beforeShow?.(s);
          if (r !== undefined) return r;

          switch (e.getDay()) {
            case 0: return 'sunday';
            case 6: return 'saturday';
          }
        };
      }
      if (isViewModeEnabled(1)) {
        options.beforeShowMonth = (e) => !(
          props.disable || isInvalidRange(e instanceof Date ? date.formatDate(e, 'YYYY-MM-DD') : e)
        );
      }
      if (isViewModeEnabled(2)) {
        options.beforeShowYear = (e) => !(
          props.disable || isInvalidRange(e instanceof Date ? date.formatDate(e, 'YYYY-MM-DD') : e)
        );
      }

      el = window.$(getCurrentInstance().proxy.$el);
      el.datepicker(options);
      el.on('changeDate', onChange);

      updateDate(props.modelValue);
    });

    onBeforeUnmount(() => {
      el?.datepicker('destroy');
      el = null;
    });
  },
};
</script>
