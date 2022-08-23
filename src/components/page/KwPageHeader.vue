<template>
  <div class="kw-page-header">
    <div
      v-if="heading"
      class="kw-page-header-title_area"
    >
      <q-icon
        size="24px"
        class="mr6"
        name="arrow_left_breadcrumbs_24"
        @click="onClickBack"
      >
        <kw-tooltip>
          {{ $t('MSG_BTN_BACK', null, '뒤로가기') }}
        </kw-tooltip>
      </q-icon>
      <h1>{{ heading }}</h1>
      <kw-checkbox
        size="46px"
        model-value="Y"
        checked-icon="bookmark_on_16"
        unchecked-icon="bookmark_off_16"
        class="mr0 mt3"
      >
        <kw-tooltip>
          {{ $t('MSG_BTN_FAVORITES', null, '즐겨찾기') }}
        </kw-tooltip>
      </kw-checkbox>
      <kw-btn
        icon="alert_16|0 0 16 16"
        class="btn-icon--bell pa0"
      />
    </div>
    <q-breadcrumbs align="right">
      <q-breadcrumbs-el
        v-for="(breadcrumb, i) of breadcrumbs"
        :key="breadcrumb.key"
        :label="breadcrumb.label"
      >
        <button
          v-if="i === breadcrumbs.length - 1"
          type="button"
          class="breadcrumbs-hint"
          @click="onClickHint"
        >
          <kw-tooltip>
            {{ $t('MSG_BTN_HINT', null, '도움말 보기') }}
          </kw-tooltip>
        </button>
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </div>
</template>

<script>
import { find, last } from 'lodash-es';
import KwBtn from '../btn/KwBtn.vue';

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
  components: { KwBtn },

  props: {
    options: {
      type: Array,
      default: undefined,
    },
  },
  setup(props) {
    const { getters } = useStore();
    const { currentRoute } = useRouter();

    const breadcrumbs = ref([]);
    const options = toRef(props, 'options');

    if (Array.isArray(options.value)) {
      breadcrumbs.value = options.value.map((v) => ({ key: v, label: v }));
    } else {
      const menus = getters['meta/getMenus'];
      const { applicationId, menuUid } = find(menus, ['menuUid', currentRoute.value.name]) || {};

      if (applicationId) {
        const app = getters['meta/getApp'](applicationId);
        breadcrumbs.value = [
          {
            key: applicationId,
            label: app.applicationName,
          },
          ...creataBreadcrumbs(menus, menuUid),
        ];
      }
    }
    const heading = computed(() => last(breadcrumbs.value)?.label);
    const isAuthenticated = getters['meta/isAuthenticated'];

    function onClickBack() {
      //
    }

    function onClickFavorites() {
      if (isAuthenticated) {
        //
      }
    }

    function onClickHint() {
      //
    }

    return {
      breadcrumbs,
      heading,
      onClickBack,
      onClickFavorites,
      onClickHint,
    };
  },
};
</script>
