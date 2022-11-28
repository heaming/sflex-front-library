import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { SunEditorOptions } from 'suneditor/src/options';
import { UseFieldProps, UseFieldInstance } from './private/useField';

interface KwEditorProps extends UseFieldProps {
  modelValue?: string;
  disable?: boolean | undefined;
  readonly?: boolean | undefined;
  options?: SunEditorOptions | undefined;
}
interface KwEditorSlots {}
export interface KwEditor extends ComponentPublicInstance<KwEditorProps>, UseFieldInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwEditor: GlobalComponentConstructor<KwEditorProps, KwEditorSlots>;
  }
}
