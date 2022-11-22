<template>
  <q-expansion-item
    ref="quasarRef"
    v-bind="styleClassAttrs"
    class="kw-expansion-item"
    :toggle-aria-label="toggleAriaLabel"
    :icon="icon"
    :label="label"
    :label-lines="labelLines"
    :caption="caption"
    :caption-lines="captionLines"
    :dense="dense"
    :expand-icon="expandIcon"
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
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @before-show="$emit('before-show', $event)"
    @show="$emit('show', $event)"
    @before-hide="$emit('before-hide', $event)"
    @hide="$emit('hide', $event)"
    @click="$emit('click', $event)"
    @after-show="$emit('after-show', $event)"
    @after-hide="$emit('after-hide', $event)"
  >
    <slot />
    <template
      v-if="$slots.header"
      #header="scoped"
    >
      <slot
        name="header"
        v-bind="scoped"
      />
    </template>
  </q-expansion-item>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';

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
    expandIcon: { type: String, default: 'arrow_down_24' },
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
  setup() {
    const quasarRef = ref();
    function show(...args) { quasarRef.value?.show(...args); }
    function hide(...args) { quasarRef.value?.hide(...args); }
    function toggle(...args) { quasarRef.value?.toggle(...args); }

    const { styleClassAttrs } = useInheritAttrs();

    return {
      quasarRef,
      styleClassAttrs,
      show,
      hide,
      toggle,
    };
  },
};
</script>
