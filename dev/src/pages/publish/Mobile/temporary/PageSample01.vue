<template>
  <kw-page :title="'모종 패키지 선택'">
    <div class="pa20">
      <kw-option-group
        :model-value="'우리아이 채소식단 결합 패키지 SLIM (11000원)'"
        type="radio"
        class="kw-option-group--row"
        :options="[
          '우리아이 채소식단 결합 패키지 SLIM (11000원)',
          '건강 밥상 결합 패키지 SLIM (11000원)',
          '항암건강 결합 패키지 SLIM (13000원)',
          '숙면 힐링 결합 패키지 SLIM (13000원)',
          '우리아이 신선 이유식 결합 패키지 SLIM (11000원)',
          '선택품종 버터헤드 (6구) SLIM (11000원)',
          '선택품종 케일 (6구) SLIM (11000원)',
          '선택품종 비타민다채 (6구) SLIM (11000원)',
          '(RE) 모종 자유선택 SLIM (14400원)',
        ]"
      />
    </div>

    <kw-separator
      divider
    />

    <div class="mx24 my20">
      <span class="kw-font-dense kw-fc--black2">
        변경내역 상세
      </span>

      <p class="mt12 text-weight-medium">
        패키지 가격 현재 : 0원 / 변경가격 : 15000원
        패키지 모종구성 : 청경체 (04), 케일 (04), 비타민다채 (04)
      </p>

      <kw-separator
        spaced="0"
        class="mt7 mb40"
      />
    </div>

    <template #action>
      <kw-btn
        filled
        negative
        label="이전"
      />
      <kw-btn
        filled
        primary
        label="저장"
      />
    </template>
  </kw-page>
</template>

<script setup>

</script>

<style scoped lang="scss">
::v-deep(.kw-option-group) {
  &.kw-option-group--row {
    .kw-option-group__control {
      flex-direction: column;
      align-items: flex-start;

      & > div + div {
        margin-left: 0;
        margin-top: 20px;
      }

      > div {
        display: flex;
        justify-content: flex-start;
      }

      ::v-deep(.q-radio) {
        align-self: flex-start;
      }

      .q-radio .q-radio__inner {
        align-self: flex-start;
        margin-top: 3px;
      }
    }
  }
}
</style>
