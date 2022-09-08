import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwTimePicker
interface KwTimePickerProps {}
interface KwTimePickerSlots {}
interface KwTimePicker extends ComponentPublicInstance<KwTimePickerProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTimePicker: GlobalComponentConstructor<KwTimePickerProps, KwTimePickerSlots>;
  }
}
