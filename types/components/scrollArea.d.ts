import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QScrollAreaProps, QScrollAreaSlots } from 'quasar';
import { VueStyleProp } from 'quasar/dist/types/api/vue-prop-types';

type FallThroughProps = 'thumbStyle' | 'verticalThumbStyle' | 'horizontalThumbStyle' | 'barStyle' | 'verticalBarStyle' | 'horizontalBarStyle' | 'contentStyle' | 'contentActiveStyle' | 'delay' | 'visible' | 'tabindex' | 'onScroll';

interface KwScrollAreaProps extends Pick<QScrollAreaProps, FallThroughProps> {
  /**
   * client height 와 같은 값.
   * 컴포넌트의 높이는 offset height 와 상등하다.
   * 컴포넌트의 기본 높이는 100% 이다.
   *
   */
  height?: string | undefined;

  /**
   * client height 의 min-height
   * height 가 지정되었을 시 무시된다.
   * @see height
   * @default 10px
   */
  minHeight?: string | undefined;

  /**
   * client height 의 max-height
   * height 가 지정되었을 시 무시된다.
   * @see height
   */
  maxHeight?: string | undefined;

  /**
   * client width 와 같은 값.
   * 컴포넌트의 너비는 offset width 와 상등하다.
   * 컴포넌트의 기본 너비는 100% 이다.
   */
  width?: string | undefined;

  /**
   * client width 의 min-width
   * width 가 지정되었을 시 무시된다.
   * @see width
   * @default 10px
   */
  minWidth?: string | undefined;

  /**
   * client width 의 max-width
   * width 가 지정되었을 시 무시된다.
   * @see width
   */
  maxWidth?: string | undefined;

  /**
   * 컨텐츠를 감싸는 div 의 높이를 지정한다.
   * @see contentStyle
   * @see contentActiveStyle
   */
  scrollAreaHeight?: string | undefined;

  /**
   * 컨텐츠를 감싸는 div 의 너비를 지정한다.
   * @see contentStyle
   * @see contentActiveStyle
   */
  scrollAreaWidth?: string | undefined;

  /**
   * 컨텐츠를 감싸는 div 의 스타일을 지정한다.
   * @see contentStyle
   * @see contentActiveStyle
   */
  scrollAreaStyle?: VueStyleProp;
}

interface KwScrollAreaSlots extends QScrollAreaSlots {}

export interface KwScrollArea extends ComponentPublicInstance<KwScrollAreaProps> {
  /**
   * Get the scrolling DOM element target
   * @returns DOM element upon which scrolling takes place
   */
  getScrollTarget: () => Element;
  /**
   * Get the current scroll information
   * @returns Scroll information
   */
  getScroll: () => {
    /**
     * Vertical scroll position (in px)
     */
    verticalPosition: number;
    /**
     * Vertical scroll percentage (0.0 <= x <= 1.0)
     */
    verticalPercentage: number;
    /**
     * Vertical scroll size (in px)
     */
    verticalSize: number;
    /**
     * Height of the container (in px)
     */
    verticalContainerSize: number;
    /**
     * Horizontal scroll position (in px)
     */
    horizontalPosition: number;
    /**
     * Horizontal scroll percentage (0.0 <= x <= 1.0)
     */
    horizontalPercentage: number;
    /**
     * Horizontal scroll size (in px)
     */
    horizontalSize: number;
    /**
     * Width of the container (in px)
     */
    horizontalContainerSize: number;
  };
  /**
   * Get current scroll position
   * @returns An object containing scroll position information
   */
  getScrollPosition: () => {
    /**
     * Scroll offset from top (vertical)
     */
    top: number;
    /**
     * Scroll offset from left (horizontal)
     */
    left: number;
  };
  /**
   * Get current scroll position in percentage (0.0 <= x <= 1.0)
   * @returns An object containing scroll position information in percentage
   */
  getScrollPercentage: () => {
    /**
     * Scroll percentage (0.0 <= x <= 1.0) offset from top (vertical)
     */
    top: number;
    /**
     * Scroll percentage (0.0 <= x <= 1.0) offset from left (horizontal)
     */
    left: number;
  };
  /**
   * Set scroll position to an offset; If a duration (in milliseconds) is specified then the scroll is animated
   * @param axis Scroll axis
   * @param offset Scroll position offset from top (in pixels)
   * @param duration Duration (in milliseconds) enabling animated scroll
   */
  setScrollPosition: (axis: 'vertical' | 'horizontal', offset: number, duration?: number) => void;
  /**
   * Set scroll position to a percentage (0.0 <= x <= 1.0) of the total scrolling size; If a duration (in milliseconds) is specified then the scroll is animated
   * @param axis Scroll axis
   * @param offset Scroll percentage (0.0 <= x <= 1.0) of the total scrolling size
   * @param duration Duration (in milliseconds) enabling animated scroll
   */
  setScrollPercentage: (axis: 'vertical' | 'horizontal', offset: number, duration?: number) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwScrollArea: GlobalComponentConstructor<KwScrollAreaProps, KwScrollAreaSlots>;
  }
}
