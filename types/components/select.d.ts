import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseFieldProps, UseFieldStyleProps, UseFieldInstance } from './private/useField';
import { UseOptionsProps } from './private/useOptions';

interface KwSelectProps extends UseFieldProps, UseFieldStyleProps, UseOptionsProps {
  /**
   * 현재 설정된 값
   */
  modelValue?: string | number | boolean | object | Array;

  /**
   * 다건 선택 모드
   */
  multiple?: boolean;

  /**
   * 지정 시 modelValue를 option 그대로 매핑
   */
  emitValue?: boolean;

  /**
   * 지정 시 인풋 입력 사용
   */
  useInput?: boolean;

  /**
   * 인풋 디바운스 ms
   * @defaultValue `100`
   */
  inputDebounce?: number;

  /**
   * 드랍다운 아이콘
   * @defaultValue `arrow_down_16`
   */
  dropdownIcon?: string;

  /**
   * 지정 시 드랍다운 아이콘 숨김
   */
  hideDropdownIcon?: boolean;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * 컴포넌트 읽기전용 모드
   */
  readonly?: boolean;

  /**
   * prepend 영역에 들어갈 텍스트
   */
  prefix?: string;

  /**
   * append 영역에 들어갈 텍스트
   */
  suffix?: string;

  /**
   * 지정시 입력 값이 있으면, append 영역에 clearable 아이콘이 나타난다
   */
  clearable?: boolean;

  /**
   * 텍스트 색상
   */
  color?: string;

  /**
   * 배경 색상
   */
  bgColor?: string;

  /**
   * 마운트 시 포커스 여부
   */
  autofocus?: boolean;

  /**
   * input placeholder
   */
  placeholder?: string;

  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 설정된 값
   */
  'onUpdate:modelValue'?: (modelValue: string | number) => void;

  /**
   * 포커스 이벤트
   * @param evt JS event object
   */
  onFocus?: (evt: Event) => void;

  /**
   * 블러 이벤트
   * @param evt JS event object
   */
  onBlur?: (evt: Event) => void;

  /**
   * clearable 속성의 clear 동작 시 발생하는 이벤트
   * @param value clear되기 이전의 값
   */
  onClear?: (value: string | number) => void;

  /**
   * input keydown 이벤트
   * @param evt JS event object
   */
  onKeydown?: (evt: Event) => void;

  /**
   * input 입력 이벤트
   * @param inputValue string
   */
  onInputValue?: (inputValue: string) => void;

  /**
   * useInput 사용 시 인풋 입력에 따른 필터 이벤트
   * @param inputValue input typed value
   * @param doneFn 필요한 업데이트를 수행하는 기능 제공
   * @param abortFn 문제가 발생하면 이 함수를 호출하십시오
   */
  onFilter?: (inputValue: string, doneFn: (callbackFn: () => void, afterFn: (ref) => void) => void, abortFn: () => void) => void;
}
interface KwSelectSlots {
  /**
   * option 없을때 보이는 영역
   */
  noOption: () => VNode[];
}
export interface KwSelect extends ComponentPublicInstance<KwSelectProps>, UseFieldInstance {
  /**
   * value에 맞는 option index 찾는다. 없으면 -1
   */
  getOptionIndex: (val: any) => void;

  /**
   * value에 맞는 option 찾는다
   */
  getOption: (val: any) => void;

  /**
   * value에 맞는 label 찾는다
   */
  getOptionLabel: (val: any) => void;

  /**
   * use-input 사용시 input value를 설정한다
   */
  updateInputValue: (inputValue: string) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwSelect: GlobalComponentConstructor<KwSelectProps, KwSelectSlots>;
  }
}
