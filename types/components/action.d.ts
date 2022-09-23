import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwActionProps {}
interface KwActionSlots {
  /**
   * 좌측 컨텐츠 영역
   */
  left: () => VNode[];

  /**
   * 우측 컨텐츠 영역
   */
  default: () => VNode[];
}
interface KwAction extends ComponentPublicInstance<KwActionProps> {}
interface KwActionTop extends ComponentPublicInstance<KwActionProps> {}
interface KwActionBottom extends ComponentPublicInstance<KwActionProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwAction: GlobalComponentConstructor<KwActionProps, KwActionSlots>;
    KwActionTop: GlobalComponentConstructor<KwActionProps, KwActionSlots>;
    KwActionBottom: GlobalComponentConstructor<KwActionProps, KwActionSlots>;
  }
}
