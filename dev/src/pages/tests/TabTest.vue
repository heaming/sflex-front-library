<template>
  <kw-page>
    <div class="result-area">
      <kw-action-top>
        <template #left>
          <kw-input
            v-model.number="tabCount"
            type="number"
          />
          <kw-checkbox
            v-model="disableYn"
            label="Disable"
          />
          <kw-checkbox
            v-model="verticalYn"
            label="Vertical"
          />
          <kw-checkbox
            v-model="animatedYn"
            label="Animated"
          />
          <kw-checkbox
            v-model="infiniteYn"
            label="Infinite"
          />
          <kw-checkbox
            v-model="swipeableYn"
            label="Swipeable"
          />
        </template>
        <kw-btn @click="tabPanelsRef.previous()">
          Previous
        </kw-btn>
        <kw-btn @click="tabPanelsRef.next()">
          Next
        </kw-btn>
      </kw-action-top>

      <kw-tabs v-model="selected">
        <kw-tab
          v-for="n of tabCount"
          :key="n"
          :name="n"
          :label="n.toString()"
        />
      </kw-tabs>
      <kw-tab-panels
        ref="tabPanelsRef"
        v-model="selected"
        :vertical="verticalYn === 'Y'"
        :animated="animatedYn === 'Y'"
        :infinite="infiniteYn === 'Y'"
        :swipeable="swipeableYn === 'Y'"
      >
        <kw-tab-panel
          v-for="n of tabCount"
          :key="n"
          :name="n"
          :disable="disableYn === 'Y'"
        >
          <div style="height: 300px; border: 1px solid black;">
            {{ n }} <kw-input />
          </div>
        </kw-tab-panel>
      </kw-tab-panels>
    </div>
  </kw-page>
</template>

<script setup>

const tabCount = ref(3);
const selected = ref(1);

const disableYn = ref('N');
const verticalYn = ref('N');
const animatedYn = ref('N');
const infiniteYn = ref('N');
const swipeableYn = ref('N');

const tabPanelsRef = ref();

</script>
