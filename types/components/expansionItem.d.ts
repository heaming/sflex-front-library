import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwExpansionItemProps {}
interface KwExpansionItemSlots {
  default: () => VNode[];
}

export interface KwExpansionItem extends ComponentPublicInstance<KwExpansionItemProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwExpansionItem: GlobalComponentConstructor<KwExpansionItemProps, KwExpansionItemSlots>;
  }
}
