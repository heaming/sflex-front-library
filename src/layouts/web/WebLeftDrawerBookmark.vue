<template>
  <div class="web-left-drawer__bookmark drawer-bookmark">
    <web-left-drawer-title>
      <div class="drawer-bookmark__title">
        {{ $t('MSG_TXT_BKMK') }}<span>{{ bookmarkCount }}</span>
      </div>
    </web-left-drawer-title>

    <kw-scroll-area>
      <div class="w262">
        <div class="drawer-bookmark__action">
          <kw-btn
            dense
            icon="plus"
            no-wrap
            :label="$t('MSG_BTN_ALL_SPREAD')"
            border-color="line-line"
            @click="setExpandedAll(true)"
          />
          <kw-btn
            dense
            icon="minus"
            no-wrap
            :label="$t('MSG_BTN_ALL_FOLD')"
            border-color="line-line"
            @click="setExpandedAll(false)"
          />
          <kw-btn
            dense
            icon="write"
            no-wrap
            :label="$t('MSG_BTN_EDIT')"
            border-color="line-line"
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
          :selected="selectedKey"
          class="drawer-bookmark__tree"
          :nodes="treeNodes"
          node-key="bookmarkUid"
          select-leaf-only
          selected-color="black1"
          :no-selection-unset="false"
          @update:selected="onUpdateSelected"
        >
          <template #header="{ node }">
            <div
              v-if="node.bookmarkName === null"
              class="drawer-bookmark__tree-dummy"
            />
            <div
              v-else-if="node.folderYn === 'Y'"
              class="drawer-bookmark__wrap-text"
            >
              <div class="ellipsis">
                {{ node.bookmarkName }}
              </div>&nbsp;({{ node.actualChildrenLength }})
              <kw-tooltip
                show-when-ellipsised
                anchor="center right"
                self="center start"
                class="lnb_tooltip lnb_depth_tooltip"
              >
                {{ node.bookmarkName }}&nbsp;({{ node.actualChildrenLength }})
              </kw-tooltip>
            </div>
            <div
              v-else
              class="drawer-bookmark__wrap-text"
            >
              <kw-icon
                name="bookmark_on"
                clickable
                @click.stop="onClickDelete(node)"
              />
              <div class="ellipsis">
                {{ node.bookmarkName }}
              </div>
              <kw-tooltip
                show-when-ellipsised
                anchor="center right"
                self="center start"
                class="lnb_tooltip lnb_depth_tooltip"
              >
                {{ node.bookmarkName }}
              </kw-tooltip>
            </div>
          </template>
          <template #body="{ node }">
            <div v-if="node.menuPath">
              {{ node.menuPath }}
            </div>
          </template>
        </kw-tree>
      </div>
    </kw-scroll-area>
  </div>
</template>

<script>
import { filter } from 'lodash-es';
import { isNavigationFailure } from 'vue-router';
import { http } from '../../plugins/http';
import { alert, confirm } from '../../plugins/dialog';
import { modal } from '../../plugins/modal';
import { getUid } from '../../utils/string';

import WebLeftDrawerTitle from './WebLeftDrawerTitle.vue';

export default {
  name: 'WebLeftDrawerBookmark',
  components: {
    WebLeftDrawerTitle,
  },

  async setup() {
    const { getters, dispatch } = useStore();
    const bookmarks = computed(() => getters['meta/getBookmarks']);
    const bookmarkCount = computed(() => filter(bookmarks.value, (e) => !!e.menuUid).length);

    const recursiveCreate = (currents) => currents.map((e) => {
      const bookmarkLevel = e.bookmarkLevel + 1;
      const parentsBookmarkUid = e.bookmarkUid;
      const children = filter(bookmarks.value, { bookmarkLevel, parentsBookmarkUid });
      const actualChildrenLength = children.length;

      if (e.folderYn === 'Y') {
        children.unshift({
          bookmarkLevel,
          bookmarkUid: getUid(),
          bookmarkName: null,
          parentsBookmarkUid,
          folderYn: 'N',
        });
      }

      return {
        ...e,
        children: recursiveCreate(children),
        actualChildrenLength,
      };
    });

    const selectedKey = ref(null);
    const treeRef = ref();
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
      val ||= selectedKey.value;
      const { menuUid } = treeRef.value.getNodeByKey(val) || {};

      if (menuUid) {
        selectedKey.value = val;

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
    }

    async function onClickEdit() {
      const { result } = await modal({
        component: () => import('../../pages/web/WebBookmarkMgtP.vue'),
      });

      if (result) {
        await dispatch('meta/fetchBookmarks');
      }
    }

    async function onClickDelete(node) {
      const isConfirmed = node.isFolder
        ? await confirm(t('MSG_TXT_BKMK_WANT_DEL_FLD'))
        : await confirm(t('MSG_TXT_BKMK_WANT_DEL', [node.bookmarkName]));

      if (isConfirmed) {
        const { pageId, menuUid } = node;
        await http.delete('/sflex/common/common/bookmarks', { params: { pageId, menuUid } });
        await dispatch('meta/fetchBookmarks');
      }
    }

    await dispatch('meta/fetchBookmarks');

    return {
      bookmarkCount,
      treeRef,
      treeNodes,
      selectedKey,
      setExpandedAll,
      onUpdateSelected,
      onClickEdit,
      onClickDelete,
    };
  },
};
</script>
<style scoped lang="scss">
::v-deep(.kw-scroll-area__scrollarea .q-scrollarea__content) {
  min-width: 262px !important;
}
</style>
