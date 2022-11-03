import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwItemSectionProps {}
interface KwItemSectionSlots {
  default: () => VNode[];
}

export interface KwItemSection extends ComponentPublicInstance<KwItemSectionProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwItemSection: GlobalComponentConstructor<KwItemSectionProps, KwItemSectionSlots>;
  }
}
