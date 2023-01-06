<template>
  <q-drawer
    class="web-left-drawer"
    :model-value="true"
    :mini="!isExpanded"
    :mini-width="40"
    :width="303"
    show-if-above
    bordered
  >
    <div class="web-left-drawer__mini">
      <kw-btn
        v-for="(content, i) in contents"
        :key="i"
        class="drawer-mini-btn"
        :class="{'drawer-mini-btn--active': content === selectedContent}"
        :icon="content.icon"
        :label="content.label"
        borderless
        @click="onChangeContent(content)"
      />
    </div>

    <div class="web-left-drawer__content">
      <keep-alive>
        <component
          :is="selectedContent.component"
          :key="selectedContent.component.name"
        />
      </keep-alive>
    </div>
  </q-drawer>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

import WebLeftDrawerMenu from './WebLeftDrawerMenu.vue';
import WebLeftDrawerBookmark from './WebLeftDrawerBookmark.vue';
import WebLeftDrawerRecentMenu from './WebLeftDrawerRecentMenu.vue';

export default {
  name: 'WebLeftDrawer',
  components: {
    WebLeftDrawerMenu,
    WebLeftDrawerBookmark,
    WebLeftDrawerRecentMenu,
  },

  setup() {
    const expandCtx = useLeftDrawerExpand();
    const { setExpanded } = expandCtx;

    const { currentRoute } = useRouter();
    const showing = computed(() => currentRoute.value.meta.menuUid !== undefined);

    const { t } = useI18n();
    const contents = [
      { component: WebLeftDrawerMenu, icon: '', label: t('MSG_TXT_MENU') },
      { component: WebLeftDrawerBookmark, icon: '', label: t('MSG_TXT_BKMK') },
      { component: WebLeftDrawerRecentMenu, icon: '', label: t('MSG_TXT_RECENT_MENU') },
    ];
    const selectedContent = shallowRef(contents[0]);

    function onChangeContent(content) {
      selectedContent.value = content;
      setExpanded(true);
    }

    return {
      ...expandCtx,
      showing,
      contents,
      selectedContent,
      onChangeContent,
    };
  },
};
</script>
