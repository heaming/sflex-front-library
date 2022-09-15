import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseFieldProps, UseFieldStyleProps, UseFieldInstance } from './private/useField';

// KwDate
interface KwDateProps {
  /**
   * 현재 선택된 날짜
   */
  modelValue?: string;

  /**
   * input의 mask 문자 제거 여부
   * (적용 시 YYYY-MM-DD이면, YYYYMMDD로 변환)
   * @defaultValue `true`
   */
  unmaskedValue?: string;

  /**
   * 최소 뷰 모드 (0 - 날짜, 1 - 월, 2 - 년)
   * @defaultValue `0`
   */
  minView?: 0 | 1 | 2;

  /**
   * 최대 뷰 모드 (0 - 날짜, 1 - 월, 2 - 년)
   * @defaultValue `2`
   */
  maxView?: 0 | 1 | 2;

  /**
   * 최소 선택 가능 날짜
   * @defaultValue '1000-01-01'
   */
  minDate?: string;

  /**
   * 최대 선택 가능 날짜
   * @defaultValue `9999-12-31`
   */
  maxDate?: string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * 캘린더 컨텐츠 표시할 때, 아이템(일자, 월, 년)에 대한 속성 지정하는 콜백
   */
  beforeShow: (
    currentView: 0 | 1 | 2,
    formattedDate: string,
  ) =>
    | boolean
    | {
        enabled?: boolean;
        classes?: string;
        tooltip?: string;
        content?: string;
      };

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 선택된 날짜
   */
  'onUpdate:modelValue'?: (modelValue: string) => void;
}
interface KwDateSlots {}
interface KwDate extends ComponentPublicInstance<KwDateProps> {}

// KwDatePicker
interface KwDatePickerProps extends UseFieldProps, UseFieldStyleProps, Omit<KwDateProps, 'minView', 'maxView'> {
  /**
   * 데이트피커 유형
   * @defaultValue `date`
   */
  type: 'date' | 'month' | 'year';

  /**
   * 컴포넌트 읽기전용 모드
   */
  readonly?: boolean;

  /**
   * 공간을 덜 차지하는 스타일 적용
   */
  dense?: boolean;

  /**
   * 마운트 시 포커스 여부
   */
  autofocus?: boolean;

  /**
   * input placeholder
   */
  placeholder?: string;
}
interface KwDatePickerSlots {}
interface KwDatePicker extends ComponentPublicInstance<KwDatePickerProps>, UseFieldInstance {}

// KwDatePickerRange
interface KwDatePickerRangeProps extends Omit<KwDatePickerProps, 'modelValue', 'onUpdate:modelValue', 'placeholder'> {
  /**
   * 시작일 현재 날짜 값
   */
  from?: string;

  /**
   * 종료일 현재 날짜 값
   */
  to?: string;

  /**
   * 시작일 input placeholder
   */
  toPlaceholder?: string;

  /**
   * 종료일 input placeholder
   */
  fromPlaceholder?: string;

  /**
   * 'v-model:from'에서 값 변경을 위해 사용
   * @param from 시작일 선택된 날짜
   */
  'onUpdate:from'?: (from: string) => void;

  /**
   * 'v-model:to'에서 값 변경을 위해 사용
   * @param to 종료된 날짜
   */
  'onUpdate:to'?: (to: string) => void;
}
interface KwDatePickerRangeSlots {}
interface KwDatePickerRange extends ComponentPublicInstance<KwDatePickerRangeProps>, UseFieldInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwDate: GlobalComponentConstructor<KwDateProps, KwDateSlots>;
    KwDatePicker: GlobalComponentConstructor<KwDatePickerProps, KwDatePickerSlots>;
    KwDateRangePicker: GlobalComponentConstructor<KwDateRangePickerProps, KwDateRangePickerSlots>;
  }
}
