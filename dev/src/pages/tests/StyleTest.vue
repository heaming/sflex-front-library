<template>
  <!-- input -->
  <q-expansion-item
    v-if="true"
    label="Form"
  >
    <div class="result-area">
      <forms />
    </div>
  </q-expansion-item>
  <!-- input -->
  <q-expansion-item
    v-if="true"
    label="Input"
  >
    <div class="result-area">
      <input-form />
    </div>
  </q-expansion-item>
  <!-- select -->
  <q-expansion-item
    v-if="false"
    label="Select"
  >
    <div class="result-area">
      <select-form />
    </div>
  </q-expansion-item>
  <!-- checkbox -->
  <q-expansion-item
    v-if="false"
    label="CheckBox"
  >
    <div class="result-area">
      <check-box-form />
    </div>
  </q-expansion-item>
  <!-- button -->
  <q-expansion-item
    v-if="true"
    label="Button"
    :default-opened="false"
  >
    <div class="result-area">
      <btn-form />
    </div>
  </q-expansion-item>
  <!-- button dropdown -->
  <q-expansion-item
    v-if="true"
    label="Button Dropdown"
    :default-opened="true"
  >
    <div class="result-area">
      <btn-dropdown-form />
    </div>
  </q-expansion-item>
  <!-- radio -->
  <q-expansion-item
    v-if="false"
    label="Radio"
  >
    <div class="result-area">
      <radio-form />
    </div>
  </q-expansion-item>
  <!-- toggle -->
  <q-expansion-item
    v-if="false"
    label="toggle"
  >
    <div class="result-area">
      <toggle-form />
    </div>
  </q-expansion-item>
  <!-- search -->
  <q-expansion-item
    v-if="false"
    label="CheckBox"
  >
    <div class="result-area">
      <kw-search :cols="0">
        <kw-search-row>
          <kw-search-item :label="'test'">
            <div>
              <kw-input :label="'test'" />
            </div>
          </kw-search-item>
        </kw-search-row>
        <kw-search-row>
          <kw-search-item :label="'test test test test test test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
        </kw-search-row>
        <kw-search-row>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
        </kw-search-row>
      </kw-search>

      <kw-search class="kw-search--onerow">
        <kw-search-row>
          <kw-search-item :label="'test test test test test test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
          </kw-search-item>
        </kw-search-row>
      </kw-search>
    </div>
  </q-expansion-item>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import {
  InputForm,
  SelectForm,
  CheckBoxForm,
  BtnForm,
  BtnDropdownForm,
  RadioForm,
  ToggleForm,
  Forms,
} from '../../components/test';
</script>

<style scoped>

</style>
