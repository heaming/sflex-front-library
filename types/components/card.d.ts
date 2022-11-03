import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwCardProps {}
interface KwCardSlots {
  default: () => VNode[];
}
interface KwCardActionsProps {}
interface KwCardActionsSlots {
  default: () => VNode[];
}
interface KwCardSectionProps {}
interface KwCardSectionSlots {
  default: () => VNode[];
}

export interface KwCard extends ComponentPublicInstance<KwCardProps> {}
export interface KwCardActions extends ComponentPublicInstance<KwCardActionsProps> {}
export interface KwCardSection extends ComponentPublicInstance<KwCardSectionProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwCard: GlobalComponentConstructor<KwCardProps, KwCardSlots>;
    KwCardActions: GlobalComponentConstructor<KwCardActionsProps, KwCardActionsSlots>;
    KwCardSection: GlobalComponentConstructor<KwCardSectionProps, KwCardSectionSlots>;
  }
}
