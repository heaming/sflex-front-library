import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwPopupProps {}
interface KwPopupSlots {}
interface KwPopup extends ComponentPublicInstance<KwPopupProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPopup: GlobalComponentConstructor<KwPopupProps, KwPopupSlots>;
  }
}
