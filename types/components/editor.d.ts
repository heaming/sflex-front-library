import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwEditorProps {}
interface KwEditorSlots {}
export interface KwEditor extends ComponentPublicInstance<KwEditorProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwEditor: GlobalComponentConstructor<KwEditorProps, KwEditorSlots>;
  }
}
