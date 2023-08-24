<template>
  <q-input
    ref="inputRef"
    v-model="inputValue"
    v-scroll="onScroll"
    v-bind="{...styleClassAttrs, ...fieldStyleProps}"
    class="kw-field kw-date-picker"
    :class="datePickerClass"
    :label="$g.platform.is.mobile ? label : undefined"
    :error="invalid"
    :readonly="readonly"
    :disable="disable"
    :mask="inputValueMask"
    :unmasked-value="unmaskedValue"
    :autofocus="autofocus"
    :placeholder="placeholder"
    no-error-icon
    @click="$g.platform.is.mobile ? undefined : setExpanded()"
    @change="onChangeInput"
  >
    <template #append>
      <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
      <div @click="setExpanded()">
        <q-icon name="calendar" />
      </div>
    </template>
    <kw-menu
      ref="menuRef"
      :model-value="showing"
      class="kw-date-picker__menu"
      no-parent-event
      :no-focus="!$g.platform.is.mobile"
      :no-refocus="!$g.platform.is.mobile"
      :title="placeholder"
      :behavior="$g.platform.is.mobile ? 'dialog' : undefined"
      @update:model-value="setExpanded"
    >
      <kw-date
        :model-value="dateValue"
        :unmasked-value="unmaskedValue"
        :min-view="minView"
        :max-view="2"
        :min-date="minDate"
        :max-date="maxDate"
        :disable="disable"
        :before-show="beforeShow"
        :select-date="selectDate"
        :default-view-date="defaultViewDate"
        @update:model-value="onChangeDate"
      />
      <template
        v-if="$g.platform.is.mobile"
        #action
      >
        <kw-btn
          grow
          primary
          :label="$t('MSG_BTN_CONFIRM', null, '확인')"
          @click="onConfirm"
        />
      </template>
    </kw-menu>

    <!-- label -->
    <template
      v-if="$g.platform.is.mobile && (label || $slots.label)"
      #label
    >
      <span>{{ label ?? label }}</span>
      <kw-click-outside
        @click-outside="showingHint = false"
      >
        <q-icon
          v-if="hint"
          size="16px"
          name="info"
          class="ml4"
          style="vertical-align: -3px;"
          @click.capture.stop.prevent="toggleHint"
        >
          <kw-tooltip
            v-model="showingHint"
            :offset="[0, 3]"
            :no-parent-event="$g.platform.is.mobile"
          >
            <!-- eslint-disable vue/no-v-html -->
            <slot
              name="hint"
            >
              <div v-html="sanitize(hint)" />
            </slot>
            <!-- eslint-enable vue/no-v-html -->
          </kw-tooltip>
        </q-icon>
      </kw-click-outside>
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      {{ invalidMessage }}
      <kw-tooltip
        anchor="center middle"
        :offset="[0, 3]"
        show-when-ellipsised
      >
        {{ invalidMessage }}
      </kw-tooltip>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';
import { stopAndPrevent, preventSubmitEnter, addEvt, removeEvt } from '../../utils/private/event';
import { platform } from '../../plugins/platform';
import i18n from '../../i18n';
import { sanitize } from '../../plugins/sanitize';

const typeValues = ['date', 'month', 'year'];
const typeFormats = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];

const dateStringValidator = (v) => v?.length === 10 && !Number.isNaN(Date.parse(v));

export default {
  name: 'KwDatePicker',
  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useFieldStyleProps,

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
    autofocus: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: i18n.t('MSG_TXT_INP_DATE', null, '날짜 입력'),
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

  setup(props) {
    const menuRef = ref();

    const fieldCtx = useField();
    const { inputRef, value, showingHint, toggleHint } = fieldCtx;

    const fieldStyles = useFieldStyle();
    const { fieldClass } = fieldStyles;

    const minView = typeValues.findIndex((v) => v === props.type);
    const typeFormat = typeFormats[minView];

    const isReadonlyOrDisable = computed(() => props.readonly || props.disable);
    const isExpanded = ref(false);
    const showing = computed(() => !isReadonlyOrDisable.value && isExpanded.value);

    const datePickerClass = computed(() => ({
      ...fieldClass.value,
      'q-field--highlighted': showing.value,
    }));

    const dateValue = ref();
    const inputValue = ref(value.value);
    const inputValueMask = typeFormat.replace(/[YMD]/g, '#');

    watch(value, (val) => {
      inputValue.value = val;
    });

    function setExpanded(e) {
      isExpanded.value = e ?? !isExpanded.value;
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

      inputValue.value = value.value;

      const el = inputRef.value.getNativeElement();
      const shouldChangeSelection = document.activeElement === el && e.length < length;

      if (shouldChangeSelection) {
        setTimeout(() => el.setSelectionRange(length, length));
      }
    }

    async function onChangeDate(e) {
      dateValue.value = e;

      if (platform.is.mobile === false) {
        value.value = e;
        await nextTick();

        const el = inputRef.value.getNativeElement();
        const { length } = typeFormat;

        el.focus();
        el.setSelectionRange(length, length);

        setExpanded(false);
      }
    }

    function onConfirm() {
      value.value = dateValue.value;
      setExpanded(false);
    }

    function onKeydown(e) {
      // enter, space
      if ((e.keyCode === 13 || e.keyCode === 32)
        && (e.target.value === e.target.__oldValue__)) {
        stopAndPrevent(e);
        setExpanded(true);
      }
    }

    function onKeydownWhenShowing(e) {
      // enter, space
      if (e.keyCode === 13 || e.keyCode === 32) {
        stopAndPrevent(e);
      }
      setExpanded(false);
    }

    const contentEl = computed(() => menuRef.value?.contentEl);
    const clickOutsideProps = {
      innerRefs: [inputRef, contentEl],
      onClickOutside() { setExpanded(false); },
    };

    watch(showing, (val) => {
      const el = inputRef.value.getNativeElement();

      if (val) {
        dateValue.value = value.value;

        if (el !== document.activeElement) {
          const { length } = typeFormat;
          el.focus();
          el.setSelectionRange(length, length);
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
      preventSubmitEnter(el);
    });

    onBeforeUnmount(() => {
      removeClickOutside(clickOutsideProps);
    });

    function focus() {
      inputRef.value?.focus();
    }

    function onScroll() {
      isExpanded.value = false;
    }

    return {
      ...useInheritAttrs(),
      ...useFieldStyle(),
      ...fieldCtx,
      ...fieldStyles,
      menuRef,
      minView,
      showing,
      datePickerClass,
      dateValue,
      inputValue,
      inputValueMask,
      setExpanded,
      onChangeInput,
      onChangeDate,
      onConfirm,
      focus,
      showingHint,
      toggleHint,
      sanitize,
      onScroll,
    };
  },
};
</script>
