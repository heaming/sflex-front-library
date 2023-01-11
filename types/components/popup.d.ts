import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseObserverProps, UseObserverInstance } from './private/useObserver';

interface KwPopupProps extends UseObserverProps {
  /**
   * 팝업 사이즈
   * @defaultValue `md`
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

  /**
   * 팝업 헤더 드래그 기능 사용여부
   */
  draggable?: boolean;

  /**
   * 팝업 타이틀
   */
  title?: string | boolean;

  /**
   * 팝업 닫기 버튼 표시 여부
   */
  noCloseBtn?: boolean;

  /**
   * 팝업 close 전에 발생하는 이벤트, false 반환 시 close 중지한다
   */
  onBeforeClose?: () => Promise<boolean>;
}
interface KwPopupSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];

  /**
   * 하단 버튼 영역
   */
  action: () => VNode[];
}
export interface KwPopup extends ComponentPublicInstance<KwPopupProps>, UseObserverInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPopup: GlobalComponentConstructor<KwPopupProps, KwPopupSlots>;
  }
}
