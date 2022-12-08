<template>
  <div>
    <kw-btn
      primary
      label="Window1"
      @click="showDummyWindow = !showDummyWindow"
    />
    <kw-btn
      primary
      label="Window2"
      @click="showDummyWindow2 = !showDummyWindow2"
    />
  </div>
  <div
    v-if="showDummyWindow"
    class="maybe-window"
  >
    <kw-page>
      <template #more>
        <h1>more</h1>
        <kw-btn label="test1" />
        <kw-btn label="test2" />
        <kw-btn label="test3" />
      </template>

      <template
        v-if="showSubHeader"
        #sub-header
      >
        <h1>sub-header</h1>
        <kw-field-wrap
          label="wrapped"
          control-class="bg-bg-body px20"
        >
          <kw-select
            v-model="selectModel"
            label="fit"
            class="fit"
            :options="optionsModel"
            borderless
            :error="true"
          />
          <kw-separator
            vertical
            spaced
            inset
          />
          <kw-select
            v-model="selectModel"
            borderless
            class="fit"
            :options="optionsModel"
            stretch
          />
        </kw-field-wrap>
      </template>

      <h1>content === default</h1>
      <kw-btn
        label="Close Window1"
        @click="showDummyWindow = !showDummyWindow"
      />
      <ul class="slot-handler">
        <li>
          <kw-toggle
            v-model="showSubHeader"
            :true-value="true"
            :false-value="false"
            label="sub-header"
          />
        </li>
        <li>
          <kw-toggle
            v-model="showLorem"
            :true-value="true"
            :false-value="false"
            label="long content"
          />
        </li>
        <li>
          <kw-toggle
            v-model="showFooter"
            :true-value="true"
            :false-value="false"
            label="footer"
          />
        </li>
        <li>
          <kw-toggle
            v-model="showAction"
            :true-value="true"
            :false-value="false"
            label="action"
          />
        </li>
      </ul>

      <template v-if="showLorem">
        <div
          v-for="n in 10"
          :key="`lorem${n}`"
        >
          {{ lorem }}
        </div>
      </template>

      <template
        v-if="showFooter"
        #footer
      >
        <h1>footer</h1>
      </template>

      <template
        v-if="showAction"
        #action
      >
        <kw-btn
          filled
          negative
          label="취소"
          @click="showDummyWindow = !showDummyWindow"
        />
        <kw-btn
          filled
          primary
          label="확인"
        />
      </template>
    </kw-page>
    <kw-page v-if="false">
      <template #sub-header>
        <kw-field-wrap
          label="wrapped"
          control-class="bg-bg-body px20"
        >
          <kw-select
            v-model="selectModel"
            label="fit"
            class="fit"
            :options="optionsModel"
            borderless
            :error="true"
          />
          <kw-separator
            vertical
            spaced
            inset
          />
          <kw-select
            v-model="selectModel"
            borderless
            class="fit"
            :options="optionsModel"
            stretch
          />
        </kw-field-wrap>
        <div
          v-if="false"
          class="maybe-item-container flex no-wrap items-end"
        >
          <kw-field-wrap
            class="col"
            control-class="bg-bg-body px20"
          >
            <kw-select
              v-model="selectModel"
              label="fit"
              class="fit"
              :options="optionsModel"
              borderless
            />
            <kw-separator
              vertical
              spaced
              inset
            />
            <kw-select
              v-model="selectModel"
              borderless
              class="fit"
              :options="optionsModel"
              stretch
            />
          </kw-field-wrap>
        </div>
        <kw-select
          v-if="false"
          v-model="selectModel"
          outlined
          label="fit1"
          :options="optionsModel"
        />
        <kw-input
          v-model="strModel"
          outlined
          label="default"
          rules="required"
          error-message="긴한글은어떻게처리하려나너무나도궁금하고궁금한워드브레이크의기이한현상"
          prefix="pr"
          suffix="sf"
        >
          <template #after>
            af
          </template>
        </kw-input>
        <kw-field v-if="false">
          <kw-checkbox
            v-model="ynModel"
            dense
            :label="'test'"
          />
        </kw-field>
        <kw-input
          v-if="false"
          type="textarea"
          label="default"
          rules="required"
          error-message="긴한글은어떻게처리하려나너무나도궁금하고궁금한워드브레이크의기이한현상"
          prefix="pr"
          suffix="sf"
          autogrow
        />
        <q-field
          v-if="false"
          label="test"
          class="kw-field"
          prefix="pr"
          suffix="sf"
        >
          <template #control>
            <div>
              <span>클래스 테스트를 위한 임의의 컴포넌트</span>
            </div>
          </template>
        </q-field>
      </template>

      <kw-form>
        <div class="maybe-item-container flex no-wrap items-end">
          <kw-select
            v-model="selectModel"
            label="fit1"
            class="fit"
            :options="optionsModel"
          />
          <kw-select
            v-model="selectModel"
            class="fit"
            :options="optionsModel"
          />
        </div>
        <kw-input
          v-model="strModel"
          label="default"
          :rules="{ 'required': true }"
          error-message="긴한글은어떻게처리하려나너무나도궁금하고궁금한워드브레이크의기이한현상"
          prefix="pr"
          suffix="sf"
          clearable
        >
          <template #after>
            af
          </template>
        </kw-input>
        <kw-input
          v-if="true"
          type="textarea"
          label="textarea"
          rules="required"
          dense
          outlined
          error-message="긴한글은어떻게처리하려나너무나도궁금하고궁금한워드브레이크의기이한현상"
          prefix="pr"
          suffix="sf"
          rows="3"
        />
        <kw-file
          label="file multiple"
          multiple
        />
        <kw-file label="file" />
        <kw-date-picker
          label="date-picker"
          grow
        />
        <q-field
          label="클래스 테스트를 위한 임의의 컴포넌트"
          class="kw-field"
          prefix="pr"
          suffix="sf"
        >
          <template #control>
            <kw-checkbox
              v-model="ynModel"
              dense
              :label="'test'"
            />
          </template>
        </q-field>
        <div class="flex">
          <kw-field
            label="kw-field-wrap"
            :error="ynModel === 'Y'"
            :error-message="'가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사'"
          >
            <kw-checkbox
              v-model="ynModel"
              dense
              :label="'test'"
            />
          </kw-field>
          <kw-field
            label="kw-field-wrap"
            :error="ynModel === 'Y'"
            :error-message="'가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사'"
          >
            <kw-checkbox
              v-model="ynModel"
              dense
              :label="'test'"
            />
          </kw-field>
        </div>
      </kw-form>

      <template #more>
        <kw-btn label="test1" />
        <kw-btn label="test2" />
        <kw-btn label="test3" />
      </template>

      <template #action>
        <kw-btn
          filled
          negative
          label="취소"
        />
        <kw-btn
          filled
          primary
          label="확인"
        />
      </template>
    </kw-page>
  </div>
  <div
    v-if="showDummyWindow2"
    class="maybe-window"
  >
    <kw-page>
      <template #header>
        <kw-page-mobile-header
          title="주소확인"
          show-close
          @close="showDummyWindow2 = !showDummyWindow2"
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
          <kw-item tag="label">
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
          <kw-item tag="label">
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
          <template #counter="{ selected }">
            {{ selected }}
            <kw-btn
              grid-action
              label="test"
              @click="arrModel2 = items.filter((i) => Number(i.id) % 2 === 0).map((s) => s.id)"
            />
          </template>
          <template #item="{ item }">
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
const strModel = ref('');
const ynModel = ref('N');
const arrModel = ref([]);
const arrModel2 = ref([]);
const selectModel = ref('');
const optionsModel = ['a', 'b'];
const showDummyWindow = ref(false);
const showDummyWindow2 = ref(true);
const showSubHeader = ref(false);
const showFooter = ref(false);
const showAction = ref(false);
const showLorem = ref(false);
const items = ref([
  { id: '1', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '2', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '3', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '4', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
  { id: '5', title: '도로명 주소', addressCode: '08050', address: '서울특별시 양천구 신정로 11길 63', addressDetail: '11612번지 푸른마을3단지 아파트 301동 2012호 (양천구, 실미도)' },
]);

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

// eslint-disable-next-line no-unused-vars
const testLogger = (payload) => {
  console.log(payload);
};
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
