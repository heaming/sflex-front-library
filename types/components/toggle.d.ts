import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwToggle
interface KwToggleProps {}
interface KwToggleSlots {}
interface KwToggle extends ComponentPublicInstance<KwToggleProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwToggle: GlobalComponentConstructor<KwToggleProps, KwToggleSlots>;
  }
}
