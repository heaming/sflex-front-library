<template>
  <q-card
    ref="containerRef"
    :style="[popupStyle, { transform }]"
    :class="[popupClass]"
  >
    <q-card-section
      v-bind="events"
      style="background: grey; touch-action: none;"
    >
      <div
        ref="headerRef"
        class="row justify-between"
      >
        <span class="text-bold">{{ popupTitle && $t(popupTitle) }}</span>
        <q-btn
          flat
          rounded
          icon="close"
          @mousedown.stop
          @touchstart.stop
          @click="close(false)"
        />
      </div>
    </q-card-section>
    <q-card-section>
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
