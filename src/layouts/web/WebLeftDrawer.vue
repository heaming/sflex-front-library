<template>
  <q-drawer
    class="web-left-drawer"
    :model-value="true"
    :mini="!isExpanded"
    :mini-width="40"
    :width="280"
    show-if-above
    bordered
  >
    <div class="web-left-drawer__mini">
      <kw-btn
        v-for="(content, i) in contents"
        :key="i"
        :icon="content.icon"
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
import WebLeftDrawerFavorite from './WebLeftDrawerFavorite.vue';
import WebLeftDrawerHistory from './WebLeftDrawerHistory.vue';

export default {
  name: 'WebLeftDrawer',
  components: {
    WebLeftDrawerMenu,
    WebLeftDrawerFavorite,
    WebLeftDrawerHistory,
  },

  setup() {
    const expandCtx = useLeftDrawerExpand();
    const { setExpanded } = expandCtx;

    const contents = [
      { component: WebLeftDrawerMenu, icon: '' },
      { component: WebLeftDrawerFavorite, icon: '' },
      { component: WebLeftDrawerHistory, icon: '' },
    ];
    const selectedContent = shallowRef(contents[0]);

    function onChangeContent(content) {
      selectedContent.value = content;
      setExpanded(true);
    }

    return {
      ...expandCtx,
      contents,
      selectedContent,
      onChangeContent,
    };
  },
};
</script>
