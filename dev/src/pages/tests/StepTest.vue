<template>
  <kw-page>
    <div class="result-area">
      <kw-action-top>
        <template #left>
          <kw-input
            v-model.number="stepCount"
            type="number"
          />
          <kw-checkbox
            v-model="alternativeLabelsYn"
            label="AlternativeLabels"
          />
          <kw-checkbox
            v-model="headingTextYn"
            label="HeadingText"
          />
          <kw-checkbox
            v-model="headerNavYn"
            label="headerNav"
          />
          <kw-checkbox
            v-model="disableYn"
            label="Disable"
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
        <kw-btn @click="stepperRef.previous()">
          Previous
        </kw-btn>
        <kw-btn @click="stepperRef.next()">
          Next
        </kw-btn>
      </kw-action-top>

      <kw-stepper
        ref="stepperRef"
        v-model="selected"
        :alternative-labels="alternativeLabelsYn === 'Y'"
        :heading-text="headingTextYn === 'Y'"
        :header-nav="headerNavYn === 'Y'"
        :animated="animatedYn === 'Y'"
        :infinite="infiniteYn === 'Y'"
        :swipeable="swipeableYn === 'Y'"
      >
        <kw-step
          v-for="n of stepCount"
          :key="n"
          :name="n"
          :prefix="n"
          :title="`스탭${n}\n줄바꿈`"
          :done="selected > n"
          :done-icon="selected - 1 === n ? 'retry' : undefined"
          :disable="disableYn === 'Y'"
          :tooltip="`스탭${n}\n줄바꿈`"
        />

        <kw-step-panel
          v-for="n of stepCount"
          :key="n"
          :name="n"
          :disable="disableYn === 'Y'"
        >
          <div class="h200 bg-blue">
            스탭 {{ n }} 패널
          </div>
        </kw-step-panel>
      </kw-stepper>
    </div>
  </kw-page>
</template>

<script setup>

const stepperRef = ref();

const stepCount = ref(10);
const selected = ref(1);

const alternativeLabelsYn = ref('N');
const headingTextYn = ref('N');
const headerNavYn = ref('N');
const disableYn = ref('N');
const animatedYn = ref('N');
const infiniteYn = ref('N');
const swipeableYn = ref('N');

</script>
