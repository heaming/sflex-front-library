import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwTabs
interface KwTabsProps {
  /**
   * 현재 설정된 값
   */
  modelValue?: number | string;

  /**
   * 현재 설정된 값
   * @defaultValue `right`
   */
  align?: 'left' | 'center' | 'right' | 'justify';

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 설정된 값
   */
  'onUpdate:modelValue'?: (modelValue: any) => void;
}
interface KwTabsSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
interface KwTabs extends ComponentPublicInstance<KwTabsProps> {}

// KwTab
interface KwTabProps {
  /**
   * modelValue 키 값으로 사용된다
   */
  name?: string;

  /**
   * 탭 라벨
   */
  label?: string;

  /**
   * 컴포넌트 상태 비활성화
   */
  disable?: boolean;

  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string;
}
interface KwTabSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
interface KwTab extends ComponentPublicInstance<KwTabProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTabs: GlobalComponentConstructor<KwTabsProps, KwTabsSlots>;
    KwTab: GlobalComponentConstructor<KwTabProps, KwTabSlots>;
  }
}
