<template>
  <q-input
    ref="inputRef"
    v-bind="styleClassAttrs"
    v-model="innerValue"
    class="kw-date-picker"
    :class="{'q-field--focused': showing}"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    :readonly="readonly"
    :disable="disable"
    mask="####-##-##"
    :unmasked-value="unmaskedValue"
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
        :min-date="minDate"
        :max-date="maxDate"
        :disable="disable"
        :before-show-day="beforeShowDay"
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
    beforeShowDay: {
      type: Function,
      default: undefined,
    },
    hideBottomSpace: {
      type: Boolean,
      default: false,
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

    function isInvalid(v) {
      if (props.minDate < v || props.maxDate > v) { return false; }

      const r = props.beforeShowDay?.(v);
      return (r?.enabled ?? r) === false;
    }

    async function onChangeInput(e) {
      if (!e) {
        value.value = '';
        return;
      }

      const n = Date.parse(e);

      if (!Number.isNaN(n)) {
        let val = date.formatDate(n, 'YYYY-MM-DD').padStart(10, '0');

        if (!isInvalid(val)) {
          if (val > props.maxDate) {
            val = props.maxDate;
          } else if (val < props.minDate) {
            val = props.minDate;
          }

          value.value = props.unmaskedValue ? val.replace(/-/g, '') : val;
        }
      }

      innerValue.value = value.value;

      const el = inputRef.value.getNativeElement();
      const shouldChangeSelection = document.activeElement === el && e.length < 10;

      if (shouldChangeSelection) {
        setTimeout(() => el.setSelectionRange(10, 10));
      }
    }

    async function onChangeDate(e) {
      value.value = e;
      await nextTick();

      const el = inputRef.value.getNativeElement();

      el.focus();
      el.setSelectionRange(10, 10);

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
          el.focus();
          el.setSelectionRange(10, 10);
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
      toggleView,
      onBlur,
      onChangeInput,
      onChangeDate,
      focus,
    };
  },
};
</script>
