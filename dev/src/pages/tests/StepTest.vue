<template>
  <kw-page>
    <div class="result-area">
      <kw-stepper v-model="normalStep">
        <kw-step
          v-for="n of 5"
          :key="n"
          :name="n"
          :title="`step${n}`"
          :done="normalStep > n"
          :prefix="n"
        />

        <kw-step-panel
          v-for="n of 5"
          :key="n"
          :name="n"
        >
          <kw-action-top>
            <template #left>
              <span>총</span>
              <span class="accent pl4">156</span>
            </template>
          </kw-action-top>
          <kw-grid
            :visible-rows="10"
          />
        </kw-step-panel>
      </kw-stepper>
    </div>
    <br>
    <div class="result-area">
      <kw-stepper
        v-model="normalStep"
        heading-text
      >
        <kw-step
          v-for="n of 5"
          :key="n"
          :name="n"
          :title="`step${n}`"
          :done="normalStep > n"
          :prefix="n"
        >
          {{ `step${n}` }}
        </kw-step>

        <kw-step-panel
          v-for="n of 5"
          :key="n"
          :name="n"
        >
          <h3>Form</h3>
          <kw-form>
            <kw-form-row>
              <kw-form-item
                label="new"
              >
                <kw-input />
              </kw-form-item>
              <kw-form-item
                label="new"
              >
                <kw-input />
              </kw-form-item>
            </kw-form-row>
          </kw-form>
        </kw-step-panel>
      </kw-stepper>
    </div>
    <br>
    <div class="result-area">
      <kw-stepper
        v-model="normalStep"
        alternative-labels
        swipeable
      >
        <kw-step
          v-for="n of 5"
          :key="n"
          :name="n"
          :title="`미팅참석\n합계${n}`"
          :done="normalStep > n"
          :prefix="n"
        />

        <kw-step-panel
          v-for="n of 5"
          :key="n"
          :name="n"
        >
          <kw-action-top>
            <template #left>
              <span>총</span>
              <span class="accent pl4">156</span>
            </template>
          </kw-action-top>
          <kw-grid
            :visible-rows="10"
          />
        </kw-step-panel>
      </kw-stepper>
    </div>
  </kw-page>
</template>

<script setup>

const normalStep = ref(2);
</script>
