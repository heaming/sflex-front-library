import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseFieldProps, UseFieldStyleProps, UseFieldInstance } from './private/useField';

// KwTimePicker
interface KwTimePickerProps extends UseFieldProps, UseFieldStyleProps {
  /**
   * 현재 설정된 값
   */
  modelValue?: any;

  /**
   * input의 mask 문자 제거 여부
   * (적용 시 HH:mm이면, HHmm로 변환)
   * @defaultValue `true`
   */
  unmaskedValue?: string;

  /**
   * 컴포넌트 읽기전용 모드
   */
  readonly?: boolean;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * input placeholder
   */
  placeholder?: string;
}
interface KwTimePickerSlots {}
interface KwTimePicker extends ComponentPublicInstance<KwTimePickerProps>, UseFieldInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTimePicker: GlobalComponentConstructor<KwTimePickerProps, KwTimePickerSlots>;
  }
}
