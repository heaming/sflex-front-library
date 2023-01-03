<template>
  <div class="maybe-window">
    <kw-page>
      <template #header>
        <kw-page-mobile-header
          title="기타비용 입력"
          left-btn="back"
        >
          <!-- more dropdown menu -->
          <template #more>
            <kw-btn label="menu1" />
            <kw-btn label="menu2" />
            <kw-btn label="menu3" />
          </template>
          <!--// more dropdown menu -->
        </kw-page-mobile-header>
      </template>
      <div class="kw-bc--bg-white pt30">
        <kw-form
          :cols="2"
          dense
          class="px40 pb30"
        >
          <kw-form-row>
            <kw-form-item label="label">
              <p>인천(김교원)</p>
            </kw-form-item>
            <kw-form-item label="label">
              <p>인천(김교원)</p>
            </kw-form-item>
          </kw-form-row>
          <kw-form-row>
            <kw-form-item label="label">
              <p>인천(김교원)</p>
            </kw-form-item>
            <kw-form-item label="label">
              <p>인천(김교원)</p>
            </kw-form-item>
          </kw-form-row>
        </kw-form>
        <kw-search title="조회조건">
          <kw-search-row>
            <kw-search-item label="고객 유형">
              <kw-select
                first-option="all"
                :options="['A','B','C']"
              />
            </kw-search-item>
            <kw-search-item label="교원키">
              <kw-input placeholder="입력해주세요" />
            </kw-search-item>
            <kw-search-item label="이름/대표자/담당자">
              <kw-input placeholder="입력해주세요" />
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item label="휴대전화번호">
              <kw-input
                placeholder="입력해주세요"
                mask="###-####-####"
              />
            </kw-search-item>
            <kw-search-item label="통합 고객">
              <kw-select
                first-option="all"
                :options="['A','B','C']"
              />
            </kw-search-item>
          </kw-search-row>
        </kw-search>
        <div class="result-area">
          <kw-action-top>
            <template #left>
              <kw-paging-info :total-count="3" />
            </template>
            <kw-btn-toggle
              v-model="strModel"
              :label="'label'"
              :options="['선택자재', '전체자재']"
              padding="12px"
              gap="0px"
            />
          </kw-action-top>
          <kw-list>
            <kw-list-item>
              <kw-list-section>
                <ul>
                  <li>
                    <span>안녕</span>
                    <p>ㅇㅇㅇ</p>
                  </li>
                </ul>
              </kw-list-section>
              <kw-list-section>
                <p class="text-body">
                  출고완료
                </p>
              </kw-list-section>
            </kw-list-item>
          </kw-list>
        </div>
      </div>
      <template #action>
        <kw-action-bottom>
          <template #left>
            <kw-btn
              label="이전"
              secondary
            />
          </template>
          <kw-btn
            label="목록"
            primary
          />
        </kw-action-bottom>
      </template>
    </kw-page>
    <div class="kw-guide pa0">
      <q-card>
        <h3 class="center mb20">
          This is the source code for this page. This part is not included in the coding.
        </h3>
        <guide-code-view
          :code-value="[sampleVueCode, sampleScript]"
          :lang="['vue','javascript']"
          multi
        />
      </q-card>
    </div>
  </div>
</template>

<script setup>
const strModel = ref('선택자재');
const sampleScript = `
const strModel = ref('선택자재')
`;

const sampleVueCode = `
<kw-page>
  <template #header>
    <kw-page-header :options="['홈','고객','Search Result(Normal)']" />
  </template>

  <kw-search title="조회조건">
    <kw-search-row>
      <kw-search-item label="고객 유형">
        <kw-select
          first-option="all"
          :options="['A','B','C']"
        />
      </kw-search-item>

      <kw-search-item label="교원키">
        <kw-input placeholder="입력해주세요" />
      </kw-search-item>

      <kw-search-item label="이름/대표자/담당자">
        <kw-input placeholder="입력해주세요" />
      </kw-search-item>
    </kw-search-row>

    <kw-search-row>
      <kw-search-item label="휴대전화번호">
        <kw-input
          placeholder="입력해주세요"
          mask="###-####-####"
        />
      </kw-search-item>

      <kw-search-item label="통합 고객">
        <kw-select
          first-option="all"
          :options="['A','B','C']"
        />
      </kw-search-item>
    </kw-search-row>
  </kw-search>

  <div class="result-area">
    <ul class="kw-notification">
      <li>
        현금자동이체는 직전 청구결과에 따라서 청구가 제한됩니다.
        <span class="kw-fc--primary"> 특히, 계좌해지 상태로 인한 청구 오류건은 자동이체 재신청 해주셔야 합니다.</span> (청구기준 항목 참조)
      </li>
    </ul>
    <kw-action-top>
      <template #left>
        <span>총</span>
        <span class="accent pl4">156</span>
        <kw-separator
          vertical
          inset
          spaced
        />
        <kw-select
          class="kw-select--rows-per-page"
          v-model="selectData.model"
          :options="selectData.options"
          borderless
          dense
          suffix="개씩보기"
        />
        <kw-btn
          class="ml40"
          label="URL 전송"
          dense
          color="bg-box"
          border-color="line-line"
          text-color="black3"
        />
        <p class="description ml16">
          고객정보 수정, 가족관계 증명서 등록, 약관동의, 본인인증 URL를 전송할 수 있습니다.
        </p>
      </template>
      <template #default>
        <kw-btn
          icon="download_on"
          dense
          secondary
          label="엑셀 다운로드"
        />
        <kw-separator
          vertical
          inset
          spaced
        />
        <kw-btn
          label="법인 고객 등록"
          primary
          dense
        />
      </template>
    </kw-action-top>
    <kw-grid
      :visible-rows="10"
      @init="initGrid"
    />
    <kw-action-bottom>
      <kw-btn
        label="삭제"
        grid-action
      />
      <kw-btn
        label="저장"
        grid-action
      />
    </kw-action-bottom>
    <kw-pagination
      :model-value="1"
      :total-count="100"
    />
  </div>
</kw-page>
`;

</script>
