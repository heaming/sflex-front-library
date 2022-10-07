<template>
  <q-card
    v-show="isLoaded"
    ref="containerRef"
    class="kw-popup"
    :class="popupClass"
    :style="popupStyle"
    square
  >
    <q-card-section
      v-bind="draggableEvents"
      :class="popupHeaderClass"
    >
      <h1
        v-if="popupTitle"
        class="kw-popup__header-title"
      >
        {{ $t(popupTitle) }}
      </h1>
      <q-icon
        v-if="!popupNoCloseBtn"
        class="kw-popup__header-close"
        size="24px"
        name="close_24"
        @mousedown.stop
        @touchstart.stop
        @click="close(false)"
      />
    </q-card-section>

    <kw-suspense
      @resolve="onLoad"
      @error="onLoad"
    >
      <template #default>
        <slot />
      </template>
      <template #error>
        <load-failed-popup />
      </template>
    </kw-suspense>
  </q-card>
</template>

<script>
import { PopupContainerContextKey } from '../../consts/private/symbols';
import useDraggable, { useDraggableProps } from '../../composables/private/useDraggable';

import LoadFailedPopup from './LoadFailedPopup.vue';

export default {
  name: 'KwPopupContainer',
  components: { LoadFailedPopup },

  props: {
    ...useDraggableProps,
  },

  emits: [
    'resolve',
    'close',
  ],

  setup(props, { emit }) {
    const isLoaded = ref(false);
    const popupCtx = shallowRef({});

    function registerPopup(ctx) {
      popupCtx.value = ctx;
    }
    function unregisterPopup() {
      popupCtx.value = {};
    }
    function close(result, payload) {
      emit('close', { result, payload });
    }

    provide(PopupContainerContextKey, {
      registerPopup,
      unregisterPopup,
      close,
    });

    const containerRef = ref();
    const { transform, events: draggableEvents } = useDraggable(containerRef);

    const popupTitle = computed(() => popupCtx.value.title?.value || popupCtx.value.page?.pageTitleMessageResourceId);
    const popupNoCloseBtn = computed(() => popupCtx.value.noCloseBtn?.value);
    const popupSize = computed(() => popupCtx.value.size?.value);
    const popupStyle = computed(() => [popupCtx.value.style, `transform: ${transform.value}`]);
    const popupAction = computed(() => popupCtx.value.hasActionSlot?.value);

    const popupClass = computed(() => [
      !popupTitle.value && 'kw-popup--no-title',
      !popupAction.value && 'kw-popup--no-action',
      popupSize.value && `kw-popup--${popupSize.value}`,
      popupCtx.value.class,
    ]);

    const popupHeaderClass = computed(() => [
      'kw-popup__header',
      props.draggable && 'kw-popup__header--draggable',
    ]);

    function onLoad(e) {
      isLoaded.value = true;

      if (!(e instanceof Error)) {
        emit('resolve');
      }
    }

    return {
      isLoaded,
      ctx: popupCtx,
      close,
      containerRef,
      draggableEvents,
      popupTitle,
      popupStyle,
      popupClass,
      popupNoCloseBtn,
      popupHeaderClass,
      onLoad,
    };
  },
};
</script>
