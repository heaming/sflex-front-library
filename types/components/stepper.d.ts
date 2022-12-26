import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QStepperNavigationProps, QStepperNavigationSlots, QStepperProps, QStepperSlots, QStepProps, QStepSlots } from 'quasar';
import { UsePanelProps, UsePanelsProps } from './private/usePanels';

type FallThroughStepperProps = 'alternativeLabels' | 'headerNav' | 'headerClass' | 'inactiveColor' | 'inactiveIcon' | 'doneIcon' | 'doneColor' | 'activeIcon' | 'activeColor' | 'errorIcon' | 'errorColor';

// KwStepper
interface KwStepperProps extends Pick<QStepperProps, FallThroughStepperProps>, UsePanelsProps {}
interface KwStepperSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwStepper extends ComponentPublicInstance<KwStepperProps> {
  /**
   * 다음 패널로 이동
   */
  next: () => void;

  /**
   * 이전 패널로 이동
   */
  previous: () => void;

  /**
   * 해당하는 패널로 이동
   */
  goTo: (panelName: string) => void;
}

type FallThroughStepProps = 'name' | 'disable' | 'icon' | 'color' | 'title' | 'caption' | 'prefix' | 'doneIcon' | 'doneColor' | 'activeIcon' | 'activeColor' | 'errorIcon' | 'errorColor' | 'headerNav' | 'done' | 'error';

// KwStep
interface KwStepProps extends Pick<QStepProps, FallThroughStepProps> {
  /**
   * 표시할 heading text, 지정하지 않으면 title이 나온다
   */
  headingText?: string;

  /**
   * 표시할 툴팁 컨텐츠
   */
  tooltip?: string;
}
interface KwStepSlots extends QStepSlots {}
export interface KwStep extends ComponentPublicInstance<KwStepProps> {}

// KwStepPanel
interface KwStepPanelProps extends UsePanelProps {}
interface KwStepPanelSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwStepPanel extends ComponentPublicInstance<KwStepPanelProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwStepper: GlobalComponentConstructor<KwStepperProps, KwStepperSlots>;
    KwStep: GlobalComponentConstructor<KwStepProps, KwStepSlots>;
    KwStepPanel: GlobalComponentConstructor<KwStepPanelProps, KwStepPanelSlots>;
  }
}
