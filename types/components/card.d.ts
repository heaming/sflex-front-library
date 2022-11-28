import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QCardActionsProps, QCardActionsSlots, QCardProps, QCardSectionProps, QCardSectionSlots, QCardSlots } from 'quasar';

type FallThroughCardProps = 'tag' | 'dark' | 'square' | 'flat' | 'bordered';

type FallThroughCardActionsProps = 'align' | 'vertical';

type FallThroughCardSectionProps = 'tag' | 'horizontal';

interface KwCardProps extends Pick<QCardProps, FallThroughCardProps> {}
interface KwCardSlots extends QCardSlots {}
interface KwCardActionsProps extends Pick<QCardActionsProps, FallThroughCardActionsProps> {}
interface KwCardActionsSlots extends QCardActionsSlots {}
interface KwCardSectionProps extends Pick<QCardSectionProps, FallThroughCardSectionProps> {}
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
