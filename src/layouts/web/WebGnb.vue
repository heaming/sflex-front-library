<template>
  <q-header class="web-gnb">
    <q-toolbar class="full-width">
      <div class="gnb-logo">
        <slot name="logo" />
      </div>

      <div class="gnb__menus">
        <a
          v-for="{key, label} of gnbItems"
          :key="key"
          class="gnb__menus-item"
          :class="{'gnb__menus-item--active': isSelected(key)}"
          @click="updateSelected(key)"
        >
          {{ label }}
        </a>
      </div>

      <q-space />

      <kw-input
        class="gnb-search w220"
        placeholder="메뉴검색"
        underline
        dense
      >
        <template #append>
          <kw-icon
            name="search_24"
            size="24px"
            clickable
          />
        </template>
      </kw-input>

      <kw-icon
        class="gnb-icon"
        size="24px"
        name="alert_off_24"
        clickable
      />

      <kw-btn
        dense
        underline
        class="ml20"
        label="LOGOUT"
        @click="logout"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import useSession from '../../composables/useSession';

export default {
  name: 'WebGnb',

  setup() {
    const { getters, commit } = useStore();

    const gnbItems = getters['app/getGnbItems'];
    const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);

    const isSelected = (gnbKey) => gnbKey === selectedGnbKey.value;

    function updateSelected(gnbKey) {
      commit('app/setSelectedGnbKey', gnbKey);
      commit('app/setSelectedLnbKey', null);
    }

    const { logout } = useSession();

    return {
      gnbItems,
      selectedGnbKey,
      isSelected,
      updateSelected,
      logout,
    };
  },
};
</script>
