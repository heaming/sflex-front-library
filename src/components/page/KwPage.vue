<template>
  <q-page
    class="kw-page"
    :class="pageClass"
    :style-fn="styleFn"
  >
    <slot
      v-if="!noHeader"
      name="header"
    >
      <kw-page-header />
    </slot>

    <slot />
  </q-page>
</template>

<script>
import usePage from '../../composables/private/usePage';
import useObserver, { useObserverProps } from '../../composables/private/useObserver';
import usePageSearch from '../../composables/private/usePageSearch';

const sizeValues = ['sm', 'md'];

export default {
  name: 'KwPage',

  props: {
    ...useObserverProps,

    size: {
      type: String,
      default: undefined,
      validator: (v) => sizeValues.includes(v),
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    usePage();
    usePageSearch();

    const styleFn = (offset, height) => {
      const el = document.querySelector('.app-view .tabs-view__header');
      const additionalOffset = el?.clientHeight || 0;
      return { 'min-height': `${height - (offset + additionalOffset)}px` };
    };

    const pageClass = computed(() => [
      props.size && `kw-popup--${props.size}`,
    ]);

    return {
      ...useObserver(),
      styleFn,
      pageClass,
    };
  },
};
</script>
