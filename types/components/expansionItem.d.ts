import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QExpansionItemProps, QExpansionItemSlots } from 'quasar';

type privateKey = 'dark' | 'group';

interface KwExpansionItemProps extends Omit<QExpansionItemProps, privateKey> {}
interface KwExpansionItemSlots extends QExpansionItemSlots {}

export interface KwExpansionItem extends ComponentPublicInstance<KwExpansionItemProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwExpansionItem: GlobalComponentConstructor<KwExpansionItemProps, KwExpansionItemSlots>;
  }
}
