<template>
  <div>
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
      { key: menuUid, label: matched.menuName },
    ];
  }

  return [];
}

export default {
  name: 'KwPageHeader',

  setup() {
    const { getters } = useStore();
    const { currentRoute } = useRouter();

    const breadcrumbs = ref([]);

    const menus = getters['meta/getMenus'];
    const { applicationId, menuUid } = find(menus, ['menuUid', currentRoute.value.name]) || {};

    if (applicationId) {
      const app = getters['meta/getApp'](applicationId);

      breadcrumbs.value = [
        { key: applicationId, label: app.applicationName },
        ...creataBreadcrumbs(menus, menuUid),
      ];
    }

    return {
      breadcrumbs,
    };
  },
};
</script>
