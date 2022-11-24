import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QStepperNavigationProps, QStepperNavigationSlots, QStepperProps, QStepperSlots, QStepProps, QStepSlots } from 'quasar';

type FallThroughStepperProps = 'dark' | 'modelValue' | 'keepAlive' | 'keepAliveInclude' | 'keepAliveExclude' | 'keepAliveMax' | 'animated' | 'infinite' | 'swipeable' | 'vertical' | 'transitionPrev' | 'transitionNext' | 'transitionDuration' | 'flat' | 'bordered' | 'alternativeLabels' | 'headerNav' | 'contracted' | 'headerClass' | 'inactiveColor' | 'inactiveIcon' | 'doneIcon' | 'doneColor' | 'activeIcon' | 'activeColor' | 'errorIcon' | 'errorColor' | 'onUpdate:modelValue' | 'onBeforeTransition' | 'onTransition';

// KwStepper
interface KwStepperProps extends Pick<QStepperProps, FallThroughStepperProps> {}
interface KwStepperSlots extends QStepperSlots {}
export interface KwStepper extends ComponentPublicInstance<KwStepperProps> {
  /**
   * Go to next panel
   */
  next: () => void;
  /**
   * Go to previous panel
   */
  previous: () => void;
  /**
   * Go to specific panel
   * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
   */
  goTo: (panelName: string | number) => void;
}

type FallThroughStepProps = 'name' | 'disable' | 'icon' | 'color' | 'title' | 'caption' | 'prefix' | 'doneIcon' | 'doneColor' | 'activeIcon' | 'activeColor' | 'errorIcon' | 'errorColor' | 'headerNav' | 'done' | 'error';

// KwStep
interface KwStepProps extends Pick<QStepProps, FallThroughStepProps> {}
interface KwStepSlots extends QStepSlots {}
export interface KwStep extends ComponentPublicInstance<KwStepProps> {}

// KwStepperNavigation
interface KwStepperNavigationProps extends QStepperNavigationProps {}
interface KwStepperNavigationSlots extends QStepperNavigationSlots {}
export interface KwStepperNavigation extends ComponentPublicInstance<KwStepperNavigationProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwStepper: GlobalComponentConstructor<KwStepperProps, KwStepperSlots>;
    KwStep: GlobalComponentConstructor<KwStepProps, KwStepSlots>;
    KwStepperNavigation: GlobalComponentConstructor<KwStepperNavigationProps, KwStepperNavigationSlots>;
  }
}
