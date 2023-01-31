import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QRatingProps, QRatingSlots } from 'quasar';
import { UseFieldProps } from './private/useField';

type FallThroughProps = 'modelValue' | 'size' | 'max' | 'icon' | 'iconHalf' | 'iconSelected' | 'color' | 'colorHalf' | 'colorSelected' | 'noReset' | 'noDimming' | 'readonly' | 'disable';

interface KwRatingProps extends Pick<QRatingProps, FallThroughProps>, UseFieldProps {
  /**
   * tip-{name} 슬롯에 기본 tooltip 을 표시한다.
   *
   * @example ['bad', 'not bad', 'good', 'brilliant', 'The Gad made this'], 'holymoly'
   */
  tooltip?: string | Array<string>;
}

interface KwRatingSlots extends QRatingSlots {
  /**
   * 1 번째 아이템에 대한 설명 kw-tooltip 을 권정함.
   *
   * @see tooltip
   */
  'tip-1': () => VNode[];

  /**
   * 2 번째 아이템에 대한 설명 kw-tooltip 을 권정함.
   *
   * @see tooltip
   */
  'tip-2': () => VNode[];

  /**
   * 3 번째 아이템에 대한 설명 kw-tooltip 을 권정함.
   *
   * @see tooltip
   */
  'tip-3': () => VNode[];

  /**
   * 4 번째 아이템에 대한 설명 kw-tooltip 을 권정함.
   *
   * @see tooltip
   */
  'tip-4': () => VNode[];

  /**
   * 5 번째 아이템에 대한 설명 kw-tooltip 을 권정함.
   *
   * @see tooltip
   */
  'tip-5': () => VNode[];
}

export interface KwRating extends ComponentPublicInstance<KwRatingProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwRating: GlobalComponentConstructor<KwRatingProps, KwRatingSlots>;
  }
}
