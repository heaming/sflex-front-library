import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwItemLabelProps {}
interface KwItemLabelSlots {
  default: () => VNode[];
}

export interface KwItemLabel extends ComponentPublicInstance<KwItemLabelProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwItemLabel: GlobalComponentConstructor<KwItemLabelProps, KwItemLabelSlots>;
  }
}
