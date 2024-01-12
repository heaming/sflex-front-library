<template>
  <kw-page no-header>
    <div class="kw-page-mobile-header kw-page__header mob-home__header">
      <h1
        class="kw-page-mobile-header__title"
        style="line-height: 1 !important; margin-bottom: 0 !important;"
      >
        <img
          src="../../assets/images/kstation_wells.svg"
          class="w100"
          alt="kstation"
        >
      </h1>
    </div>
    <div class="dashboard-mobile">
      <div class="dashboard_summary">
        <div class="dashboard_summary__inner">
          <p class="greetings">
            <span>{{ `${userInfo.userName}${userInfo.rsbNm
              ? userInfo.rsbNm.endsWith('님')
                ? ` ${userInfo.rsbNm.slice(0, -1)}` : ` ${userInfo.rsbNm}`
              : ''}님` }},</span> 좋은 하루 보내세요.
          </p>
        </div>
      </div>
      <template
        v-for="(userCard, idx) in userCards"
        :key="idx"
      >
        <div
          class="dashboard-mobile--el"
        >
          <component
            :is="userCard.component"
            v-if="userCard.authYn === 'Y'"
          />
          <div
            v-else
            style="height: 100%;display: flex;align-items: center;justify-content: center;"
          >
            해당 홈카드에 권한이 없습니다.<br>홈 화면 개인 설정에서 변경 부탁드립니다.
          </div>
        </div>
      </template>
      <div
        class="mobile-home-bottom-sheet"
        :class="{active : bottomActive === true}"
      >
        <div
          class="mobile-home-bottom-sheet--header"
          @click="bottomActive = !bottomActive"
        >
          <h3>5월 수수료</h3>
          <p>2022-05-12 확정건 기준</p>
        </div>
        <div class="mobile-home-bottom-sheet--content">
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
          여기는 내용<br>여기는 내용<br>여기는 내용<br>여기는 내용<br>
        </div>
      </div>
      <div
        class="mobile-home-bottom-sheet--dimmed"
        :class="{active : bottomActive === true}"
        @click="bottomActive = !bottomActive"
      />
    </div>
  </kw-page>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { http } from '../../plugins/http';
import useMeta from '../../composables/useMeta';

const { getters, commit } = useStore();

const props = defineProps({
  importedComponents: {
    type: Array,
    default: undefined,
  },
});

const { getUserInfo } = useMeta();
const userInfo = computed(() => cloneDeep(getUserInfo()));

const userCards = shallowRef([]);
async function fetchUserCards() {
  const response = await http.get('/sflex/common/common/user-homecards');

  userCards.value = response.data.sort((a, b) => (a.rowPosition === b.rowPosition
    ? (a.columnPosition - b.columnPosition) : (a.rowPosition - b.rowPosition)));

  const modules = props.importedComponents;
  userCards.value.forEach((item) => {
    modules.forEach((module) => {
      if (module.key.indexOf(item.pageId) > -1 && module.key.split('.vue')[0].endsWith(item.pageId)) {
        item.component = module.component;
      }
    });
  });
  commit('app/setUserHomecardChanged', false);
}
await fetchUserCards();

watch(() => getters['app/getUserHomecardChanged'], async (newVal) => {
  if (newVal) {
    await fetchUserCards();
  }
});

const bottomActive = ref(false);
</script>
