import { ComponentPublicInstance, VNode } from 'vue';

export interface UsePanelProps {
  /**
   * modelValue 키 값으로 사용된다
   */
  name?: number | string;

  /**
   * 컴포넌트 비활성화 모드
   */
  disable?: boolean;
}

export interface UsePanelsProps {
  /**
   * 현재 설정된 값
   */
  modelValue?: number | string;

  /**
   * 설정 시 탭 방향이 수직이 된다
   */
  vertical?: boolean;

  /**
   * 탭 애니메이션 여부
   */
  animated?: boolean;

  /**
   * 탭 이동 인피니티 여부
   */
  infinite?: boolean;

  /**
   * 탭 스와이프 액션 여부
   */
  swipeable?: boolean;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 설정된 값
   */
  'onUpdate:modelValue'?: (modelValue: any) => void;
}
