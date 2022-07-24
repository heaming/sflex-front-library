<template>
  <slot />
</template>

<script>
import useObserver, { useObserverProps } from '../../composables/private/useObserver';

export default {
  name: 'KwObserver',

  props: {
    ...useObserverProps,
  },

  setup() {
    return useObserver();
  },
};
</script>
