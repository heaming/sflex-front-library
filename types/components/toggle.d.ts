import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseDenseProps } from './private/useDense';
import { UseStretchProps } from './private/useStretch';

interface KwToggleProps extends UseDenseProps, UseStretchProps {
  /**
   * 현재 선택된 값
   */
  modelValue?: string | number | boolean | Array<any>;

  /**
   * true 상태의 값
   * @defaultValue `Y`
   */
  trueValue?: string | number | boolean;

  /**
   * false 상태의 값
   * @defaultValue `N`
   */
  falseValue?: string | number | boolean;

  /**
   * indeterminate 상태의 값
   */
  indeterminateValue?: string | number | boolean;

  /**
   * 값 변경 순서
   * @defaultValue `tf`
   */
  toggleOrder?: 'tf' | 'ft';

  /**
   * 값 변경 시 indeterminate 사용 여부
   */
  toggleIndeterminate?: boolean;

  /**
   * 선택시 설정할 값
   */
  val?: string | number | boolean;

  /**
   * 표시할 텍스트
   */
  label?: string;

  /**
   * Label 위치 왼쪽으로 설정 여부
   * @defaultValue `true`
   */
  leftLabel?: boolean;

  /**
   * 아이콘 사이즈, px 단위 사용
   */
  size?: string;

  /**
   * checked 커스텀 아이콘
   */
  checkedIcon?: string;

  /**
   * unchecked 커스텀 아이콘
   */
  uncheckedIcon?: string;

  /**
   * indeterminate 커스텀 아이콘
   */
  indeterminateIcon?: string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;

  /**
   * Tabindex HTML attribute value
   */
  tabindex?: number | string;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 선택된 값
   */
  'onUpdate:modelValue'?: (modelValue: string | number | boolean | Array<any>) => void;
}

interface KwToggleSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}

export interface KwToggle extends ComponentPublicInstance<KwToggleProps> {
  /**
   * 선택 값 토글
   */
  toggle: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwToggle: GlobalComponentConstructor<KwToggleProps, KwToggleSlots>;
  }
}
