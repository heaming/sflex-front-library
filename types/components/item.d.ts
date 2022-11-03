import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwItemProps {}
interface KwItemSlots {
  default: () => VNode[];
}

export interface KwItem extends ComponentPublicInstance<KwItemProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwItem: GlobalComponentConstructor<KwItemProps, KwItemSlots>;
  }
}
