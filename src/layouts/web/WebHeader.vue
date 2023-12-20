<template>
  <!-- eslint-disable vuejs-accessibility/mouse-events-have-key-events -->
  <q-header
    class="web-header"
    @mouseleave="restoreHoverHeader()"
  >
    <q-toolbar class="full-width">
      <div class="web-header__logo">
        <slot
          name="logo"
          :go-to-home="goToHome"
        />
        <kw-tooltip :offset="[0,2]">
          홈으로 이동
        </kw-tooltip>
      </div>

      <kw-click-outside
        @click-outside="closeGnbMenu"
      >
        <div
          class="web-header__apps"
        >
          <template
            v-for="{key, label} of apps"
            :key="key"
          >
            <a
              :id="'header_' + key"
              class="web-header__link"
              @focus="hoverHeader(key, $event)"
              @mouseover="hoverHeader(key, $event)"
              @click="openGnbMenu(key, $event)"
            >
              {{ label }}
            </a>
          </template>
          <web-gnb-menu-p
            v-if="gnbMenu"
            :app-key="getSelectedKey"
            @close-gnb-menu="closeGnbMenu"
          />
        </div>
      </kw-click-outside>

      <q-space />

      <div class="web-header__tools">
        <kw-input
          ref="menuSearchRef"
          v-model.trim="searchText"
          class="web-header__search"
          placeholder="메뉴검색"
          icon="search_24"
          maxlength="25"
          underline
          dense
          :on-click-icon="() => openMenuSearchPopup()"
        />
        <div>
          <kw-btn
            icon="alert_off_24"
            borderless
            style="font-size: 24px;"
            class="alert-btn h32"
          >
            <q-badge
              v-if="alarms?.length > 0"
              rounded
              floating
              color="error"
              :label="alarms?.filter((alarm) => alarm.readYn === 'N').length > 99
                ? '99+' : alarms?.filter((alarm) => alarm.readYn === 'N').length"
              class="alert-badge"
            />
            <kw-tooltip :offset="[0,3]">
              알림
            </kw-tooltip>
          </kw-btn>
          <kw-menu
            v-if="alarms.length > 0"
            ref="alarmRef"
            target=".alert-btn"
            class="web-header__dropdown w400 h400"
            fit
            :offset="[0,3]"
            @before-hide="beforeHideReadAllNotice"
          >
            <div class="px16">
              <kw-list
                :items="alarms"
                separator
                item-padding="12px 0"
                clickable
                item-key="alarmId"
                class="kw-list-alert"
                @click-item="onClickReadItem"
              >
                <template #item="{ item }">
                  <kw-item-section
                    class="row"
                    side
                    top
                  >
                    <kw-icon
                      :name="item.readYn === 'N' ? 'alert_on' : 'alert_outline'"
                      :class="item.readYn === 'Y' ? 'text-disabled' : ''"
                    />
                    <kw-item-label>
                      <span class="kw-fc--black3 kw-font-pt14 mt4 ml4">
                        {{ dayjs(item.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD hh:mm A') }}
                      </span>
                    </kw-item-label>
                  </kw-item-section>
                  <kw-item-section class="mt8">
                    <kw-item-label
                      lines="2"
                      class="kw-font-pt14 alarm-msg"
                      :class="
                        { 'text-underline': item.linkUrl,
                          'text-disabled': item.readYn === 'Y' }"
                    >
                      {{ item.alarmMsg }}
                      <kw-tooltip
                        class="alert_tooltip"
                        anchor="bottom start"
                        self="top start"
                        :offset="[0,3]"
                        style="line-height: 20px;"
                      >
                        {{ item.alarmMsg }}
                      </kw-tooltip>
                    </kw-item-label>
                  </kw-item-section>
                </template>
              </kw-list>
            </div>
          </kw-menu>
          <kw-menu
            v-else
            class="w400 h400"
          >
            <div
              class="row items-center justify-center full-height"
            >
              <p class="kw-fc--black3 kw-font-pt14 text-center">
                알림 메세지가 없습니다.
              </p>
            </div>
          </kw-menu>
        </div>
        <div>
          <kw-icon
            class="web-header__icon report-icon h32"
            name="support_24"
            size="32px"
            style="font-size: 24px;"
            tooltip="업무지원"
            clickable
          />
          <kw-menu
            ref="supportRef"
            class="web-header__dropdown"
            anchor="bottom end"
            self="top end"
            target=".report-icon"
            @before-show="beforeSupportMenuShow"
          >
            <kw-btn
              v-close-popup
              borderless
              grow
              icon="notice_off"
              :label="$t('MSG_TIT_NOTICE')"
              @click="goToNoticePage"
            />
            <kw-btn
              v-if="isEdu"
              v-close-popup
              borderless
              grow
              icon="report"
              :label="$t('MSG_BTN_EDUC_MTR')"
              @click="goToEduMaterialPage"
            />
            <kw-btn
              v-close-popup
              borderless
              grow
              label="FAQ"
              icon="sms"
              @click="goToFaqPage"
            />
            <kw-btn
              v-close-popup
              borderless
              grow
              icon="call"
              :label="$t('MSG_BTN_SMS_HIST')"
              @click="goToSmsSendHistoryPage"
            />
          </kw-menu>
        </div>
        <div
          class=""
          style="border-radius: 70%;overflow: hidden;"
        >
          <kw-icon
            class="profile_user"
            name="profile_none"
            size="32px"
            tooltip="개인설정"
            clickable
          />
          <kw-menu
            ref="userInfoMenuRef"
            class="web-header__dropdown"
            anchor="bottom end"
            self="top end"
            target=".profile_user"
            @before-show="beforeUserInfoMenuShow"
          >
            <kw-btn
              v-close-popup
              borderless
              grow
              icon="user"
              label="사용자정보"
              @click="openUserInfoPopup"
            />
            <!--            <kw-btn-->
            <!--              v-close-popup-->
            <!--              borderless-->
            <!--              grow-->
            <!--              icon="change_user"-->
            <!--              label="로그인 계정전환"-->
            <!--            />-->
            <kw-btn
              v-close-popup
              borderless
              grow
              icon="go_home"
              :label="$t('MSG_TIT_HOME_MGT')"
              @click="openHomeMgtPopup"
            />
            <kw-btn
              v-if="ccpsInfoList && ccpsInfoList.length > 0"
              v-close-popup
              borderless
              grow
              :label="$t('MSG_BTN_CHANGE_SESSION')"
              @click="openChangeCcpsSession"
            />
            <kw-btn
              v-close-popup
              borderless
              grow
              :label="$t('MSG_TIT_PW_CHG')"
              @click="openPasswordChange"
            />
            <kw-btn
              v-if="isDev"
              v-close-popup
              borderless
              grow
              label="(임시) 세션변경"
              @click="openSetSessionP"
            />
            <kw-btn
              v-if="(isEdu || isWells) && isDev"
              v-close-popup
              borderless
              grow
              label="(임시) 유저변경"
              @click="openSessionChangeP"
            />
            <kw-btn
              v-if="isDev"
              v-close-popup
              borderless
              grow
              label="(임시) 권한 적용 끄기"
              @click="onClickAuthOff"
            />
            <kw-btn
              v-close-popup
              borderless
              grow
              icon="logout"
              :label="$t('MSG_TXT_LOGOUT')"
              @click="logout"
            />
          </kw-menu>
        </div>
        <div
          class="web-header__separator"
        />
        <div>
          <kw-icon
            class="web-header__icon h32"
            size="32px"
            name="gnb_menu"
            clickable
            style="font-size: 24px;"
            tooltip="전체메뉴"
            @click="openTotalMenuP"
          />
        </div>
        <web-total-menu-p
          v-if="totalMenu"
          @close-tot="closeTotalMenuP"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { isEmpty } from 'lodash-es';
import dayjs from 'dayjs';
import { http } from '../../plugins/http';
import useSession from '../../composables/useSession';
import useHeaderApp from '../../composables/private/useHeaderApp';
import useAlarm from '../../components/page/private/useAlarm';
import useGlobal from '../../composables/useGlobal';
import useMeta from '../../composables/useMeta';
import consts from '../../consts';
import { modal } from '../../plugins/modal';
import WebTotalMenuP from '../../pages/web/WebTotalMenuP.vue';
import WebGnbMenuP from '../../pages/web/WebGnbMenuP.vue';
import store from '../../store';
import { localStorage } from '../../plugins/storage';
import env from '../../consts/private/env';

const searchText = ref('');
const totalMenu = ref(false);
const gnbMenu = ref(false);
export default {
  name: 'WebHeader',
  components: { WebTotalMenuP, WebGnbMenuP },
  setup() {
    const showSupportTooltip = ref(false);
    const supportRef = ref();
    const supportTooltipRef = ref();
    const showUserInfoTooltip = ref(false);
    const userInfoMenuRef = ref();
    const userInfoTooltipRef = ref();
    const { push } = useRouter();
    const { logout } = useSession();
    const { notify } = useGlobal();
    const { t } = useI18n();
    const { getters, commit } = useStore();
    const { readAlarm, readAllAlarm } = useAlarm();
    const alarms = computed(() => getters['meta/getAlarms']);
    const menuSearchRef = ref();
    const router = useRouter();
    const alarmRef = ref();
    const { tenantId, portalId, ccpsInfoList } = useMeta().getUserInfo();
    const isDev = computed(() => env.MODE === 'dev' || env.DEV);
    const isEdu = computed(() => tenantId === 'TNT_EDU' && portalId === 'WEB_DEF');
    const isWells = computed(() => tenantId === 'TNT_WELLS' && portalId === 'WEB_DEF');

    // alarm중에 바로 켜져야하는 건이 있으면 바로켜준다.
    function onClickReadItem(item) {
      if (item.value.linkUrl) alarmRef.value.hide();
      readAlarm(item.value);
    }
    const directAlarms = alarms.value.filter((alarm) => alarm.windowPopupYn === 'Y' && alarm.directPopupYn === 'Y');
    if (directAlarms.length > 0) {
      directAlarms.map((alarm) => readAlarm(alarm));
    }

    dayjs.locale('en');
    async function openTotalMenuP() {
      document.querySelector('body').classList.add('q-body--prevent-scroll');
      totalMenu.value = true;
    }

    async function closeTotalMenuP() {
      document.querySelector('body').classList.remove('q-body--prevent-scroll');
      totalMenu.value = false;
    }

    async function openSetSessionP() {
      modal({
        component: () => import('../../pages/web/WebSessionSettingP.vue'),
      });
    }

    async function openSessionChangeP() {
      modal({
        component: () => import('../../pages/web/WebSessionChangeP.vue'),
      });
    }

    async function openChangeCcpsSession() {
      const res = await modal({
        component: () => import('../../pages/web/WebCcpsSessionChangeP.vue'),
      });
      if (res.result) {
        window.location.reload();
      }
    }

    async function openPasswordChange() {
      const res = await modal({
        component: () => import('../../pages/web/WebPasswordChangeP.vue'),
      });
      if (res.result) {
        notify(t('MSG_ALT_NEW_PW_SET'));
      }
    }

    async function onClickAuthOff() {
      const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
      await http.post('/sflex/common/common/set-auth-off', {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
    function goToHome() {
      push({ name: consts.ROUTE_HOME_NAME });
      store.commit('app/setLeftExist', false);
    }

    async function openHomeMgtPopup() {
      const res = await modal({
        component: () => import('../../pages/web/WebDashboardMgtP.vue'),
      });

      if (res.result) {
        commit('app/setUserHomecardChanged', true);
      }
    }

    const selectedGlobalAppKey = computed(() => getters['app/getSelectedGlobalAppKey']);
    async function getActiveClass() {
      document.querySelectorAll('.web-header__link').forEach((item) => {
        item.classList.remove('web-header__link--active');
      });
      const el = document.querySelector(`#header_${selectedGlobalAppKey.value}`);
      if (el !== null) {
        el.classList.add('web-header__link--active');
      }
    }

    watch(selectedGlobalAppKey, () => {
      getActiveClass();
    });

    const getSelectedKey = ref('');
    function closeGnbMenu() {
      if (gnbMenu.value) {
        gnbMenu.value = false;
        document.querySelectorAll('.web-header__link').forEach((item) => {
          item.classList.remove('web-header__link--active');
        });
        const body = document.querySelector('body');
        body.classList.remove('q-body--prevent-scroll__header');
        body.classList.remove('kw-body--force-scrollbar-y');

        // 메뉴 닫힐 때 맨 위로 스크롤되서, 다시 현재 위치로 스크롤하는 로직 추가
        let top = body.style?.top?.split('px')[0];
        let left = body.style?.left?.split('px')[0];
        if (isEmpty(top)) top = 0;
        if (isEmpty(left)) left = 0;
        top *= -1;
        left *= -1;
        window.scrollTo(left, top);
        body.style.top = '';
        body.style.left = '';
        getActiveClass();
      }
    }

    function openGnbMenu(key, ev) {
      if (key === getSelectedKey.value && gnbMenu.value) {
        closeGnbMenu();
        return;
      }
      document.querySelectorAll('.web-header__link').forEach((item) => {
        item.classList.remove('web-header__link--active');
      });
      ev.target.classList.add('web-header__link--active');
      getSelectedKey.value = key;
      const body = document.querySelector('body');

      // 메뉴 열릴 때 맨 위로 스크롤되서, 다시 현재 위치로 스크롤하는 css 추가
      if (!gnbMenu.value) {
        body.style.top = `-${window.scrollY}px`;
        body.style.left = `-${window.scrollX}px`;
        body.classList.add('q-body--prevent-scroll__header');

        const bodyScrollHeight = body.scrollHeight;
        const windowHeight = window.innerHeight;
        if (bodyScrollHeight > windowHeight) body.classList.add('kw-body--force-scrollbar-y');
      }
      gnbMenu.value = true;
    }

    function hoverHeader(key, ev) {
      document.querySelectorAll('.web-header__link').forEach((item) => {
        item.classList.remove('web-header__link--active');
      });
      ev.target.classList.add('web-header__link--active');
      getSelectedKey.value = key;
    }

    function restoreHoverHeader() {
      if (!gnbMenu.value) {
        document.querySelectorAll('.web-header__link').forEach((item) => {
          item.classList.remove('web-header__link--active');
        });
        getActiveClass();
      }
    }

    async function openMenuSearchPopup() {
      if (searchText.value.length <= 0) {
        notify(t('MSG_ALT_SRCH_INPUT'));
        menuSearchRef.value?.focus();
        return;
      }

      const { result, payload } = await modal({
        component: () => import('../../pages/web/WebMenuListP.vue'),
        componentProps: { searchText: searchText.value },
      });

      if (result) {
        await push({ name: payload.menuUid });
      }
    }

    async function openUserInfoPopup() {
      const res = await modal({
        component: () => import('../../pages/web/WebUserInfoP.vue'),
      });

      if (res.result) notify('변경되었습니다.');
    }

    onMounted(() => {
      getActiveClass();
    });

    function beforeSupportMenuShow() {
      showSupportTooltip.value = false;
    }

    function beforeSupportTooltipShow() {
      if (supportRef.value.showing) showSupportTooltip.value = false;
    }

    function beforeUserInfoMenuShow() {
      showUserInfoTooltip.value = false;
    }

    function beforeUserInfoTooltipShow() {
      if (userInfoMenuRef.value.showing) showUserInfoTooltip.value = false;
    }

    function goToNoticePage() {
      router.push('/kportal-notice-mgt');
    }

    function goToEduMaterialPage() {
      router.push('/kportal-edu-material-mgt');
    }

    function goToFaqPage() {
      router.push('/zwclb-faq-list-for-user');
    }

    function goToSmsSendHistoryPage() {
      router.push('/zwcmz-sms-send-list');
    }

    function beforeHideReadAllNotice() {
      const noUrlAlarms = alarms.value.filter((alarm) => !alarm.linkUrl && alarm.readYn === 'N');
      if (noUrlAlarms.length > 0) {
        const ids = noUrlAlarms.map((alarm) => alarm.alarmId);
        readAllAlarm(ids);
      }
    }

    return {
      ...useHeaderApp(),
      logout,
      goToHome,
      openHomeMgtPopup,
      openSetSessionP,
      openSessionChangeP,
      ccpsInfoList,
      openChangeCcpsSession,
      openPasswordChange,
      onClickAuthOff,
      openTotalMenuP,
      openMenuSearchPopup,
      openGnbMenu,
      searchText,
      totalMenu,
      gnbMenu,
      getSelectedKey,
      getActiveClass,
      closeTotalMenuP,
      closeGnbMenu,
      openUserInfoPopup,
      readAlarm,
      dayjs,
      alarms,
      menuSearchRef,
      showSupportTooltip,
      supportRef,
      supportTooltipRef,
      beforeSupportMenuShow,
      beforeSupportTooltipShow,
      showUserInfoTooltip,
      userInfoMenuRef,
      userInfoTooltipRef,
      beforeUserInfoMenuShow,
      beforeUserInfoTooltipShow,
      isDev,
      isEdu,
      isWells,
      goToNoticePage,
      goToEduMaterialPage,
      goToFaqPage,
      goToSmsSendHistoryPage,
      onClickReadItem,
      alarmRef,
      beforeHideReadAllNotice,
      hoverHeader,
      restoreHoverHeader,
    };
  },
};
</script>
