<template>
  <q-card
    ref="containerRef"
    :style="popupStyle"
    :class="popupClass"
    square
  >
    <q-card-section
      v-if="!noHeader"
      :class="headerClass"
      v-bind="draggableEvents"
    >
      <div class="row items-center">
        <h1
          v-if="title !== false"
          class="kw-popup__header-title"
        >
          {{ title || pageCtxTitle }}
        </h1>
        <!-- <kw-checkbox
          v-if="isBookmarkable"
          :model-value="isBookmarked"
          :true-value="true"
          :false-value="false"
          class="kw-popup__header-bookmark"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off"
          @update:model-value="updateBookmark"
        >
          <kw-tooltip>
            {{ $t('MSG_BTN_FAVORITES', null, '즐겨찾기') }}
          </kw-tooltip>
        </kw-checkbox> -->
      </div>
      <kw-icon
        v-if="noCloseBtn === false"
        class="kw-popup__header-close"
        size="24px"
        name="close_24"
        @mousedown.stop
        @touchstart.stop
        @click="onClickClose"
      />
    </q-card-section>
    <q-card-section
      ref="scrollTarget"
      class="kw-popup__content scroll"
    >
      <slot />
      <q-scroll-observer
        v-if="infiniteIsEnabled || !$g.platform.is.desktop"
        :scroll-target="$g.platform.is.mobile ? containerRef : scrollTarget"
        @scroll="(evt) => onScroll(evt, $g.platform.is.mobile ? containerRef : scrollTarget)"
      />
    </q-card-section>
    <transition name="fade">
      <q-card-section
        v-if="showFloatingBtn && !$g.platform.is.desktop"
        ref="floatingBtnRef"
        style="position: sticky; bottom: 78px; text-align: right;"
      >
        <q-btn
          fab
          class="top_btn"
          icon="top_btn"
          label="TOP"
          style="right: 18px;"
          @click="(evt) => moveToPageTop(evt, containerRef)"
        />
      </q-card-section>
    </transition>
    <q-card-section
      v-if="$slots.action"
      class="kw-popup__action"
    >
      <slot name="action" />
    </q-card-section>
  </q-card>
</template>

<script>
import { PopupContainerContextKey } from '../../consts/private/symbols';
import usePage from '../../composables/private/usePage';
import usePageSearch from '../../composables/private/usePageSearch';
import usePageUniqueId from '../../composables/private/usePageUniqueId';
import useObserver, { useObserverProps } from '../../composables/private/useObserver';
import useDraggable, { useDraggableProps } from '../../composables/private/useDraggable';
import useBookmark from './private/useBookmark';
import useInfiniteScroll, { useInfiniteScrollProps } from '../page/private/useInfiniteScroll';

const sizeValues = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];

export default {
  name: 'KwPopup',
  inheritAttrs: false,

  props: {
    ...useObserverProps,
    ...useDraggableProps,
    ...useInfiniteScrollProps,

    style: { type: [String, Object, Array], default: undefined },
    class: { type: [String, Object, Array], default: undefined },
    size: { type: String, default: 'md', validator: (v) => sizeValues.includes(v) },
    title: { type: [Boolean, String], default: undefined },
    noCloseBtn: { type: Boolean, default: false },
    onBeforeClose: { type: Function, default: undefined },
    noHeader: { type: Boolean, default: false },
    noTitle: { type: Boolean, default: false },
  },

  setup(props) {
    const {
      registerPopup,
      unregisterPopup,
      close,
    } = inject(PopupContainerContextKey, () => {
      console.error('KwPopup needs to be child of KwPopupContainer');
    });

    const { t } = useI18n();
    const pageCtx = usePage();
    const pageCtxTitle = t(pageCtx.pageTitleMessageResourceId || '');

    const popupCtx = {
      page: pageCtx,
      onBeforeClose: computed(() => props.onBeforeClose),
    };
    const infiniteScroll = useInfiniteScroll();
    registerPopup(popupCtx);

    onBeforeUnmount(() => {
      unregisterPopup();
    });

    const {
      transform,
      events: draggableEvents,
    } = useDraggable(infiniteScroll.containerRef);

    const headerClass = computed(() => ({
      'kw-popup__header': true,
      'kw-popup__header--draggable': props.draggable === true,
    }));

    const popupStyle = computed(() => [
      `transform: ${transform.value}`,
      props.style,
    ]);

    const slots = useSlots();
    const popupClass = computed(() => [
      {
        'kw-popup': true,
        [`kw-popup--${props.size}`]: true,
        'kw-popup--no-title': props.title === false || props.noTitle === true,
        'kw-popup--no-action': slots.action === undefined,
      },
      props.class,
    ]);

    function onClickClose() {
      close(false);
    }

    usePageSearch();
    usePageUniqueId();

    return {
      ...useObserver(),
      ...useDraggable(),
      ...useBookmark(pageCtx),
      ...infiniteScroll,
      pageCtxTitle,
      draggableEvents,
      headerClass,
      popupStyle,
      popupClass,
      onClickClose,
    };
  },
};
</script>
