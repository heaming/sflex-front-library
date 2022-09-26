import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseObserverProps, UseObserverInstance } from './private/useObserver';

interface KwPageProps extends UseObserverProps {
  /**
   * 페이지 사이즈
   */
  size?: 'sm' | 'md';

  /**
   * 지정시 헤더 영역을 표시하지 않는다
   */
  noHeader?: boolean;
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
}
export interface KwPage extends ComponentPublicInstance<KwPageProps>, UseObserverInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwPage: GlobalComponentConstructor<KwPageProps, KwPageSlots>;
  }
}
