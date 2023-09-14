<template>
  <!-- 모바일, 태블릿용 -> 탭 시 나오게 변경 -->
  <kw-click-outside @click-outside="value = false">
    <template v-if="!$g.platform.is.desktop">
      <div v-touch-hold="emitTouchHoldEvent">
        <q-tooltip
          class="kw-tooltip"
          v-bind="styleClassAttrs"
          :model-value="value"
          :scroll-target="scrollTarget"
          :target="target"
          :delay="delay"
          :hide-delay="hideDelay"
          :no-parent-event="noParentEvent"
          :max-height="maxHeight"
          :max-width="maxWidth"
          :anchor="anchor"
          :self="self"
          :offset="offset"
          :transition-duration="0"
          @touchstart.stop
          @mousedown.stop
          @update:model-value="onUpdateValue"
          @before-show="$emit('beforeShow', $event)"
        >
          <slot />
        </q-tooltip>
      </div>
    </template>
    <!-- PC용 -> 그대로 -->
    <template v-else>
      <q-tooltip
        class="kw-tooltip"
        v-bind="styleClassAttrs"
        :model-value="value"
        :scroll-target="scrollTarget"
        :target="target"
        :delay="delay"
        :hide-delay="hideDelay"
        :no-parent-event="noParentEvent"
        :max-height="maxHeight"
        :max-width="maxWidth"
        :anchor="anchor"
        :self="self"
        :offset="offset"
        :transition-duration="0"
        @update:model-value="onUpdateValue"
        @before-show="$emit('beforeShow', $event)"
      >
        <slot />
      </q-tooltip>
    </template>
  </kw-click-outside>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import useInheritAttrs from '../../composables/private/useInheritAttrs';

export default {
  name: 'KwTooltip',
  inheritAttrs: false,

  props: {
    // custom props
    showWhenEllipsised: { type: Boolean, default: false },

    // fallthrough props
    modelValue: { type: Boolean, default: undefined },
    scrollTarget: { type: [Element, String], default: undefined },
    target: { type: [Boolean, String], default: undefined },
    noParentEvent: { type: Boolean, default: false },
    delay: { type: Number, default: 100 },
    hideDelay: { type: Number, default: 0 },
    maxHeight: { type: String, default: undefined },
    maxWidth: { type: String, default: undefined },
    anchor: { type: String, default: undefined },
    self: { type: String, default: undefined },
    offset: { type: Array, default: () => [0, 3] },
    multiline: { type: Number, default: 0 },
  },

  emits: [
    'update:modelValue',
    'beforeShow',
    'touchStart',
  ],

  setup(props, { emit, slots }) {
    const vm = getCurrentInstance();

    const getParentEl = () => vm.proxy.$el.parentElement;
    const isEllipsised = () => getParentEl()?.scrollWidth > getParentEl()?.offsetWidth;
    const isMultilineEllipsised = () => {
      const tempDiv = document.createElement('div');
      tempDiv.setAttribute('id', 'tempDiv');
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.whiteSpace = 'nowrap';
      tempDiv.style.wordBreak = 'break-word';
      tempDiv.append(cloneDeep(slots.default?.()?.[0]?.children));
      document.body.append(tempDiv);

      console.log(tempDiv.scrollWidth, tempDiv.offsetWidth);
      const result = tempDiv.scrollWidth > tempDiv.offsetWidth * (props.multiline ?? 1);
      document.body.removeChild(tempDiv);

      return result;
    };

    const isShowable = () => {
      if (props.showWhenEllipsised) return isEllipsised();
      if (props.multiline > 1) return isMultilineEllipsised();
      return true;
    };

    const value = ref(false);

    function onUpdateValue(val) {
      if (!val || isShowable()) value.value = val;
    }

    watch(value, (val) => emit('update:modelValue', val));
    watch(() => props.modelValue, onUpdateValue);
    function emitTouchHoldEvent(e) {
      emit('touchStart', e);
    }
    return {
      ...useInheritAttrs(),
      value,
      onUpdateValue,
      emitTouchHoldEvent,
    };
  },
};
</script>
