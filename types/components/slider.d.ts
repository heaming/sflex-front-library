import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwSliderProps {}
interface KwSliderSlots {
  default: () => VNode[];
}

export interface KwSlider extends ComponentPublicInstance<KwSliderProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSlider: GlobalComponentConstructor<KwSliderProps, KwSliderSlots>;
  }
}
