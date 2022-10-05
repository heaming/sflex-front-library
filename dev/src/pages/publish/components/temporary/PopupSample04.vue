<template>
  <guide-popup-view>
    <kw-popup
      class="kw-popup--sm kw-popup--no-action"
      title="타이틀입니다."
    >
      <p class="kw-font--14 kw-fc--black3 text-right mb12">
        <span>2022-09-14 변경</span>
      </p>
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
  <kw-page>
    <div class="kw-guide">
      <q-card>
        <h3 class="center mb20">
          This is the source code for this page. This part is not included in the coding.
        </h3>
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
  <kw-popup
      class="kw-popup--sm kw-popup--no-action"
      title="타이틀입니다."
    >
      <p class="kw-font--14 kw-fc--black3 text-right mb12">
        <span>2022-09-14 변경</span>
      </p>
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
  `;
</script>
