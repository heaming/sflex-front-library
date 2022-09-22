<template>
  <q-header class="app-gnb">
    <q-toolbar class="full-width">
      <a class="gnb-logo">
        <img
          src="~~@assets/images/logo_redpen.svg"
          alt="KSS빨간펜"
        >
      </a>

      <div class="gnb__link-container ml80 row justify-between">
        <a
          v-for="{key, label} of gnbItems"
          :key="key"
          class="gnb-link"
          :class="{'gnb-link--active': isSelected(key)}"
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
        name="alert_24"
        clickable
      />
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'AppGnb',

  setup() {
    const { getters, commit } = useStore();

    const gnbItems = getters['app/getGnbItems'];
    const selectedGnbKey = computed(() => getters['app/getSelectedGnbKey']);

    const isSelected = (gnbKey) => gnbKey === selectedGnbKey.value;

    function updateSelected(gnbKey) {
      commit('app/setSelectedGnbKey', gnbKey);
      commit('app/setSelectedLnbKey', null);
    }

    if (!selectedGnbKey.value) {
      const gnbKey = gnbItems[0]?.key || null;
      updateSelected(gnbKey);
    }

    return {
      gnbItems,
      selectedGnbKey,
      isSelected,
      updateSelected,
    };
  },
};
</script>
