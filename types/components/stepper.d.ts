import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwStepper
interface KwStepperProps {}
interface KwStepperSlots {}
interface KwStepper extends ComponentPublicInstance<KwStepperProps> {}

// KwStep
interface KwStepProps {}
interface KwStepSlots {}
interface KwStep extends ComponentPublicInstance<KwStepProps> {}

// KwStepperNavigation
interface KwStepperNavigationProps {}
interface KwStepperNavigationSlots {}
interface KwStepperNavigation extends ComponentPublicInstance<KwStepperNavigationProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwStepper: GlobalComponentConstructor<KwStepperProps, KwStepperSlots>;
    KwStep: GlobalComponentConstructor<KwStepProps, KwStepSlots>;
    KwStepperNavigation: GlobalComponentConstructor<KwStepperNavigationProps, KwStepperNavigationSlots>;
  }
}
