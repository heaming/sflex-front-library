<template>
  <kw-suspense @resolve="onResolve">
    <template #default>
      <slot />
    </template>
    <template #error>
      <load-failed-popup />
    </template>
  </kw-suspense>
</template>

<script>
import { PopupContainerContextKey } from '../../consts/private/symbols';

import LoadFailedPopup from './LoadFailedPopup.vue';

export default {
  name: 'KwPopupContainer',
  components: { LoadFailedPopup },

  emits: [
    'close',
    'resolve',
  ],

  setup(props, { emit }) {
    const popupCtx = shallowRef({});

    function registerPopup(ctx) {
      popupCtx.value = ctx;
    }
    function unregisterPopup() {
      popupCtx.value = {};
    }
    function close(result, payload) {
      // resolve occurred errors in grid event chaining that caused by destroy instance
      setTimeout(() => {
        emit('close', { result, payload });
      });
    }

    provide(PopupContainerContextKey, {
      registerPopup,
      unregisterPopup,
      close,
    });

    function onResolve() {
      emit('resolve', popupCtx.value);
    }

    return {
      onResolve,
    };
  },
};
</script>
