<template>
  <!-- Mobile test -->
  <q-expansion-item
    v-if="true"
    label="Mobile"
    default-opened
  >
    <div class="result-area">
      <mobile-comp-test />
    </div>
  </q-expansion-item>
  <!-- Form -->
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
    v-if="false"
    label="Button"
    :default-opened="false"
  >
    <div class="result-area">
      <btn-form />
    </div>
  </q-expansion-item>
  <!-- button dropdown -->
  <q-expansion-item
    v-if="false"
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
  <!-- scroll test -->
  <q-expansion-item
    v-if="false"
    label="scroll"
    :default-opened="false"
  >
    <div class="result-area">
      <div
        v-if="false"
        class="bg-grey-3 pa10 user"
        style="display: grid;"
      >
        <div
          class="bg-green-3 pa10 scr fit"
          style="position: relative; min-height: 300px; max-height: 500px; min-width: 300px; max-width: 500px;"
        >
          <div
            class="bg-blue-3 pa10 scr-container"
            style="width: auto;
            height: auto;
            overflow: auto;
            max-height: 100%;
            max-width: 100%;"
          >
            <div
              class="bg-red-3 scr-scroll pa10"
              style="width: max-content;
                      height: max-content;"
            >
              <div class="w800 h500 bg-yellow-4 scr-contents">
                contents
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-green-1 pa20 w800 h800"
      >
        <kw-scroll-area
          ref="scrollAreaRef"
          class="bg-red-1 fit"
        >
          <div
            class="bg-green-3 w500 h900"
            style="border: 3px solid red;"
          />
        </kw-scroll-area>
      </div>

      <div
        v-if="false"
        class="bg-green-1 pa20"
      >
        <div style="display: flex; max-height: 300px;">
          <div class="w200 bg-yellow-3" />
          <kw-scroll-area
            class="bg-red-1"
            style="flex-grow: 1;"
          >
            <h3>test</h3>
            <div
              class="bg-green-3"
              style="border: 3px solid red; height: 500px;"
            />
          </kw-scroll-area>
        </div>
      </div>
      <span
        v-if="false"
      >
        max-width="300px"
        max-height="300px"
        style="display:flex; align-items: stretch; justify-items: stretch; justify-content: stretch;"
      </span>
      <div
        v-if="false"
        class="bg-green-1 pa20 row"
      >
        <div
          class="bg-blue-3"
          style="width: 400px;"
        >
          <div class="w300 h500" />
        </div>
        <div class="col column">
          <h3>test</h3>
          <q-scroll-area
            class="bg-red-1"
            style="border: 3px solid blue; flex-grow: 1;"
          >
            <div
              class="bg-green-3"
              style="border: 3px solid red; height: 600px;"
            />
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-expansion-item>
  <!-- file -->
  <q-expansion-item
    v-if="false"
    label="file"
    :default-opened="true"
  >
    <div class="result-area">
      <file-form />
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
  FileForm,
  Forms,
} from '../../components/test';

const scrollAreaRef = ref();
</script>

<style scoped>

</style>
