<template>
  <q-header class="dev-header">
    <q-toolbar>
      <div class="dev-header__logo">
        <slot name="logo" />
      </div>

      <div class="dev-header__apps">
        <a
          v-for="{key, label} of apps"
          :key="key"
          class="dev-header__link"
          :class="{'dev-header__link--active': isSelected(key)}"
          @click="updateSelected(key)"
        >
          {{ label }}
        </a>
      </div>

      <q-space />

      <slot>
        <kw-btn
          v-if="!$g.platform.is.desktop"
          dense
          underline
          class="text-weight-bold text-uppercase mr20"
          text-color="black2"
          href="/"
          target="_blank"
        >
          Desktop
        </kw-btn>
        <kw-btn
          v-if="!$g.platform.is.mobile"
          dense
          underline
          class="text-weight-bold text-uppercase mr20"
          text-color="black2"
          href="/?mobile"
          target="_blank"
        >
          Mobile
        </kw-btn>
        <kw-btn
          v-if="!$g.platform.is.tablet"
          dense
          underline
          class="text-weight-bold text-uppercase"
          text-color="black2"
          href="/?tablet"
          target="_blank"
        >
          Tablet
        </kw-btn>
      </slot>
    </q-toolbar>
  </q-header>
</template>

<script>
import useHeaderApp from '../../composables/private/useHeaderApp';

export default {
  name: 'DevHeader',

  setup() {
    return {
      ...useHeaderApp(),
    };
  },
};
</script>
