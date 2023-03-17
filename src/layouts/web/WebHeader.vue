<template>
  <q-header class="web-header">
    <q-toolbar class="full-width">
      <div class="web-header__logo">
        <slot
          name="logo"
          :go-to-home="goToHome"
        />
      </div>

      <div class="web-header__apps">
        <a
          v-for="{key, label} of apps"
          :key="key"
          class="web-header__link"
          :class="{'web-header__link--active': isSelected(key)}"
          @click="updateSelected(key)"
        >
          {{ label }}
        </a>
      </div>

      <q-space />

      <div class="web-header__tools">
        <kw-input
          v-model.trim="searchText"
          class="web-header__search"
          placeholder="메뉴검색"
          icon="search_24"
          maxlength="25"
          underline
          dense
          :on-click-icon="() => openMenuSearchPopup()"
        />

        <kw-icon
          class="web-header__icon"
          name="alert_off_24"
          clickable
        />
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
            <q-btn-toggle
              v-model="zoomSize"
              v-close-popup
              spread
              no-caps
              unelevated
              toggle-color="primary"
              color="white"
              text-color="primary"
              :options="[
                {label: '67%', value: 67},
                {label: '80%', value: 80},
                {label: '100%', value: 100}
              ]"
              @update:model-value="setZoomSize()"
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
          />
        </div>
        <div
          class="web-header__separator"
        />
        <div
          @dblclick="openSetSessionP"
        >
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
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import useSession from '../../composables/useSession';
import useHeaderApp from '../../composables/private/useHeaderApp';
import useGlobal from '../../composables/useGlobal';
import consts from '../../consts';
import { modal } from '../../plugins/modal';
import { localStorage } from '../../plugins/storage';
import WebTotalMenuP from '../../pages/web/WebTotalMenuP.vue';

const zoomSize = ref(true);
const searchText = ref('');
const totalMenu = ref(false);

export default {
  name: 'WebHeader',
  components: { WebTotalMenuP },
  setup() {
    const { push } = useRouter();
    const { logout } = useSession();
    const { notify } = useGlobal();
    const { t } = useI18n();

    async function openTotalMenuP() {
      // modal({
      //   component: () => import('../../pages/web/WebTotalMenuP.vue'),
      // });
      totalMenu.value = true;
    }

    async function closeTotalMenuP() {
      totalMenu.value = false;
    }

    async function openSetSessionP() {
      console.log('openSetSession');
      modal({
        component: () => import('../../pages/web/WebSessionSettingP.vue'),
      });
    }
    function goToHome() {
      push({ name: consts.ROUTE_HOME_NAME });
    }

    function openHomeMgtPopup() {
      modal({
        component: () => import('../../pages/web/WebDashboardMgtP.vue'),
      });
    }

    async function openMenuSearchPopup() {
      if (searchText.value.length <= 0) {
        notify(t('MSG_ALT_SRCH_INPUT'));
        return;
      }

      const localStorageData = localStorage.getItem(consts.LOCAL_STORAGE_RECENT_KEYWORD);
      let recentKeywords = [];
      if (localStorageData) {
        const keywordIndex = localStorageData.findIndex((x) => x === searchText.value);
        if (keywordIndex >= 0) localStorageData.splice(keywordIndex, 1);
        localStorageData.unshift(searchText.value);
        recentKeywords = cloneDeep(localStorageData);
      } else recentKeywords.unshift(searchText.value);
      localStorage.set(consts.LOCAL_STORAGE_RECENT_KEYWORD, recentKeywords);

      const { result, payload } = await modal({
        component: () => import('../../pages/web/WebMenuListP.vue'),
        componentProps: { searchText: searchText.value },
      });

      if (result) push({ name: payload.menuUid });
    }

    function setZoomSize() {
      document.body.style.zoom = `${zoomSize.value}%`;
      localStorage.set(consts.LOCAL_STORAGE_ZOOM_SIZE, zoomSize.value);
    }

    onMounted(() => {
      zoomSize.value = localStorage.getItem(consts.LOCAL_STORAGE_ZOOM_SIZE);
    });

    return {
      ...useHeaderApp(),
      logout,
      goToHome,
      openHomeMgtPopup,
      setZoomSize,
      zoomSize,
      openSetSessionP,
      openTotalMenuP,
      openMenuSearchPopup,
      searchText,
      totalMenu,
      closeTotalMenuP,
    };
  },
};
</script>
