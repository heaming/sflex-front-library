<template>
  <div class="kw-page-mobile-header">
    <kw-btn
      class="kw-page-mobile-header__back-btn"
      icon="arrow_right_24"
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
  </div>
</template>

<script>
import useLnbExpand from '../../composables/private/useLnbExpand';

export default {
  name: 'KwPageMobileHeader',
  props: {
    hint: { type: String, default: undefined },
    title: { type: String, default: undefined },
  },
  setup() {
    return {
      ...useLnbExpand(),
    };
  },
};
</script>
