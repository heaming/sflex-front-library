<template>
  <q-page class="kw-page">
    <kw-page-header
      v-if="!noHeader"
    />

    <slot />
  </q-page>
</template>

<script>
import usePage from '../../composables/private/usePage';
import useObserver, { useObserverProps } from '../../composables/private/useObserver';

import KwPageHeader from './KwPageHeader.vue';

export default {
  name: 'KwPage',
  components: {
    KwPageHeader,
  },

  props: {
    ...useObserverProps,

    noHeader: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    usePage();

    return {
      ...useObserver(),
    };
  },
};
</script>
