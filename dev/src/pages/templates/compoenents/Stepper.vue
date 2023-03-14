<template>
  <kw-page class="kw-guide">
    <h2 class="kw-guide-h2">
      stepper
    </h2>
    <p class="kw-guide-description">
      stepper
    </p>
    <guide-section
      title="playground"
      description="playground"
      :guide-code="defaultCode2"
    >
      <guide-props
        v-model="bindingProps"
        :props="stepperProps"
        title="stepperProps"
      />
      <guide-props
        v-model="bindingProps1"
        :props="stepProps"
        title="stepProps"
      />
      <guide-props
        v-model="bindingProps2"
        :props="stepperNavigationProps"
        title="stepperNavigationProps"
      />
      <kw-separator />
      <kw-stepper
        ref="stepper"
        v-model="currentStep"
        v-bind="bindingProps"
      >
        <kw-step
          v-for="n in 3"
          :key="`step${n}`"
          v-bind="bindingPropsForSteps[n-1]"
        >
          {{ `step${n} contents` }}
        </kw-step>
        <template #navigation>
          <kw-stepper-navigation
            v-bind="bindingProps2"
          >
            <kw-btn
              primary
              :label="currentStep === 3 ? 'Finish' : 'Continue'"
              @click="stepper.next()"
            />
            <kw-btn
              v-if="currentStep > 1"
              negative
              label="Back"
              @click="stepper.previous()"
            />
          </kw-stepper-navigation>
        </template>
      </kw-stepper>
      <kw-separator />
      <div>
        헤더 클릭 시 이동방식은, kw-stepper에 header-nav 속성을 주면 이동이 가능하다.
        <br>
        active-icon을 통해 현재 step에 해당하는 아이콘, done-icon을 통해 완료된 step의 아이콘 변경이 가능하며,
        <br>
        done 에 특정 조건값을 주면 done 처리, 그렇지 않으면 단순 헤더 이동만 할수도 있다.
        <br>
        <br>
      </div>
      <kw-stepper
        ref="stepper"
        v-model="currentStep"
        header-nav
      >
        <kw-step
          :name="1"
          title="step1 - done 처리 없음"
          prefix="1"
          icon="break"
          active-icon="write"
        />
        <kw-step
          :name="2"
          title="step2 - done 처리 있음"
          prefix="2"
          icon="sms"
          :done="currentStep > 2"
          active-icon="release"
        />
        <kw-step
          :name="3"
          title="step3  - done 처리 있음"
          prefix="3"
          icon="close"
          :done="currentStep > 3"
          done-icon="bookmark_on"
          active-icon="arrow_right"
        />
        <kw-step
          :name="4"
          title="step4  - done 처리 없음"
          prefix="4"
          icon="top"
          active-icon="imgpreview"
        />
      </kw-stepper>
    </guide-section>
    <guide-section
      title="default slot"
      description="=default"
      :guide-code="defaultCode"
    >
      <div>todo</div>
    </guide-section>
  </kw-page>
</template>

<script setup>
const currentStep = ref(1);
const stepNames = [1, 2, 3];
const stepper = ref();
const stepperProps = {
  dark: { type: Boolean, default: undefined },
  keepAlive: { type: Boolean, default: true },
  keepAliveInclude: { type: [String, Array, RegExp], default: undefined },
  keepAliveExclude: { type: [String, Array, RegExp], default: undefined },
  keepAliveMax: { type: Number, default: undefined },
  animated: { type: Boolean, default: undefined },
  infinite: { type: Boolean, default: undefined },
  swipeable: { type: Boolean, default: undefined },
  vertical: { type: Boolean, default: undefined },
  transitionPrev: { type: String, default: 'fade' },
  transitionNext: { type: String, default: 'fade' },
  transitionDuration: { type: [String, Number], default: 0 },
  flat: { type: Boolean, default: undefined },
  bordered: { type: Boolean, default: undefined },
  alternativeLabels: { type: Boolean, default: undefined },
  headerNav: { type: Boolean, default: undefined },
  contracted: { type: Boolean, default: undefined },
  headerClass: { type: String, default: undefined },
  inactiveColor: { type: String, default: undefined },
  inactiveIcon: { type: String, default: undefined },
  doneIcon: { type: String, default: 'checked_stepper' },
  doneColor: { type: String, default: undefined },
  activeIcon: { type: String, default: 'none' },
  activeColor: { type: String, default: undefined },
  errorIcon: { type: String, default: undefined },
  errorColor: { type: String, default: undefined },
};
const stepProps = {
  disable: { type: Boolean, default: undefined },
  icon: { type: String, default: undefined },
  color: { type: String, default: undefined },
  title: { type: [String, Number], required: true },
  caption: { type: String, default: undefined },
  prefix: { type: [String, Number], default: undefined },
  doneIcon: { type: String, default: undefined },
  doneColor: { type: String, default: undefined },
  activeIcon: { type: String, default: undefined },
  activeColor: { type: String, default: undefined },
  errorIcon: { type: String, default: undefined },
  errorColor: { type: String, default: undefined },
  headerNav: { type: Boolean, default: true },
  done: { type: Boolean, default: undefined },
  error: { type: Boolean, default: undefined },
};
const stepperNavigationProps = {};

const bindingProps = ref(null);
const bindingProps1 = ref({
  title: 'step-title',
});
const bindingPropsForSteps = computed(() => stepNames.map((name) => ({
  ...bindingProps1.value,
  name,
})));
const bindingProps2 = ref(null);

const defaultCode = `
      <kw-stepper
        v-bind="bindingProps"
      />`;

const defaultCode2 = `
<kw-stepper
        ref="stepper"
        v-model="currentStep"
        header-nav
      >
        <kw-step
          :name="1"
          title="step1 - done 처리 없음"
          prefix="1"
          icon="break"
          active-icon="write"
        />
        <kw-step
          :name="2"
          title="step2 - done 처리 있음"
          prefix="2"
          icon="sms"
          :done="currentStep > 2"
          active-icon="release"
        />
        <kw-step
          :name="3"
          title="step3  - done 처리 있음"
          prefix="3"
          icon="close"
          :done="currentStep > 3"
          done-icon="bookmark_on"
          active-icon="arrow_right"
        />
        <kw-step
          :name="4"
          title="step4  - done 처리 없음"
          prefix="4"
          icon="top"
          active-icon="imgpreview"
        />
      </kw-stepper>`;
</script>
