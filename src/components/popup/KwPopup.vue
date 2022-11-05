<template>
  <q-card-section
    class="kw-popup__content"
  >
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

const sizeValues = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'];

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
    size: {
      type: String,
      default: 'md',
      validator: (v) => sizeValues.includes(v),
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    noTitle: {
      type: Boolean,
      default: false,
    },
    noCloseBtn: {
      type: Boolean,
      default: false,
    },
    onBeforeClose: {
      type: Function,
      default: undefined,
    },
  },

  async setup(props) {
    const { t } = useI18n();

    const pageCtx = usePage();
    const observerCtx = useObserver();

    const {
      registerPopup,
      unregisterPopup,
    } = inject(PopupContainerContextKey, () => {
      console.error('KwPopup needs to be child of KwPopupContainer');
    });

    const slots = useSlots();
    const popupCtx = {
      page: pageCtx,

      // do not set style to reactive
      // this occur maximum recursive updates exceeded
      style: props.style,
      class: props.class,

      // reactive attributes
      draggable: computed(() => props.draggable === true),
      size: computed(() => props.size),
      title: computed(() => (props.noTitle ? null : (props.title || t(pageCtx.pageTitleMessageResourceId || '')))),
      noCloseBtn: computed(() => props.noCloseBtn === true),
      noAction: computed(() => slots.action === undefined),
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
