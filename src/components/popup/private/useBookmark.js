import { find } from 'lodash-es';
import { notify } from '../../../plugins/notify';
import { http } from '../../../plugins/http';

export default ({ pageId }) => {
  const { getters, dispatch } = useStore();

  const {
    menuUid,
    menuName,
  } = find(getters['meta/getMenus'], { pageId }) || {};

  const isBookmarkable = menuUid !== undefined;
  const isBookmarked = computed(() => getters['meta/isBookmarked'](menuUid, pageId));

  async function fetchBookmark() {
    if (menuUid && pageId) {
      try {
        const params = { menuUid, pageId };
        const response = await http.get('/sflex/common/common/bookmarks/marked', { params, silent: true });
        const marked = response.data;
        const shouldReload = marked !== isBookmarked.value;

        if (shouldReload) {
          await dispatch('meta/fetchBookmarks');
        }
      } catch (e) {
        // ignore
      }
    }
  }

  const { t } = useI18n();

  async function createBookmark() {
    const bookmarkName = menuName;
    await http.post('/sflex/common/common/bookmarks', { menuUid, pageId, bookmarkName });
    await dispatch('meta/fetchBookmarks');
    notify(t('MSG_ALT_BKMK_ADDED', [menuName]));
  }

  async function deleteBookmark() {
    const params = { menuUid, pageId };
    await http.delete('/sflex/common/common/bookmarks', { params });
    await dispatch('meta/fetchBookmarks');
    notify(t('MSG_ALT_BKMK_DELETED', [menuName]));
  }

  const isAuthenticated = getters['meta/isAuthenticated'];

  async function updateBookmark(isCreate) {
    if (isAuthenticated) {
      if (isCreate) {
        await createBookmark();
      } else {
        await deleteBookmark();
      }
    }
  }

  if (isAuthenticated) {
    fetchBookmark();
  }

  return {
    isBookmarkable,
    isBookmarked,
    updateBookmark,
  };
};
