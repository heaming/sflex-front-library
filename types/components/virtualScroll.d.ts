import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwVirtualScrollProps {}
interface KwVirtualScrollSlots {
  default: () => VNode[];
}

export interface KwVirtualScroll extends ComponentPublicInstance<KwVirtualScrollProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwVirtualScroll: GlobalComponentConstructor<KwVirtualScrollProps, KwVirtualScrollSlots>;
  }
}
