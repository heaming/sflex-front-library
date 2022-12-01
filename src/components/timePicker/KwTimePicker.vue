<template>
  <q-input
    ref="inputRef"
    v-model="innerValue"
    v-bind="fieldStyleProps"
    class="kw-field kw-time-picker"
    :class="timePickerClass"
    :label="$g.platform.is.mobile ? label : undefined"
    :error="invalid"
    :readonly="readonly"
    :disable="disable"
    mask="##:##"
    :unmasked-value="unmaskedValue"
    :placeholder="placeholder"
    no-error-icon
    @click="toggleView()"
    @change="onChangeInput"
  >
    <template #append>
      <div @click="toggleView()">
        <q-icon name="clock" />
      </div>
    </template>
    <q-menu
      :model-value="showing"
      class="kw-time-picker-menu"
      no-parent-event
      no-focus
      no-refocus
      fit
    >
      <div
        ref="timeRef"
        tabindex="-1"
        class="kw-time-picker__view row justify-between"
      >
        <q-virtual-scroll
          v-for="(timeList, i) of timeLists"
          :key="i"
          ref="timeListRefs"
          v-slot="{item, index: j}"
          class="kw-time-picker__list"
          :items="timeList"
        >
          <q-item
            :key="item"
            clickable
            manual-focus
            :active="isActive(i, j)"
            :focused="isSelected(i, j)"
            @mousemove="onMousemove(i, j)"
            @click="onSelect(i, j)"
          >
            <q-item-section>
              {{ item }}
            </q-item-section>
          </q-item>
        </q-virtual-scroll>
      </div>
    </q-menu>

    <!-- label -->
    <template
      v-if="$g.platform.is.mobile && (label || $slots.label)"
      #label
    >
      {{ label ?? label }}
    </template>

    <!-- error -->
    <template
      v-if="invalid"
      #error
    >
      {{ invalidMessage }}
      <kw-tooltip
        anchor="center middle"
        show-when-ellipsised
      >
        {{ invalidMessage }}
      </kw-tooltip>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar';
import useFieldStyle, { useFieldStyleProps } from '../../composables/private/useFieldStyle';
import useField, { useFieldProps } from '../../composables/private/useField';
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';
import { stopAndPrevent, preventSubmitEnter, addEvt, removeEvt } from '../../utils/private/event';
import i18n from '../../i18n';

function createOptions(n) {
  const { length } = n.toString();
  return Array(n).fill().map((_, i) => i.toString().padStart(length, '0'));
}

