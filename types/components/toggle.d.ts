import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { KwCheckboxProps } from './checkbox';

interface KwToggleProps extends KwCheckboxProps {
  /**
   * defualt icon
   */
  icon?: string;

  /**
   * true 일 때 표기되는 icon 의 color
   */
  iconColor?: string;
}

interface KwToggleSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}

export interface KwToggle extends ComponentPublicInstance<KwToggleProps> {
  /**
   * 선택 값 토글
   */
  toggle: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwToggle: GlobalComponentConstructor<KwToggleProps, KwToggleSlots>;
  }
}
