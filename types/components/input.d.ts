import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwInputProps {}
interface KwInputSlots {}
interface KwInput extends ComponentPublicInstance<KwInputProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwInput: GlobalComponentConstructor<KwInputProps, KwInputSlots>;
  }
}
