<template>
  <q-header class="dev-gnb">
    <q-toolbar>
      <div class="gnb-logo">
        <slot name="logo" />
      </div>

      <div class="gnb__menus">
        <a
          v-for="{key, label} of gnbMenus"
          :key="key"
          class="gnb__menus-item"
          :class="{'gnb__menus-item--active': isSelected(key)}"
          @click="updateSelected(key)"
        >
          {{ label }}
        </a>
      </div>

      <q-space />

      <slot />
    </q-toolbar>
  </q-header>
</template>

<script>
import useGnbMenus from '../../composables/private/useGnbMenus';

export default {
  name: 'DevGnb',

  setup() {
    return {
      ...useGnbMenus(),
    };
  },
};
</script>
