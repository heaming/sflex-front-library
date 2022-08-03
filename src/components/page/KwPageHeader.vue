<template>
  <div class="kw-page-header">
    <div
      v-if="heading"
      class="kw-page-header-title_area"
    >
      <button
        type="button"
        class="kw-page-header-btn_back"
      >
        이전
      </button>
      <h1>{{ breadcrumbs[Object.keys(breadcrumbs).length - 1].label }}</h1>
      <button
        type="button"
        class="kw-page-header-favorite kw-page-header-favorite_on"
      >
        즐겨찾기
      </button>
    </div>
    <q-breadcrumbs
      align="right"
    >
      <q-breadcrumbs-el
        v-for="(breadcrumb, i) of breadcrumbs"
        :key="breadcrumb.key"
        :label="breadcrumb.label"
      >
        <button
          v-if="Object.keys(breadcrumbs).length - 1 == i"
          type="button"
          class="breadcrumbs-hint"
        >
          Hint
        </button>
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </div>
</template>

<script>
import { find } from 'lodash-es';

function creataBreadcrumbs(menus, menuUid) {
  const matched = find(menus, ['menuUid', menuUid]);

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
    heading: {
      type: Boolean,
      default: false,
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

      const {
        applicationId,
        menuUid,
      } = find(menus, ['menuUid', currentRoute.value.name]) || {};

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

    return {
      breadcrumbs,
    };
  },
};
</script>
