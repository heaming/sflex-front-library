<template>
  <guide-popup-view>
    <kw-popup
      size="full"
      title="full size popup"
    >
      <kw-search
        :cols="2"
      >
        <kw-search-row>
          <kw-search-item label="직책">
            <kw-option-group
              :model-value="'지국장'"
              rules="required"
              type="radio"
              :options="['지국장', 'EP']"
            />
          </kw-search-item>
          <kw-form-item
            label="대상자"
          >
            <kw-input />
          </kw-form-item>
        </kw-search-row>
      </kw-search>

      <h3 class="mt30">
        대상자 조회결과
        <ul class="kw-notification">
          <li>
            <span class="kw-fc--primary">금액 입력 후 [추가]버튼을 클릭 </span>해 주세요.
          </li>
        </ul>
      </h3>

      <kw-action-bar class="mt20">
        <template #left>
          <span>총</span>
          <span class="accent pl4">156</span>
        </template>
        <kw-btn
          primary
          dense
          label="대상자 추가"
        />
      </kw-action-bar>
      <table class="kw-table--normal mt12">
        <colgroup>
          <col style="width: 25%;">
          <col style="width: 25%;">
          <col style="width: 25%;">
          <col style="width: 25%;">
        </colgroup>
        <thead>
          <tr>
            <th>계좌상태</th>
            <th>오류번호</th>
            <th>오류명</th>
            <th>청구여부</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>유효</td>
            <td class="text-left">
              21(text-left)
            </td>
            <td>잔액부족</td>
            <td>청구</td>
          </tr>
          <tr>
            <td>유효</td>
            <td class="text-right">
              21(text-right)
            </td>
            <td>잔액부족</td>
            <td>청구</td>
          </tr>
          <tr>
            <td rowspan="7">
              해지
            </td>
            <td>12</td>
            <td>계좌번호 오류</td>
            <td rowspan="7">
              청구제외(자동이체 재신청 필요)
            </td>
          </tr>
          <tr>
            <td>13</td>
            <td>계좌번호 체계오류</td>
          </tr>
          <tr>
            <td>14</td>
            <td>주민등록번호 등록오류</td>
          </tr>
          <tr>
            <td>17</td>
            <td>미신청·회원코드</td>
          </tr>
          <tr>
            <td>19</td>
            <td>은행에서 해지</td>
          </tr>
          <tr>
            <td>24</td>
            <td>계좌변경에서 해지</td>
          </tr>
          <tr>
            <td>31</td>
            <td>해약계좌</td>
          </tr>
          <tr>
            <td rowspan="6">
              비정상
            </td>
            <td>33</td>
            <td>잡좌</td>
            <td rowspan="6">
              약정일 1회만 청구
            </td>
          </tr>
          <tr>
            <td>34</td>
            <td>지급정지계좌</td>
          </tr>
          <tr>
            <td>36</td>
            <td>잔액증명발급계좌</td>
          </tr>
          <tr>
            <td>37</td>
            <td>연체계좌</td>
          </tr>
          <tr>
            <td>51</td>
            <td>기타오류</td>
          </tr>
          <tr>
            <td>00</td>
            <td>그외 오류건</td>
          </tr>
        </tbody>
      </table>
      <template #action>
        <kw-btn
          negative
          label="취소"
        />
        <kw-btn
          primary
          label="확인"
        />
      </template>
    </kw-popup>
  </guide-popup-view>
</template>

<script setup>

// const sampleVueCode = `
// <kw-popup
//   class="kw-popup--lg"
//   title="은행자동이체 청구 기준"
// >
//   Content Area
//   <template #action>
//     <kw-btn
//       negative
//       label="취소"
//     />
//     <kw-btn
//       primary
//       label="확인"
//     />
//   </template>
// </kw-popup>`;

</script>
