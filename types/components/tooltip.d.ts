import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

// KwTooltip
interface KwTooltipProps {}
interface KwTooltipSlots {}
interface KwTooltip extends ComponentPublicInstance<KwTooltipProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTooltip: GlobalComponentConstructor<KwTooltipProps, KwTooltipSlots>;
  }
}
