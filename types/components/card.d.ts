import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwCardProps {}
interface KwCardSlots {
  default: () => VNode[];
}

export interface KwCard extends ComponentPublicInstance<KwCardProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwCard: GlobalComponentConstructor<KwCardProps, KwCardSlots>;
  }
}
