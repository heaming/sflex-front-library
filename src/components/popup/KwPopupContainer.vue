<template>
  <q-card
    v-show="isLoaded || isLoadFailed"
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
        class="kw-popup__header-close"
        size="24px"
        name="close_24"
        @mousedown.stop
        @touchstart.stop
        @click="close(false)"
      />
    </q-card-section>

    <load-failed-popup
      v-if="isLoadFailed"
    />
    <suspense
      v-else
      :timeout="0"
      @resolve="onResolve"
    >
      <template #default>
        <slot />
      </template>
    </suspense>
  </q-card>
</template>

<script>
import { PopupContainerContextKey } from '../../consts/private/symbols';
import useDraggable, { useDraggableProps } from '../../composables/private/useDraggable';
import { loadSpinner } from '../../plugins/loading';
import consts from '../../consts';

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

    const isLoaded = ref(false);
    const isLoadFailed = ref(false);

    loadSpinner(true);
    function onResolve() {
      loadSpinner(false);
      isLoaded.value = true;
      emit('resolve', true);
    }
    onErrorCaptured(() => {
      if (!isLoaded.value) {
        loadSpinner(false);
        isLoadFailed.value = true;
      }
    });

    const containerRef = ref();
    const { transform, events: draggableEvents } = useDraggable(containerRef);

    const popupTitle = computed(() => popupCtx.value.title?.value || popupCtx.value.page?.pageTitleMessageResourceId);
    const popupSize = computed(() => popupCtx.value.size?.value);
    const popupStyle = computed(() => [
      popupCtx.value.style,
      `transform: ${transform.value}`,
    ]);
    const popupClass = computed(() => [
      !popupTitle.value && 'kw-popup--no-title',
      popupSize && `kw-popup--${popupSize.value}`,
      popupCtx.value.class,
    ]);
    const popupHeaderClass = computed(() => [
      'kw-popup__header',
      props.draggable && 'kw-popup__header--draggable',
    ]);

    return {
      ctx: popupCtx,
      close,
      isLoaded,
      isLoadFailed,
      onResolve,
      containerRef,
      draggableEvents,
      popupTitle,
      popupStyle,
      popupClass,
      popupHeaderClass,
      consts,
    };
  },
};
</script>
