import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor, QMenuProps } from 'quasar';

type FallThroughProps = 'target' | 'noParentEvent' | 'contextMenu' | 'scrollTarget' | 'touchPosition' | 'persistent' | 'noRefocus' | 'noFocus' | 'fit' | 'cover' | 'anchor' | 'self' | 'offset' | 'maxHeight' | 'maxWidth' | 'modelValue' | 'onUpdate:modelValue';

type menuBehavior = 'menu' | 'dialog';

interface KwMenuProps extends Pick<QMenuProps, FallThroughProps> {
  /**
   * 타이틀
   */
  title?: string | undefined;

  /**
   * FIXME: Write Description
   */
  behavior?: menuBehavior;
}

interface KwMenuSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];

  /**
   * action 영역, kw-btn이 들어간다.
   */
  action: () => VNode[];
}

export interface KwMenu extends ComponentPublicInstance<KwMenuProps> {
  /**
   * FIXME: Write Description
   */
  show: (evt?: Event) => void;
  /**
   * FIXME: Write Description
   */
  hide: (evt?: Event) => void;
  /**
   * FIXME: Write Description
   */
  toggle: (evt?: Event) => void;
  /**
   * FIXME: Write Description
   */
  focus: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwMenu: GlobalComponentConstructor<KwMenuProps, KwMenuSlots>;
  }
}
