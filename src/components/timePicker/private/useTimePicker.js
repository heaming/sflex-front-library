import dayjs from 'dayjs';
import useFieldStyle, { useFieldStyleProps } from '../../../composables/private/useFieldStyle';
import useField, { useFieldProps } from '../../../composables/private/useField';
import { addClickOutside, removeClickOutside } from '../../../utils/private/clickOutside';
import { preventSubmitEnter, stopAndPrevent, addEvt, removeEvt } from '../../../utils/private/event';
import i18n from '../../../i18n';

export const useTimePickerProps = {
  ...useFieldProps,
  ...useFieldStyleProps,

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
  placeholder: {
    type: String,
    default: i18n.t('MSG_TXT_INP_TIME', null, '시간 입력'),
  },
};

export const useTimePickerEmits = [
  'update:modelValue',
];

export default () => {
  const { props } = getCurrentInstance();

  const isReadonlyOrDisable = computed(() => props.readonly || props.disable);
  const isExpanded = ref(false);
  const showing = computed(() => !isReadonlyOrDisable.value && isExpanded.value);

  const { fieldStyleProps, fieldClass } = useFieldStyle();
  const fieldClasses = computed(() => ({ ...fieldClass.value, 'q-field--highlighted': showing.value }));

  const fieldCtx = useField();
  const { value, inputRef } = fieldCtx;

  const inputValue = ref();
  const inputMeridiem = ref();
  const inputPrefix = computed(() => i18n.t(`MSG_TXT_${inputMeridiem.value}`, null, inputMeridiem.value));
  const timeFormat = computed(() => (props.unmaskedValue ? 'HHmm' : 'HH:mm'));

  function updateInput(val) {
    const date = dayjs(
      `1970-01-01 ${val || 'Invalid Date'}`,
      `YYYY-MM-DD ${timeFormat.value}`,
    );

    if (date.isValid()) {
      inputValue.value = date.format('hhmm');
      inputMeridiem.value = date.format('A');
    } else {
      inputValue.value = null;
      inputMeridiem.value = 'AM';
    }
  }

  function onChangeInput(e) {
    if (!e) {
      value.value = '';
      return;
    }

    const date = dayjs(`1970-01-01 ${e}`);

    if (date.isValid()) {
      value.value = date.format(timeFormat.value);
    }

    updateInput(value.value);

    const el = inputRef.value.getNativeElement();
    const shouldChangeSelection = document.activeElement === el && e.length < 5;

    if (shouldChangeSelection) {
      setTimeout(() => el.setSelectionRange(5, 5));
    }
  }

  function setExpanded(e) {
    isExpanded.value = e ?? !isExpanded.value;
  }

  function focus() {
    inputRef.value?.focus();
  }

  const scrollPickerContainerRef = ref();
  const clickOutsideProps = {
    innerRefs: [inputRef, scrollPickerContainerRef],
    onClickOutside() { setExpanded(false); },
  };

  function onKeydown(e) {
    // enter
    if ((e.keyCode === 13)
      && (e.target.value === e.target.__oldValue__)) {
      stopAndPrevent(e);
      setExpanded(true);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function onKeydownWhenShowing(e) {
    setExpanded(false);
  }

  function onChangeCapture(e) {
    if (e.target.value === e.target.__oldValue__) {
      stopAndPrevent(e);
    }
  }

  watch(value, updateInput, { immediate: true });

  watch(showing, async (val) => {
    const el = inputRef.value.getNativeElement();

    if (val) {
      if (el !== document.activeElement) {
        el.focus();
        el.setSelectionRange(5, 5);
      }

      removeEvt(el, 'keydown', onKeydown, true);
      addEvt(el, 'keydown', onKeydownWhenShowing, true);
      addClickOutside(clickOutsideProps);
    } else {
      removeEvt(el, 'keydown', onKeydownWhenShowing, true);
      removeClickOutside(clickOutsideProps);
      addEvt(el, 'keydown', onKeydown, true);
    }
  });

  onMounted(() => {
    const el = inputRef.value.getNativeElement();
    addEvt(el, 'keydown', onKeydown, true);
    addEvt(el, 'change', onChangeCapture, true);
    preventSubmitEnter(el);
  });

  return {
    showing,
    fieldClasses,
    fieldStyleProps,
    ...fieldCtx,
    inputValue,
    inputPrefix,
    scrollPickerContainerRef,

    setExpanded,
    focus,

    onChangeInput,
  };
};
