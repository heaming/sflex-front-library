import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QExpansionItemProps } from 'quasar';
import { UseItemStyleProps } from './private/useItemStyle';

type FallThroughProps = 'toggleAriaLabel' | 'icon' | 'label' | 'labelLines' | 'caption' | 'captionLines' | 'dense' | 'expandIcon' | 'expandedIcon' | 'expandIconClass' | 'duration' | 'headerInsetLevel' | 'contentInsetLevel' | 'expandSeparator' | 'defaultOpened' | 'expandIconToggle' | 'switchToggleSide' | 'denseToggle' | 'group' | 'popup' | 'headerStyle' | 'headerClass' | 'dark' | 'to' | 'replace' | 'exact' | 'href' | 'target' | 'activeClass' | 'exactActiveClass' | 'disable' | 'modelValue' | 'onUpdate:modelValue' | 'onShow' | 'onBeforeShow' | 'onHide' | 'onBeforeHide' | 'onAfterShow' | 'onAfterHide';

type PaddingTarget = 'self' | 'header';

interface KwExpansionItemProps extends Pick<QExpansionItemProps, FallThroughProps>, UseItemStyleProps {
  /**
   * ExpandIcon 을 포함하는 header item side section 의 Align props.
   */
  expandIconAlign?: string | undefined;

  /**
   * expansion item padding 을 적용할 대상 item type.
   * 'expansion item' 자신 혹은 header 슬롯 내부에 그려지는 item 에 선택하여 적용할 수 있다.
   *
   * @see padding
   * @see KwList item-padding props
   * @see kw-item-type--padding
   */
  paddingTarget?: PaddingTarget | Array<PaddingTarget> | undefined;

  /**
   * padding 상속 여부를 결정한다.
   * 컨텐츠 내부에서 kw-item 을 사용 시, 해당 item 에도 list 혹은 expansion item 에서 지정한 padding 이 적용되는 것을 막는다.
   *
   * @default false
   */
  blockInheritPadding?: boolean | undefined;
}
interface KwExpansionItemSlots {
  /**
   * Slot used for expansion item's content
   * @param { toggleCount }
   */
  default: (scope: {
    /**
     * toggle 된 횟수
     */
    toggleCount: number;
  }) => VNode[];

  /**
   * Slot used for overriding default header
   * @param scope
   */
  header: (scope: {
    /**
     * QExpansionItem expanded status
     */
    expanded: boolean;
    /**
     * QExpansionItem details panel id (for use in aria-controls)
     */
    detailsId: string;
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show: (evt?: any) => void;
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide: (evt?: any) => void;
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle: (evt?: any) => void;
    /**
     * toggle 된 횟수
     */
    toggleCount: number;
    /**
     * 조회 여부
     */
    read: boolean;
  }) => VNode[];
}

export interface KwExpansionItem extends ComponentPublicInstance<KwExpansionItemProps> {
  /**
   * Triggers component to show
   * @param evt JS event object
   */
  show: (evt?: Event) => void;
  /**
   * Triggers component to hide
   * @param evt JS event object
   */
  hide: (evt?: Event) => void;
  /**
   * Triggers component to toggle between show/hide
   * @param evt JS event object
   */
  toggle: (evt?: Event) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwExpansionItem: GlobalComponentConstructor<KwExpansionItemProps, KwExpansionItemSlots>;
  }
}
