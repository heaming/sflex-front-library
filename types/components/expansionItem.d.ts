import { ComponentPublicInstance } from 'vue';
import { GlobalComponentConstructor, QExpansionItemProps, QExpansionItemSlots } from 'quasar';

type FallThroughProps = 'toggleAriaLabel' | 'icon' | 'label' | 'labelLines' | 'caption' | 'captionLines' | 'dense' | 'expandIcon' | 'expandedIcon' | 'expandIconClass' | 'duration' | 'headerInsetLevel' | 'contentInsetLevel' | 'expandSeparator' | 'defaultOpened' | 'expandIconToggle' | 'switchToggleSide' | 'denseToggle' | 'group' | 'popup' | 'headerStyle' | 'headerClass' | 'dark' | 'to' | 'replace' | 'exact' | 'href' | 'target' | 'activeClass' | 'exactActiveClass' | 'disable' | 'modelValue' | 'onUpdate:modelValue' | 'onShow' | 'onBeforeShow' | 'onHide' | 'onBeforeHide' | 'onAfterShow' | 'onAfterHide';

interface KwExpansionItemProps extends Pick<QExpansionItemProps, FallThroughProps> {}
interface KwExpansionItemSlots extends QExpansionItemSlots {}

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
