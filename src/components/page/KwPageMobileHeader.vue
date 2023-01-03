<template>
  <div class="kw-page-mobile-header">
    <kw-btn
      v-if="leftBtn === 'back'"
      class="kw-page-mobile-header__back-btn"
      icon="arrow_left_24"
      borderless
      @click="toggleExpanded"
    />
    <kw-btn
      v-if="leftBtn === 'menu'"
      class="kw-page-mobile-header__back-btn"
      icon="menu_24"
      borderless
      @click="toggleExpanded"
    />
    <h1
      class="kw-page-mobile-header__title"
      style="margin-right: auto;"
    >
      <slot>
        {{ title }}
      </slot>
    </h1>
    <kw-icon
      v-if="hint || $slots.hint"
      class="kw-page-mobile-header__hint"
      name="info_24"
      :tooltip="hint"
    >
      <template
        v-if="$slots.hint"
        #default
      >
        <slot name="hint">
          {{ hint }}
        </slot>
      </template>
    </kw-icon>
    <kw-btn-dropdown
      v-if="$slots.more"
      class="kw-page-mobile-header__more"
      borderless
      dropdown-icon="more"
    >
      <slot name="more" />
    </kw-btn-dropdown>
    <kw-btn
      v-if="showClose"
      class="kw-page-mobile-header__close"
      icon="close_24"
      borderless
      @click="$emit('close')"
    />
  </div>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

export default {
  name: 'KwPageMobileHeader',
  props: {
    hint: { type: String, default: undefined },
    title: { type: String, default: undefined },
    leftBtn: { type: String, default: undefined },
    showClose: { type: Boolean, default: false },
  },
  emits: ['close'],
  setup() {
    return {
      ...useLeftDrawerExpand(),
    };
  },
};
</script>
