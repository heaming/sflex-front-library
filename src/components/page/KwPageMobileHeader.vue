<template>
  <div class="kw-page-mobile-header">
    <kw-btn
      v-if="leftBtn === 'back'"
      class="kw-page-mobile-header__back-btn"
      icon="arrow_left_24"
      borderless
      @click="toggleExpanded"
    />
    <kw-btn
      v-if="leftBtn === 'menu'"
      class="kw-page-mobile-header__back-btn"
      icon="menu_24"
      borderless
      @click="toggleExpanded"
    />
    <h1
      class="kw-page-mobile-header__title"
    >
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        <slot>
          {{ title }}
        </slot>
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
        v-if="hint || $slots.hint"
        class="kw-page-mobile-header__hint"
        size="24px"
        name="info_24"
        :tooltip="hint"
      >
        <template
          v-if="$slots.hint"
          #default
        >
          <slot name="hint">
            {{ hint }}
          </slot>
        </template>
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
    <kw-btn
      v-if="showClose"
      class="kw-page-mobile-header__close"
      icon="close_24"
      borderless
      @click="$emit('close')"
    />
  </div>
</template>

<script>
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';
import useBookmark from './private/useBookmark';

export default {
  name: 'KwPageMobileHeader',
  props: {
    hint: { type: String, default: undefined },
    title: { type: String, default: undefined },
    leftBtn: { type: String, default: undefined },
    showClose: { type: Boolean, default: false },
  },
  emits: ['close'],
  setup() {
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
      ...useLeftDrawerExpand(),
      isBookmarked,
      onUpdateBookmark,
    };
  },
};
</script>
