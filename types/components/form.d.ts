import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwForm
interface KwFormProps {}
interface KwFormSlots {}
interface KwForm extends ComponentPublicInstance<KwFormProps> {}

// KwFormRow
interface KwFormRowProps {}
interface KwFormRowSlots {}
interface KwFormRow extends ComponentPublicInstance<KwFormRowProps> {}

// KwFormItem
interface KwFormItemProps {}
interface KwFormItemSlots {}
interface KwFormItem extends ComponentPublicInstance<KwFormItemProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwForm: GlobalComponentConstructor<KwFormProps, KwFormSlots>;
    KwFormRow: GlobalComponentConstructor<KwFormRowProps, KwFormRowSlots>;
    KwFormItem: GlobalComponentConstructor<KwFormItemProps, KwFormItemSlots>;
  }
}
