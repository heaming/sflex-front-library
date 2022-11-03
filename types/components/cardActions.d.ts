import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwCardActionsProps {}
interface KwCardActionsSlots {
  default: () => VNode[];
}

export interface KwCardActions extends ComponentPublicInstance<KwCardActionsProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwCardActions: GlobalComponentConstructor<KwCardActionsProps, KwCardActionsSlots>;
  }
}
