import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwChipProps {}
interface KwChipSlots {}
interface KwChip extends ComponentPublicInstance<KwChipProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwChip: GlobalComponentConstructor<KwChipProps, KwChipSlots>;
  }
}
