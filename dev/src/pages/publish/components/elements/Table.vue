<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      Table
    </h2>
    <p class="kw-guide-description">
      A table is used when the developer is static rather than rendering data through the grid.<br>
      <span class="notice">
        When do you use the table?<br>
        Don't worry. If you need to use a table rather than a grid, I will write it down in the comment No 1.
      </span>
    </p>
    <guide-history-view
      :items="historyData"
    />
    <div class="kw-guide-section">
      <h3
        id="summary"
        class="kw-guide-title"
      >
        summary
      </h3>
      <q-markup-table class="kw-guide-table">
        <thead>
          <tr>
            <th>
              the Element(tag's name)
            </th>
            <th>
              Attr or Class
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              col
            </td>
            <td>
              style(width)
            </td>
            <td>
              If the table is full of the whole table, do not use px and convert it to %.
              It doesn't matter if it's not accurate.
            </td>
          </tr>
          <tr>
            <td>
              td
            </td>
            <td>
              text-center(default) | text-right | text-left
            </td>
            <td>
              If you need to sort differently, insert a helper class in the td.
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="kw-guide-section">
      <h3
        id="default"
        class="kw-guide-title"
      >
        default
      </h3>
      <p class="kw-guide-description">
        description
      </p>
      <q-card>
        <div class="kw-guide-example">
          <table class="kw-table--normal">
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
        </div>
        <guide-code-view
          :code-value="testCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const testCode = `
<table class="kw-table--normal">
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
`;
const historyData = [
  {
    timestamp: '2022-08-29',
    text: 'First added',
  },
];
</script>
