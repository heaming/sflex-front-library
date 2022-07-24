<template>
  <slot />
</template>

<script>
import { PopupContainerContextKey } from '../../consts/private/symbols';
import usePage from '../../composables/private/usePage';
import useObserver, { useObserverProps } from '../../composables/private/useObserver';

export default {
  name: 'KwPopup',
  inheritAttrs: false,

  props: {
    ...useObserverProps,

    style: {
      type: [String, Object, Array],
      default: undefined,
    },
    class: {
      type: [String, Object, Array],
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
  },

  setup(props) {
    const pageCtx = usePage();
    const observerCtx = useObserver();

    const {
      register: registerPopup,
      unregister: unregisterPopup,
    } = inject(PopupContainerContextKey, () => {
      console.error('KwPopup needs to be child of KwPopupContainer');
    });

    const popupCtx = {
      page: pageCtx,
      observer: observerCtx,
      title: toRef(props, 'title'),
      style: toRef(props, 'style'),
      class: toRef(props, 'class'),
    };

    registerPopup(popupCtx);

    onBeforeUnmount(() => {
      unregisterPopup();
    });

    return {
      ...observerCtx,
    };
  },
};
</script>
