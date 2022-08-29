<template>
  <q-card-section class="kw-popup__content">
    <slot />
  </q-card-section>
  <q-card-section
    v-if="$slots.action"
    class="kw-popup__action"
  >
    <slot name="action" />
  </q-card-section>
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

      // do not set style to reactive
      // this occur maximum recursive updates exceeded
      style: props.style,
      class: props.class,
      title: computed(() => props.title),
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
