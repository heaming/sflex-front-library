import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QSliderProps, QSliderSlots } from 'quasar';

interface KwSliderProps extends QSliderProps {}
interface KwSliderSlots extends QSliderSlots {}

export interface KwSlider extends ComponentPublicInstance<KwSliderProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSlider: GlobalComponentConstructor<KwSliderProps, KwSliderSlots>;
  }
}
