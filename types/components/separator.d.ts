import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwSeparatorProps {}
interface KwSeparatorSlots {}
interface KwSeparator extends ComponentPublicInstance<KwSeparatorProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSeparator: GlobalComponentConstructor<KwSeparatorProps, KwSeparatorSlots>;
  }
}
