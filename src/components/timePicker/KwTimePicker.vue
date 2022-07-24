<template>
  <q-input
    ref="inputRef"
    v-model="innerValue"
    v-bind="styleClassAttrs"
    class="kw-time-picker"
    :label="$q.platform.is.desktop ? null : label"
    :error="error"
    :error-message="errorMessage"
    :readonly="readonly"
    :disable="disable"
    mask="##:##"
    unmasked-value
    no-error-icon
    @change="onChangeInput"
  >
    <template #append>
      <q-icon
        ref="iconRef"
        name="access_time"
        class="cursor-pointer"
        @click="toggleTime()"
      />
    </template>
    <q-menu
      v-model="showing"
      no-parent-event
      no-focus
      no-refocus
    >
      <q-time
        ref="timeRef"
        v-model="value"
        v-bind="inheritedAttrs"
        mask="HH:mm"
        @update:model-value="toggleTime(false)"
      />
    </q-menu>
  </q-input>
</template>

<script>
import { date } from 'quasar';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useField, { useFieldProps } from '../../composables/private/useField';
import { addClickOutside, removeClickOutside } from '../../utils/private/clickOutside';
import { preventSubmitEnter } from '../../utils/private/preventSubmit';

export default {
  name: 'KwTimePicker',
  inheritAttrs: false,

  props: {
    ...useFieldProps,

    modelValue: {
      type: String,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup() {
    const iconRef = ref();
    const timeRef = ref();
    const showing = ref(false);

    function toggleTime(e) {
      showing.value = e ?? !showing.value;
    }

    const clickOutsideProps = {
      innerRefs: [iconRef, timeRef],
      onClickOutside() {
        toggleTime(false);
      },
    };

    watch(showing, (val) => {
      if (val) {
        addClickOutside(clickOutsideProps);
      } else {
        removeClickOutside(clickOutsideProps);
      }
    });

    const fieldCtx = useField();
    const { value, inputRef } = fieldCtx;
    const innerValue = ref(value.value);

    watch(value, (val) => {
      innerValue.value = val;
    });

    function onChangeInput(e) {
      if (!e || date.isValid(e)) {
        value.value = innerValue.value;
      } else {
        innerValue.value = value.value;
      }
    }

    onMounted(() => {
      preventSubmitEnter(inputRef);
    });

    return {
      ...useInheritAttrs(),
      ...fieldCtx,
      showing,
      iconRef,
      timeRef,
      innerValue,
      toggleTime,
      onChangeInput,
    };
  },
};
</script>
