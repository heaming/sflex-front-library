<template>
  <kw-page no-header>
    <div
      class="column"
      style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;"
    >
      <q-card
        class="col row justify-center items-center"
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
          <div class="kw-fc--black3 mt20">
            <p v-if="isLocaleKo">
              화면을 호출할 수 없습니다. <br>
              문제가 지속되면, <br>
              시스템 담당자에게 문의 하세요. <br>
              (02-1234-1234)
            </p>
            <p v-else>
              A problem occurred while displaying the popup.<br>
              Please contact administrator.
            </p>
            <kw-btn
              dense
              border-color="line-stroke"
              text-color="black2"
              label="이전화면"
              class="mt20"
              @click="onClickGoBack"
            />
          </div>
        </div>
      </q-card>
    </div>
  </kw-page>
</template>

<script>
import consts from '../../consts';

export default {
  name: 'LoadFailedView',

  setup() {
    const { locale } = useI18n();
    const isLocaleKo = computed(() => locale.value === consts.LOCALE_KO);
    const router = useRouter();

    function onClickGoBack() {
      router.go(-1);
    }

    return {
      isLocaleKo,
      onClickGoBack,
    };
  },
};
</script>
