<template>
  <div :class="stepperClass">
    <span
      v-if="headingText"
      class="kw-stepper__title"
    >{{ activeHeader?.props.title }}</span>

    <q-stepper
      ref="stepperRef"
      v-bind="styleClassAttrs"
      :model-value="modelValue"
      :header-class="headerClass"
      :header-nav="headerNav"
      :alternative-labels="alternativeLabels"
      :inactive-color="inactiveColor"
      :inactive-icon="inactiveIcon"
      :done-icon="doneIcon"
      :done-color="doneColor"
      :active-icon="activeIcon"
      :active-color="activeColor"
      :error-icon="errorIcon"
      :error-color="errorColor"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <component
        :is="header"
        v-for="header of headers"
        :key="header.props.name"
      />
    </q-stepper>
  </div>
  <div
    v-touch-swipe.mouse="onSwipe"
    class="kw-stepper__panels q-tab-panels q-panel-parent"
  >
    <transition
      v-for="panel of panels"
      :key="panel.props.name"
      v-bind="panelTransition"
    >
      <keep-alive>
        <component
          :is="panel"
          v-if="isActivePanel(panel)"
          @touchstart="onBeforeSwipe"
          @mousedown="onBeforeSwipe"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import usePanels, { usePanelsProps, usePanelsEmits } from '../../composables/private/usePanels';
import { getNormalizedVNodes } from '../../utils/private/vm';

function getNormalizedHeaders(slots) {
  const vnodes = slots.default();
  const normalizedVNodes = getNormalizedVNodes(vnodes);

  const isValidPanel = (v) => v.type.name === 'KwStep' && v.props?.name !== undefined;
  const headers = normalizedVNodes.filter(isValidPanel);

  return headers;
}

export default {
  name: 'KwStepper',
  inheritAttrs: false,

  props: {
    ...usePanelsProps,

    // customize props
    headingText: { type: Boolean, default: false },

    // fallthrough props
    headerClass: { type: Boolean, default: undefined },
    headerNav: { type: Boolean, default: false },
    alternativeLabels: { type: Boolean, default: undefined },
    inactiveColor: { type: String, default: undefined },
    inactiveIcon: { type: String, default: undefined },
    doneIcon: { type: String, default: 'checked_stepper' },
    doneColor: { type: String, default: undefined },
    activeIcon: { type: String, default: 'none' },
    activeColor: { type: String, default: undefined },
    errorIcon: { type: String, default: undefined },
    errorColor: { type: String, default: undefined },
  },

  emits: [
    ...usePanelsEmits,
  ],

  setup(props) {
    const stepperRef = ref();

    const slots = useSlots();
    const headers = computed(() => getNormalizedHeaders(slots));
    const activeHeader = computed(() => headers.value.find((v) => v.props.name === props.modelValue));

    const stepperClass = computed(() => ({
      'kw-stepper': true,
      'kw-stepper--heading-text': props.headingText === true,
    }));

    return {
      ...useInheritAttrs(),
      ...usePanels('KwStepPanel'),
      stepperRef,
      headers,
      activeHeader,
      stepperClass,
    };
  },

};
</script>
