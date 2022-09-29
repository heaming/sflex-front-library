<template>
  <q-scroll-area
    class="kw-popup--scroll"
  >
    <q-card-section
      class="kw-popup__content"
    >
      <slot />
    </q-card-section>
  </q-scroll-area>
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

const sizeValues = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'];

export default {
  name: 'KwPopup',
  inheritAttrs: false,

  props: {
    ...useObserverProps,

    size: {
      type: String,
      default: undefined,
      validator: (v) => sizeValues.includes(v),
    },
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
    onBeforeClose: {
      type: Function,
      default: undefined,
    },
  },

  async setup(props) {
    const pageCtx = usePage();
    const observerCtx = useObserver();

    const {
      registerPopup,
      unregisterPopup,
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
      size: computed(() => props.size),
      onBeforeClose: computed(() => props.onBeforeClose),
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
