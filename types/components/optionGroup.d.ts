import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwOptionGroupProps {}
interface KwOptionGroupSlots {}
interface KwOptionGroup extends ComponentPublicInstance<KwOptionGroupProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwOptionGroup: GlobalComponentConstructor<KwOptionGroupProps, KwOptionGroupSlots>;
  }
}
