import { notify } from '../../../plugins/notify';

export default () => {
  const { currentRoute } = useRouter();
  const { menuUid, pageId, menuName } = currentRoute.value.meta;

  const { getters, dispatch } = useStore();
  const isBookmarked = computed(() => getters['meta/isBookmarked'](menuUid, pageId));

  async function fetchBookmark() {
    try {
      await dispatch('meta/fetchBookmark', { menuUid, pageId });
    } catch (e) {
      // ignore
    }
  }

  const { t } = useI18n();

  async function createBookmark() {
    const bookmarkName = menuName;
    await dispatch('meta/createBookmark', { menuUid, pageId, bookmarkName });
    notify(t('MSG_ALT_BKMK_ADDED', [menuName]));
  }

  async function deleteBookmark() {
    await dispatch('meta/deleteBookmark', { menuUid, pageId });
    notify(t('MSG_ALT_BKMK_DELETED', [menuName]));
  }

  return {
    isBookmarked,
    fetchBookmark,
    createBookmark,
    deleteBookmark,
  };
};
