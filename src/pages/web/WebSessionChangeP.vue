<template>
  <kw-popup
    class="web-dashboard-mgt"
    size="2xl"
    title="(임시) 로그인 유저 변경"
  >
    <kw-search
      :cols="3"
    >
      <kw-search-row>
        <!-- 업무영역 -->
        <kw-search-item label="업무영역">
          <kw-select
            v-model="searchParams.moduleId"
            :options="codes.COD_MDLE"
            first-option="all"
          />
        </kw-search-item>
        <!-- 조직유형 -->
        <kw-search-item label="조직유형">
          <kw-select
            v-model="searchParams.ogTpCd"
            :options="codes.OG_TP_CD"
            first-option="all"
          />
        </kw-search-item>
        <!-- 로그인ID -->
        <kw-search-item label="로그인ID">
          <kw-input v-model="searchParams.loginId" />
        </kw-search-item>
      </kw-search-row>
      <kw-search-row>
        <!-- 사용자명 -->
        <kw-search-item label="사용자명">
          <kw-input v-model="searchParams.userName" />
        </kw-search-item>
        <!-- 비고 -->
        <kw-search-item label="비고">
          <kw-input v-model="searchParams.eplNm" />
        </kw-search-item>
      </kw-search-row>
      <div class="kw-search__action">
        <kw-btn
          ref="searchBtn"
          :label="$t('MSG_TXT_SRCH', null, '조회')"
          :class="$g.platform.is.mobile ? 'w64' : 'w90'"
          color="secondary"
          border-color="secondary"
          text-color="bg-white"
          dense
          type="submit"
          @click="onClickSearch"
        />
      </div>
    </kw-search>
    <div style="margin-top: 20px;">
      <kw-action-top>
        <template #left>
          <kw-paging-info
            v-model:page-index="pageInfo.pageIndex"
            v-model:page-size="pageInfo.pageSize"
            :total-count="pageInfo.totalCount"
            :page-size-options="codes.COD_PAGE_SIZE_OPTIONS"
            @change="fetchPage"
          />
        </template>
      </kw-action-top>
      <kw-grid
        ref="grdMainRef"
        class="fee-standard-page__grid"
        visible-rows="10"
        @init="initGrid"
      />
      <kw-pagination
        v-model:page-index="pageInfo.pageIndex"
        :page-size="pageInfo.pageSize"
        :total-count="pageInfo.totalCount"
        @change="fetchPage"
      />
      <kw-action-bottom>
        <kw-btn
          :label="$t('MSG_BTN_CLOSE')"
          @click="onClickClose"
        />
      </kw-action-bottom>
    </div>
  </kw-popup>
</template>

<script setup>
// -------------------------------------------------------------------------------------------------
// Import & Declaration
// -------------------------------------------------------------------------------------------------
import { cloneDeep } from 'lodash-es';
import { http } from '../../plugins/http';
import useModal from '../../composables/useModal';
import useSession from '../../composables/useSession';
import { getComponentType, defineGrid } from '../../globalUtils';
import { getPageIndexOffset } from '../../utils/grid';
import { getMultiCodes } from '../../utils/code';
import { notify } from '../../index';
import { localStorage } from '../../plugins/storage';
import consts from '../../consts';

const { ok, cancel } = useModal();

const codes = await getMultiCodes('COD_YN', 'COD_PAGE_SIZE_OPTIONS', 'COD_MDLE', 'OG_TP_CD');
const {
  initSessionImsi,
} = useSession();
// -------------------------------------------------------------------------------------------------
// Function & Event
// -------------------------------------------------------------------------------------------------
const grdMainRef = ref(getComponentType('KwGrid'));

const pageInfo = ref({
  totalCount: 0,
  pageIndex: 1,
  pageSize: 10,
  needTotalCount: true,
});
let cachedParams;
const searchParams = ref({
  tenantId: '', // 시스템
  moduleId: '', // 모듈
  ogTpCd: '',
  loginId: '', // 로그인ID
  userName: '', // 사용자명
});
const storage = window.localStorage;

async function fetchPage(pageIndex = pageInfo.value.pageIndex, pageSize = pageInfo.value.pageSize) {
  const params = {
    ...cachedParams,
    pageIndex,
    pageSize,
  };
  const response = await http.get('/sflex/common/common/get-users-imsi', { params });

  pageInfo.value = response.data.pageInfo;
  const view = grdMainRef.value.getView();
  view.getDataSource().setRows(response.data.list);
  view.rowIndicator.indexOffset = getPageIndexOffset(pageInfo);
}

async function onClickSearch() {
  cachedParams = cloneDeep(searchParams.value);
  storage.setItem('loginCachedParams', JSON.stringify(cachedParams));
  await fetchPage(1, pageInfo.value.pageSize);
}

async function onClickClose() {
  await cancel();
}

onMounted(async () => {
  if (storage.getItem('loginCachedParams')) {
    searchParams.value = JSON.parse(storage.getItem('loginCachedParams'));
  }
  onClickSearch();
});

// -------------------------------------------------------------------------------------------------
// Initialize Grid
// -------------------------------------------------------------------------------------------------
const initGrid = defineGrid((data, view) => {
  const fields = [
    { fieldName: 'usrId' } /* 시스템 */,
    { fieldName: 'tenantId' } /* 시스템 */,
    { fieldName: 'moduleId' } /* 모듈ID */,
    { fieldName: 'ogTpCd' } /* 조직유형코드 */,
    { fieldName: 'loginId' } /* 로그인ID */,
    { fieldName: 'usrNm' } /* 사용자명 */,
    { fieldName: 'ogNm' } /* 조직명 */,
    { fieldName: 'eplCn' } /* 비고 */,
    { fieldName: 'sn' },
  ];

  const columns = [
    {
      fieldName: 'moduleId',
      header: '업무영역',
      width: '120',
      options: codes.COD_MDLE,
      styleName: 'text-center',
      editor: { type: 'list' },
    },
    {
      fieldName: 'ogTpCd',
      header: '조직유형',
      width: '120',
      options: codes.OG_TP_CD,
      styleName: 'text-center',
      editable: false,
    },
    {
      fieldName: 'loginId',
      header: '로그인ID',
      width: '120',
      styleName: 'text-center',
    },
    {
      fieldName: 'usrNm',
      header: '사용자명',
      width: '100',
      styleName: 'text-center',
    },
    {
      fieldName: 'ogNm',
      header: '조직명',
      width: '120',
      styleName: 'text-center',
    },
    {
      fieldName: 'eplCn',
      header: '비고',
      width: '250',
      styleName: 'text-left',
    },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.rowIndicator.visible = true;
  view.editOptions.editable = false;

  view.onCellDblClicked = async (grid, clickData) => {
    if (clickData.cellType === 'data') {
      const selectedItem = grid.getValues(clickData.itemIndex);
      const accessToken = localStorage.getItem(consts.LOCAL_STORAGE_ACCESS_TOKEN) || null;
      await http.post('/sflex/common/common/set-users-imsi', {
        usrId: selectedItem.usrId,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await initSessionImsi();
      ok();
      await notify('로그인 유저 변경이 완료되었습니다.');
    }
  };
});
</script>
