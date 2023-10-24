<template>
  <kw-page title="통합계약서 작성">
    <kw-stepper
      v-model="stepInitNum"
      heading-text
    >
      <kw-step
        :name="1"
        :done="stepInitNum > 1"
        prefix="1"
        title="계약자정보입력"
      />
      <kw-step
        :name="2"
        :done="stepInitNum > 2"
        prefix="2"
      />
      <kw-step
        :name="3"
        :done="stepInitNum > 3"
        prefix="3"
      />
      <kw-step
        :name="4"
        :done="stepInitNum > 4"
        prefix="4"
      />
      <kw-step-panel :name="1">
        <ul class="state-boxes pa20">
          <li class="state-boxes__item">
            <span class="state-boxes__label">재약정대상</span>
            <p class="state-boxes__nums">
              7
            </p>
          </li>
          <li class="state-boxes__item">
            <span class="state-boxes__label">멤버십대상</span>
            <p class="state-boxes__nums">
              10
            </p>
          </li>
        </ul>
        <!-- rev:230626 kw-search로 전면수정-->
        <kw-search class="pt0">
          <kw-search-row>
            <kw-search-item>
              <kw-select
                label="계약유형"
                :options="['a', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']"
                required
              />
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item>
              <kw-select
                label="계약자유형"
                :options="['a', 'b']"
                required
              />
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item>
              <kw-input
                label="계약자명"
              />
            </kw-search-item>
          </kw-search-row>
          <kw-search-row>
            <kw-search-item>
              <kw-input
                label="휴대번호"
              />
            </kw-search-item>
          </kw-search-row>
        </kw-search>
        <!-- //rev:230626 kw-search로 전면수정 -->
        <kw-separator divider />
        <div class="pa20 pt12">
          <kw-expansion-item
            group="list-group"
            padding-target="header"
            expand-icon-align="center"
            expand-icon-class="kw-font-pt16"
            expand-icon="arrow_down"
            default-opened
          >
            <template #header>
              <kw-item-section>
                <h3>
                  계약정보-개인
                </h3>
              </kw-item-section>
            </template>
            <div class="pt14">
              <kw-form>
                <kw-form-item label="계약자">
                  <p>김엄마 / 1988-03-03 / 여</p>
                </kw-form-item>
                <kw-form-item label="고객번호">
                  <p>123456789</p>
                </kw-form-item>
                <kw-form-item label="휴대번호">
                  <p>010-1120-8699</p>
                </kw-form-item>
                <!-- rev:230626 주소코드 삭제 -->
                <!-- <kw-form-item label="주소코드">
                  <p>123456</p>
                </kw-form-item> -->
                <!-- //rev:230626 삭제 -->
                <kw-form-item label="주소">
                  <p>
                    02439<br>
                    서울특별시 을지로 951 <br>
                    (을지로, 교원내외빌딩) 11층
                  </p>
                </kw-form-item>
              </kw-form>
            </div>
          </kw-expansion-item>
        </div>
        <kw-separator divider />
        <div class="pa20 mb20">
          <kw-expansion-item
            group="list-group"
            padding-target="header"
            expand-icon-align="center"
            expand-icon-class="kw-font-pt16"
            expand-icon="arrow_down"
            default-opened
          >
            <template #header>
              <kw-item-section>
                <h3>
                  파트너 정보
                </h3>
              </kw-item-section>
            </template>
            <div class="pt14">
              <kw-form>
                <kw-form-item label="파트너">
                  <p>김플랜</p>
                </kw-form-item>
                <kw-form-item label="사번">
                  <p>123456789</p>
                </kw-form-item>
                <kw-form-item label="지국명">
                  <p>강서지구</p>
                </kw-form-item>
                <kw-form-item label="지국장명">
                  <p>김국장</p>
                </kw-form-item>
              </kw-form>
            </div>
          </kw-expansion-item>
        </div>
      </kw-step-panel>
    </kw-stepper>
    <template #action>
      <kw-btn
        filled
        negative
        label="이전"
      />
      <kw-btn
        filled
        primary
        label="다음"
        @click="nextPage"
      />
    </template>
  </kw-page>
</template>

<script setup>
const stepInitNum = ref(1);
const router = useRouter();
function nextPage() {
  router.push(
    {
      path: '/W/MP/W-MP-U-9157M02',
    },
  );
}
</script>

<style scoped lang="scss">
::v-deep {
  .kw-stepper--heading-text {
    margin: 20px;
    margin-bottom: 0;
  }

  .border-box {
    padding: 16px;
  }

  .state-boxes__nums {
    text-decoration: none;
  }

  .custom-chip {
    margin-top: 12px;
    background-color: rgba(47 138 243 / 10%);
    font-size: 14px;
    font-weight: 500;
  }
}

// rev:230626 추가
::v-deep(.kw-item-type) {
  min-height: auto;
}

// // rev:230626 추가

</style>
