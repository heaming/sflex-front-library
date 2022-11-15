import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseFieldProps, UseFieldStyleProps, UseFieldInstance } from './private/useField';

interface KwInputProps extends UseFieldProps, UseFieldStyleProps {
  /**
   * 현재 설정된 값
   */
  modelValue?: string | number;

  /**
   * input type
   */
  type?: 'text' | 'number' | 'password' | 'textarea';

  /**
   * 입력 지연 시간(ms) 설정
   */
  debounce?: number | string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * 컴포넌트 읽기전용 모드
   */
  readonly?: boolean;

  /**
   * type `textarea`의 속성, 설정시 높이가 자동으로 늘어난다
   */
  autogrow?: boolean;

  /**
   * type `textarea`의 속성, 행 기준의 높이 값
   */
  rows?: number | string;

  /**
   * 입력 마스크
   */
  mask?: string;

  /**
   * 지정시 마스크 문자가 지정한 값으로 채워진다
   */
  fillMask?: boolean | string;

  /**
   * 지정시 마스크가 반대 방향으로 동작한다
   */
  reverseFillMask?: boolean;

  /**
   * input의 mask 문자 제거 여부
   * @defaultValue `true`
   */
  unmaskedValue?: string;

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
   * type number일 때, 최소값
   */
  min?: number | string;

  /**
   * type number일 때, 최대값
   */
  max?: number | string;

  /**
   * icon을 append 영역에 표시한다
   */
  icon?: string;

  /**
   * icon disable 처리
   */
  disableIcon?: boolean;

  /**
   * 지정시 인풋 입력 길이를 제한한다. Byte 길이 기준이며, 한글은 3Byte 처리한다
   */
  maxlength?: number | string;

  /**
   * 입력 글자 수(바이트) 표시 여부, maxlength가 설정되어 있어야 작동한다
   */
  counter?: boolean;

  /**
   * 지정시 인풋 입력을 대문자 처리한다
   */
  upperCase?: boolean;

  /**
   * 지정시 인풋 입력을 소문자 처리한다
   */
  lowerCase?: boolean;

  /**
   * 정규 표현식, 인풋 입력을 제한할때 사용한다
   */
  regex?: 'alpha' | 'alpha_dash' | 'alpha_num' | 'alpha_spaces' | 'alpha_underscore' | string | RegExp;

  /**
   * 입력 텍스트 우측 정렬 여부
   */
  alignRight?: boolean;

  /**
   * KwSearch, KwForm 안에서 엔터 동작 시 submit 이벤트가 발생하는 것을 막는다
   */
  preventSubmit?: boolean;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 설정된 값
   */
  'onUpdate:modelValue'?: (modelValue: string | number) => void;

  /**
   * icon 클릭 이벤트
   */
  onClickIcon?: () => void;

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
}
interface KwInputSlots {
  /**
   * 인풋 내부 좌측 영역
   */
  prepend: () => VNode[];

  /**
   * 인풋 내부 우측 영역
   */
  append: () => VNode[];

  /**
   * 인풋 외부 우측 영역
   */
  before: () => VNode[];

  /**
   * 인풋 외부 우측 영역
   */
  after: () => VNode[];
}
export interface KwInput extends ComponentPublicInstance<KwInputProps>, UseFieldInstance {
  /**
   * 인풋 select
   */
  select: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwInput: GlobalComponentConstructor<KwInputProps, KwInputSlots>;
  }
}
