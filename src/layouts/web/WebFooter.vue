<template>
  <div class="main_footer">
    <img
      src="../../assets/images/logo_kyowon.svg"
      alt="Kyowon logo"
    >
    <div>
      <span>대표자 : 장평순</span>
      <span>서울특별시 중구 을지로51(을지로2가6번지)</span>
      <span>사업자등록번호 : 101-81-39767</span>
      <span>통신판매업 신고 : 제 2016-서울중구-0988호</span>
      <br>
      <span>COPYRIGHT© KYOWON, ALL RIGHTS RESERVED.</span>
    </div>
  </div>
</template>

<script>
import consts from '../../consts';

export default {
  name: 'WebFooter',

  setup() {
    const { currentRoute } = useRouter();
    const showing = computed(() => currentRoute.value.name === consts.ROUTE_HOME_NAME);

    return {
      showing,
    };
  },
};
</script>
