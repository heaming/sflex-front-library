<template>
  <kw-page class="kw-page--md">
    <template #header>
      <kw-page-header
        :options="['홈', '고객', '거래처 마스터 관리', 'Fixed Button set in bottom']"
      />
    </template>

    <div class="normal-area normal-area--button-set-bottom">
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
      <div class="button-set--bottom">
        <div class="button-set--bottom-left">
          <kw-btn
            label="이전"
          />
        </div>
        <div class="button-set--bottom-right">
          <kw-btn
            label="수정"
          />
          <kw-btn
            label="목록"
            class="ml8"
            primary
          />
        </div>
      </div>
    </div>
    <div class="kw-guide pa0">
      <q-card>
        <h3 class="kw-guide-title mt20">
          Button on the bottom of normal area
        </h3>
        <p class="kw-guide-description">
          Make sure to add the class <b>normal-area--button-set-bottom</b> with normal-area.<br>
          Add the class of <b>"button-set--bottom"</b> in the tag ,after putting the all content(such as kw-form)<br>
          The left side's button  side in button-set--bottom add <b>button-set--bottom-left</b><br>
          The right side's button in button-set--bottom add <b> button-set--bottom-right</b><br>
        </p>
        <guide-code-view
          :code-value="sampleVueCode"
          :lang="'vue'"
        />
      </q-card>
    </div>
  </kw-page>
</template>

<script setup>
const sampleVueCode = `
<kw-page class="kw-page--md">
  <template #header>
    <kw-page-header
      :options="['홈', '고객', '거래처 마스터 관리', 'Fixed Button set in bottom']"
    />
  </template>

  <div class="normal-area normal-area--button-set-bottom">
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
    <div class="button-set--bottom">
      <div class="button-set--bottom-left">
        <kw-btn
          label="이전"
        />
      </div>
      <div class="button-set--bottom-right">
        <kw-btn
          label="수정"
        />
        <kw-btn
          label="목록"
          class="ml8"
          primary
        />
      </div>
    </div>
  </div>
</kw-page>
`;

</script>
