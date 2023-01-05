<template>
  <div class="kw-page-mobile-header">
    <kw-btn
      v-if="pageTypeIsSub"
      class="kw-page-mobile-header__back-btn"
      icon="arrow_left_24"
      borderless
      @click="$router.back()"
    />
    <kw-btn
      v-else
      class="kw-page-mobile-header__back-btn"
      icon="menu_24"
      borderless
      @click="toggleExpanded()"
    />
    <h1 class="kw-page-mobile-header__title">
      <template v-if="pageTitle">
        {{ pageTitle }}
      </template>
    </h1>
    <div class="kw-page-mobile-header__tools">
      <div class="kw-page-mobile-header__bookmark">
        <kw-checkbox
          size="24px"
          :model-value="isBookmarked ? 'Y' : 'N'"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off"
          @update:model-value="onUpdateBookmark"
        >
          <kw-tooltip>
            {{ $t('MSG_TXT_BKMK') }}
          </kw-tooltip>
        </kw-checkbox>
      </div>
      <kw-icon
        class="kw-page-mobile-header__hint"
        size="24px"
        name="info_24"
        clickable
      >
        {{ $t('MSG_BTN_HINT', null, '도움말 보기') }}
      </kw-icon>
    </div>

    <div
      v-if="$slots.etc"
      class="kw-page-mobile-header__etc"
    >
      <slot name="etc" />
    </div>
    <kw-btn-dropdown
      v-if="$slots.more"
      class="kw-page-mobile-header__more"
      borderless
      dropdown-icon="more"
    >
      <slot name="more" />
    </kw-btn-dropdown>
  </div>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';
import useBookmark from './private/useBookmark';
import useHeaderMeta, { useHeaderMetaProps } from './private/useHeaderMeta';

export default {
  name: 'KwPageMobileHeader',

  props: {
    ...useHeaderMetaProps,
  },

  setup() {
    const { getters } = useStore();
    const isAuthenticated = getters['meta/isAuthenticated'];

    const { toggleExpanded } = useLeftDrawerExpand();

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
      ...useHeaderMeta(),
      toggleExpanded,
      isBookmarked,
      onUpdateBookmark,
    };
  },
};
</script>
