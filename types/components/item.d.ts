import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QItemLabelProps, QItemLabelSlots, QItemProps, QItemSectionProps, QItemSectionSlots, QItemSlots } from 'quasar';
import { UseFontProps } from './private/useFont';
import { UseItemStyleProps } from './private/useItemStyle';

type FallThroughItemProps = 'tag' | 'active' | 'clickable' | 'dense' | 'insetLevel' | 'tabindex' | 'focused' | 'manualFocus' | 'to' | 'replace' | 'exact' | 'href' | 'target' | 'activeClass' | 'exactActiveClass' | 'disable' | 'onClick';

interface KwItemProps extends Pick<QItemProps, FallThroughItemProps>, UseItemStyleProps {
  /**
   * padding 상속 여부를 결정한다.
   * item 내부의 item 이 중첩해서 들어갈 경우, 필요에 의해 사용한다.
   *
   * @default false
   */
  blockInheritPadding?: boolean | undefined;

  /**
   * dense props 상속을 막을 지 여부, dense 상태인 field 내 slot 내부에서 dense 적용가능한 컴포넌트 사용시 상속 없이 명시적으로 지정하고 싶을 때 막는다.
   *
   * @default false
   */
  blockInheritDense?: boolean | undefined;
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
