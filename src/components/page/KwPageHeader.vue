<template>
  <div class="kw-page-header">
    <q-breadcrumbs
      align="right"
      separator=">"
    >
      <q-breadcrumbs-el
        v-for="breadcrumb of breadcrumbs"
        :key="breadcrumb.key"
        :label="breadcrumb.label"
      />
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
