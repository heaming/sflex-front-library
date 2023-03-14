<template>
  <div
    id="gnb_menu"
    ref="gnbRef"
    class="gnb_menu"
  >
    <div class="gnb_menu--header scrollpanels">
      <h1>전체메뉴</h1>
      <nav>
        <ul class="">
          <li class="nav-item curr">
            <a href="#info1">상품</a>
          </li>
          <li class="nav-item">
            <a href="#info2">고객</a>
          </li>
          <li class="nav-item">
            <a href="#info3">판매</a>
          </li>
          <li class="nav-item">
            <a href="#info4">역량/총무</a>
          </li>
        </ul>
      </nav>
      <kw-btn
        icon="close_24"
        style="font-size: 34px;"
        class="gnb_menu--closer"
        borderless
        @click="onClickClose"
      />
    </div>
    <ul class="gnb_menu--ul-depth1 scrollpanels-content">
      <li
        id="info1"
        class="section panel"
      >
        <h2>상품</h2>
        <ul class="gnb_menu--ul-depth2">
          <li>
            <h3>상품구성관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">판매상품 관리</a></li>
              <li><a href="#">교재/자재 관리</a></li>
              <li><a href="#">서비스 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>프로모션</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">프로모션 관리</a></li>
              <li><a href="#">프로모션 룰셋 관리</a></li>
              <li><a href="#">프로모션 구성요소 관리</a></li>
              <li><a href="#">프로모션 대상고객 일괄관리</a></li>
            </ul>
          </li>
          <li>
            <h3>기준정보관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">학년학생코드 관리</a></li>
              <li><a href="#">웰스 제휴 관리</a></li>
              <li><a href="#">렌탈/리스 위약금 관리</a></li>
              <li><a href="#">판매 유형별 변수 관리</a></li>
              <li><a href="#">상품 분류체계 관리</a></li>
              <li><a href="#">상품 표준속성 관리</a></li>
              <li><a href="#">상품 표준속성그룹 관리</a></li>
              <li><a href="#">상품관리 환경설정</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        id="info2"
        class="section panel"
      >
        <h2>고객</h2>
        <ul class="gnb_menu--ul-depth2">
          <li>
            <h3>고객정보관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">개인고객SingleView</a></li>
              <li><a href="#">고객 관리</a></li>
              <li><a href="#">거래처마스터 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>가구구성관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">가구정보 관리</a></li>
              <li><a href="#">가족 등록</a></li>
              <li><a href="#">재가구화 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>가망고객관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">고객DB 관리</a></li>
              <li><a href="#">신규접수 배정 관리</a></li>
              <li><a href="#">광역담당 배정 관리</a></li>
              <li><a href="#">제휴상담 신청 배정</a></li>
            </ul>
          </li>
          <li>
            <h3>교원SMART체험관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">SMART체험 고객 관리</a></li>
              <li><a href="#">SMART체험 신청 관리</a></li>
              <li><a href="#">멤버십 체험쿠폰 전송</a></li>
              <li><a href="#">SMART체험 배송 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>이벤트관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">이벤트 상품 관리</a></li>
              <li><a href="#">이벤트 고객별 현황</a></li>
              <li><a href="#">이벤트 조직별 현황</a></li>
              <li><a href="#">이벤트 매출 현황</a></li>
            </ul>
          </li>
          <li>
            <h3>도구검사관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">쿠폰 신청 현황</a></li>
              <li><a href="#">쿠폰 발급</a></li>
              <li><a href="#">쿠폰 이관</a></li>
              <li><a href="#">KED Pre-Test</a></li>
              <li><a href="#">홍보동영상 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>기준정보관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">고객 관리환경 설정</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        id="info3"
        class="section panel"
      >
        <h2>판매</h2>
        <ul class="gnb_menu--ul-depth2">
          <li>
            <h3>고객정보관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">개인고객SingleView</a></li>
              <li><a href="#">고객 관리</a></li>
              <li><a href="#">거래처마스터 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>가구구성관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">가구정보 관리</a></li>
              <li><a href="#">가족 등록</a></li>
              <li><a href="#">재가구화 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>가망고객관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">고객DB 관리</a></li>
              <li><a href="#">신규접수 배정 관리</a></li>
              <li><a href="#">광역담당 배정 관리</a></li>
              <li><a href="#">제휴상담 신청 배정</a></li>
            </ul>
          </li>
          <li>
            <h3>교원SMART체험관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">SMART체험 고객 관리</a></li>
              <li><a href="#">SMART체험 신청 관리</a></li>
              <li><a href="#">멤버십 체험쿠폰 전송</a></li>
              <li><a href="#">SMART체험 배송 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>이벤트관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">이벤트 상품 관리</a></li>
              <li><a href="#">이벤트 고객별 현황</a></li>
              <li><a href="#">이벤트 조직별 현황</a></li>
              <li><a href="#">이벤트 매출 현황</a></li>
            </ul>
          </li>
          <li>
            <h3>도구검사관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">쿠폰 신청 현황</a></li>
              <li><a href="#">쿠폰 발급</a></li>
              <li><a href="#">쿠폰 이관</a></li>
              <li><a href="#">KED Pre-Test</a></li>
              <li><a href="#">홍보동영상 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>기준정보관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">고객 관리환경 설정</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li
        id="info4"
        class="section panel"
      >
        <h2>역량/총무</h2>
        <ul class="gnb_menu--ul-depth2">
          <li>
            <h3>고객정보관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">개인고객SingleView</a></li>
              <li><a href="#">고객 관리</a></li>
              <li><a href="#">거래처마스터 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>가구구성관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">가구정보 관리</a></li>
              <li><a href="#">가족 등록</a></li>
              <li><a href="#">재가구화 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>가망고객관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">고객DB 관리</a></li>
              <li><a href="#">신규접수 배정 관리</a></li>
              <li><a href="#">광역담당 배정 관리</a></li>
              <li><a href="#">제휴상담 신청 배정</a></li>
            </ul>
          </li>
          <li>
            <h3>교원SMART체험관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">SMART체험 고객 관리</a></li>
              <li><a href="#">SMART체험 신청 관리</a></li>
              <li><a href="#">멤버십 체험쿠폰 전송</a></li>
              <li><a href="#">SMART체험 배송 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>이벤트관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">이벤트 상품 관리</a></li>
              <li><a href="#">이벤트 고객별 현황</a></li>
              <li><a href="#">이벤트 조직별 현황</a></li>
              <li><a href="#">이벤트 매출 현황</a></li>
            </ul>
          </li>
          <li>
            <h3>도구검사관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">쿠폰 신청 현황</a></li>
              <li><a href="#">쿠폰 발급</a></li>
              <li><a href="#">쿠폰 이관</a></li>
              <li><a href="#">KED Pre-Test</a></li>
              <li><a href="#">홍보동영상 관리</a></li>
            </ul>
          </li>
          <li>
            <h3>기준정보관리</h3>
            <ul class="gnb_menu--ul-depth3">
              <li><a href="#">고객 관리환경 설정</a></li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { http } from '~kw-lib';

