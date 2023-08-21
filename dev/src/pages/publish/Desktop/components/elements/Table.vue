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
          <tr>
            <td>
              th/td
            </td>
            <td>
              essential
            </td>
            <td>
              Need to add 'essential',insert a helper class
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
                <th>
                  계좌상태
                </th>
                <th class="essential">
                  오류번호
                </th>
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

          <p class="my20">
            데이터가 없을 경우 (5줄)
          </p>
          <table class="kw-table--normal mt20">
            <colgroup>
              <col style="width: 25%;">
              <col style="width: 25%;">
              <col style="width: 25%;">
              <col style="width: 25%;">
            </colgroup>
            <thead>
              <tr>
                <th>
                  계좌상태
                </th>
                <th class="essential">
                  오류번호
                </th>
                <th>오류명</th>
                <th>청구여부</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colspan="4"
                  rowspan="10"
                  class="kw-table-no-date"
                >
                  <p>
                    데이터가 없습니다
                  </p>
                </td>
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td />
              </tr>
              <tr>
                <td />
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
    <div class="kw-guide-section">
      <h3
        id="case01"
        class="kw-guide-title"
      >
        case01
      </h3>
      <p class="kw-guide-description">
        no border case <br>
        1column example <a href="https://zpl.io/p1QydA8">https://zpl.io/p1QydA8</a>
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-inquiry-result">
            <div class="kw-inquiry-result__top">
              <div class="col-auto">
                <span class="kw-fc--black1">RDS 잔액</span>
                <span class="kw-fc--black3 ml8">해약일자 2022-07-20</span>
              </div>
              <div class="col-auto row">
                <p class="kw-fc--black1 text-right ml16">
                  <span>33,624원</span>
                </p>
              </div>
            </div>
            <ul class="kw-inquiry-result__list">
              <li>
                <p class="kw-fc--black1">
                  <span>RDS 적립 총 금액</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>95,334,640원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>RDS 지급 총 금액</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>95,334,640원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>RDS 공제 총 금액</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>95,334,640원</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <guide-code-view
          :code-value="case01"
          lang="vue"
        />
      </q-card>
    </div>
    <div class="kw-guide-section">
      <h3
        id="case02"
        class="kw-guide-title"
      >
        case02
      </h3>
      <p class="kw-guide-description">
        no border case <br>
        2column example <a href="https://zpl.io/KGnzPER">https://zpl.io/KGnzPER</a>
        add class="kw-inquiry-result__list--2col" in ul.kw-inquiry-result
      </p>
      <q-card>
        <div class="kw-guide-example">
          <div class="kw-inquiry-result">
            <div class="kw-inquiry-result__top">
              <div class="col-auto">
                <span class="kw-fc--black1">전체 요청/입금</span>
                <span class="kw-fc--black3 ml8">출금일자 2022-07-20</span>
              </div>
              <div class="col-auto row">
                <p class="kw-fc--black1 text-right">
                  <span>33,624건</span>
                </p>
                <p class="kw-fc--black1 text-right ml16">
                  <span>33,624원</span>
                </p>
              </div>
            </div>
            <ul class="kw-inquiry-result__list kw-inquiry-result__list--2col">
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>12:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>13:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>14:aaa</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
              <li>
                <p class="kw-fc--black1">
                  <span>11:전집할부</span>
                </p>
                <div class="col row">
                  <p class="kw-fc--black1">
                    <span>2,360,676,770원</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <guide-code-view
          :code-value="case02"
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
      <th  class="essential">
        오류번호
      </th>
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

<!-- 데이터 없을 경우 -->
<table class="kw-table--normal mt20">
  <colgroup>
    <col style="width: 25%;">
    <col style="width: 25%;">
    <col style="width: 25%;">
    <col style="width: 25%;">
  </colgroup>
  <thead>
    <tr>
      <th>
        계좌상태
      </th>
      <th class="essential">
        오류번호
      </th>
      <th>오류명</th>
      <th>청구여부</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td
        colspan="4"
        rowspan="5"
        class="kw-table-no-date"
      >
        <p>
          데이터가 없습니다
        </p>
      </td>
    </tr>
    <tr>
      <td />
    </tr>
    <tr>
      <td />
    </tr>
    <tr>
      <td />
    </tr>
    <tr>
      <td />
    </tr>
  </tbody>
</table>
`;

const case01 = `
<div class="kw-inquiry-result">
  <div class="kw-inquiry-result__top">
    <div class="col-auto">
      <span class="kw-fc--black1">RDS 잔액</span>
      <span class="kw-fc--black3 ml8">해약일자 2022-07-20</span>
    </div>
    <div class="col-auto row">
      <p class="kw-fc--black1 text-right ml16">
        <span>33,624원</span>
      </p>
    </div>
  </div>
  <ul class="kw-inquiry-result__list">
    <li>
      <p class="kw-fc--black1">
        <span>RDS 적립 총 금액</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>95,334,640원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>RDS 지급 총 금액</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>95,334,640원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>RDS 공제 총 금액</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>95,334,640원</span>
        </p>
      </div>
    </li>
  </ul>
</div>
`;

const case02 = `
<div class="kw-inquiry-result">
  <div class="kw-inquiry-result__top">
    <div class="col-auto">
      <span class="kw-fc--black1">전체 요청/입금</span>
      <span class="kw-fc--black3 ml8">출금일자 2022-07-20</span>
    </div>
    <div class="col-auto row">
      <p class="kw-fc--black1 text-right">
        <span>33,624건</span>
      </p>
      <p class="kw-fc--black1 text-right ml16">
        <span>33,624원</span>
      </p>
    </div>
  </div>
  <ul class="kw-inquiry-result__list">
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>12:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>13:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>14:aaa</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
    <li>
      <p class="kw-fc--black1">
        <span>11:전집할부</span>
      </p>
      <div class="col row">
        <p class="kw-fc--black1">
          <span>2,360,676,770원</span>
        </p>
      </div>
    </li>
  </ul>
</div>
`;

const historyData = [
  {
    timestamp: '2022-12-21',
    text: 'remove / between 건 and 원',
  },
  {
    timestamp: '2022-11-01',
    text: 'add new case',
  },
  {
    timestamp: '2022-09-28',
    text: 'Add essential',
  },
  {
    timestamp: '2022-08-29',
    text: 'First added',
  },
];
</script>
