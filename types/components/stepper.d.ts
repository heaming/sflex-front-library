import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwStepper
interface KwStepperProps {}
interface KwStepperSlots {}
export interface KwStepper extends ComponentPublicInstance<KwStepperProps> {}

// KwStep
interface KwStepProps {}
interface KwStepSlots {}
export interface KwStep extends ComponentPublicInstance<KwStepProps> {}

// KwStepperNavigation
interface KwStepperNavigationProps {}
interface KwStepperNavigationSlots {}
export interface KwStepperNavigation extends ComponentPublicInstance<KwStepperNavigationProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwStepper: GlobalComponentConstructor<KwStepperProps, KwStepperSlots>;
    KwStep: GlobalComponentConstructor<KwStepProps, KwStepSlots>;
    KwStepperNavigation: GlobalComponentConstructor<KwStepperNavigationProps, KwStepperNavigationSlots>;
  }
}
