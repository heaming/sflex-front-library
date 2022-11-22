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

/**
 * 삭제 예정.
 *
 * @deprecated
 */
export interface KwActionBar extends ComponentPublicInstance<KwActionBarProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    /**
     * 삭제 예정.
     *
     * @deprecated
     */
    KwActionBar: GlobalComponentConstructor<KwActionBarProps, KwActionBarSlots>;
  }
}
