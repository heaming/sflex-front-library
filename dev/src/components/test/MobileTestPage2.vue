<template>
  <kw-btn
    primary
    label="주소확인"
    @click="showDummyWindow = !showDummyWindow"
  />
  <div
    v-if="showDummyWindow"
    class="maybe-window"
  >
    <kw-page>
      <template #header>
        <kw-page-mobile-header
          title="주소확인"
          show-close
          @close="showDummyWindow = !showDummyWindow"
        >
          <template #hint>
            test
          </template>

          <template #more>
            <kw-btn label="test" />
            <kw-btn label="test" />
            <kw-btn label="test" />
            <kw-btn label="test" />
          </template>

          <template #etc>
            <kw-btn
              borderless
              label="한글 입력"
            />
            <kw-btn
              borderless
              label="영문 입력"
            />
          </template>
        </kw-page-mobile-header>
      </template>

      <div class="maybe-page-contents">
        <kw-list
          v-if="false"
          dense
          padding
          separator
        >
          <kw-item
            tag="label"
            padding
          >
            <kw-item-section
              side
              top
            >
              <kw-checkbox
                v-model="arrModel"
                val="1"
              />
            </kw-item-section>
            <kw-item-section>
              <kw-item-label>
                도로명 주소
              </kw-item-label>
              <kw-item-label
                font="caption"
                class="text-primary"
              >
                08050
              </kw-item-label>
              <kw-item-label>
                서울특별시 양천구 신정로 11길 63
              </kw-item-label>
              <kw-item-label
                font="caption"
                lines="2"
              >
                11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)
                11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)
                11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)
                11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)
              </kw-item-label>
            </kw-item-section>
          </kw-item>
          <kw-item
            tag="label"
          >
            <kw-item-section
              side
              top
            >
              <kw-checkbox
                v-model="arrModel"
                val="2"
              />
            </kw-item-section>
            <kw-item-section>
              <kw-item-label>
                도로명 주소
              </kw-item-label>
              <kw-item-label
                font="caption"
                class="text-primary"
              >
                08050
              </kw-item-label>
              <kw-item-label>
                서울특별시 양천구 신정로 11길 63
              </kw-item-label>
              <kw-item-label
                font="caption"
                lines="2"
              >
                11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)
              </kw-item-label>
            </kw-item-section>
          </kw-item>
          <kw-item
            tag="label"
          >
            <kw-item-section
              side
              top
            >
              <kw-checkbox
                v-model="arrModel"
                val="3"
              />
            </kw-item-section>
            <kw-item-section>
              <kw-item-label>
                도로명 주소
              </kw-item-label>
              <kw-item-label
                font="caption"
                class="text-primary"
              >
                08050
              </kw-item-label>
              <kw-item-label>
                서울특별시 양천구 신정로 11길 63
              </kw-item-label>
              <kw-item-label
                font="caption"
                lines="2"
              >
                11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)
              </kw-item-label>
            </kw-item-section>
          </kw-item>
        </kw-list>
        <kw-list
          v-model:selected="arrModel2"
          :items="items"
          separator
          padding
          clickable
          item-key="id"
          type="checkbox"
        >
          <template #counter="{selected}">
            {{ selected }}
            <kw-btn
              grid-action
              label="test"
              @click="arrModel2 = items.filter((i) => Number(i.id) % 2 === 0 ).map((s) => s.id)"
            />
          </template>
          <template #item="{item}">
            <kw-item-section>
              <kw-item-label>
                {{ item.title }}
              </kw-item-label>
              <kw-item-label
                font="caption"
                class="text-primary"
              >
                {{ item.addressCode }}
              </kw-item-label>
              <kw-item-label>
                {{ item.address }}
              </kw-item-label>
              <kw-item-label
                font="caption"
                lines="2"
              >
                {{ item.addressDetail }}
              </kw-item-label>
            </kw-item-section>
          </template>
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
</template>

<script setup>
const showDummyWindow = ref(false);
const arrModel2 = ref([]);
const items = ref([
  { id: '1', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '2', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '3', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '4', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '5', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
]);
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
