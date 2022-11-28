import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

interface KwScrollPickerProps {
  /**
   * write me!!
   */
  modelValue?: number | string | boolean | undefined;

  /**
   * write me!!
   */
  items?: Array<number | string | boolean | undefined>;

  /**
   * write me!!
   * @default 34
   */
  itemSize?: number;

  /**
   * write me!!
   * @default 18
   */
  itemAngle?: number;

  /**
   * write me!!
   * @default 18
   */
  infinite?: boolean | undefined;

  /**
   * write me!!
   */
  'onUpdate:modelValue'?: (value: any) => void;
}

interface KwScrollPickerSlots {}

export interface KwScrollPicker extends ComponentPublicInstance<KwScrollPickerProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwScrollPicker: GlobalComponentConstructor<KwScrollPickerProps, KwScrollPickerSlots>;
  }
}
