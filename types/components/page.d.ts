import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseObserverProps, UseObserverInstance } from './private/useObserver';

interface KwPageProps extends UseObserverProps {
  /**
   * 지정시 헤더 영역을 표시하지 않는다
   */
  noHeader?: boolean;

  /**
   * Mobile only.
   * 헤더 영역에 hint 를 표시한다.
   */
  hint?: string | undefined;
}
interface KwPageSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];

  /**
   * 헤더 영역
   */
  header: () => VNode[];

  /**
   * Mobile only.
   * 헤더 영역 우측 드롭다운 버튼 기본 슬롯 영역.
   * additional 한 action 이 필요한 경우 사용.
   */
  more: () => VNode[];

  /**
   * Mobile only.
   * 헤더와 메인 컨텐츠 사이 영역.
   * POSITIONING 은 TBD.
   *
   * The Area between `Header` and Main Contents
   */
  'sub-header': () => VNode[];

  /**
   * Mobile only.
   * 푸터 영역
   * POSITIONING 은 TBD.
   *
   * Footer Area.
   */
  footer: () => VNode[];

  /**
   * Mobile only.
   * 푸터 영역 내부 목표달성 버튼 영역
   * The Area of CTA Buttons
   */
  action: () => VNode[];
}
export interface KwPage extends ComponentPublicInstance<KwPageProps>, UseObserverInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPage: GlobalComponentConstructor<KwPageProps, KwPageSlots>;
  }
}
