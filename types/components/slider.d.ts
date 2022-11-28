import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QSliderProps, QSliderSlots } from 'quasar';

type FallThroughProps = 'modelValue' | 'labelValue' | 'name' | 'dark' | 'min' | 'max' | 'innerMin' | 'innerMax' | 'step' | 'snap' | 'vertical' | 'reverse' | 'color' | 'markerLabelsClass' | 'label' | 'labelColor' | 'labelTextColor' | 'labelAlways' | 'switchLabelSide' | 'markers' | 'markerLabels' | 'switchMarkerLabelsSide' | 'trackImg' | 'trackColor' | 'innerTrackImg' | 'innerTrackColor' | 'selectionColor' | 'selectionImg' | 'thumbSize' | 'trackSize' | 'disable' | 'readonly' | 'dense' | 'tabindex' | 'thumbColor' | 'thumbPath' | 'onChange' | 'onPan' | 'onUpdate:modelValue';

interface KwSliderProps extends Pick<QSliderProps, FallThroughProps> {}
interface KwSliderSlots extends QSliderSlots {}

export interface KwSlider extends ComponentPublicInstance<KwSliderProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSlider: GlobalComponentConstructor<KwSliderProps, KwSliderSlots>;
  }
}
