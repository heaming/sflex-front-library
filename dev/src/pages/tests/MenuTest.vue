<template>
  <kw-page>
    <div class="result-area">
      <kw-btn class="w300">
        오픈!
        <kw-menu
          title="타이틀 테스트"
          fit
          behavior="dialog"
        >
          <kw-list>
            <kw-item
              v-for="n of 10"
              :key="n"
              tag="label"
              padding
            >
              <kw-item-section
                side
                top
              >
                <kw-checkbox
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
          </kw-list>

          <template #action>
            <kw-btn
              grow
              label="확인"
              primary
            />
          </template>
        </kw-menu>
      </kw-btn>
    </div>
  </kw-page>
</template>

<script setup>

// eslint-disable-next-line no-unused-vars
const value = ref(true);

// eslint-disable-next-line no-unused-vars
function onUpdateValue(val) {
  console.log(val);
  value.value = val;
}

</script>
