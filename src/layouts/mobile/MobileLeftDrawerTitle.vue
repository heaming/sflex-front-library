<template>
  <div class="mobile-left-drawer__title">
    <div>
      <slot>
        <div @click.stop="openSetSessionP">
          <h1>
            {{ title }}
          </h1>
        </div>
      </slot>
    </div>

    <kw-icon
      class="mobile-left-drawer__btn"
      name="arrow_prev"
      size="16px"
      clickable
      @click="setExpanded(false)"
    />
  </div>
</template>

<script>
import { modal } from '../../plugins/modal';
import useLeftDrawerExpand from '../../composables/private/useLeftDrawerExpand';

export default {
  name: 'MobileLeftDrawerTitle',

  props: {
    title: {
      type: String,
      default: undefined,
    },
  },

  setup() {
    async function openSetSessionP() {
      modal({
        component: () => import('../../pages/web/WebSessionSettingP.vue'),
      });
    }
    return {
      ...useLeftDrawerExpand(),
      openSetSessionP,
    };
  },
};
</script>
