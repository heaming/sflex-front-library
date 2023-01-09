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
          :model-value="isBookmarked"
          :true-value="true"
          :false-value="false"
          size="24px"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off"
          @update:model-value="updateBookmark"
        >
          <kw-tooltip>
            {{ $t('MSG_TXT_BKMK', null, '즐겨찾기') }}
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
import useBookmark from '../../composables/private/useBookmark';
import useHeaderMeta, { useHeaderMetaProps } from './private/useHeaderMeta';

export default {
  name: 'KwPageMobileHeader',

  props: {
    ...useHeaderMetaProps,
  },

  setup() {
    const { toggleExpanded } = useLeftDrawerExpand();

    return {
      ...useBookmark(),
      ...useHeaderMeta(),
      toggleExpanded,
    };
  },
};
</script>
