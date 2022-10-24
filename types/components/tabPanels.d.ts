import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwTabPanels
interface KwTabPanelsProps {
  /**
   * 현재 설정된 값
   */
  modelValue?: number | string;

  /**
   * 설정 시 탭 방향이 수직이 된다
   */
  vertical?: boolean;

  /**
   * 탭 애니메이션 여부
   */
  animated?: boolean;

  /**
   * 탭 이동 인피니티 여부
   */
  infinite?: boolean;

  /**
   * 탭 스와이프 액션 여부
   */
  swipeable?: boolean;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 설정된 값
   */
  'onUpdate:modelValue'?: (modelValue: any) => void;
}
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
interface KwTabPanelProps {
  /**
   * modelValue 키 값으로 사용된다
   */
  name?: number | string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;
}
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
