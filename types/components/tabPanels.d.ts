import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UsePanelProps, UsePanelsProps } from './private/usePanels';

// KwTabPanels
interface KwTabPanelsProps extends UsePanelsProps {}
interface KwTabPanelsSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwTabPanels extends ComponentPublicInstance<KwTabPanelsProps> {
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

// KwTabPanel
interface KwTabPanelProps extends UsePanelProps {}
interface KwTabPanelSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwTabPanel extends ComponentPublicInstance<KwTabPanelProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTabPanels: GlobalComponentConstructor<KwTabPanelsProps, KwTabPanelsSlots>;
    KwTabPanel: GlobalComponentConstructor<KwTabPanelProps, KwTabPanelSlots>;
  }
}
