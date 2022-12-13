<template>
  <q-header class="web-header">
    <q-toolbar class="full-width">
      <div class="web-header__logo">
        <slot name="logo" />
      </div>

      <div class="web-header__apps">
        <a
          v-for="{key, label} of apps"
          :key="key"
          class="web-header__link"
          :class="{'web-header__link--active': isSelected(key)}"
          @click="updateSelected(key)"
        >
          {{ label }}
        </a>
      </div>

      <q-space />

      <div class="web-header__tools">
        <kw-input
          class="web-header__search"
          placeholder="메뉴검색"
          underline
          dense
        >
          <template #append>
            <kw-icon
              name="search_24"
              clickable
            />
          </template>
        </kw-input>

        <kw-icon
          class="web-header__icon"
          name="alert_off_24"
          clickable
        />

        <kw-btn
          dense
          underline
          label="LOGOUT"
          @click="logout"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import useSession from '../../composables/useSession';
import useHeaderApp from '../../composables/private/useHeaderApp';

export default {
  name: 'WebHeader',

  setup() {
    const { logout } = useSession();

    return {
      ...useHeaderApp(),
      logout,
    };
  },
};
</script>
