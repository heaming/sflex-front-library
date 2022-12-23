import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';

type TooltipPosition = 'top left' | 'top middle' | 'top right' | 'top start' | 'top end' | 'center left' | 'center middle' | 'center right' | 'center start' | 'center end' | 'bottom left' | 'bottom middle' | 'bottom right' | 'bottom start' | 'bottom end';

// KwTooltip
interface KwTooltipProps {
  /**
   * 툴팁 표시 여부
   */
  modelValue?: number;

  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: number;

  /**
   * Configure a target element to trigger Tooltip toggle
   * 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements
   * By using a String (CSS selector) it attaches the events to the specified DOM element (if it exists)
   */
  target?: number;

  /**
   * 툴팁 표시 지연시간
   */
  delay?: number;

  /**
   * 툴팁 숨김 지연시간
   */
  hideDelay?: number;

  /**
   * 최대 높이
   */
  maxHeight?: string;

  /**
   * 최대 너비
   */
  maxWidth?: string;

  /**
   * 부모 요소로 부터의 상대 위치
   */
  anchor?: TooltipPosition;

  /**
   * 툴팁 자신으로 부터의 상대 위치
   */
  self?: TooltipPosition;

  /**
   * 픽셀 단위의 상대 위치 값
   */
  offset?: [horizontalOffset: number, verticalOffset: number];

  /**
   * 툴팁 표시 여부
   */
  showWhenEllipsised?: boolean;

  /**
   * 'v-model:modelValue'에서 값 변경을 위해 사용
   * @param modelValue 툴팁 표시 여부
   */
  'onUpdate:modelValue'?: (modelValue: boolean) => void;
}
interface KwTooltipSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwTooltip extends ComponentPublicInstance<KwTooltipProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwTooltip: GlobalComponentConstructor<KwTooltipProps, KwTooltipSlots>;
  }
}
