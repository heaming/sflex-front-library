<template>
  <q-card
    ref="containerRef"
    :style="[popupStyle, { transform }]"
    :class="['kw-popup', popupClass]"
  >
    <h1
      v-if="popupTitle"
      class="mt20"
    >
      {{ popupTitle && $t(popupTitle) }}
    </h1>
    <q-card-section class="popup-content">
      <div v-if="error">
        Failed to load
      </div>
      <suspense
        v-else
        :timeout="0"
        @resolve="resolve"
      >
        <template #default>
          <slot />
        </template>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    </q-card-section>
    <div class="row justify-center popup-action--wrap">
      <kw-btn
        class="kw-btn--negative kw-btn--h36"
        label="취소"
      />
      <kw-btn
        class="kw-btn--h36 ml8"
        label="확인"
      />
      <q-btn
        flat
        rounded
        icon="close_24"
        class="absolute-top-right popup-closer"
        :ripple="false"
        @mousedown.stop
        @touchstart.stop
        @click="close(false)"
      />
    </div>
  </q-card>
</template>

<script>
import { PopupContainerContextKey } from '../../consts/private/symbols';
import useDraggable, { useDraggableProps } from '../../composables/private/useDraggable';

export default {
  name: 'KwPopupContainer',

  props: {
    ...useDraggableProps,

    componentResolved: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['close', 'resolve'],

  setup(props, { emit }) {
    const popupCtx = shallowRef({});
    const popupStyle = computed(() => popupCtx.value.style);
    const popupClass = computed(() => popupCtx.value.class);
    const popupTitle = computed(() => popupCtx.value.title?.value || popupCtx.value.page?.pageTitleMessageResourceId);

    function register(ctx) {
      popupCtx.value = ctx;
    }

    function unregister() {
      popupCtx.value = {};
    }

    function close(result, payload) {
      emit('close', { result, payload });
    }

    provide(PopupContainerContextKey, {
      register,
      unregister,
      close,
    });

    let resolved = false;
    const error = ref(false);

    function resolve() {
      resolved = true;
      emit('resolve', true);
    }

    onErrorCaptured(() => {
      error.value = !resolved;
    });

    const containerRef = ref();

    const {
      transform,
      events,
    } = useDraggable(containerRef);

    return {
      ctx: popupCtx,
      popupTitle,
      popupStyle,
      popupClass,
      close,
      error,
      resolve,
      containerRef,
      transform,
      events,
    };
  },
};
</script>
