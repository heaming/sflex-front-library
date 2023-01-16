<template>
  <q-footer
    v-if="showing"
    class="web-footer"
  >
    <!--  -->
  </q-footer>
</template>

<script>
import consts from '../../consts';

export default {
  name: 'WebFooter',

  setup() {
    const { currentRoute } = useRouter();
    const showing = computed(() => currentRoute.value.name === consts.ROUTE_HOME_NAME);

    return {
      showing,
    };
  },
};
</script>
