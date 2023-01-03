<template>
  <kw-page class="kw-page--md">
    <template #header>
      <kw-page-header
        :options="['홈', '고객', '거래처 마스터 관리', '거래처 마스터 상세/수정']"
      />
    </template>

    <div class="normal-area">
      <h3>거래처 정보</h3>
      <kw-form :cols="1">
        <kw-form-row>
          <kw-form-item
            label="이름"
            required
          >
            <kw-input
              name="input"
              rules="required"
              placeholder="입력해주세요"
              disable
              model-value="김사랑"
              class="w498"
            />
          </kw-form-item>
        </kw-form-row>
        <kw-form-row>
          <kw-form-item
            label="성별"
            required
          >
            <kw-option-group
              :model-value="'여성'"
              name="radioOptionGroup"
              rules="required"
              type="radio"
              :options="['남성', '여성']"
            />
          </kw-form-item>
        </kw-form-row>
        <kw-form-row>
          <kw-form-item
            label="생년월일"
            required
          >
            <kw-date-picker
              name="datePicker"
              rules="required"
              disable
            />
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </div>
    <!-- <div class="fix-bottom-area row justify-between">
      <div class="row justify-start items-center">
        <kw-btn
          class="kw-btn--line-black"
          label="목록"
        />
      </div>
      <div class="row justify-end items-center">
        <kw-btn
          class="kw-btn--line-black mr8"
          label="초기화"
        />
        <kw-btn
          class="w184"
          label="등록"
        />
      </div>
    </div> -->
    <div class="kw-guide pa0">
      <q-card>
        <h3 class="center mb20">
          This is the source code for this page. This part is not included in the coding.
        </h3>
        <guide-code-view
          :code-value="sampleCode"
          lang="vue"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const sampleCode = `
<kw-page class="kw-page--md">
  <template #header>
    <kw-page-header
      :options="['홈', '고객', '거래처 마스터 관리', '거래처 마스터 상세/수정']"
    />
  </template>

  <div class="normal-area">
    <h3>거래처 정보</h3>
    <kw-form :cols="1">
      <kw-form-row>
        <kw-form-item
          label="이름"
          required
        >
          <kw-input
            name="input"
            rules="required"
            placeholder="입력해주세요"
            disable
            model-value="김사랑"
            class="w498"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item
          label="성별"
          required
        >
          <kw-option-group
            :model-value="'여성'"
            name="radioOptionGroup"
            rules="required"
            type="radio"
            :options="['남성', '여성']"
          />
        </kw-form-item>
      </kw-form-row>
      <kw-form-row>
        <kw-form-item
          label="생년월일"
          required
        >
          <kw-date-picker
            name="datePicker"
            rules="required"
            disable
          />
        </kw-form-item>
      </kw-form-row>
    </kw-form>
  </div>
  <!-- <div class="fix-bottom-area row justify-between">
    <div class="row justify-start items-center">
      <kw-btn
        class="kw-btn--line-black"
        label="목록"
      />
    </div>
    <div class="row justify-end items-center">
      <kw-btn
        class="kw-btn--line-black mr8"
        label="초기화"
      />
      <kw-btn
        class="w184"
        label="등록"
      />
    </div>
  </div> -->
  <div class="kw-guide pa0">
    <q-card>
      <h3 class="center mb20">
        This is the source code for this page. This part is not included in the coding.
      </h3>
      <guide-code-view
        :code-value="[sampleVueCode, sampleJsCode]"
        :lang="['vue','javascript']"
        multi
      />
    </q-card>
  </div>
</kw-page>
`;

</script>
