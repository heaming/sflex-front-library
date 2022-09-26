import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwSelectProps {}
interface KwSelectSlots {}
export interface KwSelect extends ComponentPublicInstance<KwSelectProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSelect: GlobalComponentConstructor<KwSelectProps, KwSelectSlots>;
  }
}
