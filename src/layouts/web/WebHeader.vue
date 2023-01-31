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
        <kw-select
          ref="selectRef"
          class="web-header__search"
          :model-value="null"
          :options="options"
          option-value="value"
          option-label="label"
          :emit-value="false"
          :clearable="true"
          :fill-input="true"
          :input-debounce="300"
          :readonly="false"
          placeholder="메뉴검색"
          underline
          use-input
          hide-dropdown-icon
          ignore-on-modified
          ignore-on-reset
          @filter="onFilter"
          @update:model-value="onUpdateValue"
        >
          <template #append>
            <kw-icon
              name="search_24"
              clickable
            />
          </template>
        </kw-select>
        <kw-input
          v-if="false"
          class="web-header__search"
          placeholder="메뉴검색"
          underline
          dense
        >
          <template #append>
            <kw-icon
              name="search_24"
              clickable
            />
          </template>
        </kw-input>

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
            <kw-btn
              v-close-popup
              borderless
              grow
              :label="$t('MSG_TXT_LOGOUT')"
              @click="logout"
            />
          </kw-menu>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import useSession from '../../composables/useSession';
import useHeaderApp from '../../composables/private/useHeaderApp';
import consts from '../../consts';
import { modal } from '../../plugins/modal';

export default {
  name: 'WebHeader',

  setup() {
    const { push } = useRouter();
    const { logout } = useSession();

    function goToHome() {
      push({ name: consts.ROUTE_HOME_NAME });
    }

    function openHomeMgtPopup() {
      modal({
        component: () => import('../../pages/web/WebDashboardMgtP.vue'),
      });
    }

    return {
      ...useHeaderApp(),
      logout,
      goToHome,
      openHomeMgtPopup,
    };
  },
};
</script>
