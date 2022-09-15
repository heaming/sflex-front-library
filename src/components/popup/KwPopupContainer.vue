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
    <q-card-section
      v-if="isLoadFailed"
    >
      <div class="row justify-center">
        <q-icon
          class="full-width"
          size="40px"
          name="info_24"
        />
        <div class="text-center mt5">
          <p v-if="$i18n.locale === consts.LOCALE_KO">
            팝업을 표시하는 도중 문제가 발생했습니다.<br>
            관리자에게 문의하시기 바랍니다.
          </p>
          <p v-else>
            A problem occurred while displaying the popup.<br>
            Please contact administrator.
          </p>
        </div>
      </div>
    </q-card-section>
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

export default {
  name: 'KwPopupContainer',

  props: {
    ...useDraggableProps,

    componentResolved: {
      type: Boolean,
      default: false,
    },
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

    const {
      transform,
      events: draggableEvents,
    } = useDraggable(containerRef);

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
