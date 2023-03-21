<template>
  <q-input
    ref="inputRef"
    v-model="inputValue"
    :prefix="inputPrefix"
    v-bind="fieldStyleProps"
    :class="fieldClasses"
    class="kw-time-picker"
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

    <kw-menu
      ref="menuRef"
      :model-value="showing"
      class="kw-time-picker__menu"
      no-parent-event
      :no-focus="!$g.platform.is.mobile"
      :no-refocus="!$g.platform.is.mobile"
      :title="placeholder"
      :behavior="$g.platform.is.mobile ? 'dialog' : undefined"
      @update:model-value="setExpanded"
    >
      <time-scroll-picker
        :model-value="timeValue"
        :unmasked-value="unmaskedValue"
        @update:model-value="onChangeTime"
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
      <q-icon
        v-if="hint"
        size="16px"
        name="info"
        class="ml4"
        style="vertical-align: -3px;"
        @click="toggleHint"
      >
        <kw-tooltip v-model="showingHint">
          <slot name="hint">
            {{ hint }}
          </slot>
        </kw-tooltip>
      </q-icon>
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
  name: 'KwTimePicker',
  components: { TimeScrollPicker },

  props: {
    ...useTimePickerProps,
  },

  emits: [
    ...useTimePickerEmits,
  ],

  setup() {
    return {
      ...useTimePicker(),
    };
  },
};
</script>
