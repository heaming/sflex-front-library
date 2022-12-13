<template>
  <q-page
    class="kw-page"
    :style-fn="styleFn"
  >
    <slot
      v-if="!noHeader"
      name="header"
    >
      <kw-page-mobile-header
        v-if="$g.platform.is.mobile"
        class="kw-page__header"
        :hint="hint"
        :title="'TITLE'"
      >
        <template
          v-if="$slots.more"
          #more
        >
          <slot name="more" />
        </template>
      </kw-page-mobile-header>
      <kw-page-header
        v-else
        class="kw-page__header"
      />
    </slot>

    <div
      v-if="$slots['sub-header']"
      class="kw-page__sub-header"
    >
      <slot name="sub-header" />
    </div>

    <div
      class="kw-page__content"
    >
      <div
        v-if="$slots.default"
        class="kw-page__content-container"
      >
        <slot />
      </div>
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
        <slot
          name="action"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import usePage from '../../composables/private/usePage';
import useObserver, { useObserverProps } from '../../composables/private/useObserver';
import usePageSearch from '../../composables/private/usePageSearch';

export default {
  name: 'KwPage',

  props: {
    ...useObserverProps,

    noHeader: { type: Boolean, default: false },
    hint: { type: String, default: undefined },
  },

  setup() {
    usePage();
    usePageSearch();

    const styleFn = (offset, height) => {
      const el = document.querySelector('.web-tab-view > .web-tab-view__header');
      const additionalOffset = el?.clientHeight || 0;
      return { 'min-height': `${height - (offset + additionalOffset)}px` };
    };

    return {
      ...useObserver(),
      styleFn,

    };
  },
};
</script>
