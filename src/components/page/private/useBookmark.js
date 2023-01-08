import { notify } from '../../../plugins/notify';
import { http } from '../../../plugins/http';

export default () => {
  const { currentRoute } = useRouter();
  const { menuUid, pageId, menuName } = currentRoute.value.meta;

  const { getters, dispatch } = useStore();
  const isBookmarked = computed(() => getters['meta/isBookmarked'](menuUid, pageId));

  async function fetchBookmark() {
    if (menuUid && pageId) {
      try {
        const response = await http.get('/sflex/common/common/bookmarks/marked', { params: { menuUid, pageId }, silent: true });
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

  return {
    isBookmarked,
    fetchBookmark,
    createBookmark,
    deleteBookmark,
  };
};
