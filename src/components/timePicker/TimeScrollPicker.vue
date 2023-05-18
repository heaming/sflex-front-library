<template>
  <div
    class="time-scroll-picker"
    :class="$g.platform.is.mobile ? 'px20': ''"
  >
    <template
      v-for="(items, i) in itemsList"
      :key="i"
    >
      <kw-scroll-picker
        :model-value="innerValue[i]"
        :items="items"
        :item-size="$g.platform.is.mobile ? undefined : 32"
        :infinite="!$g.platform.is.mobile || i > 0"
        :rotate-y="$g.platform.is.mobile ? (i - 1) * 9 : undefined"
        :step="!$g.platform.is.mobile"
        animate-on-value-update
        @update:model-value="onChange(i, $event)"
      />
      <span
        v-if="!$g.platform.is.mobile && i+1 < itemsList.length"
        class="timepicker_colon"
      >:</span>
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import i18n from '../../i18n';

export default {
  name: 'TimeScrollPicker',

  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
    unmaskedValue: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'update:modelValue',
  ],

  setup(props, { emit }) {
    const meridiems = ['오전', '오후'].map((value) => ({ value, label: i18n.t(`MSG_TXT_${value}`, null, value) }));
    const hours = [...Array(12).keys()].map((v) => v + 1).map((value) => ({ value, label: value }));
    const minutes = [...Array(60).keys()].map((value) => ({ value, label: value }));
    const itemsList = [meridiems, hours, minutes];

    const innerValue = reactive([]);
    const timeFormat = computed(() => (props.unmaskedValue ? 'HHmm' : 'HH:mm'));

    function updateInnerValue(val) {
      const format = `YYYY-MM-DD ${timeFormat.value}`;
      const value = val ? `1970-01-01 ${val}` : undefined;
      const date = dayjs(value, format);

      if (date.isValid()) {
        const meridiem = date.format('A');
        const hour12 = (date.hour() % 12) || 12;
        const minute = date.minute();
        const shouldChange = [meridiem, hour12, minute].some((v, i) => v !== innerValue[i]);

        if (shouldChange) {
          innerValue[0] = meridiem;
          innerValue[1] = hour12;
          innerValue[2] = minute;
        }
      }
    }

    watch(() => props.modelValue, updateInnerValue, { immediate: true });

    function updateValue() {
      const hour24 = (innerValue[0] === '오전' ? 0 : 12) + (innerValue[1] % 12);
      const minute = innerValue[2];
      const date = dayjs().set('h', hour24).set('m', minute);
      const value = date.format(timeFormat.value);

      emit('update:modelValue', value);
    }

    function onChangeMeridiem(e) {
      innerValue[0] = e;
      updateValue();
    }

    function onChangeHour(e) {
      const length = 7;
      const m = Math.floor(length / 2);
      const x = innerValue[1] % 12;
      const y = e % 12;
      const isChanged = Math.max(x, y) >= 12 - m && Math.min(x, y) <= -1 + m;

      if (isChanged) {
        innerValue[0] = innerValue[0] === '오전' ? '오후' : '오전';
      }

      innerValue[1] = e;
      updateValue();
    }

    function onChangeMinute(e) {
      innerValue[2] = e;
      updateValue();
    }

    function onChange(index, e) {
      if (index === 0) {
        onChangeMeridiem(e);
        return;
      }
      if (index === 1) {
        onChangeHour(e);
        return;
      }
      if (index === 2) {
        onChangeMinute(e);
      }
    }

    return {
      itemsList,
      innerValue,
      onChange,
    };
  },
};
</script>
