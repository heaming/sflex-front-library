<template>
  <q-page class="kw-page">
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

export default {
  name: 'KwPage',

  props: {
    ...useObserverProps,

    noHeader: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    usePage();
    usePageSearch();

    return {
      ...useObserver(),
    };
  },
};
</script>
