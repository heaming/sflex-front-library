<template>
  <q-card
    v-show="!isLoading"
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
      <div class="row items-center">
        <h1
          v-if="popupTitle"
          class="kw-popup__header-title"
        >
          {{ popupTitle }}
        </h1>
        <kw-checkbox
          model-value="Y"
          checked-icon="bookmark_on"
          unchecked-icon="bookmark_off"
          class="kw-popup__header-favorite"
        >
          <kw-tooltip>
            {{ $t('MSG_BTN_FAVORITES', null, '즐겨찾기') }}
          </kw-tooltip>
        </kw-checkbox>
      </div>
      <q-icon
        v-if="isLoadFailed || popupUseClose"
        class="kw-popup__header-close"
        size="24px"
        name="close_24"
        @mousedown.stop
        @touchstart.stop
        @click="close(false)"
      />
    </q-card-section>

    <kw-suspense
      @resolve="onLoaded"
      @error="onLoadFailed"
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

    const containerRef = ref();
    const { transform, events: draggableEvents } = useDraggable(containerRef);

    const popupSize = computed(() => popupCtx.value.size?.value);
    const popupTitle = computed(() => popupCtx.value.title?.value);
    const popupUseClose = computed(() => popupCtx.value.noCloseBtn?.value === false);
    const popupUseAction = computed(() => popupCtx.value.noAction?.value === false);

    const popupStyle = computed(() => [popupCtx.value.style, `transform: ${transform.value}`]);
    const popupClass = computed(() => [
      popupSize.value && `kw-popup--${popupSize.value}`,
      !popupTitle.value && 'kw-popup--no-title',
      !popupUseAction.value && 'kw-popup--no-action',
      popupCtx.value.class,
    ]);

    const popupHeaderClass = computed(() => [
      'kw-popup__header',
      props.draggable && 'kw-popup__header--draggable',
    ]);

    const isLoading = ref(true);
    const isLoadFailed = ref(false);

    function onLoaded() {
      isLoading.value = false;
      emit('resolve', popupCtx.value);
    }

    function onLoadFailed() {
      isLoading.value = false;
      isLoadFailed.value = true;
    }

    return {
      ctx: popupCtx,
      close,
      containerRef,
      draggableEvents,
      popupTitle,
      popupUseClose,
      popupUseAction,
      popupStyle,
      popupClass,
      popupHeaderClass,
      isLoading,
      isLoadFailed,
      onLoaded,
      onLoadFailed,
    };
  },
};
</script>
