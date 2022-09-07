import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwBtnToggleProps {}
interface KwBtnToggleSlots {}
interface KwBtnToggle extends ComponentPublicInstance<KwBtnToggleProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwBtnToggle: GlobalComponentConstructor<KwBtnToggleProps, KwBtnToggleSlots>;
  }
}
