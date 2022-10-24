import { ComponentPublicInstance, Ref, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseFieldProps, UseFieldInstance } from './private/useField';

export interface KwFieldProps extends UseFieldProps {
  /**
   * 현재 설정된 값
   */
  modelValue?: any;

  /**
   * slot field를 바인딩하는 컴포넌트에서 사용하는 value key
   */
  fieldKey?: any;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 설정된 값
   */
  'onUpdate:modelValue'?: (modelValue: any) => void;
}

interface KwFieldSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: (otions: {
    field: {
      fieldKey: Ref<any>;
      onUpdateFieldKey: (fieldValue: any) => void;
    };
    invalid: boolean;
  }) => VNode[];
}

export interface KwField extends ComponentPublicInstance<KwFieldProps>, UseFieldInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwField: GlobalComponentConstructor<KwFieldProps, KwFieldSlots>;
  }
}
