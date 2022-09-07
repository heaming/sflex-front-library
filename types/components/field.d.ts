import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwFieldProps {}
interface KwFieldSlots {}
interface KwField extends ComponentPublicInstance<KwFieldProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwField: GlobalComponentConstructor<KwFieldProps, KwFieldSlots>;
  }
}
