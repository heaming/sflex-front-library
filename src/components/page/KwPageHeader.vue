<template>
  <div>
    <div
      v-if="pageTitle || navigationTitle"
      class="kw-page-header"
    >
      <div class="kw-page-header__title">
        <kw-icon
          v-if="pageUseIsSub"
          size="24px"
          name="arrow_left_breadcrumbs_24"
          clickable
          @click="$router.close()"
        >
          {{ $t('MSG_BTN_BACK', null, '뒤로가기') }}
        </kw-icon>

        <h1>{{ pageTitle || navigationTitle }}</h1>
      </div>

      <div class="kw-page-header__tools">
        <kw-checkbox
          v-if="!pageUseIsSub && !noMenuPage"
          :model-value="isBookmarked"
          :true-value="true"
          :false-value="false"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_outline"
          @update:model-value="updateBookmark"
        >
          <kw-tooltip>
            {{ $t('MSG_TXT_BKMK', null, '즐겨찾기') }}
          </kw-tooltip>
        </kw-checkbox>

        <!-- 활성화 시 notice_on -->
        <kw-icon
          :name="showPageNotice && pageNoticeCntn ? 'notice_on' : 'notice_off'"
          clickable
          @click="showPageNotice = !showPageNotice"
        >
          {{ $t('MSG_TXT_BIZ_NOTICE') }}
        </kw-icon>

        <kw-icon
          :name="showPageManual ? 'report_on' : 'report'"
          clickable
          @click="onClickOpenManual"
        >
          {{ $t('MSG_TXT_MANU') }}
        </kw-icon>

        <kw-icon
          v-if="!isSubPage"
          name="new_window"
          clickable
          @click="openNewWindow()"
        >
          {{ $t('MSG_TXT_NEW_WINDOW', null, '새창으로 보기') }}
        </kw-icon>

        <!-- <kw-icon
          name="retry"
          clickable
          @click="reloadPage"
        >
          {{ '새로고침' }}
        </kw-icon> -->

        <span
          v-if="!env.isServer"
          style="color: transparent;"
        >
          {{ pageSource }}
        </span>
      </div>

      <q-space />
      <q-breadcrumbs
        v-if="!noMenuPage && !pageUseIsSub"
        class="kw-page-header__navigation"
      >
        <q-breadcrumbs-el
          v-for="(navigation) of navigations"
          :key="navigation.key"
          :label="navigation.label"
        >
          <!-- <kw-icon
            v-if="i === navigations.length - 1"
            clickable
          >
            {{ $t('MSG_BTN_HINT', null, '도움말 보기') }}
          </kw-icon> -->
        </q-breadcrumbs-el>
      </q-breadcrumbs>
    </div>
    <div
      v-if="pageNoticeCntn && showPageNotice"
      class="notice-popup"
    >
      <div class="notice-popup__inner">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="notice-popup__body"
          v-html="sanitize(pageNoticeCntn, { ADD_ATTR: ['target']})"
        />
        <!-- eslint-enable vue/no-v-html -->
      </div>
      <kw-btn
        borderless
        icon="close"
        text-color="bg-white"
        class="self-start"
        @click="showPageNotice = false"
      />
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash-es';
import { sanitize } from '../../plugins/sanitize';
import useBookmark from './private/useBookmark';
import useBreadcrumbNavigation, { useBreadcrumbNavigationProps } from './private/useBreadcrumbNavigation';
import useNewWindow from './private/useNewWindow';
import useHeaderMeta from './private/useHeaderMeta';
import env from '../../consts/private/env';
import { modal } from '../../plugins/modal';
import { alert } from '../../plugins/dialog';

export default {
  name: 'KwPageHeader',

  props: {
    ...useBreadcrumbNavigationProps,

    title: {
      type: String,
      default: undefined,
    },
    pageSource: {
      type: String,
      default: undefined,
    },
  },
  emits: ['reload-page'],
  async setup(props, { emit }) {
    const showPageNotice = ref(true);
    const showPageManual = ref(false);
    const { getPageManual } = useHeaderMeta();
    const { t } = useI18n();
    async function onClickOpenManual() {
      const manual = await getPageManual();
      if (isEmpty(manual)) {
        await alert(t('MSG_ALT_NO_MANUAL_PAGE'), { refocus: false });
        return;
      }

      showPageManual.value = true;
      await modal({
        component: 'ZwcmzPageManualDtlP',
        componentProps: { manual },
      });
      showPageManual.value = false;
    }

    function reloadPage() {
      emit('reload-page');
    }

    return {
      ...useBookmark(),
      ...useBreadcrumbNavigation(),
      ...useNewWindow(),
      ...useHeaderMeta(),
      env,
      showPageNotice,
      showPageManual,
      sanitize,
      onClickOpenManual,
      reloadPage,
    };
  },
};
</script>
