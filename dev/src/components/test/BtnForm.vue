<!--  eslint-disable vuejs-accessibility/tabindex-no-positive -->
<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- button toggle -->
    <kw-form-row>
      <kw-form-item label="button toggle">
        <kw-btn-toggle
          v-model="strModel"
          :label="'label'"
          :options="['오늘', '주간', '월간']"
        />
      </kw-form-item>
      <kw-form-item label="button toggle">
        <kw-btn-toggle
          v-model="strModel"
          :label="'label'"
          :options="['A', 'B', 'C', 'D']"
          clearable
          outlined
          color="table-blue"
          toggle-color="primary"
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- coloring -->
    <kw-form-row>
      <kw-form-item label="coloring">
        <kw-btn
          :label="'label'"
          color="primary"
          text-color="negative"
        />
        <kw-btn
          :label="'label'"
          color="primary"
          text-color="negative"
          border-color="negative"
          disable
        />
        <kw-btn
          :icon="'bookmark_on'"
          label="test"
          color="primary"
          text-color="negative"
          borderless
        />
        <kw-btn
          :icon="'bookmark_on'"
          color="bg-white"
          outlined
        />
        <kw-btn
          label="결재요청"
          color="table-blue"
          text-color="primary"
          dense
          outlined
        />
        <div style="width: 40px; height: 40px; background-color: rgb(47 138 243 / 8%);">
          <div style="width: 40px; height: 40px; background-color: rgb(47 138 243); opacity: 0.1;" />
        </div>
      </kw-form-item>
    </kw-form-row>
    <!-- presets -->
    <kw-form-row>
      <kw-form-item label="presets">
        <kw-btn
          :label="'label'"
          primary
        />
        <kw-btn
          :label="'label'"
          negative
        />
        <kw-btn
          :label="'label'"
          secondary
        />
        <kw-btn
          :label="'조회'"
          color="secondary"
          text-color="bg-white"
          padding="50px"
          dense
        />
        <kw-btn
          :label="'label'"
          grid-action
        />
      </kw-form-item>
    </kw-form-row>
    <!-- width, wrap, stack -->
    <kw-form-row :cols="4">
      <kw-form-item label="wrap">
        <kw-btn
          :label="'label wrap test'"
        />
        <kw-btn
          :label="'label wrap test'"
          color="primary"
          no-wrap
        />
      </kw-form-item>
    </kw-form-row>
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <q-btn
          :label="'label'"
          color="primary"
        />
        <q-btn
          :label="'label'"
          disable
        />
        <q-btn
          :label="'label label label label'"
          stack
        >
          <q-icon name="bookmark_on" />
          <span>label</span>
          <div>
            div
          </div>
        </q-btn>
        <q-btn
          :label="'label'"
          no-wrap
          stack
        />
        <q-btn
          :icon="'bookmark_on'"
        />
        <q-btn
          flat
          :icon="'bookmark_on'"
        />
        <q-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <q-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
        />

        <q-btn
          no-wrap
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="quasar test">
        <q-btn
          :label="'label'"
          color="primary"
          fab
        />
        <q-btn
          :icon="'bookmark_on'"
          fab
        />
        <q-btn
          :icon="'bookmark_on'"
          fab-mini
        />
        <q-btn
          flat
          :icon="'bookmark_on'"
        />
        <q-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <q-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
        />

        <q-btn
          no-wrap
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- quasar styles -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <q-btn
          :label="'label'"
          flat
        />
        <q-btn
          :label="'label'"
          outline
        />
        <q-btn
          :label="'label'"
          rounded
        />
        <q-btn
          :label="'label'"
          push
        />
        <q-btn
          :label="'label'"
          square
        />

        <q-btn
          :label="'label'"
          round
        />
      </kw-form-item>
    </kw-form-row>
    <!-- quasar dense-->
    <kw-form-row>
      <kw-form-item label="quasar dense">
        <q-btn
          :label="'label'"
          dense
        />
        <q-btn
          :icon="'bookmark_on'"
          dense
        />
        <q-btn
          :icon="'bookmark_on'"
          flat
          dense
        />
        <q-btn
          dense
          :label="'label'"
          :icon="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- quasar disable -->
    <kw-form-row>
      <kw-form-item label="quasar disable">
        <q-btn
          :label="'label'"
          disable
        />
        <q-btn
          :icon="'bookmark_on'"
          disable
        />
        <q-btn
          flat
          disable
          :icon="'bookmark_on'"
        />
        <q-btn
          flat
          disable
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <q-btn
          flat
          disable
          :label="'label'"
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>

    <!-- old-->
    <kw-form-row>
      <kw-form-item label="old">
        <q-btn
          class="kw-btn--old"
          :label="'label'"
        />
        <q-btn
          class="kw-btn--old"
          :icon="'bookmark_on'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          :icon="'bookmark_on'"
        />
        <q-btn
          class="kw-btn--old kw-btn--old--icon-only"
          flat
          :icon="'bookmark_on'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- old dense-->
    <kw-form-row>
      <kw-form-item label="old dense">
        <kw-btn
          :label="'label'"
        />
        <kw-btn
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- old disable-->
    <kw-form-row>
      <kw-form-item label="old disable">
        <q-btn
          class="kw-btn--old"
          :label="'label'"
          disable
        />
        <q-btn
          class="kw-btn--old"
          :icon="'bookmark_on'"
          disable
        />
        <q-btn
          class="kw-btn--old"
          flat
          disable
          :icon="'bookmark_on'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          disable
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          disable
          :label="'label'"
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>

    <!-- test -->
    <kw-form-row>
      <kw-form-item label="test">
        <div style="width: 20px; height: 60px;" />
        <kw-btn
          :label="'label'"
        />
        <kw-btn
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="default">
        <kw-btn
          :label="'label'"
        />
        <kw-btn
          :icon="'bookmark_on'"
        />
        <kw-btn
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
        />
      </kw-form-item>
    </kw-form-row>

    <!-- disable -->
    <kw-form-row>
      <kw-form-item label="disable">
        <kw-btn
          :label="'label'"
          disable
        />
        <kw-btn
          :icon="'bookmark_on'"
          disable
        />
        <kw-btn
          flat
          :icon="'bookmark_on'"
          disable
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
          disable
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <!-- dense -->
    <kw-form-row>
      <kw-form-item label="dense">
        <kw-btn
          :label="'label'"
          dense
        />
        <kw-btn
          :icon="'bookmark_on'"
          dense
        />
        <kw-btn
          flat
          :icon="'bookmark_on'"
          dense
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
          dense
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <!-- size preset -->
    <kw-form-row>
      <kw-form-item label="size preset">
        <kw-btn
          :label="'label'"
          dense
        />
        <kw-btn
          :icon="'bookmark_on'"
          dense
        />
        <kw-btn
          flat
          :icon="'bookmark_on'"
          dense
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on'"
          dense
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on'"
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <!-- designs -->
    <kw-form-row>
      <kw-form-item label="outlined">
        <kw-btn
          :label="'default'"
        />
        <kw-btn
          :label="'outlined'"
          outlined
        />
        <kw-btn
          :icon="'bookmark_on'"
          outlined
        />
        <kw-btn
          :label="'outlined'"
          outlined
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="filled">
        <kw-btn
          :label="'filled'"
          filled
        />
        <kw-btn
          :icon="'bookmark_on'"
          filled
        />
        <kw-btn
          :label="'filled'"
          filled
          disable
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="underline">
        <kw-btn
          :label="'underline'"
          underline
        />
        <kw-btn
          :icon="'bookmark_on'"
          underline
        />
        <kw-btn
          :label="'underline'"
          underline
          disable
        />
        <kw-btn
          :label="'underline'"
          :icon-right="'bookmark_on'"
          underline
          disable
          style="font-size: 30px; line-height: 1.2em;"
        />
      </kw-form-item>
    </kw-form-row>
    <kw-form-row>
      <kw-form-item label="borderless">
        <kw-btn
          :label="'borderless'"
          borderless
        />
        <kw-btn
          :icon="'bookmark_on'"
          borderless
        />
        <kw-btn
          :label="'outlined'"
          borderless
          disable
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwBtn, KwBtnToggle } from '../../../../src/components';

const strModel = ref('오늘');
</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #fff;
  }
}
</style>
