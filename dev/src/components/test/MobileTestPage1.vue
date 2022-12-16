<template>
  <kw-btn
    primary
    label="Layout"
    @click="showDummyWindow = !showDummyWindow"
  />
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
    <kw-page
      v-if="false"
    >
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
        <div
          class="maybe-item-container flex no-wrap items-end"
        >
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
          :rules="{'required': true}"
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
        <kw-file
          label="file"
        />
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
</template>

<script setup>
const strModel = ref('');
const ynModel = ref('N');
const selectModel = ref('');
const optionsModel = ['a', 'b'];
const showDummyWindow = ref(false);
const showSubHeader = ref(false);
const showFooter = ref(false);
const showAction = ref(false);
const showLorem = ref(false);

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
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
