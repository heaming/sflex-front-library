<template>
  <kw-page>
    <div class="result-area">
      <kw-action-top>
        <!--  -->
        <kw-btn
          @click="onClickTest"
        >
          체크여부 테스트
        </kw-btn>
      </kw-action-top>
      <kw-grid
        ref="grdMainRef"
        :visible-rows="10"
        @init="initGrid"
      />
    </div>
  </kw-page>
</template>

<script setup>
import { gridUtil } from '~kw-lib';

const grdMainRef = ref(null);
function initGrid(data, view) {
  const fields = [
    { fieldName: 'col1' },
    { fieldName: 'col2' },
    { fieldName: 'col3' },
    { fieldName: 'col4' },
    { fieldName: 'col5' },
    { fieldName: 'col6' },
    { fieldName: 'col7' },
    { fieldName: 'col8' },
    { fieldName: 'col9' },
    { fieldName: 'col10' },
    { fieldName: 'col11' },
    { fieldName: 'col12' },
    { fieldName: 'col13' },
    { fieldName: 'col14' },
  ];

  const columns = [
    { fieldName: 'col1', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col2', header: '고객 유형', width: '100', styleName: 'text-center' },
    { fieldName: 'col3', header: '법인명(점포명)', width: '180' },
    { fieldName: 'col4', header: '이름/담당자', width: '080', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col5', header: '성별', width: '100', styleName: 'text-center' },
    { fieldName: 'col6', header: '생년월일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col7', header: '휴대전화번호', width: '160', styleName: 'text-center' },
    { fieldName: 'col8', header: '주소', width: '296' },
    { fieldName: 'col9', header: '약관동의', width: '100', styleName: 'text-center rg-button-link', renderer: { type: 'button' } },
    { fieldName: 'col10', header: '본인인증', width: '100', styleName: 'text-center text-red' },
    { fieldName: 'col11', header: '통합고객', width: '100', styleName: 'text-center text-blue' },
    { fieldName: 'col12', header: '최종 수정일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
    { fieldName: 'col13', header: '최종 등록일', width: '100', styleName: 'text-center', datetimeFormat: 'yyyy-MM-dd' },
  ];

  data.setFields(fields);
  view.setColumns(columns);
  view.checkBar.visible = true;
  view.rowIndicator.visible = true;
  view.setFixedOptions({
    rowCount: 1,
    colCount: 1,
  });

  data.setRows([
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
    { col1: '041076279', col2: '개인', col3: '-', col4: '김사랑', col5: '여성', col6: '2014-05-20', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220324', col13: '20040216' },
    { col1: '041028502', col2: '개인', col3: '(주)포워딩코리아(종로점)', col4: '우담당', col5: '여성', col6: '-', col7: '-', col8: '서울 서초구 서문로 122', col9: '상세', col10: '미인증', col11: '미가입', col12: '20220624', col13: '20020620' },
    { col1: '041076733', col2: '개인', col3: '-', col4: '이엄마', col5: '여성', col6: '19650210', col7: '010-1111-2222', col8: '서울 서초구 서초대로 385', col9: '상세', col10: '인증', col11: '가입', col12: '20040215', col13: '20040215' },
  ]);
}

function onClickTest() {
  const view = grdMainRef.value.getView();
  console.log(view);
  console.log(gridUtil.getCheckedRowValues(view));
}
</script>
