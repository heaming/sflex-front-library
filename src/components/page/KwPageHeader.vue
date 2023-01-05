<template>
  <div
    v-if="pageTitle || navigationTitle"
    class="kw-page-header"
  >
    <div class="kw-page-header__title">
      <kw-icon
        v-if="pageTypeIsSub"
        size="24px"
        name="arrow_left_breadcrumbs_24"
        clickable
        @click="$router.back()"
      >
        {{ $t('MSG_BTN_BACK', null, '뒤로가기') }}
      </kw-icon>

      <h1>{{ pageTitle || navigationTitle }}</h1>
    </div>

    <div class="kw-page-header__tools">
      <kw-checkbox
        :model-value="isBookmarked ? 'Y' : 'N'"
        checked-icon="bookmark_on"
        unchecked-icon="bookmark_off"
        @update:model-value="onUpdateBookmark"
      >
        <kw-tooltip>
          {{ $t('MSG_TXT_BKMK', null, '즐겨찾기') }}
        </kw-tooltip>
      </kw-checkbox>

      <kw-icon
        name="alert_on"
        clickable
      >
        {{ $t('MSG_TXT_NTC') }}
      </kw-icon>

      <kw-icon
        name="new_window"
        clickable
        @click="openNewWindow()"
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
          v-if="i === navigations.length - 1"
          clickable
        >
          {{ $t('MSG_BTN_HINT', null, '도움말 보기') }}
        </kw-icon>
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </div>
</template>

<script>
import useBreadcrumbNavigation, { useBreadcrumbNavigationProps } from './private/useBreadcrumbNavigation';
import useBookmark from './private/useBookmark';
import useNewWindow from './private/useNewWindow';
import useHeaderMeta from './private/useHeaderMeta';

export default {
  name: 'KwPageHeader',

  props: {
    ...useBreadcrumbNavigationProps,

    title: {
      type: String,
      default: undefined,
    },
  },

  async setup() {
    const { getters } = useStore();
    const isAuthenticated = getters['meta/isAuthenticated'];

    const {
      isBookmarked,
      fetchBookmark,
      createBookmark,
      deleteBookmark,
    } = useBookmark();

    if (isAuthenticated) fetchBookmark();

    async function onUpdateBookmark(val) {
      if (isAuthenticated) {
        const isCreate = val === 'Y';

        if (isCreate) {
          await createBookmark();
        } else {
          await deleteBookmark();
        }
      }
    }

    return {
      ...useBreadcrumbNavigation(),
      ...useNewWindow(),
      ...useHeaderMeta(),
      isBookmarked,
      onUpdateBookmark,
    };
  },
};
</script>
