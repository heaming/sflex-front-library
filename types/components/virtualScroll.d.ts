import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QVirtualScrollProps, QVirtualScrollSlots } from 'quasar';

interface KwVirtualScrollProps extends QVirtualScrollProps {}
interface KwVirtualScrollSlots extends QVirtualScrollSlots {}

export interface KwVirtualScroll extends ComponentPublicInstance<KwVirtualScrollProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwVirtualScroll: GlobalComponentConstructor<KwVirtualScrollProps, KwVirtualScrollSlots>;
  }
}
