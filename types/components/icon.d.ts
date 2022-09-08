import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwIconProps {}
interface KwIconSlots {}
interface KwIcon extends ComponentPublicInstance<KwIconProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwIcon: GlobalComponentConstructor<KwIconProps, KwIconSlots>;
  }
}
