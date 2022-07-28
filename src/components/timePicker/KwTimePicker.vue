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
            :active="isSelectedItem(i, j, item)"
            @click="onSelectItem(i, j, item)"
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
import { preventSubmitEnter } from '../../utils/private/preventSubmit';

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

    const fieldCtx = useField();
    const { value, inputRef } = fieldCtx;
    const innerValue = ref(value.value);

    watch(value, (val) => {
      innerValue.value = val;
    });

    const getHourValue = () => value.value.substring(0, 2);
    const getMinValue = () => (props.unmaskedValue ? value.value.substring(2, 4) : value.value.substring(3, 5));

    function scrollToSelected() {
      if (value.value && timeListRefs.value) {
        timeListRefs.value.forEach((vm, i) => {
          const val = i === 0 ? getHourValue() : getMinValue();
          const index = timeLists[i].findIndex((v) => v === val);

          if (index > -1) vm.scrollTo(index);
        });
      }
    }

    async function toggleView(e) {
      showing.value = e ?? !showing.value;

      if (showing.value) {
        const el = inputRef.value.getNativeElement();

        if (el !== document.activeElement) {
          el.focus();
          el.setSelectionRange(5, 5);
        }

        timeClickCount[0] = 0;
        timeClickCount[1] = 0;

        await nextTick();
        scrollToSelected();
      }
    }

    function onBlurInput() {
      const el = timeRef.value;

      if (!el?.contains(document.activeElement)) {
        toggleView(false);
      }
    }

    async function onChangeInput(e) {
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

    // eslint-disable-next-line no-unused-vars
    function onKeydownInput(evt) {
      // home, end - 36, 35
      // if (evt.keyCode === 35 || evt.keyCode === 36) {
      //   stopAndPrevent(evt);
      // }

      // // pg up, pg down - 33, 34
      // if (evt.keyCode === 33 || evt.keyCode === 34) {
      //   stopAndPrevent(evt);
      // }

      // up, down
      // if (evt.keyCode === 38 || evt.keyCode === 40) {
      //   stopAndPrevent(evt)
      // }
    }

    function isSelectedItem(index, val) {
      return !!value.value && (index === 0 ? val === getHourValue() : val === getMinValue());
    }

    function onSelectItem(listIndex, itemIndex, val) {
      const h = (listIndex === 0 ? val : getHourValue()) || '00';
      const m = (listIndex === 0 ? getMinValue() : val) || '00';
      const otherIndex = listIndex === 0 ? 1 : 0;

      value.value = props.unmaskedValue ? `${h}${m}` : `${h}:${m}`;
      timeClickCount[listIndex] += 1;

      if (timeClickCount[otherIndex] > 0) {
        toggleView(false);
      }

      const el = inputRef.value.getNativeElement();

      el.focus();
      el.setSelectionRange(5, 5);
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
      const el = inputRef.value.getNativeElement();

      if (val) {
        el.addEventListener('keydown', onKeydownInput);
        addClickOutside(clickOutsideProps);
      } else {
        el.removeEventListener('keydown', onKeydownInput);
        removeClickOutside(clickOutsideProps);
      }
    });

    onMounted(() => {
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
      innerValue,
      toggleView,
      scrollToSelected,
      onBlurInput,
      onChangeInput,
      onKeydownInput,
      isSelectedItem,
      onSelectItem,
      focus,
    };
  },
};
</script>
