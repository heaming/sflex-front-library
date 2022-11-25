import { ComponentPublicInstance, Ref, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseFieldProps, UseFieldInstance } from './private/useField';
import { UseDenseProps } from './private/useDense';
import { UseStretchProps } from './private/useStretch';
import { VueClassProp } from 'quasar/dist/types/api/vue-prop-types';

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
export interface KwFieldWrapProps extends UseDenseProps, UseStretchProps {
  /**
   * label 영역에 표기 될 문자열. Mobile only.
   */
  label?: string | undefined;

  /**
   * 에러 상태로 지정하는 커스텀 플래그
   * (필요한 경우에만 사용한다)
   */
  error?: boolean;

  /**
   * 에러 상태일 시 표시할 커스텀 메시지
   * (필요한 경우에만 사용한다)
   */
  errorMessage?: string;

  /**
   * 내부 컨텐츠 영역에 지정할 class
   * label 영역의 컨테이닝 블럭 역할을 수행한다.
   */
  controlClass?: VueClassProp;

  /**
   * field wrap 의 높이를 컨텐츠 높이에 맞추어 늘릴지 여부.
   *
   * @default true
   */
  autoHeight?: VueClassProp;

  /**
   * 포커스 이벤트
   * @param evt JS event object
   */
  onFocus?: (evt: Event) => void;
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
interface KwFieldWrapSlots {
  default: () => VNode[];
}

export interface KwField extends ComponentPublicInstance<KwFieldProps>, UseFieldInstance {}
export interface KwFieldWrap extends ComponentPublicInstance<KwFieldWrapProps> {
  /**
   * 컴포넌트에 포커싱한다
   */
  focus: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwField: GlobalComponentConstructor<KwFieldProps, KwFieldSlots>;
    KwFieldWrap: GlobalComponentConstructor<KwFieldWrapProps, KwFieldWrapSlots>;
  }
}
