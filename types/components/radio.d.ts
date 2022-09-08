import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwRadioProps {}
interface KwRadioSlots {}
interface KwRadio extends ComponentPublicInstance<KwRadioProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwRadio: GlobalComponentConstructor<KwRadioProps, KwRadioSlots>;
  }
}