const { getters } = useStore();

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const emit = defineEmits([
  'closeTot',
]);
async function onClickClose() {
  emit('closeTot');
}

// function createHierarchyData(menus, key) {
//   return menus
//     .filter((v) => (key !== 'ROOT' ? key.endsWith(v.parentsMenuUid) : v.menuLevel === 0))
//     .reduce((a, v) => { v.key = `${key}.${v.menuUid}`;
//     a.push(v, ...createHierarchyData(menus, v.key)); return a; }, []);
// }

async function fetchMenus() {
  const apps = getters['meta/getApps'];
  console.log(apps);
  const menuPageRes = await http.get('/sflex/common/common/portal/menus-without-auth');
  console.log(menuPageRes);
  // const hierarchyData = [
  //   {
  //     key: 'ROOT',
  //     portalId,
  //     applicationId,
  //     menuLevel: -1,
  //     menuName: t('MSG_TXT_MENU'),
  //     folderYn: 'Y',
  //   },
  //   ...createHierarchyData(menus, 'ROOT'),
  // ];
}
await fetchMenus();

const gnbRef = ref();
onMounted(() => {
  const navLinks = gsap.utils.toArray('.nav-item');
  function setActive(link) {
    navLinks.forEach((el) => el.classList.remove('active'));
    link.classList.add('active');
  }
  navLinks.forEach((btn) => {
    const targetElem = document.querySelector(btn.querySelector('a').getAttribute('href'));
    const linkST = ScrollTrigger.create({
      scroller: '#gnb_menu',
      trigger: targetElem,
      start: 'top top',
    });
    ScrollTrigger.create({
      scroller: '#gnb_menu',
      trigger: targetElem,
      start: 'top center',
      end: 'bottom center',
      toggleClass: 'active',
      // onEnter: () => {
      //   setActive(btn);
      // },
      onToggle: (self) => self.isActive && setActive(btn),
    });
    btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      gsap.to('.gnb_menu', {
        duration: 1,
        scrollTo: { y: linkST.start, offsetY: 170 },
        // scrollTo: { y: `#info${index + 1}`, offsetY: 170 },
      });
    });
  });
});
</script>
