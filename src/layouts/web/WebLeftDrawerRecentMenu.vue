<template>
  <div class="web-left-drawer__recent-menu drawer-recent-menu">
    <web-left-drawer-title
      :title="$t('MSG_TXT_RECENT_MENU')"
    />

    <kw-scroll-area>
      <div class="drawer-recent-menu__action">
        <kw-btn
          dense
          icon="delete"
          no-wrap
          :disable="menus.length === 0"
          :label="$t('MSG_BTN_DEL_ALL')"
          border-color="line-line"
          @click="onClickDeleteAll"
        />
      </div>

      <q-list class="drawer-recent-menu__list">
        <template
          v-for="(menu, i) in menus"
          :key="i"
        >
          <q-separator
            v-if="i !== 0 && needsHeader(menu, i)"
          />
          <q-item-label
            v-if="needsHeader(menu, i)"
            header
            class="px20"
          >
            {{ normalizeHeader(menu.menuLogDate) }}
          </q-item-label>
          <q-item
            clickable
            :active="isActiveItem(menu)"
            class="px20"
            @click="onClickItem(menu)"
          >
            <q-item-section>
              <q-item-label>
                <div class="ellipsis">
                  {{ menu.menuName }}
                  <kw-tooltip
                    show-when-ellipsised
                    anchor="center right"
                    self="center start"
                    class="lnb_tooltip lnb_depth_tooltip"
                  >
                    {{ menu.menuName }}
                  </kw-tooltip>
                </div>
              </q-item-label>
              <q-item-label caption>
                {{ menu.menuPath }}
              </q-item-label>
            </q-item-section>
            <q-item-section
              side
              top
            >
              <q-icon
                name="delete"
                @click.stop="onClickDelete(menu)"
              />
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </kw-scroll-area>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { pick, isEqual } from 'lodash-es';
import { isNavigationFailure } from 'vue-router';
import { http } from '../../plugins/http';
import { alert, confirm } from '../../plugins/dialog';
import { notify } from '../../plugins/notify';
import WebLeftDrawerTitle from './WebLeftDrawerTitle.vue';

export default {
  name: 'WebLeftDrawerRecentMenu',
  components: {
    WebLeftDrawerTitle,
  },

  async setup() {
    const { t } = useI18n();
    const { getters, dispatch } = useStore();
    const { push } = useRouter();

    const menus = computed(() => getters['meta/getRecentMenus']);
    const selected = ref({});

    const needsHeader = (menu, i) => i === 0 || (menu.menuLogDate !== menus.value[i - 1].menuLogDate);
    const normalizeHeader = (menuLogDate) => {
      const logday = dayjs(menuLogDate, 'YYYYMMDD').format('YYYY-MM-DD');
      const today = dayjs().format('YYYY-MM-DD');
      const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

      if (logday === today) {
        return `${logday} ${t('MSG_TXT_TODAY')}`;
      }
      if (logday === yesterday) {
        return `${logday} ${t('MSG_TXT_YESTERDAY')}`;
      }
      return logday;
    };

    const activeCompareKeys = ['menuLogDate', 'menuUid'];
    const isActiveItem = (menu) => isEqual(pick(menu, activeCompareKeys), pick(selected.value, activeCompareKeys));

    async function onClickItem({ menuLogDate, menuUid }) {
      selected.value = { menuLogDate, menuUid };

      try {
        await push({ name: menuUid });
      } catch (e) {
        if (isNavigationFailure(e, 1)) { // matcher not found
          await alert(t('MSG_ALT_PAGE_NOT_FOUND'));
        } else {
          throw e;
        }
      }
    }

    function deleteRecentMenus(deleteMenus) {
      return http.delete('/sflex/common/common/portal/recent-menus', { data: deleteMenus });
    }

    function deleteRecentMenu(menuLogDate, menuUid) {
      return http.delete(`/sflex/common/common/portal/recent-menu/${menuLogDate}/${menuUid}`);
    }

    async function onClickDeleteAll() {
      if (!await confirm(t('MSG_ALT_WANT_DEL'))) return;

      const deleteMenus = menus.value.map(({ menuLogDate, menuUid }) => ({ menuLogDate, menuUid }));
      await deleteRecentMenus(deleteMenus);
      await dispatch('meta/fetchRecentMenus');

      notify(t('MSG_ALT_DELETED'));
    }

    async function onClickDelete({ menuLogDate, menuUid }) {
      if (!await confirm(t('MSG_ALT_WANT_DEL'))) return;

      await deleteRecentMenu(menuLogDate, menuUid);
      await dispatch('meta/fetchRecentMenus');

      notify(t('MSG_ALT_DELETED'));
    }

    await dispatch('meta/fetchRecentMenus');

    return {
      menus,
      selected,
      needsHeader,
      normalizeHeader,
      isActiveItem,
      onClickItem,
      onClickDeleteAll,
      onClickDelete,
    };
  },
};
</script>

<style scoped lang="scss">
 </style>