export default {
  name: 'KwTimePicker',

  props: {
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
  },

  emits: ['update:modelValue'],

  setup(props) {
    const timeRef = ref();
    const timeListRefs = ref();

    const timeClickCount = [0, 0];
    const timeLists = [
      createOptions(24),
      createOptions(60),
    ];

    const isReadonlyOrDisable = computed(() => props.readonly || props.disable);
    const isExpanded = ref(false);
    const showing = computed(() => !isReadonlyOrDisable.value && isExpanded.value);

    const selectedListIndex = ref(-1);
    const selectedItemIndex = ref([-1, -1]);

    const fieldCtx = useField();
    const { value, inputRef } = fieldCtx;
    const innerValue = ref(value.value);

    watch(value, (val) => {
      innerValue.value = val;
    });

    async function toggleView(e) {
      isExpanded.value = e ?? !isExpanded.value;
    }

    const getHourValue = () => value.value.substring(0, 2);
    const getMinValue = () => (props.unmaskedValue ? value.value.substring(2, 4) : value.value.substring(3, 5));

    function scrollToSelected() {
      if (value.value && timeListRefs.value) {
        timeListRefs.value.forEach((vm, i) => {
          const val = i === 0 ? getHourValue() : getMinValue();
          const index = timeLists[i].findIndex((v) => v === val);

          selectedItemIndex.value[i] = index;
          if (index > -1) vm.scrollTo(index);
        });
      }
    }

    function onChangeInput(e) {
      if (!e) {
        value.value = '';
        return;
      }

      const h = e.substring(0, 2);
      const m = e.substring(3, 5);
      const n = Date.parse(`1970-01-01 ${h}:${m}`);

      if (!Number.isNaN(n)) {
        const val = date.formatDate(n, 'YYYY-MM-DD HH:mm').split(' ')[1];
        value.value = props.unmaskedValue ? val.replace(/:/g, '') : val;
      }

      innerValue.value = value.value;

      const el = inputRef.value.getNativeElement();
      const shouldChangeSelection = document.activeElement === el && e.length < 5;

      if (shouldChangeSelection) {
        setTimeout(() => el.setSelectionRange(5, 5));
      }

      if (showing.value) {
        scrollToSelected();
      }
    }

    function onSelect(i, j) {
      const el = inputRef.value.getNativeElement();

      const val = timeLists[i][j];
      const h = (i === 0 ? val : getHourValue()) || '00';
      const m = (i === 0 ? getMinValue() : val) || '00';
      const otherIndex = i === 0 ? 1 : 0;

      value.value = props.unmaskedValue ? `${h}${m}` : `${h}:${m}`;
      el.__oldValue__ = props.unmaskedValue ? `${h}:${m}` : value.value;
      innerValue.value = value.value;

      timeClickCount[i] += 1;
      selectedItemIndex.value[i] = j;

      if (timeClickCount[otherIndex] > 0) {
        toggleView(false);
      }

      el.focus();
      setTimeout(() => el.setSelectionRange(5, 5));
    }

    function onKeydown(e) {
      // enter, down
      if ((e.keyCode === 13 || e.keyCode === 40)
        && (e.target.value === e.target.__oldValue__)) {
        stopAndPrevent(e);
        toggleView(true);
      }
    }

    function onKeydownWhenShowing(e) {
      // home, end - 36, 35
      if (e.keyCode === 35 || e.keyCode === 36) {
        stopAndPrevent(e);

        const i = selectedListIndex.value;
        const j = e.keyCode === 36 ? 0 : timeLists[i].length - 1;

        selectedItemIndex.value[i] = j;
        timeListRefs.value[i].scrollTo(j);
        return;
      }

      // pg up, pg down - 33, 34
      if (e.keyCode === 33 || e.keyCode === 34) {
        stopAndPrevent(e);

        const i = selectedListIndex.value;
        const last = timeLists[i].length - 1;

        const vm = timeListRefs.value[i];
        const size = Math.floor(
          vm.$el.clientHeight / vm.$el.querySelector('.q-virtual-scroll__content > .q-item').clientHeight,
        );

        let j = selectedItemIndex.value[i];
        j = e.keyCode === 33 ? Math.max(0, j - size) : Math.min(last, j + size);

        selectedItemIndex.value[i] = j;
        vm.scrollTo(j);
        return;
      }

      // up, down
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);

        const i = selectedListIndex.value;
        const last = timeLists[i].length - 1;

        let j = selectedItemIndex.value[i] + (e.keyCode === 38 ? -1 : 1);
        // eslint-disable-next-line no-nested-ternary
        j = j < -1 ? last : (j > last ? 0 : j);

        selectedItemIndex.value[i] = j;
        if (j > -1) timeListRefs.value[i].scrollTo(j);
        return;
      }

      // enter
      if (e.keyCode === 13) {
        if (e.target.value !== e.target.__oldValue__) {
          toggleView(false);
        } else {
          stopAndPrevent(e);

          const i = selectedListIndex.value;
          const j = selectedItemIndex.value[i];

          if (j > -1) onSelect(i, j);
          else toggleView(false);

          selectedListIndex.value = i === 0 ? 1 : 0;
        }
        return;
      }

      toggleView(false);
    }

    function isActive(i, j) {
      const val = timeLists[i][j];
      return i === 0 ? value.value.startsWith(val) : value.value.endsWith(val);
    }

    function isSelected(i, j) {
      return selectedListIndex.value === i
        && selectedItemIndex.value[i] === j;
    }

    function onMousemove(i, j) {
      selectedListIndex.value = i;
      selectedItemIndex.value[i] = j;
    }

    function focus() {
      inputRef.value?.focus();
    }

    const clickOutsideProps = {
      innerRefs: [inputRef, timeRef],
      onClickOutside() {
        toggleView(false);
      },
    };

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

        timeClickCount[0] = 0;
        timeClickCount[1] = 0;
        selectedListIndex.value = 0;
        selectedItemIndex.value = [-1, -1];

        await nextTick();
        scrollToSelected();
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

    const fieldStyles = useFieldStyle();
    const { fieldStyleProps, fieldClass } = fieldStyles;
    const timePickerClass = computed(() => ({
      ...fieldClass.value,
      'q-field--highlighted': showing.value,
    }));

    return {
      ...fieldCtx,
      fieldStyleProps,
      timePickerClass,
      timeRef,
      timeListRefs,
      timeLists,
      showing,
      selectedListIndex,
      selectedItemIndex,
      innerValue,
      toggleView,
      scrollToSelected,
      onChangeInput,
      isActive,
      isSelected,
      onMousemove,
      onSelect,
      focus,
    };
  },
};
</script>
