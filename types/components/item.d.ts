import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QItemLabelProps, QItemLabelSlots, QItemProps, QItemSectionProps, QItemSectionSlots, QItemSlots } from 'quasar';
import { UseFontProps } from './private/useFont';

type FallThroughItemProps = 'tag' | 'active' | 'clickable' | 'dense' | 'insetLevel' | 'tabindex' | 'focused' | 'manualFocus' | 'to' | 'replace' | 'exact' | 'href' | 'target' | 'activeClass' | 'exactActiveClass' | 'disable' | 'onClick';

interface KwItemProps extends Pick<QItemProps, FallThroughItemProps> {
  /**
   * 기본 패딩을 적용한다.
   * `$kw-item-padding` `variable` 을 따른다.
   *
   * @default false
   */
  padding?: boolean | undefined;

  /**
   * 작은 스타일을 사용한다. 최소 높이는 32px 을 가지며, 폰트 스타일을 14px 스타일로 지정한다.
   *
   * @default false
   */
  dense?: boolean | undefined;
}
interface KwItemSlots extends QItemSlots {
  /**
   * 기본 컨텐츠 영역
   *
   * KwItemSection 들 로 구성하는 것을 기본으로 한다.
   */
  default: () => VNode[];
}

type FallThroughLabelProps = 'lines';

interface KwItemLabelProps extends Pick<QItemLabelProps, FallThroughLabelProps>, UseFontProps {}
interface KwItemLabelSlots extends QItemLabelSlots {
  default: () => VNode[];
}

type FallThroughSectionProps = 'avatar' | 'thumbnail' | 'noWrap';

interface KwItemSectionProps extends Pick<QItemSectionProps, FallThroughSectionProps> {
  /**
   * Align content to top (useful for multi-line items)
   *
   */
  top?: boolean | undefined;

  /**
   * Align content to center (useful for multi-line items)
   *
   */
  center?: boolean | undefined;

  /**
   * Align content to bottom (useful for multi-line items)
   *
   */
  bottom?: boolean | undefined;

  /**
   * kw-item-section 의 타입을 side 로 만듭니다.
   * Main section 상대 위치에 따라 스타일이 바뀌므로 당황하지 맙시다.
   */
  side?: boolean | undefined;
}
interface KwItemSectionSlots extends QItemSectionSlots {}

export interface KwItem extends ComponentPublicInstance<KwItemProps> {}
export interface KwItemLabel extends ComponentPublicInstance<KwItemLabelProps> {}
export interface KwItemSection extends ComponentPublicInstance<KwItemSectionProps> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwItem: GlobalComponentConstructor<KwItemProps, KwItemSlots>;
    KwItemLabel: GlobalComponentConstructor<KwItemLabelProps, KwItemLabelSlots>;
    KwItemSection: GlobalComponentConstructor<KwItemSectionProps, KwItemSectionSlots>;
  }
}
