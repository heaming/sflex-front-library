<template>
  <div class="web-left-drawer__bookmark drawer-bookmark">
    <web-left-drawer-title
      title="즐겨찾기"
    />
    <kw-scroll-area>
      <div class="drawer-bookmark__action">
        <kw-btn
          dense
          icon="plus"
          no-wrap
          :label="$t('MSG_BTN_ALL_SPREAD')"
          @click="setExpandedAll(true)"
        />
        <kw-btn
          dense
          icon="minus"
          no-wrap
          :label="$t('MSG_BTN_ALL_FOLD')"
          @click="setExpandedAll(false)"
        />
        <kw-btn
          dense
          icon="write"
          no-wrap
          :label="$t('MSG_BTN_EDIT')"
          @click="onClickEdit"
        />
      </div>

      <div
        v-if="treeNodes.length === 0"
        class="drawer-bookmark__placeholder"
      >
        <p>
          {{ $t('MSG_TXT_BKMK_PLACEHOLDER') }}
        </p>
      </div>
      <kw-tree
        v-else
        ref="treeRef"
        v-model:selected="selectedKey"
        class="drawer-bookmark__tree"
        :nodes="treeNodes"
        node-key="bookmarkUid"
        select-leaf-only
        selected-color="black1"
        @update:selected="onUpdateSelected"
      >
        <template #header="{ node }">
          <div class="row items-center">
            <kw-icon
              v-if="node.folderYn === 'N'"
              name="bookmark_on"
            />
            <div>
              {{ node.bookmarkName }}
            </div>
            <div v-if="node.folderYn === 'Y'">
              &nbsp;({{ node.children.length }})
            </div>
          </div>
        </template>
        <template #body="{ node }">
          <div v-if="node.folderYn === 'N'">
            {{ node.menuPath }}
          </div>
        </template>
      </kw-tree>
    </kw-scroll-area>
  </div>
</template>

<script>
import { cloneDeep, filter } from 'lodash-es';
import { isNavigationFailure } from 'vue-router';
import { alert } from '../../plugins/dialog';
import { modal } from '../../plugins/modal';

import WebLeftDrawerTitle from './WebLeftDrawerTitle.vue';

export default {
  name: 'WebLeftDrawerBookmark',
  components: {
    WebLeftDrawerTitle,
  },

  async setup() {
    const treeRef = ref();
    const selectedKey = ref(null);

    const { getters, dispatch } = useStore();
    const bookmarks = computed(() => cloneDeep(getters['meta/getBookmarks']));

    const recursiveCreate = (currents) => currents.map((e) => {
      const bookmarkLevel = e.bookmarkLevel + 1;
      const parentsBookmarkUid = e.bookmarkUid;
      const children = filter(bookmarks.value, { bookmarkLevel, parentsBookmarkUid });

      return {
        ...e,
        children: recursiveCreate(children),
      };
    });

    const treeNodes = computed(() => {
      const roots = filter(bookmarks.value, { bookmarkLevel: 0 });
      return recursiveCreate(roots);
    });

    function setExpandedAll(val) {
      if (val) {
        treeRef.value.expandAll();
      } else {
        treeRef.value.collapseAll();
      }
    }

    const { push } = useRouter();
    const { t } = useI18n();

    async function onUpdateSelected(val) {
      const { menuUid } = treeRef.value.getNodeByKey(val);

      try {
        await push({ name: menuUid });
      } catch (e) {
        if (isNavigationFailure(e, 1)) { // matcher not found
          await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
        } else {
          throw e;
        }
      }
    }

    async function onClickEdit() {
      const { result } = await modal({
        component: () => import('./WebLeftDrawerBookmarkPopup.vue'),
      });

      if (result) {
        await dispatch('meta/fetchBookmarks');
      }
    }

    return {
      treeRef,
      treeNodes,
      selectedKey,
      setExpandedAll,
      onUpdateSelected,
      onClickEdit,
    };
  },
};
</script>
