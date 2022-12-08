<template>
  <q-input
    ref="inputRef"
    v-model="inputValue"
    :prefix="inputPrefix"
    v-bind="fieldStyleProps"
    :class="fieldClasses"
    class="kw-field kw-time-picker2"
    :label="$g.platform.is.mobile ? label : undefined"
    :error="invalid"
    :readonly="readonly"
    :disable="disable"
    mask="##:##"
    :unmasked-value="unmaskedValue"
    :placeholder="placeholder"
    no-error-icon
    @click="setExpanded()"
    @change="onChangeInput"
  >
    <template #append>
      <div @click="setExpanded()">
        <q-icon name="clock" />
      </div>
    </template>

    <q-menu
      :model-value="showing"
      class="kw-time-picker2__menu"
      no-parent-event
      no-focus
      no-refocus
      fit
    >
      <div
        ref="scrollPickerContainerRef"
        tabindex="-1"
      >
        <time-scroll-picker
          v-model="value"
          :unmasked-value="unmaskedValue"
        />
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
import useTimePicker, { useTimePickerProps, useTimePickerEmits } from './private/useTimePicker';
import TimeScrollPicker from './TimeScrollPicker.vue';

export default {
  name: 'KwTimePicker2',
  components: { TimeScrollPicker },

  props: {
    ...useTimePickerProps,
  },

  emits: [
    ...useTimePickerEmits,
  ],

  setup() {
    const ctx = useTimePicker();

    return {
      ...ctx,
    };
  },
};
</script>
