import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwFileProps {}
interface KwFileSlots {}
interface KwFile extends ComponentPublicInstance<KwFileProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwFile: GlobalComponentConstructor<KwFileProps, KwFileSlots>;
  }
}
