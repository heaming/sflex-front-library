<template>
  <kw-page class="py12">
    <div class="relative-position">
      <div class="dashboard">
        <div class="dashboard_summary dashboard_summary_type1">
          <p class="greetings">
            <span>김길동 국장님</span>, 좋은 하루 보내세요.
          </p>
          <kw-btn-toggle
            v-model="area"
            :options="['총괄', '지역']"
            dense
            gap="0px"
          />
          <div class="dashboard_summary_counter">
            <h5>출근현황</h5>
            <dl>
              <dt>어제</dt>
              <dd>2,377</dd>
              <dt>오늘</dt>
              <dd>3,540</dd>
            </dl>
          </div>
          <kw-separator
            vertical
            inset
            spaced="20px"
            style="opacity: 0.2;"
            color="bg-white"
          />
          <div class="dashboard_summary_counter">
            <h5>고객현황</h5>
            <dl>
              <dt>유입</dt>
              <dd>22,377</dd>
              <dt>이달</dt>
              <dd>32,540</dd>
              <dt>총인원수</dt>
              <dd>52,540</dd>
            </dl>
          </div>
          <kw-separator
            vertical
            inset
            spaced="20px"
            style="opacity: 0.2;"
            color="bg-white"
          />
          <div class="dashboard_summary_counter">
            <h5>주요지표(실적/지평)</h5>
            <dl>
              <dt>진단검사</dt>
              <dd>120/219</dd>
              <dt>무료체험</dt>
              <dd>342/450</dd>
            </dl>
          </div>
          <kw-separator
            vertical
            inset
            spaced="20px"
            style="opacity: 0.2;"
            color="bg-white"
          />
          <kw-btn-toggle
            v-model="gap"
            :options="['일간', '월간']"
            dense
            gap="0px"
          />
        </div>
        <div class="dashboard_wrap">
          <div class="dashboard_el dashboard_el_1by1 pr0">
            <kw-btn
              icon-right="arrow_right"
              borderless
              label="센터 실적현황"
              class="kw-font-pt20 text-weight-bold"
            />
            <kw-scroll-area
              max-height="256px"
              class="mt12"
            >
              <div class="full-width pr24">
                <div class="row justify-between items-center">
                  <div class="text-weight-medium kw-font-pt20">
                    <p>
                      현재까지<span class="text-weight-bold kw-fc--primary ml4">
                        <strong class="kw-font-pt24">82,000,000</strong>원
                      </span>
                    </p>
                    <p>달성했어요!</p>
                    <div class="row items-center mt4">
                      <p class="kw-font-pt14 kw-fc--black3 text-weight-regular">
                        (목표 90,000,000원)
                      </p>
                      <kw-btn
                        underline
                        class="kw-font-pt14 ml4"
                      >
                        <span class="text-weight-regular">수정</span>
                      </kw-btn>
                    </div>
                  </div>
                  <div class="w145 h95">
                    <img
                      src="#"
                      alt="임시 그래프이미지"
                      style="height: 100%;"
                    >
                  </div>
                </div>
                <kw-separator
                  color="black3"
                  spaced="0"
                  class="mt12"
                />
                <div class="current-states">
                  <ul class="current-states__total">
                    <li>
                      <p class="kw-font-pt14">
                        일계
                      </p>
                      <p class="kw-font-body text-weight-bold">
                        3,000,000원
                      </p>
                    </li>
                    <li>
                      <p class="kw-font-pt14">
                        누계
                      </p>
                      <p class="kw-font-body text-weight-bold">
                        80,000,000원
                      </p>
                    </li>
                  </ul>
                  <ul class="states-details">
                    <li>
                      <div class="states-details__main-item">
                        <div class="row items-center">
                          <p class="kw-fc--black1">
                            멤버십
                          </p>
                          <kw-icon
                            name="arrow_up"
                            class="ml4"
                          />
                        <!--  icon 열릴때, name="arrow_up"로, 닫힐때 name="arrow_down"-->
                        </div>
                        <ul class="states-amount">
                          <li>1,000,000원</li>
                          <li>1,000,000원</li>
                        </ul>
                      </div>
                      <ul
                        v-if="true"
                        class="states-details__children"
                      >
                        <li>
                          <p class="kw-fc--black3">
                            아이캔두
                          </p>
                          <ul class="states-amount">
                            <li>1,000,000원</li>
                            <li>1,000,000원</li>
                          </ul>
                        </li>
                        <li>
                          <p class="kw-fc--black3">
                            기타
                          </p>
                          <ul class="states-amount">
                            <li>1,000,000원</li>
                            <li>1,000,000원</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div class="states-details__main-item">
                        <div class="row items-center">
                          <p class="kw-fc--black1">
                            일시불
                          </p>
                          <kw-icon
                            name="arrow_down"
                            class="ml4"
                          />
                        <!--  icon 열릴때, name="arrow_up"로, 닫힐때 name="arrow_down"-->
                        </div>
                        <ul class="states-amount">
                          <li>1,000,000원</li>
                          <li>1,000,000원</li>
                        </ul>
                      </div>
                      <ul
                        v-if="true"
                        class="states-details__children"
                      >
                        <li>
                          <p class="kw-fc--black3">
                            도요새m
                          </p>
                          <ul class="states-amount">
                            <li>1,000,000원</li>
                            <li>1,000,000원</li>
                          </ul>
                        </li>
                        <li>
                          <p class="kw-fc--black3">
                            아이캔두
                          </p>
                          <ul class="states-amount">
                            <li>1,000,000원</li>
                            <li>1,000,000원</li>
                          </ul>
                        </li>
                        <li>
                          <p class="kw-fc--black3">
                            기타
                          </p>
                          <ul class="states-amount">
                            <li>1,000,000원</li>
                            <li>1,000,000원</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </kw-scroll-area>
          </div>
          <div class="dashboard_el dashboard_el_1by1">
            <kw-btn
              icon-right="arrow_right"
              borderless
              label="당월 목표 달성 현황"
              class="kw-font-pt20 text-weight-bold"
            />
            <div class="h253 mt16">
              <img
                src="#"
                alt="임시 그래프이미지"
              >
            </div>
          </div>
          <div class="dashboard_el dashboard_el_1by1">
            <kw-btn
              icon-right="arrow_right"
              borderless
              class="text-weight-bold kw-font-pt20"
              label="조직현황"
            />
            <ul class="organization-status mt16">
              <li>
                <div class="organization-status-left">
                  <p class="organization-status-title">
                    지국수
                  </p>
                </div>
                <div class="organization-status-right">
                  <p class="organization-status-number">
                    1,036명
                  </p>
                </div>
              </li>
              <li>
                <div class="organization-status-left">
                  <p class="organization-status-title">
                    가동
                  </p>
                  <span>
                    (1원↑)
                  </span>
                </div>
                <div class="organization-status-right">
                  <p class="organization-status-number">
                    1,036명
                  </p>
                  <span>
                    (3,300)
                  </span>
                </div>
              </li>
              <li>
                <div class="organization-status-left">
                  <p class="organization-status-title">
                    1차월
                    업무등록
                  </p>
                </div>
                <div class="organization-status-right">
                  <p class="organization-status-number">
                    2,022명
                  </p>
                  <span>
                    (1,900)
                  </span>
                </div>
              </li>
              <li>
                <div class="organization-status-left">
                  <p class="organization-status-title">
                    실가동
                  </p>
                  <span>
                    (1원↑)
                  </span>
                </div>
                <div class="organization-status-right">
                  <p class="organization-status-number">
                    2,386명
                  </p>
                  <span>
                    (2,300)
                  </span>
                </div>
              </li>
              <li>
                <div class="organization-status-left">
                  <p class="organization-status-title">
                    1차월
                    실가동
                  </p>
                  <span>
                    (300만 ↑)
                  </span>
                </div>
                <div class="organization-status-right">
                  <p class="organization-status-number">
                    706명
                  </p>
                  <span>
                    (1,900)
                  </span>
                </div>
              </li>
              <li>
                <div class="organization-status-left">
                  <p class="organization-status-title">
                    표준가동
                  </p>
                  <span>
                    (500만원 ↑)
                  </span>
                </div>
                <div class="organization-status-right">
                  <p class="organization-status-number">
                    1,305명
                  </p>
                  <span>
                    (1,300)
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="dashboard_el dashboard_el_1by1">
            <kw-btn
              icon-right="arrow_right"
              borderless
              class="text-weight-bold kw-font-pt20"
              label="직급별 300만 실가동 현황"
            />
            <table class="kw-table--normal mt16">
              <colgroup>
                <col style="width: 70px;">
                <col style="width: auto;">
                <col style="width: 145px;">
              </colgroup>
              <thead>
                <tr>
                  <th>직급</th>
                  <th>
                    월 목표 달성율
                  </th>
                  <th>달성인원/월 목표인원</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>마스터</td>
                  <td class="row items-center justify-center">
                    <div
                      class="progressbar"
                    >
                      <span style="width: 67%;" />
                    </div>
                    <span class="ml12">(67%)</span>
                  </td>
                  <td class="text-right">
                    944/1,400
                  </td>
                </tr>
                <tr>
                  <td>1급</td>
                  <td class="row items-center justify-center">
                    <div
                      class="progressbar"
                    >
                      <span style="width: 68%;" />
                    </div>
                    <span class="ml12">(68%)</span>
                  </td>
                  <td class="text-right">
                    342/500
                  </td>
                </tr>
                <tr>
                  <td>2급</td>
                  <td class="row items-center justify-center">
                    <div
                      class="progressbar"
                    >
                      <span style="width: 81%;" />
                    </div>
                    <span class="ml12">(81%)</span>
                  </td>
                  <td class="text-right">
                    283/350
                  </td>
                </tr>
                <tr>
                  <td>3급</td>
                  <td class="row items-center justify-center">
                    <div
                      class="progressbar"
                    >
                      <span style="width: 73%;" />
                    </div>
                    <span class="ml12">(73%)</span>
                  </td>
                  <td class="text-right">
                    11/150
                  </td>
                </tr>
                <tr>
                  <td>1차월</td>
                  <td class="row items-center justify-center">
                    <div
                      class="progressbar"
                    >
                      <span style="width: 64%;" />
                    </div>
                    <span class="ml12">(64%)</span>
                  </td>
                  <td class="text-right">
                    706/1,100
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="dashboard_el dashboard_el_2by1">
            <kw-btn
              icon-right="arrow_right"
              borderless
              label="조직 실적 상세"
              class="kw-font-pt20 text-weight-bold"
            />
            <kw-grid
              :visible-rows="5"
              class="mt16"
              @init="initGrid1"
            />
          </div>
          <div class="dashboard_el dashboard_el_1by1">
            <kw-btn
              icon-right="arrow_right"
              borderless
              class="text-weight-bold kw-font-pt20"
              label="아이캔두 총회원 순증 현황"
            />
            <ul class="net-increase-status mt16">
              <li class="net-increase-status-item net-increase-status-item--column">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    기초 총회원
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold">104,256명</span>
              </li>
              <li class="net-increase-status-item net-increase-status-item--column">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    기말 총회원
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold">104,763명</span>
              </li>
              <li class="net-increase-status-item">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    총 유입
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold">104,256명</span>
              </li>
              <li class="net-increase-status-item">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    총 이탈
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold">1,688명</span>
              </li>
              <li class="net-increase-status-item  net-increase-status-item--column">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    평가/잠재이탈
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold">15,974명 / 14,306명</span>
              </li>
              <li class="net-increase-status-item  net-increase-status-item--column">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    만료/취소
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold">131명/5,974명</span>
              </li>
              <li class="net-increase-status-item">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    확정순증
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold">5,974명</span>
              </li>
              <li class="net-increase-status-item">
                <div class="row items-center">
                  <p class="text-weight-medium">
                    평가순증
                  </p>
                  <kw-icon
                    name="info"
                    tooltip="tooltip text"
                    class="ml4"
                  />
                </div>
                <span class="kw-font-pt18 text-weight-bold kw-fc--error">-5,974명</span>
              </li>
            </ul>
          </div>
          <div class="dashboard_el dashboard_el_1by1">
            <kw-btn
              icon-right="arrow_right"
              borderless
              class="text-weight-bold kw-font-pt20"
              label="공지사항"
            />
            <kw-list
              separator
              :items="[
                {
                  id:1,
                  title: '22년 5월 영업지원팀 월간 공지사항',
                  writer:'김교원',
                  date:'2022-05-24',
                  views:'123'
                },
                {
                  id:2,
                  title: '22년 5월 영업지원팀 월간 공지사항',
                  writer:'김교원',
                  date:'2022-05-24',
                  views:'123'
                },
                {
                  id:3,
                  title: '22년 5월 영업지원팀 월간 공지사항 공지사항 공지사항 공지사항',
                  writer:'김교원',
                  date:'2022-05-24',
                  views:'123'
                },
                {
                  id:4,
                  title: '[출시 공지] 신제품웰스  수기 듀어 출시 공지 件',
                  writer:'제갈교원',
                  date:'2022-05-24',
                  views:'1235'
                },
              ]"
              item-key="id"
              item-padding="12px 0"
              class="kw-list--card mt4"
            >
              <template #item="{item}">
                <kw-item-section>
                  <kw-item-label
                    font="body"
                    lines="1"
                  >
                    {{ item.title }}
                  </kw-item-label>
                  <kw-item-label>
                    <ul class="info-list">
                      <li>{{ item.writer }}</li>
                      <li>{{ item.date }}</li>
                      <li>조회수 {{ item.views }}</li>
                    </ul>
                  </kw-item-label>
                </kw-item-section>
              </template>
            </kw-list>
          </div>
        </div>
      </div>
      <web-footer />
    </div>
  </kw-page>
</template>
<script setup>
import { http } from '../../plugins/http';

const { getters, commit } = useStore();

const props = defineProps({
  importedComponents: {
    type: Array,
    default: undefined,
  },
});

const area = ref('총괄');
const gap = ref('일간');

const userCards = shallowRef([]);
async function fetchUserCards() {
  const response = await http.get('/sflex/common/common/user-homecards');

  userCards.value = response.data.sort((a, b) => (a.rowPosition === b.rowPosition
    ? (a.columnPosition - b.columnPosition) : (a.rowPosition - b.rowPosition)));

  const modules = props.importedComponents;
  userCards.value.forEach((item) => {
    modules.forEach((module) => {
      if (module.key.indexOf(item.pageId) > -1) {
        item.component = module.component;
      }
    });
  });
  commit('app/setUserHomecardChanged', false);
}
await fetchUserCards();

function getDashboardClass(card) {
  const sizeType = card.homeCardSizeTypeName;
  return `dashboard_el dashboard_el_${sizeType.replaceAll('X', 'by')}`;
}
console.log(getDashboardClass);
watch(() => getters['app/getUserHomecardChanged'], async (newVal) => {
  if (newVal) {
    await fetchUserCards();
  }
});

</script>
<style scoped lang="scss">
</style>
