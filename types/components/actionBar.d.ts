import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwActionBarProps {}
interface KwActionBarSlots {
  /**
   * 좌측 컨텐츠 영역
   */
  left: () => VNode[];

  /**
   * 우측 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwActionBar extends ComponentPublicInstance<KwActionBarProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwActionBar: GlobalComponentConstructor<KwActionBarProps, KwActionBarSlots>;
  }
}
