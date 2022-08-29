<template>
  <q-card
    ref="containerRef"
    class="kw-popup"
    :style="popupStyle"
    :class="popupClass"
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
      events: draggableEvents,
    } = useDraggable(containerRef);

    const popupTitle = computed(() => popupCtx.value.title?.value || popupCtx.value.page?.pageTitleMessageResourceId);

    const popupStyle = computed(() => [
      popupCtx.value.style,
      `transform: ${transform.value}`,
    ]);

    const popupClass = computed(() => [
      'kw-popup',
      !popupTitle.value && 'kw-popup--no-title',
      popupCtx.value.class,
    ]);

    const popupHeaderClass = computed(() => [
      'kw-popup__header',
      props.draggable && 'kw-popup__header--draggable',
    ]);

    return {
      ctx: popupCtx,
      close,
      error,
      resolve,
      containerRef,
      draggableEvents,
      popupTitle,
      popupStyle,
      popupClass,
      popupHeaderClass,
    };
  },
};
</script>
