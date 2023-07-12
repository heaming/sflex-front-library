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
          <template
            v-for="(userCard, idx) in userCards"
            :key="idx"
          >
            <div
              class="dashboard_el"
              :class="`dashboard_el_`
                + `${userCard.homeCardSizeTypeName.split('X')[0]}by${userCard.homeCardSizeTypeName.split('X')[1]}`"
            >
              <component :is="userCard.component" />
            </div>
          </template>
        </div>
      </div>
      <web-footer />
    </div>
  </kw-page>
</template>
<script setup>
import { http } from '../../plugins/http';
import WebFooter from './WebFooter.vue';

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
