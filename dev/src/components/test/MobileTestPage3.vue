<template>
  <kw-btn
    primary
    label="교원 ALL&G 회원가입"
    @click="showDummyWindow = !showDummyWindow"
  />
  <div
    v-if="showDummyWindow"
    class="maybe-window"
  >
    <kw-page>
      <template #header>
        <kw-page-mobile-header
          title="교원 ALL&G 회원가입"
          show-close
          @close="showDummyWindow = !showDummyWindow"
        />
      </template>

      <div class="maybe-page-contents">
        <div class="flex">
          <kw-toggle
            v-model="padding"
            label="padding"
            :true-value="true"
            :false-value="false"
          />
          <kw-input
            v-model="paddingString"
            label="paddingString"
            class="w100"
          />
          <kw-toggle
            v-model="dense"
            label="dense"
            :true-value="true"
            :false-value="false"
          />
          <kw-toggle
            v-model="itemDense"
            label="itemDense"
            :true-value="true"
            :false-value="false"
          />
          <kw-toggle
            v-model="itemPadding"
            label="itemPadding"
            :true-value="true"
            :false-value="false"
          />
          <kw-input
            v-model="itemPaddingString"
            label="itemPaddingString"
            class="w100"
          />
        </div>

        <kw-list
          :item-padding="paddingString || padding === undefined ? undefined : padding"
          :dense="dense"
        >
          <kw-item
            :dense="itemDense"
            :padding="itemPaddingString || itemPadding === undefined ? undefined : itemPadding"
            style="background-color: rgb(0 0 0 / 10%);"
          >
            <kw-item-section side>
              <kw-checkbox model-value="Y" />
            </kw-item-section>
            <kw-item-section>
              <kw-item-label>
                This Is A Item.
              </kw-item-label>
            </kw-item-section>
          </kw-item>
          <kw-expansion-item
            :dense="itemDense"
            :padding="itemPadding"
            style="background-color: rgb(0 0 0 / 10%);"
          >
            <template #header>
              <kw-item-section style="background-color: rgb(0 0 0 / 10%);">
                <kw-item-label>
                  This Is A Expension Item Header.
                </kw-item-label>
              </kw-item-section>
            </template>
            <div>
              This Is A Expension Item Contents.
            </div>
          </kw-expansion-item>
        </kw-list>
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
          disable
          label="확인"
        />
      </template>
    </kw-page>
  </div>

  <kw-list
    v-if="false"
    padding
  >
    <kw-expansion-item
      group="accordion"
      style="border: 1px solid #ccc;"
      header-class="bg-line-line"
      expand-icon-class="text-body"
    >
      <template #header>
        <kw-item-section side>
          <kw-checkbox
            class="pad"
            model-value="N"
          />
        </kw-item-section>
        <kw-item-section class="text-body">
          약관 전체 동의
        </kw-item-section>
      </template>
      <kw-item>item</kw-item>
    </kw-expansion-item>
    <kw-expansion-item
      v-if="false"
      group="accordion"
      header-class="bg-line-line"
      expand-icon-class="text-body"
    >
      <template #header>
        <kw-item-section side>
          <kw-checkbox
            class="pad"
            model-value="N"
          />
        </kw-item-section>
        <kw-item-section class="text-body">
          약관 전체 동의
        </kw-item-section>
      </template>
      <kw-item>item</kw-item>
    </kw-expansion-item>
  </kw-list>
</template>

<script setup>
/* eslint-disable */
const showDummyWindow = ref(false);
const arrModel2 = ref([]);
const items = ref([
  { id: '1', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '2', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '3', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '4', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '5', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
]);
const paddingString = ref('');
const padding = ref(undefined);
const dense = ref(undefined);
const itemDense = ref(undefined);
const itemPadding = ref(undefined);
const itemPaddingString = ref('');
</script>

<style scoped lang="scss">
body.mobile:not(.tablet) {
  .maybe-window {
    position: fixed;
    inset: 0;
    border: 1px solid black;
    z-index: 2999;
    background-color: #fff;
    overflow: auto;
  }
}

.slot-handler {
  border: 1px solid red;
}

.maybe-page-contents {
  padding: 20px;
}
</style>
