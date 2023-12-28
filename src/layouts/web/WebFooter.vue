<template>
  <div class="main_footer">
    <div class="main_footer_wrap">
      <img
        src="../../assets/images/logo_kyowon.svg"
        alt="Kyowon logo"
      >
      <div>
        <span>대표자 : {{ ceoName }}</span>
        <span>서울특별시 중구 을지로51(을지로2가6번지)</span>
        <span>사업자등록번호 : {{ regNumber }}</span>
        <span>통신판매업 신고 : 제 2016-서울중구-0988호</span>
        <br>
        <span>COPYRIGHT© KYOWON, ALL RIGHTS RESERVED.</span>
      </div>
      <div class="row items-center px0 family-site">
        <p class="kw-font-pt14 w80 mr12">
          관련사이트
        </p>
        <kw-select
          class="w240"
          dense
          :model-value="selectedLink"
          :options="quickLinks"
          option-label="quickLinkName"
          option-value="quickLinkUrl"
          :placeholder="quickLinks[0]?.quickLinkName"
          @update:model-value="goQuickLink"
        />
      </div>
    </div>
  </div>
</template>

<script>
import consts from '../../consts';
import { http } from '../../plugins/http';
import env from '../../consts/private/env';

export default {
  name: 'WebFooter',

  async setup() {
    const { currentRoute } = useRouter();
    const showing = computed(() => currentRoute.value.name === consts.ROUTE_HOME_NAME);
    const quickLinks = ref([]);
    const selectedLink = ref(null);

    const ceoName = ref('장평순');
    const regNumber = ref('101-81-39767');
    if (env.VITE_TENANT_ID === 'TNT_EDU') {
      ceoName.value = '이진성';
      regNumber.value = '496-86-02009';
    }

    const res = await http.get('/sflex/common/common/quick-links');
    if (res) {
      quickLinks.value = res.data;
    }
    function goQuickLink(link) {
      window.open(link);
    }
    return {
      showing,
      quickLinks,
      goQuickLink,
      selectedLink,
      ceoName,
      regNumber,
    };
  },
};
</script>
