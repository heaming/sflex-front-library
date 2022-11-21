<template>
  <div class="w360 bg-green-1">
    <div
      class="maybe-header text-title flex h55 px16 items-center"
      style="width: 100%;"
    >
      <kw-btn
        class="mr16"
        icon="bookmark_on"
        borderless
      />
      <div
        style="margin-right: auto;"
      >
        TITLE
      </div>
      <kw-icon
        name="info_24"
        :tooltip="'hint'"
      />
      <kw-btn-dropdown
        borderless
        dropdown-icon="more"
      >
        <kw-btn label="test1" />
        <kw-btn label="test2" />
        <kw-btn label="test3" />
      </kw-btn-dropdown>
    </div>
    <div class="maybe-search-or-tab">
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
    </div>
    <div class="maybe-page ma20 bg-deep-orange-1">
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
            stretch
          />
        </div>
        <kw-input
          v-model="strModel"
          label="default"
          rules="required"
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
          v-if="false"
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
      </kw-form>
    </div>
  </div>
</template>

<script setup>
const strModel = ref('');
const ynModel = ref('N');
const selectModel = ref('');
const optionsModel = ['a', 'b'];
</script>

<style scoped lang="scss">
body.mobile:not(.tablet) {
  .maybe-page {
    .kw-form {
      display: flex;
      flex-flow: column;
      gap: 8px;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: $lime-1;
      }
    }
  }
}

</style>
