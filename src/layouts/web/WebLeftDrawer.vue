<template>
  <keep-alive>
    <q-drawer
      class="web-left-drawer"
      :model-value="isLeftExist"
      :mini="!isExpanded"
      :mini-width="40"
      :width="303"
      show-if-above
      bordered
      behavior="desktop"
    >
      <div class="web-left-drawer__mini">
        <kw-btn
          v-for="(content, i) in contents"
          :key="i"
          class="drawer-mini-btn"
          :class="{'drawer-mini-btn--active': content === selectedContent}"
          :icon="content.icon"
          borderless
          @click="onChangeContent(content)"
        >
          <kw-tooltip
            anchor="center right"
            self="center left"
            class="lnb_tooltip"
            :transition-show="false"
            :transition-hide="false"
            :offset="[-8, 10]"
          >
            {{ content.label }}
          </kw-tooltip>
        </kw-btn>
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
  </keep-alive>
</template>

<script>
import { watch } from 'vue';
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
    const { getters } = useStore();

    const { currentRoute } = useRouter();
    const showing = computed(() => currentRoute.value.meta.menuUid !== undefined);

    const { t } = useI18n();
    const contents = [
      { component: WebLeftDrawerMenu, icon: 'lnb_menu', label: t('MSG_TXT_MENU') },
      { component: WebLeftDrawerBookmark, icon: 'lnb_bookmark', label: t('MSG_TXT_BKMK') },
      { component: WebLeftDrawerRecentMenu, icon: 'lnb_history', label: t('MSG_TXT_RECENT_MENU') },
    ];
    const selectedContent = shallowRef(contents[0]);

    function onChangeContent(content) {
      selectedContent.value = content;
      setExpanded(true);
    }

    // application 선택하면 매뉴 모드로 변경.
    watch(() => getters['app/getSelectedGlobalAppKey'], () => {
      selectedContent.value = contents[0];
    });

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
