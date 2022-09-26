import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwBtnProps {}
interface KwBtnSlots {}
export interface KwBtn extends ComponentPublicInstance<KwBtnProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwBtn: GlobalComponentConstructor<KwBtnProps, KwBtnSlots>;
  }
}
