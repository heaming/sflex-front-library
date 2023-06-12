<template>
  <kw-page
    class="column"
    no-header
  >
    <q-card
      class="col row justify-center items-center h500"
      flat
      square
    >
      <div class="text-center">
        <kw-avatar
          size="60px"
          font-size="36px"
          color="bg-box"
          icon="visual_info"
        />
        <div class="mt16 kw-font-pt16">
          <p v-if="isLocaleKo">
            페이지를 표시하는 도중 문제가 발생했습니다.<br>
            관리자에게 문의하시기 바랍니다.
          </p>
          <p v-else>
            A problem occurred while displaying the popup.<br>
            Please contact administrator.
          </p>
        </div>
      </div>
    </q-card>
  </kw-page>
</template>

<script>
import consts from '../../consts';

export default {
  name: 'LoadFailedView',

  setup() {
    const { locale } = useI18n();
    const isLocaleKo = computed(() => locale.value === consts.LOCALE_KO);

    return {
      isLocaleKo,
    };
  },
};
</script>
