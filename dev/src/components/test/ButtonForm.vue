<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <q-btn
          :label="'label'"
        />
        <q-btn
          :icon="'bookmark_on_16'"
        />
        <q-btn
          flat
          :icon="'bookmark_on_16'"
        />
        <q-btn
          flat
          :label="'label'"
          :icon="'bookmark_on_16'"
        />
        <q-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on_16'"
        />

        <q-btn
          no-wrap
          :icon-right="'bookmark_on_16'"
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
          :icon="'bookmark_on_16'"
          dense
        />
        <q-btn
          :icon="'bookmark_on_16'"
          flat
          dense
        />
        <q-btn
          dense
          :label="'label'"
          :icon="'bookmark_on_16'"
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
          :icon="'bookmark_on_16'"
          disable
        />
        <q-btn
          flat
          disable
          :icon="'bookmark_on_16'"
        />
        <q-btn
          flat
          disable
          :label="'label'"
          :icon="'bookmark_on_16'"
        />
        <q-btn
          flat
          disable
          :label="'label'"
          :icon-right="'bookmark_on_16'"
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
          :icon="'bookmark_on_16'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          :icon="'bookmark_on_16'"
        />
        <q-btn
          class="kw-btn--old kw-btn--old--icon-only"
          flat
          :icon="'bookmark_on_16'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          :label="'label'"
          :icon="'bookmark_on_16'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          :label="'label'"
          :icon-right="'bookmark_on_16'"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- old dense-->
    <kw-form-row>
      <kw-form-item label="quasar dense">
        <kw-btn
          :label="'label'"
        />
        <kw-btn
          :icon="'bookmark_on_16'"
        />
        <kw-btn
          flat
          :icon="'bookmark_on_16'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on_16'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on_16'"
        />
      </kw-form-item>
    </kw-form-row>
    <!-- old disable-->
    <kw-form-row>
      <kw-form-item label="old">
        <q-btn
          class="kw-btn--old"
          :label="'label'"
          disable
        />
        <q-btn
          class="kw-btn--old"
          :icon="'bookmark_on_16'"
          disable
        />
        <q-btn
          class="kw-btn--old"
          flat
          disable
          :icon="'bookmark_on_16'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          disable
          :label="'label'"
          :icon="'bookmark_on_16'"
        />
        <q-btn
          class="kw-btn--old"
          flat
          disable
          :label="'label'"
          :icon-right="'bookmark_on_16'"
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
          :icon="'bookmark_on_16'"
        />
        <kw-btn
          flat
          :icon="'bookmark_on_16'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on_16'"
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on_16'"
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
          :icon="'bookmark_on_16'"
          disable
        />
        <kw-btn
          flat
          :icon="'bookmark_on_16'"
          disable
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on_16'"
          disable
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on_16'"
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
          :icon="'bookmark_on_16'"
          dense
        />
        <kw-btn
          flat
          :icon="'bookmark_on_16'"
          dense
        />
        <kw-btn
          flat
          :label="'label'"
          :icon="'bookmark_on_16'"
          dense
        />
        <kw-btn
          flat
          :label="'label'"
          :icon-right="'bookmark_on_16'"
          dense
        />
      </kw-form-item>
    </kw-form-row>
    <!-- activated -->
    <kw-form-row>
      <kw-form-item label="active">
        <kw-btn
          class="q-btn--active"
          :label="'label'"
          dense
        />
        <kw-btn
          class="q-btn--active"
          :icon="'bookmark_on_16'"
          dense
        />
        <kw-btn
          class="q-btn--active"
          flat
          :icon="'bookmark_on_16'"
          dense
        />
        <kw-btn
          class="q-btn--active"
          flat
          :label="'label'"
          :icon="'bookmark_on_16'"
          dense
        />
        <kw-btn

          class="q-btn--active"
          flat
          :label="'label'"
          :icon-right="'bookmark_on_16'"
          dense
        />
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { KwBtn } from '../../../../src/components';
</script>

<style scoped lang="scss">
.kw-form-item__field {
  > div {
    background-color: #eee;
  }
}
</style>
