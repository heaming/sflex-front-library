import { ComponentPublicInstance, VNode } from 'vue';
import { GlobalComponentConstructor } from 'quasar';
import { UseObserverInstance, UseObserverProps } from './private/useObserver';

interface KwObserverProps extends UseObserverProps {}
interface KwObserverSlots {
  /**
   * 기본 컨텐츠 영역
   */
  default: () => VNode[];
}
export interface KwObserver extends ComponentPublicInstance<KwObserverProps>, UseObserverInstance {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    KwObserver: GlobalComponentConstructor<KwObserverProps, KwObserverSlots>;
  }
}
