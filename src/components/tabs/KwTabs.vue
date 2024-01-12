<template>
  <q-tabs
    v-if="rendered"
    :class="tabsClass"
    v-bind="styleProps"
    :model-value="modelValue"
    :vertical="vertical"
    :active-class="computedActiveClass"
    :indicator-color="indicatorColor"
    :left-icon="leftIcon"
    :right-icon="rightIcon"
    :outside-arrows="outsideArrows"
    :mobile-arrows="mobileArrows"
    :switch-indicator="switchIndicator"
    :narrow-indicator="narrowIndicator"
    :inline-label="inlineLabel"
    :no-caps="noCaps"
    :dense="computedDense"
    :content-class="computedContentClass"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </q-tabs>
</template>

<script>
import { platform } from '../../plugins/platform';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useDense, { useDenseProps } from '../../composables/private/useDense';

const mobilePreset = {
  // align: 'justify',
  bgColor: 'white',
  activeLine: 'mobile',
  activeColor: 'secondary',
  activeBgColor: 'white',
};

const densePreset = {
  activeLine: false,
  activeColor: 'white',
  activeBgColor: 'secondary',
};

export default {
  name: 'KwTabs',
  inheritAttrs: false,

  props: {
    color: { type: String, default: undefined },
    bgColor: { type: String, default: undefined },
    borderColor: { type: String, default: undefined },
    activeBorderColor: { type: String, default: undefined },
    activeLine: { type: String, default: undefined },
    align: { type: String, default: 'left' },
    indicator: { type: Boolean, default: undefined },
    noPadding: { type: Boolean, default: undefined },

    // fall through props
    ...useDenseProps,
    modelValue: { type: [Number, String], default: undefined },
    vertical: { type: Boolean, default: undefined },
    activeClass: { type: String, default: undefined },
    activeColor: { type: String, default: undefined },
    activeBgColor: { type: String, default: undefined },
    indicatorColor: { type: String, default: undefined },
    leftIcon: { type: String, default: 'arrow_left' },
    rightIcon: { type: String, default: 'arrow_right' },
    outsideArrows: { type: Boolean, default: true },
    mobileArrows: { type: Boolean, default: undefined },
    switchIndicator: { type: Boolean, default: undefined },
    narrowIndicator: { type: Boolean, default: false },
    inlineLabel: { type: Boolean, default: undefined },
    noCaps: { type: Boolean, default: true },
    contentClass: { type: String, default: undefined },
  },

  emits: [
    // fall through emits
    'update:modelValue',
  ],

  setup(props) {
    const stylePreset = computed(() => {
      if (props.dense) {
        return densePreset;
      }
      if (platform.is.mobile) {
        return mobilePreset;
      }
      return {};
    });

    const activeLineColor = computed(() => props.activeBorderColor ?? stylePreset.value?.activeBorderColor ?? 'black1');

    const activeLinePosition = computed(() => props.activeLine ?? stylePreset.value?.activeLine ?? 'bottom');

    const tabsClass = computed(() => {
      const classes = {
        'kw-tabs': true,
        'kw-tabs--dense': props.dense,
        'kw-tabs--show-indicator': props.indicator,
        'kw-tabs--no-padding': props.noPadding,
        'kw-tabs--vertical': props.vertical,
      };
      if (props.activeBorderColor) {
        classes[`kw-tabs--active-border-${props.activeBorderColor}`] = true;
      }

      if (activeLinePosition.value) {
        classes[`kw-tabs--active-line-${activeLinePosition.value}`] = true;
        classes[`kw-tabs--active-line-${activeLineColor.value}`] = true;
      }
      const tabAlign = props.align ?? stylePreset.value?.align;
      if (tabAlign) {
        classes[`kw-tabs--align-${tabAlign}`] = true;
      }
      return classes;
    });

    // notify! quasar only accept string....
    const computedContentClass = computed(() => {
      let classes = 'kw-tabs__content';
      if (props.contentClass) {
        classes += ` ${props.contentClass}`;
      }
      if (props.color) {
        classes += ` text-${props.color}`;
      }
      if (props.bgColor) {
        classes += ` bg-${props.bgColor}`;
      }
      if (props.borderColor) {
        classes += ` border-color-${props.borderColor}`;
      }
      return classes;
    });

    const computedActiveClass = computed(() => {
      let classes = 'kw-tab--active';
      if (props.activeClass) {
        classes += ` ${props.activeClass}`;
      }
      return classes;
    });

    const computedDense = useDense();

    const { styleClassAttrs } = useInheritAttrs();

    const styleProps = computed(() => ({
      ...styleClassAttrs.value,
      activeBgColor: props.activeBgColor ?? stylePreset.value?.activeBgColor,
      activeColor: props.activeColor ?? stylePreset.value?.activeColor,
    }));

    const rendered = ref(false);
    // kw-tab 관련, 퀘이사 콘솔오류 대처.
    // kw-page-header와의 시점 차이로 발생하는 듯 함
    setTimeout(() => { rendered.value = true; }, 0);

    return {
      tabsClass,
      computedDense,
      computedContentClass,
      computedActiveClass,
      styleProps,
      rendered,
    };
  },
};
</script>
