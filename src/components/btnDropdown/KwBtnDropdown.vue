<template>
  <q-btn-dropdown
    ref="btnRef"
    :model-value="modelValue"
    :dropdown-icon="dropdownIcon"
    :content-class="computedContentClass"
    :cover="cover"
    :persistent="persistent"
    :no-route-dismiss="noRouteDismiss"
    :menu-anchor="menuAnchor"
    :menu-self="menuSelf"
    :menu-offset="menuOffset"
    :auto-close="autoClose"
    :split="false"
    :disable-main-btn="false"
    :disable-dropdown="false"
    :no-icon-animation="noIconAnimation"
    v-bind="{...styleClassAttrs, ...buttonStyleProps}"
    :class="buttonDropdownClass"
    :style="buttonStyles"
    no-caps
    unelevated
    rectangle
    :ripple="false"
    :type="type"
    :label="label"
    :icon="icon"
    :icon-right="iconRight"
    :tabindex="tabindex"
    :align="align"
    :stack="stack"
    :stretch="stretch"
    :disable="disable || isDestroyed"
    :no-wrap="noWrap"
    @update:model-value="$emit('update:modelValue', $event)"
    @click="$emit('click', $event)"
    @hide="$emit('hide', $event)"
    @before-hide="$emit('before-hide', $event)"
    @show="$emit('show', $event)"
    @before-show="$emit('before-show', $event)"
  >
    <template
      v-if="$slots.default || $slots.menu"
    >
      <slot name="menu">
        <div
          v-close-popup
          class="kw-btn-dropdown__dropdown-box"
        >
          <slot />
        </div>
      </slot>
    </template>
    <template
      v-if="$slots.label"
      #label
    >
      <slot name="label" />
    </template>
  </q-btn-dropdown>
</template>

<script>
import usePermissions from '../../composables/private/usePermissions';
import useInheritAttrs from '../../composables/private/useInheritAttrs';
import useBtnStyle, { useBtnStyleProps } from '../../composables/private/useBtnStyle';

export default {
  name: 'KwBtnDropdown',
  inheritAttrs: false,
  props: {
    // customize props
    ...useBtnStyleProps,

    // fall through props
    type: { type: String, default: 'button' },
    label: { type: [Number, String], default: undefined },
    icon: { type: String, default: undefined },
    iconRight: { type: String, default: undefined },
    tabindex: { type: [Number, String], default: undefined },
    disable: { type: Boolean, default: false },

    // about innerClasses
    align: { type: String, default: 'center' },
    stack: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },

    modelValue: { type: Boolean, default: undefined },
    dropdownIcon: { type: String, default: 'arrow_down' },
    cover: { type: Boolean, default: false },
    persistent: { type: Boolean, default: false },
    noRouteDismiss: { type: Boolean, default: false },
    autoClose: { type: Boolean, default: false },
    menuAnchor: { type: String, default: 'bottom end' },
    menuSelf: { type: String, default: 'top end' },
    menuOffset: { type: Array, default: () => [0, 4] },
    noIconAnimation: { type: Boolean, default: false },
    contentClass: { type: String, default: undefined,
    },
  },

  emits: [
    'update:modelValue',
    'click',
    'before-hide',
    'hide',
    'before-show',
    'show',
  ],

  setup(props) {
    const btnRef = ref();

    function click(evt) {
      btnRef.value.click(evt);
    }

    const { styleClassAttrs } = useInheritAttrs();

    const { buttonClass, buttonStyles, buttonStyleProps } = useBtnStyle();

    const buttonDropdownClass = computed(() => ({
      'kw-btn-dropdown': true,
      ...buttonClass.value,
    }));

    const computedContentClass = computed(() => {
      let classes = 'kw-btn-dropdown__content';
      if (props.contentClass) {
        classes += ` ${props.contentClass}`;
      }
      return classes;
    });

    return {
      ...usePermissions(),
      buttonDropdownClass,
      buttonStyles,
      buttonStyleProps,
      styleClassAttrs,
      computedContentClass,
      btnRef,
      click,
    };
  },
};
</script>
