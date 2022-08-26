<template>
  <q-input
    ref="inputRef"
    v-bind="styleClassAttrs"
    v-model="innerValue"
    class="kw-date-picker"
    :class="{'q-field--focused': showing}"
    :label="$q.platform.is.desktop ? null : label"
    :error="invalid"
    :error-message="invalidMessage"
    :readonly="readonly"
    :disable="disable"
    :mask="innerValueMask"
    :unmasked-value="unmaskedValue"
    :placeholder="placeholder"
    no-error-icon
    :hide-bottom-space="hideBottomSpace"
    @click="toggleView()"
    @blur="onBlur"
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
      <kw-date
        ref="dateRef"
        tabindex="-1"
        :model-value="value"
        :unmasked-value="unmaskedValue"
        :min-view="minView"
        :max-view="2"
        :min-date="minDate"
        :max-date="maxDate"
        :disable="disable"
        :before-show="beforeShow"
        @update:model-value="onChangeDate"
      />
    </q-menu>
  </q-input>
</template>

<script>
import { date } from 'quasar';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';
import { stopAndPrevent, preventSubmitEnter, addEvt, removeEvt } from '../../utils/private/event';

const typeValues = ['date', 'month', 'year'];
const typeFormats = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];

const dateStringValidator = (v) => v?.length === 10 && !Number.isNaN(Date.parse(v));

export default {
  name: 'KwDatePicker',
  inheritAttrs: false,

  props: {
    ...useFieldProps,

    modelValue: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: 'date',
      validator: (v) => typeValues.includes(v),
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
    beforeShow: {
      type: Function,
      default: undefined,
    },
    hideBottomSpace: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    const inputRef = ref();
    const iconRef = ref();
    const dateRef = ref();

    const showing = ref(false);

    const fieldCtx = useField();
    const { value } = fieldCtx;
    const innerValue = ref(value.value);

    const i = typeValues.findIndex((v) => v === props.type);
    const typeFormat = typeFormats[i];
    const innerValueMask = typeFormat.replace(/[YMD]/g, '#');
    const minView = i;

    watch(value, (val) => {
      innerValue.value = val;
    });

    function toggleView(e) {
      showing.value = e ?? !showing.value;
    }

    function onBlur() {
      const el = dateRef.value?.$el;

      if (!el?.contains(document.activeElement)) {
        toggleView(false);
      }
    }

    const minDate = computed(() => props.minDate.substring(0, typeFormat.length));
    const maxDate = computed(() => props.maxDate.substring(0, typeFormat.length));

    function isInvalid(v) {
      if (v < minDate.value || v > maxDate.value) { return true; }

      const r = props.beforeShow?.(minView, v);
      return (r?.enabled ?? r) === false;
    }

    async function onChangeInput(e) {
      if (!e) {
        value.value = '';
        return;
      }

      const { length } = typeFormat;
      const n = Date.parse(e);

      if (!Number.isNaN(n)) {
        const val = date.formatDate(n, typeFormat).padStart(length, '0');

        if (!isInvalid(val)) {
          value.value = props.unmaskedValue ? val.replace(/-/g, '') : val;
        }
      }

      innerValue.value = value.value;

      const el = inputRef.value.getNativeElement();
      const shouldChangeSelection = document.activeElement === el && e.length < length;

      if (shouldChangeSelection) {
        setTimeout(() => el.setSelectionRange(length, length));
      }
    }

    async function onChangeDate(e) {
      value.value = e;
      await nextTick();

      const el = inputRef.value.getNativeElement();
      const { length } = typeFormat;

      el.focus();
      el.setSelectionRange(length, length);

      toggleView(false);
    }

    function onKeydown(e) {
      // enter
      if (e.keyCode === 13 && (e.target.value === e.target.__oldValue__)) {
        stopAndPrevent(e);
        toggleView(true);
      }
    }

    function onKeydownWhenShowing() {
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
        const el = inputRef.value.getNativeElement();

        if (el !== document.activeElement) {
          const { length } = typeFormat;

          el.focus();
          el.setSelectionRange(length, length);
        }

        removeEvt(inputRef, 'keydown', onKeydown, true);
        addEvt(inputRef, 'keydown', onKeydownWhenShowing, true);
        addClickOutside(clickOutsideProps);
      } else {
        removeEvt(inputRef, 'keydown', onKeydownWhenShowing, true);
        removeClickOutside(clickOutsideProps);
        addEvt(inputRef, 'keydown', onKeydown, true);
      }
    });

    onMounted(() => {
      addEvt(inputRef, 'keydown', onKeydown, true);
      preventSubmitEnter(inputRef);
    });

    function focus() {
      inputRef.value?.focus();
    }

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      inputRef,
      iconRef,
      dateRef,
      showing,
      innerValue,
      innerValueMask,
      minView,
      toggleView,
      onBlur,
      onChangeInput,
      onChangeDate,
      focus,
    };
  },
};
</script>
