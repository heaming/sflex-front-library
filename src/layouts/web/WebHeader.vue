<template>
  <q-header class="web-header">
    <q-toolbar class="full-width">
      <div class="web-header__logo">
        <slot
          name="logo"
          :go-to-home="goToHome"
        />
      </div>

      <kw-click-outside
        @click-outside="closeGnbMenu"
      >
        <div class="web-header__apps">
          <template
            v-for="{key, label} of apps"
            :key="key"
          >
            <a
              :id="'header_' + key"
              class="web-header__link"
              @mouseover="openGnbMenu(key, $event)"
              @focus="openGnbMenu(key)"
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
            class="alert-btn"
          >
            <q-badge
              v-if="alarms?.length > 0"
              rounded
              floating
              color="primary"
              :label="Math.min(alarms?.filter((alarm) => alarm.readYn === 'N').length, 99)"
              class="alert-badge"
            />
          </kw-btn>
          <kw-menu
            v-if="alarms.length > 0"
            ref="alarmRef"
            target=".alert-btn"
            class="web-header__dropdown w400 h344"
            fit
            :offset="[0,3]"
          >
            <div class="px16">
              <kw-list
                :items="alarms"
                separator
                item-padding="12px 0"
                clickable
                item-key="alarmId"
                class="kw-list-alert"
                @click-item="readAlarm"
              >
                <template #item="{ item }">
                  <kw-item-section
                    side
                    top
                  >
                    <kw-icon :name="item.readYn === 'N' ? 'alert_on' : 'alert_outline' " />
                  </kw-item-section>
                  <kw-item-section>
                    <kw-item-label
                      lines="1"
                      class="kw-font-pt14"
                    >
                      {{ item.alarmMsg }}
                      <kw-tooltip
                        class="alert_tooltip"
                        anchor="bottom start"
                        self="top start"
                        :offset="[-8, 0]"
                      >
                        {{ item.alarmMsg }}
                      </kw-tooltip>
                    </kw-item-label>
                    <kw-item-label>
                      <p class="kw-fc--black3 kw-font-pt14 mt4">
                        {{ dayjs(item.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD hh:mm A') }}
                      </p>
                    </kw-item-label>
                  </kw-item-section>
                </template>
              </kw-list>
            </div>
          </kw-menu>
          <kw-tooltip v-else>
            알림이 없습니다.
          </kw-tooltip>
        </div>
        <div>
          <kw-icon
            class="web-header__icon"
            name="setting_24"
            clickable
          />
          <kw-menu
            class="web-header__dropdown"
            anchor="bottom middle"
            self="top middle"
          >
            <kw-btn
              v-close-popup
              borderless
              grow
              :label="$t('MSG_TIT_HOME_MGT')"
              @click="openHomeMgtPopup"
            />
            <kw-btn
              v-close-popup
              borderless
              grow
              label="(임시) 세션변경"
              @click="openSetSessionP"
            />
            <kw-btn
              v-close-popup
              borderless
              grow
              :label="$t('MSG_TXT_LOGOUT')"
              @click="logout"
            />
          </kw-menu>
        </div>
        <div
          class=""
          style="border-radius: 70%;overflow: hidden;"
        >
          <kw-icon
            name="profile_none"
            size="32px"
            clickable
            @click="openUserInfoPopup"
          />
        </div>
        <div
          class="web-header__separator"
        />
        <kw-icon
          class="web-header__icon"
          name="gnb_menu"
          clickable
          @click="openTotalMenuP"
        />
        <web-total-menu-p
          v-if="totalMenu"
          @close-tot="closeTotalMenuP"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import dayjs from 'dayjs';
import useSession from '../../composables/useSession';
import useHeaderApp from '../../composables/private/useHeaderApp';
import useAlarm from '../../composables/private/useAlarm';
import useGlobal from '../../composables/useGlobal';
import consts from '../../consts';
import { modal } from '../../plugins/modal';
import WebTotalMenuP from '../../pages/web/WebTotalMenuP.vue';
import WebGnbMenuP from '../../pages/web/WebGnbMenuP.vue';
import store from '../../store';

const searchText = ref('');
const totalMenu = ref(false);
const gnbMenu = ref(false);
export default {
  name: 'WebHeader',
  components: { WebTotalMenuP, WebGnbMenuP },
  setup() {
    const { push } = useRouter();
    const { logout } = useSession();
    const { notify } = useGlobal();
    const { t } = useI18n();
    const { getters, commit } = useStore();
    const { readAlarm } = useAlarm();
    const alarms = computed(() => getters['meta/getAlarms']);
    const menuSearchRef = ref();
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
    function openGnbMenu(key, ev) {
      document.querySelectorAll('.web-header__link').forEach((item) => {
        item.classList.remove('web-header__link--active');
      });
      ev.target.classList.add('web-header__link--active');
      getSelectedKey.value = key;
      document.querySelector('body').classList.add('q-body--prevent-scroll__header');
      gnbMenu.value = true;
    }

    function closeGnbMenu() {
      gnbMenu.value = false;
      document.querySelectorAll('.web-header__link').forEach((item) => {
        item.classList.remove('web-header__link--active');
      });
      document.querySelector('body').classList.remove('q-body--prevent-scroll__header');
      getActiveClass();
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

      if (result) push({ name: payload.menuUid });
    }

    async function openUserInfoPopup() {
      await modal({
        component: () => import('../../pages/web/WebUserInfoP.vue'),
      });
    }

    onMounted(() => {
      getActiveClass();
    });

    return {
      ...useHeaderApp(),
      logout,
      goToHome,
      openHomeMgtPopup,
      openSetSessionP,
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
    };
  },
};
</script>
