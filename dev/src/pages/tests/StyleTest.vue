<template>
  <!-- input -->
  <q-expansion-item
    label="Input"
  >
    <div class="result-area">
      <input-form />
    </div>
  </q-expansion-item>
  <!-- select -->
  <q-expansion-item
    label="Select"
  >
    <div class="result-area">
      <select-form />
    </div>
  </q-expansion-item>
  <!-- checkbox -->
  <q-expansion-item
    label="CheckBox"
  >
    <div class="result-area">
      <check-box-form />
    </div>
  </q-expansion-item>
  <!-- button -->
  <q-expansion-item
    label="Button"
  >
    <div class="result-area">
      <button-form />
    </div>
  </q-expansion-item>
  <!-- radio -->
  <q-expansion-item
    label="Radio"
    default-opened
  >
    <div class="result-area">
      <radio-form />
    </div>
  </q-expansion-item>
  <!-- search -->
  <q-expansion-item
    label="CheckBox"
  >
    <div class="result-area">
      <kw-search :cols="0">
        <kw-search-row>
          <kw-search-item :label="'test'">
            <kw-input :label="'test'" />
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
import { InputForm, SelectForm, CheckBoxForm, ButtonForm, RadioForm } from '../../components/test';
</script>

<style scoped>

</style>
