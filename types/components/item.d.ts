import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwItemProps {}
interface KwItemSlots {
  default: () => VNode[];
}
interface KwItemLabelProps {}
interface KwItemLabelSlots {
  default: () => VNode[];
}
interface KwItemSectionProps {}
interface KwItemSectionSlots {
  default: () => VNode[];
}

export interface KwItem extends ComponentPublicInstance<KwItemProps> {}
export interface KwItemLabel extends ComponentPublicInstance<KwItemLabelProps> {}
export interface KwItemSection extends ComponentPublicInstance<KwItemSectionProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwItem: GlobalComponentConstructor<KwItemProps, KwItemSlots>;
    KwItemLabel: GlobalComponentConstructor<KwItemLabelProps, KwItemLabelSlots>;
    KwItemSection: GlobalComponentConstructor<KwItemSectionProps, KwItemSectionSlots>;
  }
}
