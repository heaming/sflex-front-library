<template>
  <div
    v-if="title"
    class="kw-page-header"
  >
    <div class="kw-page-header__title">
      <kw-icon
        size="24px"
        name="arrow_left_breadcrumbs_24"
        clickable
        @click="onClickBack"
      >
        {{ $t('MSG_BTN_BACK', null, '뒤로가기') }}
      </kw-icon>

      <h1>{{ title }}</h1>
    </div>

    <div class="kw-page-header__tools">
      <kw-checkbox
        model-value="Y"
        checked-icon="bookmark_on"
        unchecked-icon="bookmark_off"
        @click="onClickFavorites"
      >
        <kw-tooltip>
          {{ $t('MSG_BTN_FAVORITES', null, '즐겨찾기') }}
        </kw-tooltip>
      </kw-checkbox>

      <kw-icon
        name="alert_on"
        clickable
        @click="onClickNotifications"
      >
        {{ $t('MSG_TXT_NTC', null, '알림보기') }}
      </kw-icon>

      <kw-icon
        name="new_window"
        clickable
        @click="onClickNewWindow"
      >
        {{ $t('MSG_TXT_NEW_WINDOW', null, '새창으로 보기') }}
      </kw-icon>
    </div>

    <q-space />

    <q-breadcrumbs class="kw-page-header__navigation">
      <q-breadcrumbs-el
        v-for="(navigation, i) of navigations"
        :key="navigation.key"
        :label="navigation.label"
      >
        <kw-icon
          v-if="i === navigation.length - 1"
          clickable
          @click="onClickHint"
        >
          {{ $t('MSG_BTN_HINT', null, '도움말 보기') }}
        </kw-icon>
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </div>
</template>

<script>
import { find, last } from 'lodash-es';
import { open } from '../../utils/popup';

function creataBreadcrumbs(menus, menuUid) {
  const matched = find(menus, { menuUid });

  if (matched) {
    return [
      ...creataBreadcrumbs(menus, matched.parentsMenuUid),
      {
        key: menuUid,
        label: matched.menuName,
      },
    ];
  }

  return [];
}

export default {
  name: 'KwPageHeader',

  props: {
    options: {
      type: Array,
      default: undefined,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { getters } = useStore();

    const { currentRoute } = useRouter();
    const { name: menuUid, path } = currentRoute.value;

    const menus = getters['meta/getMenus'];
    const matched = find(menus, { menuUid });

    const navigations = computed(() => {
      if (Array.isArray(props.options)) {
        return props.options.value.map((v) => ({ key: v, label: v }));
      }

      if (matched) {
        const {
          applicationId,
          applicationName,
        } = getters['meta/getApp'](matched.applicationId);

        return [
          {
            key: 'home',
            label: t('MSG_TXT_HOME', null, '홈'),

          },
          {
            key: applicationId,
            label: applicationName,
          },
          ...creataBreadcrumbs(menus, menuUid),
        ];
      }

      return [];
    });

    const title = computed(() => last(navigations.value)?.label);
    const isAuthenticated = getters['meta/isAuthenticated'];

    function onClickBack() {
      //
    }

    function onClickFavorites() {
      if (isAuthenticated) {
        //
      }
    }

    function onClickNotifications() {
      //
    }

    function onClickNewWindow() {
      open(`/popup#${path}`);
    }

    function onClickHint() {
      //
    }

    return {
      navigations,
      title,
      onClickBack,
      onClickFavorites,
      onClickNotifications,
      onClickNewWindow,
      onClickHint,
    };
  },
};
</script>
