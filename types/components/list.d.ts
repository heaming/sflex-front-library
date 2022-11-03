import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwListProps {}
interface KwListSlots {
  default: () => VNode[];
}

export interface KwList extends ComponentPublicInstance<KwListProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwList: GlobalComponentConstructor<KwListProps, KwListSlots>;
  }
}
