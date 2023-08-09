<template>
  <kw-page
    class="py12"
    style="margin: 0 auto;"
  >
    <div class="relative-position">
      <div class="dashboard dashboard--fixed">
        <div class="dashboard_summary dashboard_summary_type1">
          <p class="greetings">
            <span>김길동 국장님</span>, 좋은 하루 보내세요.
          </p>
          <div class="dashboard_summary_counter">
            <h5>미팅참석현황</h5>
            <dl>
              <!-- <dt>어제</dt>
              <dd>{{ topBarData.meeting.metgPrscDc ?? 0 }}</dd> -->
              <dt>{{ periodType === 'D' ? '오늘' : '당월' }}</dt>
              <dd>{{ topBarData.meeting.metgPrscDc ?? 0 }}</dd>
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
              <dd>{{ topBarData.customer.cstIn ?? 0 }}</dd>
              <dt>이달</dt>
              <dd>{{ topBarData.customer.cstOut ?? 0 }}</dd>
              <dt>총인원수</dt>
              <dd>{{ topBarData.customer.cstTot ?? 0 }}</dd>
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
            <h5>주요지표(실적)</h5>
            <dl>
              <dt>진단검사</dt>
              <dd>{{ topBarData.index.dgnsCnt ?? 0 }}</dd>
              <dt>무료체험</dt>
              <dd>{{ topBarData.index.smartCnt ?? 0 }}</dd>
            </dl>
          </div>
          <kw-btn-toggle
            v-model="periodType"
            :options="[{'cd':'D', 'nm':'일간'}, {'cd':'M', 'nm':'월간'}]"
            option-label="nm"
            option-value="cd"
            dense
            gap="0px"
            class="ml16"
          />
        </div>
        <div class="dashboard_wrap">
          <template
            v-for="(userCard, idx) in userCards"
            :key="idx"
          >
            <div
              class="dashboard_el"
              :class="`dashboard_el_`
                + `${userCard.homeCardSizeTypeName.split('X')[0]}by${userCard.homeCardSizeTypeName.split('X')[1]}`"
            >
              <component
                :is="userCard.component"
                :period-type="periodType"
                :area-type="areaType"
              />
            </div>
          </template>
        </div>
      </div>
      <web-footer />
    </div>
  </kw-page>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import { http } from '../../plugins/http';
import useMeta from '../../composables/useMeta';
import WebFooter from './WebFooter.vue';

const { getters, commit } = useStore();

const props = defineProps({
  importedComponents: {
    type: Array,
    default: undefined,
  },
});

const areaType = ref('G');
const periodType = ref('D');

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

const topBarData = ref({
  meeting: {},
  customer: {},
  index: {},
});

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

// function getDashboardClass(card) {
//   const sizeType = card.homeCardSizeTypeName;
//   return `dashboard_el dashboard_el_${sizeType.replaceAll('X', 'by')}`;
// }
// console.log(getDashboardClass)?;

watch(() => getters['app/getUserHomecardChanged'], async (newVal) => {
  if (newVal) {
    await fetchUserCards();
  }
});

async function getMeetingAttendData() {
  const params = {
    body: {
      AGRG_YM: '201802',
      OG_TP_CD: userInfo.value.ogTpCd,
      PRTNR_NO: userInfo.value.loginId,
    },
    header: {},
  };
  const resp = await http.post('/interface/sms/common/competence/mcby-prtnr-metg-agrg', params);
  return resp.data;
}

async function getCustomerData() {
  const params = {
    dayOrMonth: periodType.value === 'M' ? 'MONTH' : 'DAY',
    ogCd: userInfo.value.ogCd,
    ogTpCd: userInfo.value.ogTpCd,
  };
  const resp = await http.get('/sms/edu/contract/orderstatus/customer-status', { params });
  return resp.data;
}

async function getIndexData() {
  const resp = await http.get(`/sms/edu/customer/common/homecards/status/${periodType.value}`);
  return resp.data;
}

async function getDataAll() {
  if (['WEB_DEF', 'MBL_DEF', 'TBL_DEF'].includes(userInfo.value.portalId) && userInfo.value.tenantId === 'TNT_EDU') {
    try {
      const [meeting, customer, index] = await Promise.all(
        [getMeetingAttendData(), getCustomerData(), getIndexData()],
      );
      topBarData.value.meeting = meeting;
      topBarData.value.customer = customer;
      topBarData.value.index = index;
    } catch (e) {
      topBarData.value.meeting = {};
      topBarData.value.customer = {};
      topBarData.value.index = {};
    }
  }
}

watch(periodType, () => {
  getDataAll();
});

onMounted(async () => {
  await getDataAll();
});

</script>
<style scoped lang="scss">
</style>
