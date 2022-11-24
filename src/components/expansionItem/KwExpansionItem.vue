<template>
  <q-expansion-item
    ref="quasarRef"
    v-bind="styleClassAttrs"
    class="kw-expansion-item"
    :class="expansionItemClass"
    :toggle-aria-label="toggleAriaLabel"
    :icon="icon"
    :label="label"
    :label-lines="labelLines"
    :caption="caption"
    :caption-lines="captionLines"
    :dense="dense"
    :expand-icon="computedExpandIcon"
    :expanded-icon="expandedIcon"
    :expand-icon-class="expandIconClass"
    :duration="duration"
    :header-inset-level="headerInsetLevel"
    :content-inset-level="contentInsetLevel"
    :expand-separator="expandSeparator"
    :default-opened="defaultOpened"
    :expand-icon-toggle="expandIconToggle"
    :switch-toggle-side="switchToggleSide"
    :dense-toggle="denseToggle"
    :group="group"
    :popup="popup"
    :header-style="headerStyle"
    :header-class="headerClass"
    :dark="dark"
    :to="to"
    :replace="replace"
    :exact="exact"
    :href="href"
    :target="target"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :disable="disable"
    :model-value="showing"
    @update:model-value="onUpdateModelValue"
    @before-show="$emit('before-show', $event)"
    @show="$emit('show', $event)"
    @before-hide="$emit('before-hide', $event)"
    @hide="$emit('hide', $event)"
    @click="$emit('click', $event)"
    @after-show="$emit('after-show', $event)"
    @after-hide="$emit('after-hide', $event)"
  >
    <slot :toggle-count="toggleCount" />
    <template
      v-if="$slots.header"
      #header="scoped"
    >
      <slot
        name="header"
        v-bind="scoped"
        :toggle-count="toggleCount"
        :read="read"
      />
    </template>
  </q-expansion-item>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { platform } from '../../plugins/platform';

export default {
  name: 'KwExpansionItem',
  inheritAttrs: false,
  props: {
    // customize props

    // fall through props
    toggleAriaLabel: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    label: { type: String, default: undefined },
    labelLines: { type: [Number, String], default: undefined },
    caption: { type: String, default: undefined },
    captionLines: { type: [Number, String], default: undefined },
    dense: { type: Boolean, default: undefined },
    expandIcon: { type: String, default: undefined },
    expandedIcon: { type: String, default: undefined },
    expandIconClass: { type: [Array, String, Object], default: undefined },
    duration: { type: Number, default: undefined },
    headerInsetLevel: { type: Number, default: undefined },
    contentInsetLevel: { type: Number, default: undefined },
    expandSeparator: { type: Boolean, default: undefined },
    defaultOpened: { type: Boolean, default: undefined },
    expandIconToggle: { type: Boolean, default: undefined },
    switchToggleSide: { type: Boolean, default: undefined },
    denseToggle: { type: Boolean, default: undefined },
    group: { type: String, default: undefined },
    popup: { type: Boolean, default: undefined },
    headerStyle: { type: [Array, String, Object], default: undefined },
    headerClass: { type: [Array, String, Object], default: undefined },
    dark: { type: String, default: undefined },
    to: { type: String, default: undefined },
    replace: { type: Boolean, default: undefined },
    exact: { type: Boolean, default: undefined },
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },
    activeClass: { type: String, default: 'q-router-link--active' },
    exactActiveClass: { type: String, default: 'q-router-link--exact-active' },
    disable: { type: Boolean, default: undefined },
    modelValue: { type: Boolean, default: null },
  },

  emits: [
    'update:modelValue',
    'before-show',
    'show',
    'before-hide',
    'hide',
    'click',
    'after-show',
    'after-hide',
  ],
  setup(props, { emit }) {
    const quasarRef = ref();
    const showing = ref(props.defaultOpened);
    const toggleCount = ref(0);
    const read = computed(() => props.defaultOpened || toggleCount.value > 0);
    const expansionItemClass = computed(() => {
      const classes = {};
      classes['kw-expansion-item--read'] = read.value;
      return classes;
    });

    watch(() => props.modelValue, (val) => { showing.value = val; });
    watch(showing, () => { toggleCount.value += 1; });

    const defaultExpandIcon = platform.is.tablet ? 'arrow_down' : 'arrow_down_24';

    const computedExpandIcon = computed(() => props.expandIcon ?? defaultExpandIcon);

    function onUpdateModelValue(evt) {
      showing.value = evt;
      emit('update:modelValue', evt);
    }

    function show(evt) { quasarRef.value?.show(evt); }
    function hide(evt) { quasarRef.value?.hide(evt); }
    function toggle(evt) { quasarRef.value?.toggle(evt); }

    const { styleClassAttrs } = useInheritAttrs();

    return {
      quasarRef,
      styleClassAttrs,
      show,
      hide,
      toggle,
      onUpdateModelValue,
      computedExpandIcon,
      toggleCount,
      showing,
      expansionItemClass,
      read,
    };
  },
};
</script>
