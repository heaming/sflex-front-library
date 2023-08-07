<template>
  <div
    :style="resizedStyle"
    class="kw-date"
  >
    <div
      ref="containerRef"
      class="kw-date__container"
    >
      <q-resize-observer
        :debounce="0"
        @resize="onResize"
      />
    </div>
  </div>
</template>

<script>
import { date } from 'quasar';
import { cloneDeep } from 'lodash-es';

const viewValues = [0, 1, 2];
const viewFormats = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];
const dateStringValidator = (v) => [4, 7, 10].includes(v.length) && !Number.isNaN(Date.parse(v));

const formatDate = (e, format) => date.formatDate(e, format).padStart(format.length, '0');

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
    minView: {
      type: Number,
      default: 0,
      validator: (v) => viewValues.includes(v),
    },
    maxView: {
      type: Number,
      default: 2,
      validator: (v) => viewValues.includes(v),
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
    selectDate: {
      type: String,
      default: undefined,
    },
    defaultViewDate: {
      type: Object,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const containerRef = ref();

    const viewFormat = computed(() => viewFormats[props.minView]);
    const valueFormat = computed(() => (props.unmaskedValue ? viewFormat.value.replace(/-/g, '') : viewFormat.value));

    let el;

    function updateDate(val) {
      if (!val) {
        if (!props.selectDate) {
          el.datepicker('update', null);
        } else { el.datepicker('update', props.selectDate); }
      } else {
        const formatValue = formatDate(date.extractDate(val, valueFormat.value), 'YYYY-MM-DD');
        el.datepicker('update', formatValue);
      }
    }

    let unwatchValue;
    function watchValue() {
      unwatchValue = watch(() => props.modelValue, updateDate);
    }

    watchValue();

    function onChange(e) {
      unwatchValue();
      emit('update:modelValue', formatDate(e.date, valueFormat.value));
      nextTick(watchValue);
    }

    function createBeforeShow(view) {
      const format = viewFormats[view];
      const minDate = computed(() => props.minDate.substring(0, format.length));
      const maxDate = computed(() => props.maxDate.substring(0, format.length));

      const isInvalidRange = (s) => s.length < minDate.value.length || s < minDate.value
        || s.length > maxDate.value.length || s > maxDate.value;

      return (e) => {
        if (props.disable) return false;

        const s = formatDate(e, format);
        if (isInvalidRange(s)) return false;

        const r = props.beforeShow?.(view, s);
        if (r !== undefined) return r;

        if (view === 0) {
          switch (e.getDay()) {
            case 0: return 'sunday';
            case 6: return 'saturday';
          }
        }
      };
    }

    onMounted(() => {
      const options = {
        language: useI18n().locale.value,
        keyboardNavigation: false,
        todayHighlight: true,
        minViewMode: props.minView,
        maxViewMode: props.maxView,
      };

      const isViewEnabled = (v) => props.minView <= v && props.maxView >= v;

      if (isViewEnabled(0)) {
        options.beforeShowDay = createBeforeShow(0);
      }
      if (isViewEnabled(1)) {
        options.beforeShowMonth = createBeforeShow(1);
      }
      if (isViewEnabled(2)) {
        options.beforeShowYear = createBeforeShow(2);
      }

      if (props.defaultViewDate) {
        const defualtViewDate = cloneDeep(props.defaultViewDate);
        if (props.defaultViewDate?.month > 0) {
          defualtViewDate.month = props.defaultViewDate.month - 1;
        }
        options.defaultViewDate = defualtViewDate;
      }

      el = window.$(containerRef.value);
      el.datepicker(options);
      el.on('changeDate', onChange);

      updateDate(props.modelValue);
    });

    onBeforeUnmount(() => {
      el?.datepicker('destroy');
      el = null;
    });

    const resizedStyle = ref({});

    function onResize(e) {
      resizedStyle.value = `width: ${e.width}px; height: ${e.height}px`;
    }

    return {
      containerRef,
      resizedStyle,
      onResize,
    };
  },
};
</script>
