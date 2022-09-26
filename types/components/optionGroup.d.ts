import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseFieldProps, UseFieldInstance } from './private/useField';
import { UseOptionsProps } from './private/useOptions';

interface KwOptionGroupProps extends UseFieldProps, UseOptionsProps {
  /**
   * 현재 선택된 값
   */
  modelValue?: string | number | boolean | Array;

  /**
   * 옵션 그룹 유형
   * @defaultValue `radio`
   */
  type?: 'radio' | 'checkbox' | 'toggle';

  /**
   * 공간을 덜 차지하는 스타일 적용
   */
  dense?: string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * Label 위치 왼쪽으로 설정 여부
   * (type toggle인 경우 default true)
   */
  leftLabel?: boolean;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 선택된 값
   */
  'onUpdate:modelValue'?: (modelValue: string | number | boolean | Array) => void;
}

interface KwOptionGroupSlots {}

export interface KwOptionGroup extends ComponentPublicInstance<KwOptionGroupProps>, UseFieldInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwOptionGroup: GlobalComponentConstructor<KwOptionGroupProps, KwOptionGroupSlots>;
  }
}
