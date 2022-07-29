<template>
  <q-input
    ref="inputRef"
    v-bind="styleClassAttrs"
    v-model="innerValue"
    class="kw-time-picker"
    :class="{'q-field--focused': showing}"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    :readonly="readonly"
    :disable="disable"
    mask="##:##"
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
        name="access_time"
        class="cursor-pointer"
        @click.prevent="toggleView()"
      />
    </template>
    <q-menu
      v-model="showing"
      class="kw-time-picker"
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
          v-slot="{ item, index: j }"
          class="kw-time-picker__list"
          :items="timeList"
        >
          <q-item
            :key="item"
            clickable
            manual-focus
            :focused="isSelectedItem(i, j)"
            @mousemove="onMousemoveItem(i, j)"
            @click="onSelectItem(i, j)"
          >
            <q-item-section>
              {{ item }}
            </q-item-section>
          </q-item>
        </q-virtual-scroll>
      </div>
    </q-menu>
  </q-input>
</template>

<script>
import { date } from 'quasar';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';
import { stopAndPrevent, preventSubmitEnter, addEvt, removeEvt } from '../../utils/private/event';

function createOptions(n) {
  const { length } = n.toString();
  return Array(n).fill().map((_, i) => i.toString().padStart(length, '0'));
}

export default {
  name: 'KwTimePicker',
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
  },

  emits: ['update:modelValue'],

  setup(props) {
    const iconRef = ref();
    const timeRef = ref();
    const timeListRefs = ref();

    const timeClickCount = [0, 0];
    const timeLists = [
      createOptions(24),
      createOptions(60),
    ];

    const showing = ref(false);
    const selectedListIndex = ref(-1);
    const selectedItemIndex = reactive([-1, -1]);

    const fieldCtx = useField();
    const { value, inputRef } = fieldCtx;
    const innerValue = ref(value.value);

    watch(value, (val) => {
      innerValue.value = val;
    });

    async function toggleView(e) {
      showing.value = e ?? !showing.value;
    }

    const getHourValue = () => value.value.substring(0, 2);
    const getMinValue = () => (props.unmaskedValue ? value.value.substring(2, 4) : value.value.substring(3, 5));

    function scrollToSelected() {
      if (value.value && timeListRefs.value) {
        timeListRefs.value.forEach((vm, i) => {
          const val = i === 0 ? getHourValue() : getMinValue();
          const index = timeLists[i].findIndex((v) => v === val);

          selectedItemIndex[i] = index;
          if (index > -1) vm.scrollTo(index);
        });
      }
    }

    function onBlurInput() {
      const el = timeRef.value;

      if (!el?.contains(document.activeElement)) {
        toggleView(false);
      }
    }

    function onChangeInput(e) {
      e = e.replace(/_/g, '');

      if (e === ':') {
        value.value = '';
        return;
      }

      const n = Date.parse(`1970-01-01 ${e}`);

      if (!Number.isNaN(n)) {
        const val = date.formatDate(n, 'YYYY-MM-DD HH:mm').split(' ')[1];
        value.value = props.unmaskedValue ? val.replace(/:/g, '') : val;
      }

      innerValue.value = value.value;

      const el = inputRef.value.getNativeElement();
      const shouldChangeSelection = document.activeElement === el && el.selectionEnd < 5;

      if (shouldChangeSelection) {
        const i = !innerValue.value ? 0 : 5;
        el.setSelectionRange(i, i);
      }

      if (showing.value) {
        scrollToSelected();
      }
    }

    function onSelectItem(listIndex, itemIndex) {
      const el = inputRef.value.getNativeElement();

      const val = timeLists[listIndex][itemIndex];
      const h = (listIndex === 0 ? val : getHourValue()) || '00';
      const m = (listIndex === 0 ? getMinValue() : val) || '00';
      const otherIndex = listIndex === 0 ? 1 : 0;

      value.value = props.unmaskedValue ? `${h}${m}` : `${h}:${m}`;
      el.__oldValue__ = props.unmaskedValue ? `${h}:${m}` : value.value;
      innerValue.value = value.value;

      timeClickCount[listIndex] += 1;
      selectedItemIndex[listIndex] = itemIndex;

      if (timeClickCount[otherIndex] > 0) {
        toggleView(false);
      }

      el.focus();
      el.setSelectionRange(5, 5);
    }

    function onKeydownInput(e) {
      // enter
      if (e.keyCode === 13 && (e.target.value === e.target.__oldValue__)) {
        stopAndPrevent(e);
        toggleView(true);
      }
    }

    function onKeydownInputWhenShowing(e) {
      // home, end - 36, 35
      if (e.keyCode === 35 || e.keyCode === 36) {
        stopAndPrevent(e);

        const i = selectedListIndex.value;
        const j = e.keyCode === 36 ? 0 : timeLists[i].length - 1;

        selectedItemIndex[i] = j;
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

        let j = selectedItemIndex[i];
        j = e.keyCode === 33 ? Math.max(0, j - size) : Math.min(last, j + size);

        selectedItemIndex[i] = j;
        vm.scrollTo(j);
        return;
      }

      // up, down
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);

        const i = selectedListIndex.value;
        const last = timeLists[i].length - 1;

        let j = selectedItemIndex[i] + (e.keyCode === 38 ? -1 : 1);
        // eslint-disable-next-line no-nested-ternary
        j = j < -1 ? last : (j > last ? 0 : j);

        selectedItemIndex[i] = j;
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
          const j = selectedItemIndex[i];

          if (j > -1) onSelectItem(i, j);
          else toggleView(false);

          selectedListIndex.value = i === 0 ? 1 : 0;
        }
        return;
      }

      toggleView(false);
    }

    function isSelectedItem(listIndex, itemIndex) {
      return selectedListIndex.value === listIndex
        && selectedItemIndex[listIndex] === itemIndex;
    }

    function onMousemoveItem(listIndex, itemIndex) {
      selectedListIndex.value = listIndex;
      selectedItemIndex[listIndex] = itemIndex;
    }

    function focus() {
      inputRef.value?.focus();
    }

    const clickOutsideProps = {
      innerRefs: [inputRef, iconRef, timeRef],
      onClickOutside() {
        toggleView(false);
      },
    };

    watch(showing, async (val) => {
      if (val) {
        const el = inputRef.value.getNativeElement();

        if (el !== document.activeElement) {
          el.focus();
          el.setSelectionRange(5, 5);
        }

        removeEvt(inputRef, 'keydown', onKeydownInput, true);
        addEvt(inputRef, 'keydown', onKeydownInputWhenShowing, true);
        addClickOutside(clickOutsideProps);

        timeClickCount[0] = 0;
        timeClickCount[1] = 0;
        selectedListIndex.value = 0;

        await nextTick();
        scrollToSelected();
      } else {
        removeEvt(inputRef, 'keydown', onKeydownInputWhenShowing, true);
        removeClickOutside(clickOutsideProps);
        addEvt(inputRef, 'keydown', onKeydownInput, true);
      }
    });

    onMounted(() => {
      addEvt(inputRef, 'keydown', onKeydownInput, true);
      preventSubmitEnter(inputRef);
    });

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      iconRef,
      timeRef,
      timeListRefs,
      timeLists,
      showing,
      selectedListIndex,
      selectedItemIndex,
      innerValue,
      toggleView,
      scrollToSelected,
      onBlurInput,
      onChangeInput,
      isSelectedItem,
      onMousemoveItem,
      onSelectItem,
      focus,
    };
  },
};
</script>
