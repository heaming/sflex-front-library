<template>
  <q-menu
    ref="menuRef"
    v-bind="styleClassAttrs"
    :model-value="showing"
    :class="menuClass"
    :target="target"
    :no-parent-event="noParentEvent"
    :context-menu="contextMenu"
    :scroll-target="scrollTarget"
    :touch-position="touchPosition"
    :persistent="persistent"
    :no-refocus="(isDialog || noRefocus)"
    :no-focus="(isDialog || noFocus)"
    :fit="fit"
    :cover="cover"
    :anchor="anchor"
    :self="self"
    :offset="offset"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :transition-duration="isDialog ? 0 : undefined"
    @before-show="$emit('beforeShow', $event)"
    @show="$emit('show', $event)"
    @before-hide="$emit('beforeHide', $event)"
    @hide="$emit('hide', $event)"
    @escape-key="$emit('escapeKey', $event)"
    @update:model-value="onUpdateShowing"
  >
    <kw-scroll-area class="kw-menu__scroll-area">
      <slot v-if="!isDialog" />
    </kw-scroll-area>
  </q-menu>
  <q-dialog
    v-if="isDialog"
    ref="dialogRef"
    v-bind="styleClassAttrs"
    :model-value="showing"
    :class="dialogClass"
    :persistent="persistent"
    :no-refocus="noRefocus"
    :no-focus="noFocus"
    :no-shake="true"
    transition-show="jump-up"
    transition-hide="jump-down"
    @update:model-value="onUpdateShowing"
  >
    <div>
      <kw-scroll-area class="kw-menu-dialog__scroll-area">
        <div class="kw-menu-dialog__header">
          <h1>{{ title }}</h1>
          <q-icon
            name="close"
            @click="onUpdateShowing(false)"
          />
        </div>
        <div class="kw-menu-dialog__content">
          <slot />
        </div>
        <div class="kw-menu-dialog__action">
          <slot name="action" />
        </div>
      </kw-scroll-area>
    </div>
  </q-dialog>
</template>

<script>
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import { platform } from '../../plugins/platform';

const behaviorValues = ['menu', 'dialog'];

export default {
  name: 'KwMenu',
  inheritAttrs: false,

  props: {
    modelValue: { type: Boolean, default: undefined },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:modelValue': { type: Function, default: undefined },

    behavior: { type: String, default: behaviorValues[0], validator: (v) => behaviorValues.includes(v) },
    title: { type: String, default: undefined },

    // fallthrough
    target: { type: [Boolean, String, Element], default: undefined },
    noParentEvent: { type: Boolean, default: false },
    contextMenu: { type: Boolean, default: false },
    scrollTarget: { type: [Element, String], default: undefined },
    touchPosition: { type: Boolean, default: false },
    persistent: { type: Boolean, default: false },
    noRefocus: { type: Boolean, default: false },
    noFocus: { type: Boolean, default: false },
    fit: { type: Boolean, default: false },
    cover: { type: Boolean, default: false },
    anchor: { type: String, default: undefined },
    self: { type: String, default: undefined },
    offset: { type: Array, default: undefined },
    maxHeight: { type: String, default: undefined },
    maxWidth: { type: String, default: undefined },
  },
  emits: [
    'beforeShow',
    'show',
    'beforeHide',
    'hide',
    'escapeKey',
  ],

  setup(props) {
    const menuRef = ref();
    const dialogRef = ref();

    const isDialog = computed(() => {
      const isMobile = platform.is.mobile === true;
      const behaviorIsDialog = props.behavior === behaviorValues[1];
      return isMobile && behaviorIsDialog;
    });

    const currentComponent = computed(() => (isDialog.value ? dialogRef.value : menuRef.value));
    const contentEl = computed(() => currentComponent.value?.contentEl);

    const menuClass = computed(() => ({
      'kw-menu': true,
      'kw-menu--dialog': isDialog.value,
    }));

    const slots = useSlots();
    const dialogClass = computed(() => ({
      'kw-menu-dialog': true,
      'kw-menu-dialog--no-action': slots.action === undefined,
    }));

    const showing = ref(false);

    watch(() => props.modelValue, (val) => {
      showing.value = val;
    }, { immediate: true });

    function onUpdateShowing(val) {
      const onUpdateModelValue = props['onUpdate:modelValue'];

      if (onUpdateModelValue) {
        onUpdateModelValue(val);
      } else {
        showing.value = val;
      }
    }

    function show(evt) {
      currentComponent.value.show(evt);
    }

    function hide(evt) {
      currentComponent.value.hide(evt);
    }

    function toggle(evt) {
      currentComponent.value.toggle(evt);
    }

    function focus() {
      currentComponent.value.focus();
    }

    return {
      ...useInheritAttrs(),
      menuRef,
      dialogRef,
      isDialog,
      currentComponent,
      contentEl,
      menuClass,
      dialogClass,
      showing,
      onUpdateShowing,
      show,
      hide,
      toggle,
      focus,
    };
  },
};
</script>
