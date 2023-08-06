import { isEmpty } from 'lodash-es';
import useMeta from '../../../composables/useMeta';
import { http } from '../../../plugins/http';

export const useHeaderMetaProps = {
  title: {
    type: String,
    default: undefined,
  },
};

export default () => {
  const { props } = getCurrentInstance();
  const { currentRoute } = useRouter();
  const meta = { ...currentRoute.value.meta };
  const title = computed(() => props.title || meta.menuName);
  const isSubPage = computed(() => meta.pageUseCode === 'S');
  const portalId = computed(() => meta.portalId);
  const { tenantId } = useMeta().getUserInfo();
  const pageNoticeCntn = ref(null);
  const pageManual = ref(null);

  async function getPageNotice() {
    if (meta.pageId) {
      const res = await http.get(`/sflex/common/common/page-notices/page/${meta.pageId}`);
      if (res.data) pageNoticeCntn.value = res.data.noticeCntn;
      else pageNoticeCntn.value = null;
    }
  }

  async function readPageManual(manualId) {
    if (manualId) {
      await http.put(`/sflex/common/common/manuals/${manualId}/read`);
    }
  }

  async function getPageManual(readYn = false) {
    if (meta.pageId) {
      const res = await http.get(`/sflex/common/common/pages/${meta.pageId}/using-manual`);
      if (!isEmpty(res.data)) {
        pageManual.value = res.data;
        if (readYn) readPageManual(pageManual.value.docId);
      } else pageManual.value = null;

      return pageManual.value;
    }
    return null;
  }

  getPageNotice();
  getPageManual();
  return {
    pageTitle: title,
    pageUseIsSub: isSubPage,
    noMenuPage: meta.noMenuPage,
    portalId,
    tenantId,
    pageNoticeCntn,
    pageManual,
    getPageManual,
  };
};
