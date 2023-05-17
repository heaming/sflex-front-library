<template>
  <div
    :class="stepperClass"
    v-bind="styleClassAttrs"
  >
    <span
      v-if="useHeading"
      class="kw-stepper__title"
    >
      {{ activeHeader?.props.headingText || activeHeader?.props.title }}
      {{ activeHeader?.props['sub-text'] ? ` / ${activeHeader?.props['sub-text']}` : '' }}
    </span>

    <q-stepper
      :id="stepperId"
      ref="stepperRef"
      :model-value="modelValue"
      :header-class="headerClass"
      :header-nav="headerNav"
      :alternative-labels="alternativeLabels"
      :inactive-color="inactiveColor"
      :inactive-icon="inactiveIcon"
      :vertical="vertical"
      :done-icon="doneIcon"
      :done-color="doneColor"
      :active-icon="activeIcon"
      :active-color="activeColor"
      :error-icon="errorIcon"
      :error-color="errorColor"
      @click="onClickStep"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template v-if="!vertical">
        <q-step
          v-for="header of headers"
          :key="header.props.name"
          v-bind="getHeaderProps(header)"
        />
      </template>
      <template v-else>
        <slot />
      </template>
    </q-stepper>

    <kw-tooltip
      v-for="tooltip of tooltips"
      :key="tooltip.key"
      :target="tooltip.target"
      :offset="[0, 3]"
    >
      {{ tooltip.content }}
    </kw-tooltip>
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
import { kebabCase } from 'lodash-es';
import { uid } from 'quasar';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import usePanels, { usePanelsProps, usePanelsEmits } from '../../composables/private/usePanels';
import { getNormalizedVNodes } from '../../utils/private/vm';

function getNormalizedHeaders(slots) {
  const vnodes = slots.default();
  const normalizedVNodes = getNormalizedVNodes(vnodes);

  const isValidStep = (v) => v.type.name === 'KwStep' && v.props?.name !== undefined;
  const panels = normalizedVNodes.filter(isValidStep);

  return panels;
}

export default {
  name: 'KwStepper',
  inheritAttrs: false,

  props: {
    ...usePanelsProps,

    // customize props
    headingText: { type: Boolean, default: false },
    subText: { type: Boolean, default: false },
    // fallthrough props
    headerClass: { type: Boolean, default: undefined },
    headerNav: { type: Boolean, default: false },
    alternativeLabels: { type: Boolean, default: false },
    inactiveColor: { type: String, default: undefined },
    inactiveIcon: { type: String, default: undefined },
    activeIcon: { type: String, default: 'none' },
    activeColor: { type: String, default: undefined },
    doneIcon: { type: String, default: 'checked_stepper' },
    doneColor: { type: String, default: undefined },
    errorIcon: { type: String, default: undefined },
    errorColor: { type: String, default: undefined },
    onClickStep: { type: Function, default: () => {} },
  },

  emits: [
    ...usePanelsEmits,
  ],

  setup(props) {
    const useHeading = computed(() => props.headingText === true && props.alternativeLabels === false);

    const stepperId = `s_${uid()}`;
    const stepperRef = ref();
    const stepperClass = computed(() => ({
      'kw-stepper': true,
      'kw-stepper--heading-text': useHeading.value,
    }));

    const slots = useSlots();
    const headers = computed(() => getNormalizedHeaders(slots));
    const activeHeader = computed(() => headers.value.find((e) => e.props.name === props.modelValue));

    const getHeaderProps = (header) => {
      const headerProps = {};
      const propKeys = Object.keys(header.type.props);

      propKeys.forEach((key) => {
        headerProps[key] = (header.props[key] || header.props[kebabCase(key)]) ?? header.type.props[key].default;
      });

      headerProps.prefix = (
        headerProps.icon
        || (headerProps.activeIcon && headerProps.name === props.modelValue)
        || (headerProps.errorIcon && headerProps.error)
      ) ? undefined : headerProps.prefix;

      return headerProps;
    };

    const tooltips = computed(() => {
      const _tooltips = [];
      headers.value.forEach((e, i) => {
        if (!!e.props.tooltip && !e.props.disable) {
          _tooltips.push({
            key: e.props.name,
            target: `#${stepperId} > .q-stepper__header > .q-stepper__tab:nth-child(${i + 1})`,
            content: e.props.tooltip,
          });
        }
      });
      return _tooltips;
    });

    return {
      ...useInheritAttrs(),
      ...usePanels('KwStepPanel'),
      useHeading,
      stepperId,
      stepperRef,
      stepperClass,
      headers,
      activeHeader,
      getHeaderProps,
      tooltips,
    };
  },

};
</script>
