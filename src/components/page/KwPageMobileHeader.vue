<template>
  <div class="kw-page-mobile-header">
    <kw-btn
      v-if="pageUseIsSub"
      class="kw-page-mobile-header__back-btn"
      icon="arrow_left_24"
      borderless
      @click="$router.close()"
    />
    <h1 class="kw-page-mobile-header__title">
      <template v-if="pageTitle">
        {{ pageTitle }}
      </template>
    </h1>
    <div
      v-if="portalId && portalId !== 'NO_SESSION' && !pageUseIsSub"
      class="kw-page-mobile-header__tools"
    >
      <div class="kw-page-mobile-header__bookmark">
        <kw-checkbox
          :model-value="isBookmarked"
          :true-value="true"
          :false-value="false"
          size="16px"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_outline"
          @update:model-value="updateBookmark"
        />
        <kw-icon
          name="report"
          class="ml9"
          :clickable="pageManual"
          :disable="!pageManual"
          :style="{ opacity: pageManual ? '1 !important' : '0.3 !important' }"
          @click="onClickOpenManual"
        >
          {{ $t('MSG_TXT_MANU') }}
        </kw-icon>
      </div>
    </div>

    <div class="q-space" />

    <div
      v-if="$slots.etc"
      class="kw-page-mobile-header__etc"
    >
      <slot name="etc" />
    </div>
    <kw-btn-dropdown
      v-if="$slots.more"
      class="kw-page-mobile-header__more kw-font-pt24"
      borderless
      dropdown-icon="more_24"
    >
      <slot name="more" />
    </kw-btn-dropdown>
    <!-- nosession 일 경우 오른쪽에 교원 로고 띄우기 -->
    <div
      v-if="portalId && portalId === 'NO_SESSION'"
      class="kw-page-mobile-header__logo"
    />
    <!-- WAPPLE 인 경우에만 X버튼 뜨도록 설정 -->
    <div
      v-if="portalId === 'MBL_DEF' && tenantId === 'TNT_EDU'"
      class="kw-page-mobile-header__etc"
    >
      <kw-icon
        class="kw-popup__header-close"
        size="24px"
        name="close_24"
        clickable
        @mousedown.stop
        @touchstart.stop
        @click="onClickClose"
      />
    </div>
  </div>
</template>

<script>
import { closeWaffleApp } from '../../utils/mobile';
import useBookmark from './private/useBookmark';
import useHeaderMeta, { useHeaderMetaProps } from './private/useHeaderMeta';
import { modal } from '../../plugins/modal';

export default {
  name: 'KwPageMobileHeader',

  props: {
    ...useHeaderMetaProps,
  },

  setup() {
    function onClickClose() {
      closeWaffleApp();
    }
    const { getPageManual, pageManual } = useHeaderMeta();
    async function onClickOpenManual() {
      if (!pageManual) return;
      const manual = await getPageManual(true);

      await modal({
        component: 'ZmcmxPageManualDtlP',
        componentProps: { manual },
      });
    }

    return {
      onClickClose,
      ...useBookmark(),
      ...useHeaderMeta(),
      onClickOpenManual,
      pageManual,
    };
  },
};
</script>
