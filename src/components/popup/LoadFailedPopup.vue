<template>
  <q-card-section>
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
</template>

<script>
import consts from '../../consts';

export default {
  name: 'LoadFailedPopup',

  setup() {
    return {
      consts,
    };
  },
};
</script>
