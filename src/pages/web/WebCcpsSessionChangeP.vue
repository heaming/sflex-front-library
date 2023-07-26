<template>
  <kw-popup
    title="로그인 계정"
    size="xs"
  >
    <kw-form cols="1">
      <kw-form-row>
        <kw-form-item label="로그인 계정">
          <p>강남총괄단(총괄단장)</p>
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item label="접속계정 변경">
          <kw-select
            v-model="selectedCcps"
            class="kw-select--rows-per-page"
            :options="ccpsInfoList"
            option-value="userId"
            option-label="ccpsNm"
          />
        </kw-form-item>
      </kw-form-row>
    </kw-form>
    <ul class="kw-notification mt20">
      <li>
        접속 중인 로그인 계정을 변경하실 경우, 확인 중인 업무화면 탭이 모두 종료됩니다.
      </li>
    </ul>

    <template #action>
      <kw-btn
        filled
        negative
        label="취소"
        @click="onClickClose"
      />
      <kw-btn
        filled
        primary
        label="확인"
        @click="onClickConfirm"
      />
    </template>
  </kw-popup>
</template>

<script setup>
// -------------------------------------------------------------------------------------------------
// Import & Declaration
// -------------------------------------------------------------------------------------------------
import { http } from '../../plugins/http';
import useModal from '../../composables/useModal';
import useMeta from '../../composables/useMeta';
import { localStorage } from '../../plugins/storage';
import consts from '../../consts';
import useSession from '../../composables/useSession';
import { confirm } from '../../plugins/dialog';

const { ok, cancel } = useModal();
const { ccpsInfoList } = useMeta().getUserInfo();
const { t } = useI18n();
const selectedCcps = ref('');

const {
  initSession,
} = useSession();

// -------------------------------------------------------------------------------------------------
// Function & Event
// -------------------------------------------------------------------------------------------------

async function onClickClose() {
  await cancel();
}

async function onClickConfirm() {
  if (await confirm(t('MSG_ALT_CCPS_SESSION_CHANGE_CONFIRM'))) {
    const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
    await http.post('/sflex/common/common/ccps/change-user', {
      userId: selectedCcps.value,
    }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    await initSession();
    ok();
  }
}

</script>
