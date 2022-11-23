import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QCardActionsProps, QCardActionsSlots, QCardProps, QCardSectionProps, QCardSectionSlots, QCardSlots } from 'quasar';

interface KwCardProps extends QCardProps {}
interface KwCardSlots extends QCardSlots {}
interface KwCardActionsProps extends QCardActionsProps {}
interface KwCardActionsSlots extends QCardActionsSlots {}
interface KwCardSectionProps extends QCardSectionProps {}
interface KwCardSectionSlots extends QCardSectionSlots {}

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
