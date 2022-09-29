<template>
  <guide-popup-view>
    <kw-popup
      class="kw-popup--sm"
      title="서명 요청 SMS 발송 정보"
    >
      <h2
        class="h2-small justify-end"
      >
        <p><span>2022-09-14 변경</span></p>
      </h2>
      <kw-form
        :cols="1"
        dense
      >
        <kw-form-row>
          <kw-form-item
            label="요청일자"
          >
            <p>2022-08-14</p>
          </kw-form-item>
        </kw-form-row>
        <kw-form-row>
          <kw-form-item
            label="서명일자"
          >
            <p>2022-08-14</p>
          </kw-form-item>
        </kw-form-row>
        <kw-form-row>
          <kw-form-item
            label="요청자 정보"
          >
            <p>박교원 (1234567)</p>
          </kw-form-item>
        </kw-form-row>
      </kw-form>
    </kw-popup>
  </guide-popup-view>
</template>
