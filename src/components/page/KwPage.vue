<template>
  <q-page
    class="kw-page"
    :style-fn="styleFn"
  >
    <slot
      v-if="!noHeader"
      name="header"
    >
      <kw-page-header
        v-if="$g.platform.is.desktop"
        class="kw-page__header"
        :title="title"
        :page-source="pageCtx.pageDestinationValue"
        @reload-page="reloadPage"
      />
      <kw-page-mobile-header
        v-else
        class="kw-page__header"
        :title="title"
      >
        <template
          v-if="$slots.more"
          #more
        >
          <slot name="more" />
        </template>
        <template
          v-if="$slots.etc"
          #etc
        >
          <slot name="etc" />
        </template>
      </kw-page-mobile-header>
    </slot>

    <div
      v-if="$slots['sub-header']"
      class="kw-page__sub-header"
    >
      <slot name="sub-header" />
    </div>

    <div
      ref="scrollTarget"
      class="kw-page__content"
    >
      <div
        v-if="$slots.default"
        class="kw-page__content-container"
      >
        <slot />
      </div>
      <q-scroll-observer
        v-if="infiniteIsEnabled"
        :scroll-target="scrollTarget"
        @scroll="onScroll"
      />
    </div>

    <div
      v-if="$slots.footer || $slots.action"
      class="kw-page__footer"
    >
      <slot name="footer" />
      <div
        v-if="$slots.action"
        class="kw-page__action"
      >
        <slot name="action" />
      </div>
    </div>
  </q-page>
</template>

<script>
import usePage from '../../composables/private/usePage';
import { loadSpinner } from '../../plugins/loading';
import useObserver, { useObserverProps } from '../../composables/private/useObserver';
import usePageSearch from '../../composables/private/usePageSearch';
import usePageUniqueId from '../../composables/private/usePageUniqueId';
import useInfiniteScroll, { useInfiniteScrollProps } from './private/useInfiniteScroll';

export default {
  name: 'KwPage',

  props: {
    ...useObserverProps,
    ...useInfiniteScrollProps,

    title: { type: String, default: undefined },
    noHeader: { type: Boolean, default: false },
  },
  emits: ['slot-re-render'],
  setup(props, { emit }) {
    const pageCtx = usePage();
    usePageSearch();
    usePageUniqueId();

    const styleFn = (offset, height) => {
      const el = document.querySelector('.web-tab-view > .web-tab-view__header');
      const additionalOffset = el?.clientHeight || 0;
      return { 'min-height': `${height - (offset + additionalOffset)}px` };
    };

    function reloadPage() {
      loadSpinner(true);
      setTimeout(() => {
        loadSpinner(false);
        emit('slot-re-render');
      }, 150);
    }

    return {
      ...useObserver(),
      ...useInfiniteScroll(),
      styleFn,
      pageCtx,
      reloadPage,
    };
  },
};
</script>
