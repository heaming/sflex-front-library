import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwCardSectionProps {}
interface KwCardSectionSlots {
  default: () => VNode[];
}

export interface KwCardSection extends ComponentPublicInstance<KwCardSectionProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwCardSection: GlobalComponentConstructor<KwCardSectionProps, KwCardSectionSlots>;
  }
}
