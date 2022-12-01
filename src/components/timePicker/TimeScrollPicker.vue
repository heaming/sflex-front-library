<template>
  <div
    class="time-scroll-picker"
    tabindex="-1"
  >
    <kw-scroll-picker
      v-for="(items, i) in itemsList"
      :key="i"
      :model-value="values[i]"
      :items="items"
      :infinite="i > 0"
      :rotate-y="(i - 1) * 9"
      animate-on-value-update
      @update:model-value="onChange(i, $event)"
    />
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
    const meridiems = ['AM', 'PM'].map((value) => ({ value, label: i18n.t(`MSG_TXT_${value}`, null, value) }));
    const hours = [...Array(12).keys()].map((v) => v + 1).map((value) => ({ value, label: value }));
    const minutes = [...Array(60).keys()].map((value) => ({ value, label: value }));
    const itemsList = [meridiems, hours, minutes];

    const values = reactive([]);
    const timeFormat = computed(() => (props.unmaskedValue ? 'HHmm' : 'HH:mm'));

    watch(() => props.modelValue, (val) => {
      const format = `YYYY-MM-DD ${timeFormat.value}`;
      const value = val ? `1970-01-01 ${val}` : undefined;
      const date = dayjs(value, format);

      if (date.isValid()) {
        const meridiem = date.format('A');
        const hour12 = (date.hour() % 12) || 12;
        const minute = date.minute();
        const shouldChange = [meridiem, hour12, minute].some((v, i) => v !== values[i]);

        if (shouldChange) {
          values[0] = meridiem;
          values[1] = hour12;
          values[2] = minute;
        }
      }
    }, { immediate: true });

    function updateValue() {
      const hour24 = (values[0] === 'AM' ? 0 : 12) + (values[1] % 12);
      const minute = values[2];
      const date = dayjs().set('h', hour24).set('m', minute);
      const value = date.format(timeFormat.value);

      emit('update:modelValue', value);
    }

    function onChangeMeridiem(e) {
      values[0] = e;
      updateValue();
    }

    function onChangeHour(e) {
      const length = 7;
      const m = Math.floor(length / 2);
      const x = values[1] % 12;
      const y = e % 12;
      const isChanged = Math.max(x, y) >= 12 - m && Math.min(x, y) <= -1 + m;

      if (isChanged) {
        values[0] = values[0] === 'AM' ? 'PM' : 'AM';
      }

      values[1] = e;
      updateValue();
    }

    function onChangeMinute(e) {
      values[2] = e;
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
      values,
      onChange,
    };
  },
};
</script>
