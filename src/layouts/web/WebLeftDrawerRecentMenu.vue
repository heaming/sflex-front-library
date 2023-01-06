<template>
  <div class="web-left-drawer__recent-menu drawer-recent-menu">
    <web-left-drawer-title
      :title="$t('MSG_TXT_RECENT_MENU')"
    />

    <kw-scroll-area>
      <div class="drawer-recent-menu__action">
        <kw-btn
          dense
          icon="delete"
          no-wrap
          :label="$t('MSG_BTN_DEL_ALL')"
        />
      </div>
    </kw-scroll-area>
  </div>
</template>

<script>
import WebLeftDrawerTitle from './WebLeftDrawerTitle.vue';

export default {
  name: 'WebLeftDrawerRecentMenu',
  components: {
    WebLeftDrawerTitle,
  },

  async setup() {
    const { getters, dispatch } = useStore();
    const recentMenus = computed(() => getters['meta/getRecentMenus']);

    async function fetchRecentMenus() {
      await dispatch('meta/fetchRecentMenus');
    }

    await fetchRecentMenus();

    return {
      recentMenus,
    };
  },
};
</script>
