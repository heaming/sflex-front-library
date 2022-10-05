<template>
  <kw-form
    ref="formRef"
    :cols="0"
  >
    <!-- quasar -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <q-btn-dropdown
          v-model="boolModel"
          :label="'label'"
          icon="bookmark_off_16"
          icon-right="bookmark_off_16"
          no-caps
          dropdown-icon="bookmark_on_16"
          color="primary"
          toggle-aria-label="toggle-aria-label"
          :split="false"
          :disable-main-btn="false"
          :disable-dropdown="false"
        >
          <div
            v-close-popup
            style="display: flex; flex-flow: column;"
          >
            <kw-btn
              label="길게길게길게길게길게길게길게길게길게길게길게길게"
              @click="onItemClick"
            />
            <kw-btn
              label="길게길게길게길게길게길게길게길게길게길게길게길게"
            />
            <kw-btn
              label="길게길게길게길게길게길게길게길게길게길게길게길게"
            />
          </div>

          <q-list v-if="false">
            <q-item
              v-close-popup
              clickable
            >
              <q-item-section>
                <kw-btn label="길게길게길게길게길게길게길게길게길게길게길게길게" />
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              @click="onItemClick"
            >
              <q-item-section>
                <q-item-label>Videos</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              clickable
              @click="onItemClick"
            >
              <q-item-section>
                <q-item-label>Articles</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <span>{{ boolModel }}</span>
      </kw-form-item>
    </kw-form-row>
    <!-- default -->
    <kw-form-row>
      <kw-form-item label="quasar">
        <kw-btn-dropdown
          :label="'상품등록'"
          primary
          dense
        >
          <kw-btn
            filled
            :label="'기준상품등록'"
            @click="onItemClick"
          />
          <kw-btn
            filled
            align="center"
            :label="'기준상품등록'"
          />
          <kw-btn
            border-color="bg-white"
            align="left"
            :label="'기준상품등록'"
          />
        </kw-btn-dropdown>
      </kw-form-item>
    </kw-form-row>
  </kw-form>
</template>

<script setup>
import { alert } from '../../../../src/plugins/dialog';

const boolModel = ref(false);

function onItemClick() {
  alert('click!');
}

</script>
