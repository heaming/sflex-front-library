<template>
  <q-header class="dev-gnb">
    <q-toolbar>
      <a class="gnb-logo">
        <slot name="logo">
          DEV
        </slot>
      </a>

      <div class="gnb__link-container">
        <a
          v-for="{key, label} of gnbMenus"
          :key="key"
          class="gnb-link"
          :class="{'gnb-link--active': isSelected(key)}"
          @click="updateSelected(key)"
        >
          {{ label }}
        </a>
      </div>

      <q-space />

      <div class="row justify-end items-center item-wrap">
        <div class="item">
          <kw-btn-toggle
            v-model="layoutStyle"
            :options="['Web', 'Mobile', 'Tablet']"
          />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import useGnbMenus from '../../composables/private/useGnbMenus';

export default {
  name: 'DevGnb',

  setup() {
    const layoutStyle = ref('Web');

    watch(layoutStyle, (val) => {
      const bodyClassList = document.body.classList;
      bodyClassList.remove('desktop', 'mobile', 'tablet');

      if (val === 'Mobile') {
        bodyClassList.add('mobile');
      } else if (val === 'Tablet') {
        bodyClassList.add('mobile', 'tablet');
      } else {
        bodyClassList.add('desktop');
      }
    }, { immediate: true });

    return {
      ...useGnbMenus(),
      layoutStyle,
    };
  },
};
</script>
