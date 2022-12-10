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
    :no-route-dismiss="noRouteDismiss"
    :auto-close="autoClose"
    :separate-close-popup="separateClosePopup"
    :no-refocus="noRefocus"
    :no-focus="noFocus"
    :fit="fit"
    :cover="cover"
    :anchor="anchor"
    :self="self"
    :offset="offset"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :transition-show="$g.platform.is.mobile ? 'jump-up' : undefined"
    :transition-hide="$g.platform.is.mobile ? 'jump-down' : undefined"
    :transition-duration="$g.platform.is.mobile ? 0 : undefined"
    @show="$emit('show', $event)"
    @before-show="$emit('beforeShow', $event)"
    @hide="$emit('hide', $event)"
    @before-hide="$emit('beforeHide', $event)"
    @escape-key="$emit('escapeKey', $event)"
    @update:model-value="onUpdateShowing"
  >
    <slot v-if="!isDialog" />
  </q-menu>
  <q-dialog
    v-if="isDialog"
    ref="dialogRef"
    v-bind="styleClassAttrs"
    :model-value="showing"
    class="kw-menu-dialog"
    :persistent="persistent"
    :auto-close="autoClose"
    :no-route-dismiss="noRouteDismiss"
    :no-refocus="noRefocus"
    :no-focus="noFocus"
    :no-shake="true"
    :transition-show="$g.platform.is.mobile ? 'jump-up' : undefined"
    :transition-hide="$g.platform.is.mobile ? 'jump-down' : undefined"
    @update:model-value="onUpdateShowing"
  >
    <div>
      <div class="kw-menu-dialog__header">
        <h1>{{ title || 'testtest' }}</h1>
        <q-icon
          name="close"
          @click="onUpdateShowing(false)"
        />
      </div>
      <div class="kw-menu-dialog__content">
        <kw-scroll-area>
          <slot />
        </kw-scroll-area>
      </div>
      <div class="kw-menu-dialog__action">
        <slot name="action">
          <kw-btn />
        </slot>
      </div>
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
    noParentEvent: { type: Boolean, default: undefined },
    contextMenu: { type: Boolean, default: undefined },
    scrollTarget: { type: [Element, String], default: undefined },
    touchPosition: { type: Boolean, default: undefined },
    persistent: { type: Boolean, default: undefined },
    noRouteDismiss: { type: Boolean, default: undefined },
    autoClose: { type: Boolean, default: undefined },
    separateClosePopup: { type: Boolean, default: undefined },
    noRefocus: { type: Boolean, default: undefined },
    noFocus: { type: Boolean, default: undefined },
    fit: { type: Boolean, default: undefined },
    cover: { type: Boolean, default: undefined },
    anchor: { type: String, default: undefined },
    self: { type: String, default: undefined },
    offset: { type: Array, default: undefined },
    maxHeight: { type: String, default: undefined },
    maxWidth: { type: String, default: undefined },
  },
  emits: [
    'show',
    'beforeShow',
    'hide',
    'beforeHide',
    'escapeKey',
  ],

  // eslint-disable-next-line no-unused-vars
  setup(props, { emits, attrs }) {
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
